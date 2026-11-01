import Link from "next/link";
import CategoryLink from "./CategoryLink";
import { getCategories } from "@/lib/api";
import AuthButtons from "./AuthButtons";



const Navbar = async () => {
    const categories = await getCategories();

    const today = new Date().toLocaleDateString("bn-BD", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
        timeZone: "Asia/Dhaka",
    });

    return (
        <header className="bg-base-100 border-b  border-base-300 sticky top-0 z-50 ">
            <div className="max-w-6xl flex flex-col  items-center mx-auto px-4">
                {/* সারি ১: লোগো + auth */}
                <div className="navbar px-0 py-2 min-h-0">
                    <div className="navbar-start">
                        <div className="dropdown lg:hidden">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                                <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow">
                                {categories.map((c) => (
                                    <li key={c.slug}>
                                        <CategoryLink category={c} variant="mobile" />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link href="/" className="flex items-center gap-2">
                            <span className="bg-primary text-success-content rounded-lg size-9 grid place-items-center">🛒</span>
                            <span className="flex flex-col leading-tight">
                                <span className="font-bold text-lg">বাজার দর</span>
                                <span className="text-xs text-base-content/60" suppressHydrationWarning>{today}</span>
                            </span>
                        </Link>
                    </div>

                    <div className="navbar-end gap-2">
                        <AuthButtons />
                    </div>
                </div>

                {/* সারি ২: category links (desktop) */}
                <nav className="hidden lg:flex gap-1 pb-2">
                    {categories.map((c) => (
                        <CategoryLink key={c.slug} category={c} />
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;