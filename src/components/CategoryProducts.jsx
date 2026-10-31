"use client";
import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { toBn } from "@/lib/bn";

export default function CategoryProducts({ products }) {
    const [sort, setSort] = useState("default");

    const list = [...products]; 
    if (sort === "asc") list.sort((a, b) => a.today - b.today);
    if (sort === "desc") list.sort((a, b) => b.today - a.today);

    if (list.length === 0) {
        return (
            <div className="bg-base-100 border border-base-300 rounded-2xl p-10 text-center space-y-3">
                <p className="text-5xl">🔍</p>
                <h2 className="text-xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
                <Link href="/" className="btn btn-primary btn-sm sm:btn-md">হোম পেজে ফিরে যান</Link>
            </div>
        );
    }

    return (
        <>
            <div className="bg-base-100 border border-base-300 rounded-2xl p-3 sm:p-4 flex items-center justify-end gap-2 shadow-sm">
                <label htmlFor="sort" className="text-sm text-base-content/70">সাজান</label>
                <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="select select-sm select-bordered"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="asc">দাম: কম থেকে বেশি</option>
                    <option value="desc">দাম: বেশি থেকে কম</option>
                </select>
            </div>

            <p className="text-sm text-base-content/60">
                মোট {toBn(list.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
        </>
    );
}