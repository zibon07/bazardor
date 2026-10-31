import React from 'react';

export async function getCategories() {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    return data;
}

