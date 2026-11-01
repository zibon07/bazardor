"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function SocialButtons() {
  const [busy, setBusy] = useState("");

  async function go(provider) {
    setBusy(provider);
    const { error } = await signIn.social({ provider, callbackURL: "/" });
    if (error) {
      toast.error(error.message || "লগইন করা যায়নি, আবার চেষ্টা করুন");
      setBusy("");
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button type="button" onClick={() => go("google")} disabled={!!busy} className="btn btn-outline bg-base-100 hover:bg-base-200 hover:text-base-content gap-2">
        {busy === "google" ? <span className="loading loading-spinner loading-sm" /> : (
          <svg viewBox="0 0 48 48" className="size-5">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
            <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z" />
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
          </svg>
        )}
        Google দিয়ে চালিয়ে যান
      </button>

      <button type="button" onClick={() => go("github")} disabled={!!busy} className="btn btn-outline bg-base-100 hover:bg-base-200 hover:text-base-content gap-2">
        {busy === "github" ? <span className="loading loading-spinner loading-sm" /> : (
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-5">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        )}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}