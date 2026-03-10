"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * High-fidelity Recruiter Registration.
 * Focuses on LinkedIn verification and trust badges.
 */
export default function RecruiterSignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Set mock session cookie
    document.cookie = "skillsync_session=true; path=/; max-age=86400; SameSite=Lax";
    router.push("/");
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen font-display transition-colors">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-20 py-4 sticky top-0 z-50 transition-colors">
            <Link href="/" className="flex items-center gap-4 text-primary group">
              <div className="size-8">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                  <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">SkillSync</h2>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-slate-500 text-sm hidden md:block">Need help? Contact support</span>
              <Link href="/auth/signin" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]">
                Sign In
              </Link>
            </div>
          </header>

          <main className="flex-1 flex flex-col items-center py-12 px-4 transition-all">
            <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-5 gap-12">
              
              {/* Left Side: Form */}
              <div className="lg:col-span-3 flex flex-col gap-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex flex-col gap-2">
                  <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Register as a Recruiter</h1>
                  <p className="text-slate-600 dark:text-slate-400 text-base">Find and hire the top 1% of talent across the globe.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-8">
                  {/* LinkedIn Section */}
                  <section>
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">verified_user</span>
                      One-Click Verification
                    </h3>
                    <button className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-[#0A66C2] text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-[#0954a1] transition-all group active:scale-[0.98]">
                      <svg className="size-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <div className="flex flex-col items-start translate-y-[1px]">
                        <span className="text-sm text-white">Verify with LinkedIn</span>
                        <span className="text-[10px] opacity-80 -mt-1 font-medium italic text-white/90">Get your Recruiter Trust Badge instantly</span>
                      </div>
                      <span className="material-symbols-outlined ml-auto group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    <p className="mt-3 text-[11px] text-slate-400 text-center italic">Highly recommended for faster profile approval and better candidate response rates.</p>
                  </section>

                  <div className="relative flex items-center gap-4 py-2">
                    <div className="h-px bg-slate-200 dark:border-slate-800 flex-1"></div>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Or register manually</span>
                    <div className="h-px bg-slate-200 dark:border-slate-800 flex-1"></div>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                        <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-4 py-3 h-12 outline-none focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" placeholder="John Doe" type="text" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Work Email</label>
                        <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-4 py-3 h-12 outline-none focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" placeholder="john@company.com" type="email" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
                        <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-4 py-3 h-12 outline-none focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" placeholder="e.g. Acme Corp" type="text" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Designation</label>
                        <input className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-4 py-3 h-12 outline-none focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" placeholder="Technical Recruiter" type="text" required />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary cursor-pointer h-5 w-5" required />
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        I agree to the <Link href="#" className="text-primary hover:underline">Recruiter Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                      </p>
                    </div>
                    <button className="w-full px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-[0.98]" type="submit">
                      Create Recruiter Account
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Side: Perks Sidebar */}
              <div className="lg:col-span-2 flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col gap-8 shadow-xl shadow-slate-900/10">
                  <div className="space-y-4">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Recruiter Benefits</span>
                    <h3 className="text-2xl font-black tracking-tight">Elevate your hiring game</h3>
                    <p className="text-slate-400 text-sm italic">Join the most intelligent recruitment platform for elite IT and tech professionals.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary">verified</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold">Verified Trust Badge</p>
                        <p className="text-xs text-slate-500">Increase candidate response rates by up to 40% with a verified recruiter identity.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary">psychology</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold">Access to 1% Talent</p>
                        <p className="text-xs text-slate-500">Unlock a pre-vetted pool of top-tier candidates who only engage with verified recruiters.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary">bolt</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-bold">AI Recruitment Tools</p>
                        <p className="text-xs text-slate-500">Leverage advanced automation for scheduling, screening, and feedback management.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Platform Stats</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-lg font-bold">12k+</p>
                        <p className="text-[10px] text-slate-500 italic">Vetted Candidates</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">500+</p>
                        <p className="text-[10px] text-slate-500 italic">Fast-Growth Startups</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -right-12 -bottom-12 opacity-[0.03]">
                    <span className="material-symbols-outlined text-[200px]">support_agent</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">help</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Registration Help</h4>
                      <p className="text-[11px] text-slate-500">Response time: &lt; 2 hours</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    Facing issues with LinkedIn verification? Our support team is ready to help you complete your manual onboarding.
                  </p>
                  <button className="w-full py-2 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">Contact Support</button>
                </div>
              </div>

            </div>
          </main>

          <footer className="mt-auto px-6 md:px-20 py-8 border-t border-slate-200 dark:border-slate-800 transition-colors text-slate-500 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-8 font-medium">
              <Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link>
              <Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link>
              <Link className="hover:text-primary transition-colors" href="#">Cookie Policy</Link>
            </div>
            <p>© 2024 SkillSync Inc. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
