
import type { Product } from "@/data/products";

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ApiProduct[] = await response.json();

  return data.map((product) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price,
    rating: product.rating.rate,
    image: product.image
  }));
}
