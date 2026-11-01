"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";

export default function AuthButtons() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div className="skeleton h-9 w-28 rounded-full" />;
    }

    if (!session) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/sign-in" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
                <Link href="/sign-up" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
            </div>
        );
    }

    const { name, email, image } = session.user;


    async function handleSignOut() {
        const { error } = await signOut();
        if (error) return toast.error("সাইন আউট করা যায়নি");
        toast.success("সাইন আউট সফল হয়েছে");
        router.push("/");
        router.refresh();
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-base-200 transition cursor-pointer">
                {image ? (
                    <Image src={image} width={20} height={20} alt={name} className="size-9 rounded-full object-cover" />
                ) : (
                    <span className="size-9 rounded-full bg-primary text-primary-content grid place-items-center font-bold">
                        {name?.charAt(0).toUpperCase()}
                    </span>
                )}
                <span className="hidden sm:block text-sm font-medium max-w-28 truncate">{name}</span>
                <span className="text-xs text-base-content/50">▾</span>
            </div>

            <div tabIndex={0} className="dropdown-content z-50 mt-2 w-64 rounded-2xl bg-base-100 border border-base-300 shadow-lg p-4 space-y-3">
                <div className="min-w-0">
                    <p className="font-semibold truncate">{name}</p>
                    <p className="text-xs text-base-content/60 truncate">{email}</p>
                </div>

                <div className="border-t border-base-300 pt-2 space-y-1">
                    <Link href="/profile" onClick={() => document.activeElement?.blur()} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-base-200 transition">
                        👤 আমার প্রোফাইল
                    </Link>
                    <button type="button" onClick={handleSignOut} className="w-full flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-error hover:bg-error/10 transition">
                        ↩ সাইন আউট
                    </button>
                </div>
            </div>
        </div>
    );
}