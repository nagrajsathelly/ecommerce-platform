
"use client";

import { useEffect } from "react";
import { useStore } from "react-redux";
import type { AppStore } from "@/lib/store";
import type { CartItem } from "@/features/cart/cartSlice";
import type { Product } from "@/data/products";
import { hydrateCart } from "@/features/cart/cartSlice";
import { hydrateWishlist } from "@/features/wishlist/wishlistSlice";

const STORAGE_KEY = "shopsphere-state";

export default function StorePersistence() {
  const store = useStore() as AppStore;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const data = JSON.parse(saved) as {
          cartItems?: CartItem[];
          wishlistItems?: Product[];
        };

        if (Array.isArray(data.cartItems)) {
          store.dispatch(hydrateCart(data.cartItems));
        }

        if (Array.isArray(data.wishlistItems)) {
          store.dispatch(hydrateWishlist(data.wishlistItems));
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          cartItems: state.cart.items,
          wishlistItems: state.wishlist.items
        })
      );
    });

    return unsubscribe;
  }, [store]);

  return null;
}
