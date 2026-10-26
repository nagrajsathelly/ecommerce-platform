
import Header from "@/components/layout/Header";
import ProductListing from "@/components/ui/ProductListing";
import { getProducts } from "@/services/productService";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="overflow-hidden rounded-3xl bg-gray-900 px-6 py-12 text-white sm:px-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Your everyday marketplace
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight sm:text-6xl">
            Find products you will love.
          </h1>
          <p className="mt-4 max-w-lg text-gray-300">
            Discover quality products for your lifestyle.
          </p>
          <a
            href="#products"
            className="mt-7 inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Explore Products
          </a>
        </div>

        <ProductListing products={products} />
      </section>

      <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
        © 2026 ShopSphere. Built with Next.js and Redux Toolkit.
      </footer>
    </main>
  );
}
