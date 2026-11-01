"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import PasswordInput from "@/components/PasswordInput";
import SocialButtons from "@/components/SocialButtons";

const LEVELS = [
    { label: "", cls: "bg-base-300" },
    { label: "দুর্বল", cls: "bg-error" },
    { label: "মাঝারি", cls: "bg-warning" },
    { label: "ভালো", cls: "bg-info" },
    { label: "শক্তিশালী", cls: "bg-success" },
];

function strength(p) {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
}

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const score = strength(password);
    const level = LEVELS[score];

    function fail(msg) {
        setError(msg);
        toast.error(msg);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!name.trim()) return fail("আপনার নাম লিখুন");
        if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
        if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
        if (password !== confirm) return fail("দুই পাসওয়ার্ড মিলছে না");

        setLoading(true);
        const { error } = await signUp.email({ name: name.trim(), email, password });
        setLoading(false);

        if (error) return fail(error.message || "রেজিস্ট্রেশন সফল হয়নি");

        toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
        router.push("/sign-in");
    }

    return (
        <main className="max-w-md mx-auto px-4 py-10 fade-up">
            <div className="text-center mb-6 space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-sm text-base-content/60">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            </div>

            <div className="bg-base-100 border border-base-300 rounded-3xl shadow-sm p-5 sm:p-7 space-y-5">
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="space-y-1">
                        <label htmlFor="name" className="text-sm font-medium">নাম</label>
                        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="যেমন: রমিম উদ্দিন" autoComplete="name" className="input input-bordered w-full bg-base-100 focus:border-primary focus:outline-primary" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-medium">ইমেইল</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className="input input-bordered w-full bg-base-100 focus:border-primary focus:outline-primary" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">পাসওয়ার্ড</label>
                        <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" />
                        {password && (
                            <div className="space-y-1">
                                <div className="grid grid-cols-4 gap-1">
                                    {[0, 1, 2, 3].map((i) => (
                                        <span key={i} className={`h-1.5 rounded-full transition-colors ${i < score ? level.cls : "bg-base-300"}`} />
                                    ))}
                                </div>
                                <p className="text-xs text-base-content/60">শক্তি: {level.label}</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="confirm" className="text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</label>
                        <PasswordInput id="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="আবার লিখুন" autoComplete="new-password" />
                        {confirm && (
                            <p className={`text-xs ${confirm === password ? "text-success" : "text-error"}`}>
                                {confirm === password ? "✓ পাসওয়ার্ড মিলেছে" : "পাসওয়ার্ড মিলছে না"}
                            </p>
                        )}
                    </div>

                    {error && <p role="alert" className="text-sm text-error bg-error/10 rounded-lg px-3 py-2">{error}</p>}

                    <button type="submit" disabled={loading} className="btn btn-primary w-full shadow-md hover:shadow-lg transition">
                        {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
                    </button>
                </form>

                <div className="divider text-xs text-base-content/50 my-0">অথবা</div>

                <SocialButtons />

                <p className="text-center text-sm">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link href="/sign-in" className="link link-primary font-medium">সাইন ইন করুন</Link>
                </p>
            </div>

            <p className="text-center mt-5">
                <Link href="/" className="text-sm text-base-content/60 hover:text-primary transition">← হোম পেজে ফিরে যান</Link>
            </p>
        </main>
    );
}