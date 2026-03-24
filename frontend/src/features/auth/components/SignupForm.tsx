"use client";

import React, { useActionState } from "react";
import { signupAction } from "@/features/auth/actions";
import Link from "next/link";
import OTPVerification from "./OTPVerification";

/**
 * Re-implemented SignupForm for restoration.
 * Simple and clean interface for new user registration wired to Django backend via Server Actions.
 */
export default function SignupForm({ role = "Candidate" }: { role?: string }) {
  // React 19 hook for Server Actions
  const [state, formAction, isPending] = useActionState(signupAction, null);

  if (state?.requiresVerification) {
    return <OTPVerification email={state.email} />;
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Hidden input to pass the role to the backend */}
      <input type="hidden" name="role" value={role} />

      {/* Render Server Errors */}
      {state?.error && (
        <div className="bg-error/10 text-error p-3 rounded-lg text-sm mb-4 border border-error/20">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Input for First Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text" htmlFor="firstName">
            First Name
          </label>
          <input 
            className="w-full px-4 py-3 rounded-lg border border-input-border bg-input-bg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted text-text" 
            id="firstName" 
            name="first_name"
            placeholder="John" 
            type="text"
            required
            disabled={isPending}
          />
        </div>
        {/* Input for Last Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text" htmlFor="lastName">
            Last Name
          </label>
          <input 
            className="w-full px-4 py-3 rounded-lg border border-input-border bg-input-bg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted text-text" 
            id="lastName" 
            name="last_name"
            placeholder="Doe" 
            type="text"
            required
            disabled={isPending}
          />
        </div>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Input for Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text" htmlFor="password">
            Password
          </label>
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

        {/* Input for Password Confirm */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text" htmlFor="password_confirm">
            Confirm
          </label>
          <div className="relative text-slate-900 dark:text-white">
             <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock_reset</span>
            <input 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
              id="password_confirm"
              name="password_confirm"
              placeholder="••••••••" 
              type="password"
              required
              disabled={isPending}
            />
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button 
        className="flex justify-center items-center w-full bg-btn-primary hover:bg-btn-primary-hover text-surface font-bold py-3.5 px-4 rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed" 
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
        ) : null}
        {isPending ? "Creating Account..." : `Create ${role} Account`}
      </button>
    </form>
  );
}
