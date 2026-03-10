"use client";

import React from "react";
import Link from "next/link";
import SigninForm from "@/features/auth/components/SigninForm";
import SocialLogin from "@/features/auth/components/SocialLogin";

/**
 * Candidate Sign In Page.
 * Featured on the main domain.
 */
export default function SigninPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-8">
        
        {/* Branding & Welcome */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-2xl group">
            <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">hub</span>
            <span>SkillSync</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Please enter your details to sign in.</p>
        </div>

        {/* Social Logins */}
        <SocialLogin />

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">or continue with</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Sign In Form */}
        <SigninForm role="Candidate" />

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary font-bold hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
