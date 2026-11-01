import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, বাজারভিত্তিক বিস্তারিত ও দামের পরিবর্তন।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}

    >

      <body className="bg-base-200 text-base-content min-h-screen">
        <ToastProvider />
        <Navbar />
        <Ticker></Ticker>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
