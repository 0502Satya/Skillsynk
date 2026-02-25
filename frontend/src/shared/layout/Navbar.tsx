import Link from "next/link";
import { Button } from "@/shared/ui";
import ThemeToggle from "@/shared/ui/ThemeToggle";

/**
 * The navigation bar at the top of the page.
 * It stays at the top when you scroll (sticky).
 * It has the logo, links, and buttons like 'Log in' and 'Get Started'.
 */
export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md transition-colors">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                {/* Left side: Logo and main links */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-1.5 bg-primary rounded-lg text-white">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SkillSync</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Candidates</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Companies</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Recruiters</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Institutes</Link>
                    </nav>
                </div>

                {/* Right side: Search, Theme switch, and Login buttons */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {/* Search button for big screens */}
                    <button className="hidden lg:flex items-center text-slate-500 hover:text-primary px-3 py-2">
                        <span className="material-symbols-outlined">search</span>
                    </button>

                    {/* 'Post a Job' button for tablets and bigger screens */}
                    <Link
                        href="#"
                        className="hidden sm:block text-sm font-semibold px-4 py-2 text-primary border border-primary hover:bg-primary/5 rounded-lg transition-colors mr-2"
                    >
                        Post a Job
                    </Link>

                    <button className="text-sm font-semibold px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                        Log in
                    </button>

                    <button className="text-sm font-semibold px-5 py-2.5 bg-primary text-white hover:bg-primary/90 rounded-lg shadow-sm">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}
