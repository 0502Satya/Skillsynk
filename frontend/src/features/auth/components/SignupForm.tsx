"use client";

import React from "react";

/**
 * Re-implemented SignupForm for restoration.
 * Simple and clean interface for new user registration.
 */
export default function SignupForm({ role = "Candidate" }: { role?: string }) {
  return (
    <form action="#" className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-2 gap-4">
        {/* Input for First Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="firstName">
            First Name
          </label>
          <input 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
            id="firstName" 
            placeholder="John" 
            type="text"
            required
          />
        </div>
        {/* Input for Last Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="lastName">
            Last Name
          </label>
          <input 
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
            id="lastName" 
            placeholder="Doe" 
            type="text"
            required
          />
        </div>
      </div>

      {/* Input for Email Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
          Email Address
        </label>
        <input 
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
          id="email" 
          placeholder="name@example.com" 
          type="email"
          required
        />
      </div>

      {/* Input for Password */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
          Password
        </label>
        <input 
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
          id="password" 
          placeholder="••••••••" 
          type="password"
          required
        />
      </div>

      {/* Continue Button */}
      <button 
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-[0.98]" 
        type="submit"
      >
        Create {role} Account
      </button>
    </form>
  );
}
