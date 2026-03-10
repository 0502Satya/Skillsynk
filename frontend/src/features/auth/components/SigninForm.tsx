"use client";

import React from "react";
import Link from "next/link";

/**
 * Re-implemented SigninForm for restoration.
 * Handles mock login with a session cookie for easy testing.
 */
export default function SigninForm({ role = "Candidate" }: { role?: string }) {
  // Mock login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Set a mock session cookie (lasts 1 day)
    document.cookie = "skillsync_session=true; path=/; max-age=86400; SameSite=Lax";
    // Redirect to the home of the current subdomain (which is the dashboard)
    window.location.href = "/";
  };

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      {/* Input for Email Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
          Email Address
        </label>
        <div className="relative text-slate-900 dark:text-white">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
          <input 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
            id="email" 
            placeholder="name@example.com" 
            type="email"
            required
          />
        </div>
      </div>

      {/* Input for Password */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
            Password
          </label>
          <Link className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors" href="#">
            Forgot Password?
          </Link>
        </div>
        <div className="relative text-slate-900 dark:text-white">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
          <input 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
            id="password" 
            placeholder="••••••••" 
            type="password"
            required
          />
        </div>
      </div>

      {/* Checkbox to stay logged in */}
      <div className="flex items-center">
        <input 
          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" 
          id="remember" 
          type="checkbox"
        />
        <label className="ml-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none" htmlFor="remember">
          Remember me for 30 days
        </label>
      </div>

      {/* The main blue button to sign in */}
      <button 
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98]" 
        type="submit"
      >
        Sign In as {role}
      </button>
    </form>
  );
}
