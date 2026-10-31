import { notFound } from "next/navigation";
import { getCategory, getProducts } from "@/lib/api";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">{category.icon} {category.nameBn}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {products.map((p) => (
          <p key={p.id}>{p.image} {p.nameBn}</p>
        ))}
      </div>
    </main>
  );
}