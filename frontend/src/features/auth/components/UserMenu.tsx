"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { logoutAction } from "../actions";

/**
 * A premium user menu dropdown with Profile and Logout options.
 * Appears when the user clicks on their avatar circle.
 */
export default function UserMenu({ 
    initials, 
    profileImage 
}: { 
    initials: string;
    profileImage?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Avatar Button (click to toggle dropdown) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="size-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer ring-2 ring-surface overflow-hidden"
            >
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                    initials
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-5 py-3 border-b border-border/40">
                        <p className="text-xs font-bold text-muted uppercase tracking-wider">Account</p>
                    </div>

                    {/* Edit Profile */}
                    <Link
                        href="/dashboard/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-5 py-4 text-sm font-bold text-text hover:bg-primary/5 hover:text-primary transition-all group"
                    >
                        <span className="material-symbols-outlined text-lg text-muted group-hover:text-primary transition-colors">person</span>
                        Edit Profile
                    </Link>

                    {/* Settings */}
                    <Link
                        href="/dashboard/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-5 py-4 text-sm font-bold text-text hover:bg-primary/5 hover:text-primary transition-all group"
                    >
                        <span className="material-symbols-outlined text-lg text-muted group-hover:text-primary transition-colors">settings</span>
                        Settings
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-border/40 mx-4"></div>

                    {/* Logout */}
                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-5 py-4 text-sm font-bold text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group w-full text-left"
                        >
                            <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">logout</span>
                            Logout
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
