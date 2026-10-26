"use client";

import Image from "next/image";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import type { AppDispatch, RootState } from "@/lib/store";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>();
  const isWishlisted = useSelector((state: RootState) =>
    state.wishlist.items.some((item) => item.id === product.id),
  );

  function handleAddToCart() {
    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    );
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm hover:text-red-500"
        >
          <Heart
            size={20}
            className={
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {product.category}
        </p>
        <h3 className="mt-2 min-h-12 font-semibold text-gray-900">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-500"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
