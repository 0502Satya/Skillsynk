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
        <div className="bg-error/10 text-error p-3 rounded-lg text-sm mb-4 border border-error/20">
          {state.error}
        </div>
      )}
      
      {/* Input for Email Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text" htmlFor="email">
          Email Address
        </label>
        <div className="relative text-text">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted">mail</span>
          <input 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input-border bg-input-bg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted" 
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
          <label className="block text-sm font-medium text-text" htmlFor="password">
            Password
          </label>
          <Link className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors" href="#">
            Forgot Password?
          </Link>
        </div>
        <div className="relative text-text">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted">lock</span>
          <input 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input-border bg-input-bg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted" 
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
          className="w-4 h-4 rounded border-input-border text-primary focus:ring-primary cursor-pointer disabled:opacity-50" 
          id="remember" 
          type="checkbox"
          name="remember"
          disabled={isPending}
        />
        <label className="ml-2 text-sm text-muted cursor-pointer select-none" htmlFor="remember">
          Remember me for 30 days
        </label>
      </div>

      {/* The main blue button to sign in */}
      <button 
        className="flex justify-center items-center w-full bg-btn-primary hover:bg-btn-primary-hover text-surface font-bold py-3.5 px-4 rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed" 
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
