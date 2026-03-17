"use client";

import React, { useActionState } from "react";
import { loginAction } from "@/features/auth/actions";
import Link from "next/link";

/**
 * Re-implemented SigninForm for restoration.
 * Wired to Django backend via Next.js Server Actions for secure HttpOnly cookie management.
 */
export default function SigninForm({ role = "Candidate" }: { role?: string }) {
  // React 19 hook for Server Actions
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="space-y-5">
      {/* Render Server Errors */}
      {state?.error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-4 border border-red-200 dark:border-red-800">
          {state.error}
        </div>
      )}
      
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
            name="email"
            placeholder="name@example.com" 
            type="email"
            required
            disabled={isPending}
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
            name="password"
            placeholder="••••••••" 
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </div>

      {/* Checkbox to stay logged in */}
      <div className="flex items-center">
        <input 
          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer disabled:opacity-50" 
          id="remember" 
          type="checkbox"
          name="remember"
          disabled={isPending}
        />
        <label className="ml-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none" htmlFor="remember">
          Remember me for 30 days
        </label>
      </div>

      {/* The main blue button to sign in */}
      <button 
        className="flex justify-center items-center w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed" 
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
        ) : null}
        {isPending ? "Signing In..." : `Sign In as ${role}`}
      </button>
    </form>
  );
}
