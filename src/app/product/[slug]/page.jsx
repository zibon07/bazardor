import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { fmtPrice, toBn, unitBn, unitLabel, changeInfo } from "@/lib/bn";
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await getProduct(slug);
    return { title: product ? `${product.nameBn} এর আজকের দাম` : "পণ্য পাওয়া যায়নি" };
}
const mid = (m) => (m.min + m.max) / 2;
const fmtAvg = (n) =>
    Number.isInteger(n)
        ? fmtPrice(n)
        : toBn(n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

export default async function ProductPage({ params }) {
    const { slug } = await params;

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect(`/sign-in?redirect=${encodeURIComponent(`/product/${slug}`)}`);

    const product = await getProduct(slug);
    if (!product) notFound();

    const { image, nameBn, categoryNameBn, category, unit, today, yesterday, change, markets } = product;
    const badge = changeInfo(change);

    const min = Math.min(...markets.map((m) => m.min));
    const max = Math.max(...markets.map((m) => m.max));
    const avg = Math.round(markets.reduce((s, m) => s + mid(m), 0) / markets.length);

    const cheapest = Math.min(...markets.map(mid));
    const dearest = Math.max(...markets.map(mid));

    const diff = today - yesterday;
    const diffText = diff === 0 ? "গতকালের মতোই আছে" : `গতকালের তুলনায় ${fmtPrice(Math.abs(diff))} টাকা ${diff > 0 ? "বেড়েছে" : "কমেছে"}`;

    const stats = [
        { label: "সর্বনিম্ন দাম", value: min, note: "সব বাজারের মধ্যে সর্বনিম্ন", cls: "text-success", bar: "bg-success" },
        { label: "সর্বোচ্চ দাম", value: max, note: "সব বাজারের মধ্যে সর্বোচ্চ", cls: "text-error", bar: "bg-error" },
        { label: "গড় দাম", value: avg, note: "বাজারগুলোর গড়", cls: "text-primary", bar: "bg-primary" },
    ];

    return (
        <main className="max-w-6xl mx-auto px-4 py-6 space-y-6 fade-up">
            {/* breadcrumb */}
            <nav className="text-sm text-base-content/60 flex flex-wrap items-center gap-1.5">
                <Link href="/" className="hover:text-primary transition">হোম</Link>
                <span>›</span>
                <Link href={`/category/${category}`} className="hover:text-primary transition">{categoryNameBn}</Link>
                <span>›</span>
                <span className="text-base-content font-medium">{nameBn}</span>
            </nav>

            {/* শিরোনামের কার্ড */}
            <section className="relative overflow-hidden bg-base-100 border border-base-300 rounded-3xl shadow-sm p-5 sm:p-7">
                <div className="absolute -top-16 -right-16 size-48 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                    <div className="flex items-center gap-4 min-w-0">
                        <span className="size-16 sm:size-20 shrink-0 rounded-2xl bg-base-200 grid place-items-center text-4xl sm:text-5xl">{image}</span>
                        <div className="min-w-0 space-y-1.5">
                            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{nameBn}</h1>
                            <p className="text-sm text-base-content/60">{unitBn(unit)} · {categoryNameBn}</p>
                            <p className="text-xs sm:text-sm text-base-content/60">{toBn(markets.length)}টি বাজারের তথ্য · {diffText}</p>
                        </div>
                    </div>

                    <div className="shrink-0 rounded-2xl bg-base-200 px-6 py-4 text-center sm:min-w-40">
                        <p className="text-xs text-base-content/60">আজকের দাম</p>
                        <p className="text-3xl sm:text-4xl font-bold text-primary mt-1">{fmtPrice(today)}</p>
                        <p className="text-xs text-base-content/60">টাকা / {unitLabel(unit)}</p>
                        <span className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full ${badge.cls}`}>{badge.text}</span>
                    </div>
                </div>
            </section>

            {/* সারসংক্ষেপ */}
            <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold">দামের সারসংক্ষেপ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {stats.map((s) => (
                        <div key={s.label} className="group relative overflow-hidden bg-base-100 border border-base-300 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
                            <span className={`absolute left-0 top-0 h-full w-1 ${s.bar}`} />
                            <p className="text-xs text-base-content/60">{s.label}</p>
                            <p className={`text-2xl sm:text-3xl font-bold mt-1 ${s.cls}`}>
                                {fmtPrice(s.value)} <span className="text-sm font-medium">টাকা</span>
                            </p>
                            <p className="text-xs text-base-content/50 mt-1">{s.note}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* বাজারভিত্তিক টেবিল */}
            <section className="space-y-3">
                <h2 className="text-lg sm:text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
                <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[620px] text-sm">
                            <thead>
                                <tr className="bg-base-200/70 text-base-content/60 text-xs">
                                    <th className="text-left font-medium px-4 py-3">বাজার</th>
                                    <th className="text-left font-medium px-4 py-3">বিভাগ</th>
                                    <th className="text-right font-medium px-4 py-3">সর্বনিম্ন</th>
                                    <th className="text-right font-medium px-4 py-3">সর্বোচ্চ</th>
                                    <th className="text-right font-medium px-4 py-3">গড়</th>
                                </tr>
                            </thead>
                            <tbody>
                                {markets.map((m, i) => {
                                    const a = mid(m);
                                    return (
                                        <tr key={m.market} className={`border-t border-base-300 hover:bg-primary/5 transition ${i % 2 ? "bg-base-200/40" : ""}`}>
                                            <td className="px-4 py-3 font-medium">
                                                <span className="mr-2">{m.market}</span>
                                                {a === cheapest && <span className="text-[11px] bg-success/10 text-success px-2 py-0.5 rounded-full whitespace-nowrap">সবচেয়ে কম</span>}
                                                {a === dearest && <span className="text-[11px] bg-error/10 text-error px-2 py-0.5 rounded-full whitespace-nowrap">সবচেয়ে বেশি</span>}
                                            </td>
                                            <td className="px-4 py-3 text-base-content/70">{m.division}</td>
                                            <td className="px-4 py-3 text-right text-success">{fmtPrice(m.min)} টাকা</td>
                                            <td className="px-4 py-3 text-right text-error">{fmtPrice(m.max)} টাকা</td>
                                            <td className="px-4 py-3 text-right font-bold">{fmtAvg(a)} টাকা</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-xs text-base-content/50">বাজারের গড় = (সর্বনিম্ন + সর্বোচ্চ) ÷ ২। ছোট স্ক্রিনে টেবিল ডানে-বাঁয়ে সরিয়ে দেখুন।</p>
            </section>
        </main>
    );
}