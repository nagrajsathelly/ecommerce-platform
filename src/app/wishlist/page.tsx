
"use client";

import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/ui/ProductCard";
import type { RootState } from "@/lib/store";

export default function WishlistPage() {
  const items = useSelector((state: RootState) => state.wishlist.items);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex items-center gap-3">
          <Heart size={28} className="text-red-500" />
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        </div>
        <p className="mt-2 text-gray-500">
          {items.length} saved {items.length === 1 ? "product" : "products"}
        </p>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border bg-white px-6 py-16 text-center">
            <Heart size={44} className="mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2 text-gray-500">
              Save products you love to find them here later.
            </p>
            <Link
              href="/#products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-white hover:bg-orange-500"
            >
              <ArrowLeft size={18} />
              Explore products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
