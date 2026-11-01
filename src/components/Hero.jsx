import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    const today = new Date().toLocaleDateString("bn-BD", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
        timeZone: "Asia/Dhaka",
    });

    return (
        <section className="bg-base-100 border border-base-300 rounded-3xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-5 sm:p-8">
                <div className="space-y-4 text-center md:text-left">
                    <span className="inline-block bg-success/10 text-success text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                        {today}
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h1>
                    <p className="text-sm sm:text-base text-base-content/70 max-w-xl mx-auto md:mx-0">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <Link href="/" className="btn btn-primary btn-sm sm:btn-md">
                        সব পণ্য দেখুন
                    </Link>
                </div>

                <div className="flex justify-center md:justify-end">
                    <Image
                        src="/bazar-hero.png"
                        alt="সবজি ও ফলের ঝুড়ি"
                        width={420}
                        height={320}
                        priority
                        className="w-48 sm:w-64 md:w-full max-w-sm h-auto"
                    />
                </div>
            </div>
        </section>
    );
}