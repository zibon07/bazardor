"use client";
import { useState } from "react";

export default function PasswordInput({ id, name, value, onChange, placeholder, autoComplete }) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <input id={id} name={name} type={show ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} className="input input-bordered w-full pr-12 bg-base-100 focus:border-primary focus:outline-primary" />
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"} className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle">
                {show ? "🙈" : "👁️"}
            </button>
        </div>
    );
}