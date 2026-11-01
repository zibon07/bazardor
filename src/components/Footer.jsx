import Link from "next/link";
import { getCategories } from "@/lib/api";
import { toBn } from "@/lib/bn";

export default async function Footer() {
    const categories = await getCategories();
    const year = toBn(new Date().getFullYear());

    return (
        <footer className="mt-16 bg-base-100 border-t border-base-300">
            {/* <div className="h-1 bg-gradient-to-r from-primary via-success to-primary" /> */}

            <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <span className="bg-primary text-primary-content rounded-lg size-9 grid place-items-center">🛒</span>
                            <span className="font-bold text-lg">বাজার দর</span>
                        </Link>
                        <p className="text-sm text-base-content/70">
                            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                        </p>
                    </div>

                    <div className="md:text-right space-y-3">
                        <h3 className="text-sm font-semibold text-base-content/60">জনপ্রিয় বিভাগ</h3>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                            {categories.map((c) => (
                                <Link
                                    key={c.slug}
                                    href={`/category/${c.slug}`}
                                    className="badge badge-lg badge-outline hover:badge-primary transition"
                                >
                                    {c.icon} {c.nameBn}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-base-300 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs sm:text-sm text-base-content/60">
                    <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                        <span>© {year} বাজার দর</span>
                        <a href="#top" className="btn btn-ghost btn-xs">↑ ওপরে যান</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}