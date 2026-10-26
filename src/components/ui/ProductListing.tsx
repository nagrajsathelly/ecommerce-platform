
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/data/products";

type SortOption = "default" | "price-low" | "price-high" | "name" | "rating";

export default function ProductListing({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [products, search, category, sortBy]);

  return (
    <section id="products" className="py-12">
      <div className="mb-7">
        <p className="text-sm font-medium text-orange-500">OUR COLLECTION</p>
        <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          Featured Products
        </h2>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-orange-500"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
          className="rounded-lg border bg-white px-4 py-3"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All categories" : item}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortOption)}
          aria-label="Sort products"
          className="rounded-lg border bg-white px-4 py-3"
        >
          <option value="default">Default order</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
          <option value="rating">Highest rated</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-10 text-center">
          <h3 className="font-semibold text-gray-900">No products found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try another search term or category.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSortBy("default");
            }}
            className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-white"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
