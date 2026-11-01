const BASE = "https://openapi.programming-hero.com/api/bazardor";

export async function getCategories() {
  const res = await fetch(`${BASE}/categories`, { next: { revalidate: 300 } });
  return res.json();
}

export async function getCategory(slug) {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(category) {
  const url = category ? `${BASE}/products?category=${category}` : `${BASE}/products`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  return res.json();
}

export async function getProduct(slug) {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export const topRisers = (list, n = 6) =>
  list
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, n);

export const topFallers = (list, n = 6) =>
  list
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, n);