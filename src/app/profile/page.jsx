import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default async function ProfilePage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/sign-in?redirect=/profile");

    const { name, email, image, createdAt } = session.user;
    const joined = new Date(createdAt).toLocaleDateString("bn-BD", {
        day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka",
    });

    return (
        <main className="max-w-2xl mx-auto px-4 py-8 space-y-5 fade-up">
            <section className="relative overflow-hidden bg-base-100 border border-base-300 rounded-3xl shadow-sm">
                <div className="h-24 sm:h-28 bg-gradient-to-r from-primary to-success" />

                <div className="px-5 sm:px-8 pb-7">
                    <div className="-mt-12 flex items-end justify-between gap-3">
                        {image ? (
                            <img src={image} alt={name} className="size-24 rounded-full object-cover border-4 border-base-100 shadow" />
                        ) : (
                            <span className="size-24 rounded-full bg-primary text-primary-content grid place-items-center text-4xl font-bold border-4 border-base-100 shadow">
                                {name?.charAt(0).toUpperCase()}
                            </span>
                        )}
                        <Link href="/profile/update" className="btn btn-primary btn-sm sm:btn-md">✏️ তথ্য আপডেট করুন</Link>
                    </div>

                    <div className="mt-4 space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
                        <p className="text-sm text-base-content/60">{email}</p>
                    </div>

                    <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-base-200 p-4">
                            <dt className="text-xs text-base-content/60">নাম</dt>
                            <dd className="font-semibold mt-1 break-words">{name}</dd>
                        </div>
                        <div className="rounded-2xl bg-base-200 p-4">
                            <dt className="text-xs text-base-content/60">ইমেইল</dt>
                            <dd className="font-semibold mt-1 break-all">{email}</dd>
                        </div>
                        <div className="rounded-2xl bg-base-200 p-4 sm:col-span-2">
                            <dt className="text-xs text-base-content/60">যোগ দিয়েছেন</dt>
                            <dd className="font-semibold mt-1">{joined}</dd>
                        </div>
                    </dl>
                </div>
            </section>

            <p className="text-center">
                <Link href="/" className="text-sm text-base-content/60 hover:text-primary transition">← হোম পেজে ফিরে যান</Link>
            </p>
        </main>
    );
}