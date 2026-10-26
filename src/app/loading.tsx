
export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="h-48 animate-pulse rounded-3xl bg-gray-200" />
      <div className="mt-10 h-8 w-56 animate-pulse rounded bg-gray-200" />
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-square rounded-xl bg-gray-200" />
            <div className="mt-3 h-4 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
