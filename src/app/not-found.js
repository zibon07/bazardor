import Link from "next/link";

export const metadata = { title: "পেজ পাওয়া যায়নি | বাজার দর" };

export default function NotFound() {
    return (
        <main className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-base-100 border border-base-300 rounded-3xl shadow-sm p-8 sm:p-12 text-center space-y-4">
                <p className="text-6xl sm:text-7xl">🛒</p>
                <h1 className="text-5xl sm:text-6xl font-bold text-primary">৪০৪</h1>
                <h2 className="text-xl sm:text-2xl font-semibold">পেজটি খুঁজে পাওয়া যায়নি</h2>
                <p className="text-sm sm:text-base text-base-content/60 max-w-md mx-auto">
                    আপনি যে ঠিকানাটি খুঁজছেন সেটি হয়তো সরানো হয়েছে অথবা ঠিকানায় ভুল আছে।
                </p>
                <Link href="/" className="btn btn-primary btn-sm sm:btn-md">
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
}