
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";
import type { AppDispatch, RootState } from "@/lib/store";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ShopSphere<span className="text-orange-500">.</span>
          </Link>
          <Link href="/#products" className="text-sm font-medium text-gray-600 hover:text-orange-500">
            Continue shopping
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <p className="mt-2 text-gray-500">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border bg-white px-6 py-16 text-center">
            <ShoppingBag className="mx-auto text-gray-400" size={48} />
            <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">
              Explore our collection and find something you love.
            </p>
            <Link
              href="/#products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-medium text-white hover:bg-orange-500"
            >
              <ArrowLeft size={18} />
              Browse products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-3">
            <section className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <article
                  key={item.productId}
                  className="flex gap-4 rounded-2xl border bg-white p-4 sm:gap-6 sm:p-6"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-36 sm:w-36">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="144px"
                      className="object-contain p-3"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <h2 className="font-semibold text-gray-900">{item.title}</h2>
                    <p className="mt-2 text-lg font-bold text-gray-900">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                      <div className="flex items-center rounded-lg border">
                        <button
                          aria-label={`Decrease quantity of ${item.title}`}
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.productId,
                                quantity: item.quantity - 1
                              })
                            )
                          }
                          className="p-2 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          aria-label={`Increase quantity of ${item.title}`}
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.productId,
                                quantity: item.quantity + 1
                              })
                            )
                          }
                          className="p-2"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.productId))}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-2xl border bg-white p-6">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="mt-6 flex justify-between text-gray-600">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between gap-3 text-lg font-bold">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Shipping and any applicable taxes are not included.
                </p>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block rounded-lg bg-orange-500 px-5 py-3 text-center font-semibold text-white hover:bg-orange-600"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/#products"
                className="mt-4 block text-center text-sm font-medium text-gray-600 hover:text-orange-500"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
