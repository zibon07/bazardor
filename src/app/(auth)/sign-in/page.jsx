"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import PasswordInput from "@/components/PasswordInput";
import SocialButtons from "@/components/SocialButtons";


function getRedirect() {
    const to = new URLSearchParams(window.location.search).get("redirect");
    return to && to.startsWith("/") && !to.startsWith("//") ? to : "/";
}

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (getRedirect() !== "/") {
            toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "need-login" });
        }
    }, []);

    function fail(msg) {
        setError(msg);
        toast.error(msg);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
        if (!password) return fail("পাসওয়ার্ড লিখুন");

        setLoading(true);
        const { error } = await signIn.email({ email, password });
        setLoading(false);

        if (error) {
            if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
                return fail("ইমেইল বা পাসওয়ার্ড ভুল");
            }
            return fail("সাইন ইন করা যায়নি, আবার চেষ্টা করুন");
        }

        toast.success("সাইন ইন সফল হয়েছে! স্বাগতম 🎉");
        router.push(getRedirect());
        router.refresh();
    }

    return (
        <main className="max-w-md mx-auto px-4 py-10 fade-up">
            <div className="text-center mb-6 space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold">আবার স্বাগতম</h1>
                <p className="text-sm text-base-content/60">আপনার অ্যাকাউন্টে সাইন ইন করুন।</p>
            </div>

            <div className="bg-base-100 border border-base-300 rounded-3xl shadow-sm p-5 sm:p-7 space-y-5">
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-sm font-medium">ইমেইল</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className="input input-bordered w-full bg-base-100 focus:border-primary focus:outline-primary" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="password" className="text-sm font-medium">পাসওয়ার্ড</label>
                        <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="আপনার পাসওয়ার্ড" autoComplete="current-password" />
                    </div>

                    {error && <p role="alert" className="text-sm text-error bg-error/10 rounded-lg px-3 py-2">{error}</p>}

                    <button type="submit" disabled={loading} className="btn btn-primary w-full shadow-md hover:shadow-lg transition">
                        {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন করুন"}
                    </button>
                </form>

                <div className="divider text-xs text-base-content/50 my-0">অথবা</div>

                <SocialButtons />

                <p className="text-center text-sm">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/sign-up" className="link link-primary font-medium">সাইন আপ করুন</Link>
                </p>
            </div>

            <p className="text-center mt-5">
                <Link href="/" className="text-sm text-base-content/60 hover:text-primary transition">← হোম পেজে ফিরে যান</Link>
            </p>
        </main>
    );
}