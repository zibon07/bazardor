import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, topRisers, topFallers } from "@/lib/api";
import { toBn } from "@/lib/bn";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      <Hero />

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-error">▲ আজ দাম বেড়েছে</h2>
        <ProductGrid products={topRisers(products)} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-success">▼ আজ দাম কমেছে</h2>
        <ProductGrid products={topFallers(products)} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-32 space-y-4">
        <div>
          <h2 className="text-xl font-bold">সব পণ্য</h2>
          <p className="text-sm text-base-content/60">
            মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}