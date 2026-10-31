import Link from "next/link";
import { fmtPrice, unitBn, changeInfo } from "@/lib/bn";

export default function ProductCard({ product }) {
    const { slug, image, nameBn, unit, today, change } = product;
    const badge = changeInfo(change);

    return (
        <Link
            href={`/product/${slug}`}
            className="group block bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/40 transition"
        >
            <div className="flex items-center gap-3">
                <span className="size-12 shrink-0 rounded-xl bg-base-200 grid place-items-center text-2xl group-hover:scale-110 transition">
                    {image}
                </span>
                <div className="min-w-0">
                    <h3 className="font-semibold leading-tight truncate">{nameBn}</h3>
                    <p className="text-xs text-base-content/60">{unitBn(unit)}</p>
                </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <p className="text-xs text-base-content/60">আজকের দাম</p>
                    <p className="font-bold text-xl">{fmtPrice(today)} টাকা</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${badge.cls}`}>
                    {badge.text}
                </span>
            </div>
        </Link>
    );
}