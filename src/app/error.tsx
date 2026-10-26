
"use client";

export default function ErrorPage({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold">Unable to load products</h2>
      <p className="mt-2 text-gray-500">
        Please check your connection and try again.
      </p>
      <button
        onClick={() => reset()}
        className="mt-5 rounded-lg bg-gray-900 px-5 py-3 text-white"
      >
        Try again
      </button>
    </main>
  );
}
