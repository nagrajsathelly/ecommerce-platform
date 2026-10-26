import CheckoutForm from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Checkout</h1>
      <p className="mb-8 text-gray-600">Enter your delivery details and review your order.</p>
      <CheckoutForm />
    </main>
  );
}