import { getProducts } from "@/lib/api";
import { fmtPrice, unitLabel, changeInfo } from "@/lib/bn";

export default async function Ticker() {
    const products = await getProducts();
    if (!products.length) return null;

    const items = [...products, ...products];

    return (
        <div className="marquee overflow-hidden bg-base-100 border-b border-base-300 py-2 text-sm">
            <div className="marquee-track">
                {items.map((p, i) => {
                    const badge = changeInfo(p.change);
                    return (
                        <div
                            key={`${p.id}-${i}`}
                            aria-hidden={i >= products.length}
                            className="flex items-center gap-2 px-5 whitespace-nowrap"
                        >
                            <span>{p.image}</span>
                            <span className="font-medium">{p.nameBn}</span>
                            <span className="text-base-content/70">
                                {fmtPrice(p.today)} টাকা/{unitLabel(p.unit)}
                            </span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge.cls}`}>
                                {badge.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}