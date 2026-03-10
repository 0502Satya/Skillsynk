"use client";
import Link from "next/link";
import SignupForm from "@/features/auth/components/SignupForm";

/**
 * Candidate Sign Up Page.
 * Featured on the main domain. Includes role selection.
 */
export default function SignupPage() {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-8">
        
        {/* Branding & Welcome */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold text-2xl group">
            <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">hub</span>
            <span>SkillSync</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Create an account</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Join the network of top talent and top companies.</p>
        </div>

        {/* Details Form directly */}
        <SignupForm role="Candidate" />

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
