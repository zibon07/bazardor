"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, updateUser } from "@/lib/auth-client";

function UpdateForm({ user }) {
    const router = useRouter();
    const [name, setName] = useState(user.name ?? "");
    const [image, setImage] = useState(user.image ?? "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function fail(msg) {
        setError(msg);
        toast.error(msg);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const cleanName = name.trim();
        const cleanImage = image.trim();

        if (cleanName.length < 2) return fail("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
        if (cleanImage && !/^https?:\/\/\S+$/.test(cleanImage)) return fail("ছবির লিংক http:// বা https:// দিয়ে শুরু হতে হবে");
        if (cleanName === user.name && cleanImage === (user.image ?? "")) return fail("কোনো পরিবর্তন করা হয়নি");

        setLoading(true);
        const payload = { name: cleanName };
        if (cleanImage) payload.image = cleanImage;
        const { error } = await updateUser(payload);
        setLoading(false);

        if (error) return fail(error.message || "তথ্য আপডেট করা যায়নি");

        toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
        router.push("/profile");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium">নাম</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" autoComplete="name" className="input input-bordered w-full bg-base-100 focus:border-primary focus:outline-primary" />
            </div>

            <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">ছবির লিংক <span className="text-base-content/50">(ঐচ্ছিক)</span></label>
                <input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/photo.jpg" className="input input-bordered w-full bg-base-100 focus:border-primary focus:outline-primary" />
                {image && /^https?:\/\/\S+$/.test(image.trim()) && (
                    <img src={image.trim()} alt="প্রিভিউ" referrerPolicy="no-referrer" className="size-16 rounded-full object-cover border border-base-300" />
                )}
            </div>

            <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">ইমেইল</label>
                <input id="email" value={user.email ?? ""} disabled className="input input-bordered w-full" />
                <p className="text-xs text-base-content/50">ইমেইল পরিবর্তন করা যাবে না।</p>
            </div>

            {error && <p role="alert" className="text-sm text-error bg-error/10 rounded-lg px-3 py-2">{error}</p>}

            <button type="submit" disabled={loading} className="btn btn-primary w-full shadow-md hover:shadow-lg transition">
                {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
            </button>
        </form>
    );
}

export default function UpdateProfilePage() {
    const { data: session, isPending } = useSession();

    return (
        <main className="max-w-md mx-auto px-4 py-10 fade-up">
            <div className="text-center mb-6 space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold">তথ্য আপডেট করুন</h1>
                <p className="text-sm text-base-content/60">আপনার প্রোফাইলের নাম ও ছবি বদলান।</p>
            </div>

            <div className="bg-base-100 border border-base-300 rounded-3xl shadow-sm p-5 sm:p-7">
                {isPending || !session ? (
                    <div className="space-y-4">
                        <div className="skeleton h-4 w-16" />
                        <div className="skeleton h-12 w-full" />
                        <div className="skeleton h-12 w-full" />
                    </div>
                ) : (
                    <UpdateForm user={session.user} />
                )}
            </div>

            <p className="text-center mt-5">
                <Link href="/profile" className="text-sm text-base-content/60 hover:text-primary transition">← প্রোফাইলে ফিরে যান</Link>
            </p>
        </main>
    );
}