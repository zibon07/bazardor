import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      <Hero />
      {/* ...risers, fallers... */}
      <section id="সব-পণ্য" className="scroll-mt-32">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
      </section>
    </main>
  );
}
