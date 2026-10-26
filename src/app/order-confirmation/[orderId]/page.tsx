"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrder } from "@/services/orderService";
import type { Order } from "@/types/orders";

export default function OrderConfirmationPage() {
  const params = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOrder(getOrder(params.orderId) ?? null);
    setLoaded(true);
  }, [params.orderId]);

  if (!loaded) {
    return <main className="mx-auto max-w-2xl px-4 py-16">Loading order...</main>;
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <p className="mt-2 text-gray-600">This order is not available in this browser.</p>
        <Link href="/" className="mt-5 inline-block underline">Continue shopping</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <section className="rounded-xl border p-6 sm:p-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
          ✓
        </div>
        <h1 className="text-3xl font-bold">Order placed successfully!</h1>
        <p className="mt-2 text-gray-600">Thank you for shopping with ShopSphere.</p>

        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Order number</p>
          <p className="font-semibold">{order.id}</p>
          <p className="mt-3 text-sm text-gray-500">Order date</p>
          <p>{new Date(order.createdAt).toLocaleString()}</p>
          <p className="mt-3 text-sm text-gray-500">Payment method</p>
          <p>{order.paymentMethod === "cod" ? "Cash on Delivery" : "Demo payment (not charged)"}</p>
        </div>

        <h2 className="mt-6 text-lg font-semibold">Items ordered</h2>
        <div className="mt-3 space-y-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex justify-between gap-4 text-sm">
              <span>{item.title} × {item.quantity}</span>
              <span className="whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2 border-t pt-4">
          <div className="flex justify-between"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between text-lg font-bold"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
        </div>

        <h2 className="mt-6 font-semibold">Delivery address</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          {order.address.fullName}<br />
          {order.address.address}<br />
          {order.address.city}, {order.address.state} {order.address.postalCode}<br />
          Phone: {order.address.phone}
        </p>

        <Link href="/" className="mt-8 block rounded-lg bg-black px-4 py-3 text-center font-medium text-white">
          Continue shopping
        </Link>
      </section>
    </main>
  );
}