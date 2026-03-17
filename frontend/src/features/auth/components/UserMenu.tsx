"use client";

import React from "react";
import { logoutAction } from "../actions";

/**
 * A shared user menu component that provides logout functionality.
 * Can be expanded to include other user-specific actions.
 */
export default function UserMenu({ initials }: { initials: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pr-2 border-r border-slate-200 dark:border-slate-800 hidden sm:flex">
                <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                    {initials}
                </div>
            </div>
            
            <form action={logoutAction}>
                <button 
                    type="submit" 
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all group"
                >
                    <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">logout</span>
                    <span>Logout</span>
                </button>
            </form>
        </div>
    );
}
