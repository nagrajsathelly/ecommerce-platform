"use client";

import Link from "next/link";
import { ShoppingBag, Search, Heart, UserRound } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";

export default function Header() {
  const items = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-20 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          ShopSphere<span className="text-orange-500">.</span>
        </Link>
        <div className="hidden max-w-md flex-1 items-center gap-2 rounded-full border bg-gray-50 px-4 py-2 md:flex">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent text-sm outline-none"
            aria-label="Search products"
          />
        </div>
        <nav className="flex items-center gap-2">
          <Link
            href="/wishlist"
            aria-label={`Wishlist, ${wishlistItems.length} products`}
            className="relative rounded-full border p-2 hover:bg-gray-50 sm:p-3"
          >
            <Heart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full border px-3 py-2 hover:bg-gray-50 sm:px-4"
          >
            <ShoppingBag size={20} />
            <span className="hidden text-sm font-medium sm:inline">Cart</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          </Link>
          <Link
            href="/signin"
            aria-label="Sign in to your account"
            className="rounded-full border p-2 hover:bg-gray-50 sm:p-3"
          >
            <UserRound size={20} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
