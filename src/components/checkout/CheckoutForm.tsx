"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/store";
import { clearCart } from "@/features/cart/cartSlice";
import { saveOrder } from "@/services/orderService";
import type { Order, ShippingAddress } from "@/types/orders";
import Link from "next/link";

const initialAddress: ShippingAddress = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: ""
};

export default function CheckoutForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const [address, setAddress] = useState<ShippingAddress>(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "demo">("cod");
  const [error, setError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 8;
  const total = subtotal + shipping;

  function updateAddress(field: keyof ShippingAddress, value: string) {
    setAddress((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    try {
      const order: Order = {
        id: `SS-${Date.now()}`,
        items: items.map((item) => ({ ...item })),
        address,
        paymentMethod,
        subtotal,
        shipping,
        total,
        status: "placed",
        createdAt: new Date().toISOString()
      };
      saveOrder(order);
      dispatch(clearCart());
      router.push(`/order-confirmation/${order.id}`);
    } catch {
      setError("Unable to place your order. Please try again.");
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-gray-600">Add products before checking out.</p>
        <Link href="/" className="mt-4 inline-block rounded-lg bg-black px-5 py-3 text-white">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <section className="rounded-xl border p-5">
          <h2 className="mb-4 text-lg font-semibold">Delivery address</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {([
              ["fullName", "Full name", "text"],
              ["phone", "Phone number", "tel"],
              ["address", "Street address", "text"],
              ["city", "City", "text"],
              ["state", "State", "text"],
              ["postalCode", "Postal code", "text"]
            ] as const).map(([field, label, type]) => (
              <label key={field} className="grid gap-1 text-sm">
                <span>{label}</span>
                <input
                  type={type}
                  required
                  value={address[field]}
                  onChange={(event) => updateAddress(field, event.target.value)}
                  className="rounded-lg border px-3 py-2.5 outline-none focus:border-black"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-xl border p-5">
          <h2 className="mb-4 text-lg font-semibold">Payment method</h2>
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>
              <span className="block font-medium">Cash on Delivery</span>
              <span className="text-sm text-gray-500">Pay when your order arrives.</span>
            </span>
          </label>
          <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-lg border p-3">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "demo"}
              onChange={() => setPaymentMethod("demo")}
            />
            <span>
              <span className="block font-medium">Demo payment</span>
              <span className="text-sm text-gray-500">For testing only. No payment will be taken.</span>
            </span>
          </label>
        </section>
      </div>

      <aside className="h-fit rounded-xl border p-5">
        <h2 className="mb-4 text-lg font-semibold">Order summary</h2>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between gap-3 text-sm">
              <span className="min-w-0 flex-1">{item.title} × {item.quantity}</span>
              <span className="whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="my-4 border-t" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between border-t pt-3 text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
        {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
        <button type="submit" className="mt-5 w-full rounded-lg bg-black px-4 py-3 font-medium text-white hover:bg-gray-800">
          Place order
        </button>
        <p className="mt-3 text-xs text-gray-500">Demo checkout only. No real payment is processed.</p>
      </aside>
    </form>
  );
}