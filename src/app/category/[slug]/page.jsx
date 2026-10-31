import { notFound } from "next/navigation";
import { getCategory, getProducts } from "@/lib/api";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <section className="bg-base-100 border border-base-300 rounded-2xl p-4 sm:p-6 flex items-center gap-4 shadow-sm">
        <span className="size-12 sm:size-16 rounded-xl bg-base-200 grid place-items-center text-2xl sm:text-4xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-base-content/60">প্রতি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </section>

      <CategoryProducts products={products} />
    </main>
  );
}