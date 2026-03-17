"use client";

import React from "react";
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
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Jobs</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Courses</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Recruiters</Link>
                        <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Institutes</Link>
                    </nav>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    
                    {/* Search button */}
                    <button className="hidden sm:flex items-center text-slate-500 hover:text-primary p-2 transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </button>

                    {/* Authentication Section */}
                    <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4 ml-2">
                        <AuthActions />
                        
                        <div className="h-6 w-px bg-slate-200 dark:border-slate-800 mx-2 hidden lg:block"></div>
                        
                        {/* Employer Dropdown */}
                        <EmployerDropdown />
                    </div>
                </div>
            </div>
        </header>
    );
}

/**
 * Split Login/Register or Dashboard button.
 */
function AuthActions() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        // Check for session cookie manually for now
        // This non-HttpOnly cookie is set by auth actions for UI detection
        const hasSession = document.cookie.includes('skillsync_session=true');
        setIsLoggedIn(hasSession);
    }, []);

    if (isLoggedIn) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-sm font-bold px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 rounded-full shadow-sm transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">dashboard</span>
                    Dashboard
                </Link>
                <form action={async () => {
                    const { logoutAction } = await import("@/features/auth/actions");
                    await logoutAction();
                }}>
                    <button type="submit" className="text-sm font-bold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg">logout</span>
                        <span className="hidden lg:inline">Logout</span>
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Link 
                href="/auth/signin" 
                className="text-sm font-bold px-5 py-2 border-2 border-primary text-primary hover:bg-primary/5 rounded-full transition-all"
            >
                Login
            </Link>
            <Link 
                href="/auth/signup" 
                className="text-sm font-bold px-5 py-2 bg-[#ff5a3d] text-white hover:opacity-90 rounded-full shadow-md shadow-orange-500/20 transition-all border-2 border-[#ff5a3d]"
            >
                Register
            </Link>
        </div>
    );
}

/**
 * Dropdown for recruiter and company portals.
 */
function EmployerDropdown() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors py-2 group">
                For employers
                <span className={`material-symbols-outlined text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full pt-2 w-56 animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 overflow-hidden">
                        <Link 
                            href="http://recruiter.localhost:3000/auth/signin"
                            className="flex flex-col gap-0.5 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                        >
                            <span className="text-sm font-bold group-hover:text-primary transition-colors">Recruiter Portal</span>
                            <span className="text-[10px] text-slate-500">Find and vet top talent quickly.</span>
                        </Link>
                        <Link 
                            href="http://company.localhost:3000/auth/signin"
                            className="flex flex-col gap-0.5 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group border-t border-slate-100 dark:border-slate-800/50"
                        >
                            <span className="text-sm font-bold group-hover:text-primary transition-colors">Company Login</span>
                            <span className="text-[10px] text-slate-500">Manage your organization's hiring.</span>
                        </Link>

                    </div>
                </div>
            )}
        </div>
    );
}
