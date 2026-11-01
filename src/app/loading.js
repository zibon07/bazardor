export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="skeleton h-56 w-full rounded-3xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-2xl" />
        ))}
      </div>
    </main>
  );
}