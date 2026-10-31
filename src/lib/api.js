import React from 'react';

export async function getCategories() {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    return data;
}

export const getCategory = async (slug) => {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
};

export async function getProducts(category) {
    const url = category
        ? `https://openapi.programming-hero.com/api/bazardor/products?category=${category}`
        : "https://openapi.programming-hero.com/api/bazardor/products";
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
