"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { companySignupAction } from "@/features/auth/actions";
import OTPVerification from "@/features/auth/components/OTPVerification";

export default function CompanySignupPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    role: "admin",
    email: "",
    password: "",
    password_confirm: ""
  });
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value as string);
    });

    startTransition(async () => {
      const res = await companySignupAction(null, formDataObj);
      if (res?.error) {
        setError(res.error);
      } else if (res?.requiresVerification) {
        setUserEmail(res.email);
        setRequiresVerification(true);
      } else if (res?.success) {
        router.push("/");
      }
    });
  };

  if (requiresVerification) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen font-display flex items-center justify-center p-6 transition-colors">
        <OTPVerification email={userEmail} />
      </div>
    );
  }

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
              <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">JobLyne</h2>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-slate-500 text-sm hidden md:block">Already have an account?</span>
              <Link href="/auth/signin" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]">
                Sign In
              </Link>
            </div>
          </header>

          <main className="flex-1 flex flex-col items-center py-10 px-4 transition-all lg:justify-center overflow-x-hidden">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Left Column (Info) */}
              <div className="flex flex-col gap-6 order-2 lg:order-1 self-center">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white" style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)' }}>
                    Register your company
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Join the network of professional organizations using JobLyne to find top talent effortlessly.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 relative overflow-hidden mt-6">
                  <div className="relative z-10">
                    <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Why JobLyne?</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-sm">groups</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">Access Top Talent</p>
                          <p className="text-sm text-slate-500 mt-1">10k+ pre-vetted skill-matched candidates ready to interview.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-sm">bolt</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">Faster Hiring</p>
                          <p className="text-sm text-slate-500 mt-1">Automate interview scheduling and candidate management.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-sm">shield</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">100% Tax Compliant</p>
                          <p className="text-sm text-slate-500 mt-1">Built-in employment compliance and payroll integrations.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="absolute -right-8 -bottom-8 opacity-[0.03] dark:opacity-[0.05]">
                    <span className="material-symbols-outlined text-[200px] text-slate-900 dark:text-white">corporate_fare</span>
                  </div>
                </div>
              </div>

              {/* Right Column (Form) */}
              <div className="order-1 lg:order-2">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none animate-in fade-in zoom-in-95 duration-500">
                  <form onSubmit={submitRegistration} className="space-y-6">
                    
                    {error && (
                      <div className="p-4 text-sm text-red-700 bg-red-50 rounded-lg dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50 flex items-start gap-3">
                        <span className="material-symbols-outlined shrink-0 text-red-500 mt-0.5 text-[20px]">error</span>
                        <span className="flex-1 font-medium">{error}</span>
                      </div>
                    )}

                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Organization Name *</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">corporate_fare</span>
                          <input 
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 font-medium" 
                            placeholder="e.g. Acme Corporation" 
                            type="text" 
                            required
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Work Email *</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                          <input 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 font-medium" 
                            placeholder="you@company.com" 
                            type="email" 
                            required 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password *</label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                            <input 
                              name="password" 
                              value={formData.password} 
                              onChange={handleInputChange} 
                              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 font-medium" 
                              placeholder="••••••••" 
                              type="password" 
                              minLength={8} 
                              required 
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Confirm Password *</label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                            <input 
                              name="password_confirm" 
                              value={formData.password_confirm} 
                              onChange={handleInputChange} 
                              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-400 font-medium" 
                              placeholder="••••••••" 
                              type="password" 
                              minLength={8} 
                              required 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3.5 rounded-xl bg-primary text-white text-base font-bold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
                      >
                        {isPending ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Creating account...
                          </span>
                        ) : (
                          <>
                            <span>Register Company</span>
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    <p className="text-center text-xs text-slate-500 font-medium pt-2">
                      By registering, you agree to our <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                    </p>
                  </form>
                </div>
              </div>

            </div>
          </main>
          
          {/* Footer */}
          <footer className="py-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-center items-center gap-4 text-slate-500 text-xs transition-colors bg-white dark:bg-slate-900 px-6 mt-auto">
            <p>© 2024 JobLyne Inc. All rights reserved.</p>
          </footer>

        </div>
      </div>
    </div>
  );
}
