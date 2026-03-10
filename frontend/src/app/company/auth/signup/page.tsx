"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Multi-step Company Registration.
 * Reconstructed with high-fidelity "Page by Page" design.
 */
export default function CompanySignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    taxId: "",
    industry: "",
    companySize: "",
    website: "",
    role: "admin",
    logo: null
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else {
      document.cookie = "skillsync_session=true; path=/; max-age=86400; SameSite=Lax";
      router.push("/");
    }
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

          <main className="flex-1 flex flex-col items-center py-10 px-4 transition-all">
            <div className="w-full max-w-[800px] flex flex-col gap-8">
              
              {/* Progress Bar & Title */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
                      {step === 1 && "Register your company"}
                      {step === 2 && "Company Verification"}
                      {step === 3 && "Invite your team"}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base mt-1">
                      {step === 1 && "Join the network of professional organizations on SkillSync."}
                      {step === 2 && "Submit documentation to verify your organization's identity."}
                      {step === 3 && "Invite your colleagues to start hiring together."}
                    </p>
                  </div>
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-slate-900 dark:text-white text-sm font-bold">Step {step} of 3</span>
                    <div className="w-32 h-2 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1: Organization Details */}
              {step === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <form onSubmit={nextStep} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">corporate_fare</span>
                          Organization Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
                            <input 
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 h-12 outline-none transition-all" 
                              placeholder="e.g. Acme Corporation" 
                              type="text" 
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CIN / GSTIN (Tax ID)</label>
                            <input 
                              name="taxId"
                              value={formData.taxId}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 h-12 outline-none transition-all" 
                              placeholder="Enter tax identification number" 
                              type="text" 
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Industry</label>
                            <select 
                              name="industry"
                              value={formData.industry}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 h-12 outline-none transition-all"
                              required
                            >
                              <option value="">Select Industry</option>
                              <option value="tech">Information Technology</option>
                              <option value="finance">Finance & Banking</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="education">Education</option>
                              <option value="manufacturing">Manufacturing</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Size</label>
                            <select 
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 h-12 outline-none transition-all"
                              required
                            >
                              <option value="">Select Size</option>
                              <option value="1-10">1-10 employees</option>
                              <option value="11-50">11-50 employees</option>
                              <option value="51-200">51-200 employees</option>
                              <option value="201-500">201-500 employees</option>
                              <option value="500+">500+ employees</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Website</label>
                            <div className="flex">
                              <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-500 text-sm">https://</span>
                              <input 
                                name="website"
                                value={formData.website}
                                onChange={handleInputChange}
                                className="w-full rounded-r-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 h-12 outline-none transition-all" 
                                placeholder="www.example.com" 
                                type="text" 
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary">person_search</span>
                          Your Role
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <label className="relative flex cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <input 
                              className="sr-only peer" 
                              name="role" 
                              type="radio" 
                              value="admin" 
                              checked={formData.role === "admin"}
                              onChange={handleInputChange}
                            />
                            <div className="peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20 absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent transition-all"></div>
                            <div className="flex items-center gap-4">
                              <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined">admin_panel_settings</span>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Company Admin</p>
                                <p className="text-xs text-slate-500">Manage all organization settings</p>
                              </div>
                            </div>
                          </label>
                          <label className="relative flex cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <input 
                              className="sr-only peer" 
                              name="role" 
                              type="radio" 
                              value="manager" 
                              checked={formData.role === "manager"}
                              onChange={handleInputChange}
                            />
                            <div className="peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20 absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent transition-all"></div>
                            <div className="flex items-center gap-4">
                              <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined">work_history</span>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Hiring Manager</p>
                                <p className="text-xs text-slate-500">Post jobs and manage candidates</p>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-4 pt-8">
                        <button className="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98]" type="button">
                          Save Draft
                        </button>
                        <button className="px-8 py-3 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]" type="submit">
                          Continue to Next Step
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">Company Logo</h4>
                      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/30 group cursor-pointer hover:border-primary transition-colors">
                        <div className="size-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                          <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500 group-hover:text-primary">upload_file</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white text-center">Click to upload</p>
                        <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG (max. 2MB)</p>
                      </div>
                      <div className="mt-4 flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <span className="material-symbols-outlined text-primary text-sm">info</span>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          Professional logos help candidates trust your organization profile more.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative">
                      <div className="relative z-10">
                        <h4 className="font-bold text-lg mb-2">Why SkillSync?</h4>
                        <ul className="space-y-4 mt-4">
                          <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span className="text-sm text-slate-300 italic">Access to 10k+ pre-vetted skill-matched candidates.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span className="text-sm text-slate-300 italic">Automated interview scheduling and management.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <span className="text-sm text-slate-300 italic">Built-in tax compliance and payroll integrations.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="absolute -right-4 -bottom-4 opacity-10">
                        <span className="material-symbols-outlined text-[120px]">handshake</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Shared Layout for Step 2 & 3 */}
              {(step === 2 || step === 3) && (
                <div className="flex w-full max-w-[1200px] gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Left Sidebar */}
                  <aside className="hidden lg:flex flex-col w-72 shrink-0 gap-8">
                    <div className="flex flex-col gap-6 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
                      <div className="flex gap-3 items-center">
                        <div className="bg-primary/10 rounded-full p-2">
                          <span className="material-symbols-outlined text-primary">corporate_fare</span>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">SkillSync</h1>
                          <p className="text-slate-500 dark:text-slate-400 text-xs font-normal">Registration Portal</p>
                        </div>
                      </div>
                      <nav className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-[20px]">info</span>
                          <p className="text-sm font-medium">Company Info</p>
                          <span className="material-symbols-outlined text-green-500 ml-auto text-sm">check_circle</span>
                        </div>
                        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${step === 2 ? "bg-primary/10 text-primary" : "text-slate-500 dark:text-slate-400"}`}>
                          <span className="material-symbols-outlined text-[20px]">verified</span>
                          <p className="text-sm font-semibold">Verification</p>
                          {step > 2 && <span className="material-symbols-outlined text-green-500 ml-auto text-sm">check_circle</span>}
                        </div>
                        <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${step === 3 ? "bg-primary/10 text-primary" : "text-slate-500 dark:text-slate-400"}`}>
                          <span className="material-symbols-outlined text-[20px]">group_add</span>
                          <p className="text-sm font-medium">Team Setup</p>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-[20px]">rate_review</span>
                          <p className="text-sm font-medium">Review</p>
                        </div>
                      </nav>
                    </div>
                    
                    <div className="flex flex-col gap-4 bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/10 transition-colors">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <span className="material-symbols-outlined">help</span>
                        <p className="text-sm">Why SkillSync?</p>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Join 5,000+ companies streamlining their workflow and finding top-tier talent with our verified marketplace.
                      </p>
                      <ul className="flex flex-col gap-2">
                        <li className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-[14px] text-primary">check</span> Verified Talent Pool
                        </li>
                        <li className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-[14px] text-primary">check</span> Secure Payments
                        </li>
                      </ul>
                    </div>
                  </aside>

                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                      
                      {/* Sub-Header for Step Content */}
                      <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-end mb-4">
                          <div className="flex flex-col gap-1">
                            <p className="text-primary font-semibold text-sm">Step {step} of 3</p>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                              {step === 2 ? "Verify your company" : "Invite your team"}
                            </h2>
                          </div>
                          <p className="text-slate-400 text-sm font-medium">{step === 2 ? "66%" : "100%"} Complete</p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-primary h-full transition-all duration-500" style={{ width: step === 2 ? "66%" : "100%" }}></div>
                        </div>
                      </div>

                      {/* Step 2 Content */}
                      {step === 2 && (
                        <div className="p-8 flex flex-col gap-8">
                          <section>
                            <div className="flex flex-col gap-2 mb-4">
                              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Business Documents</h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400">Please provide any one of the following: CIN, GSTIN, or Incorporation Certificate.</p>
                            </div>
                            <div className="group relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary rounded-xl p-10 bg-slate-50 dark:bg-slate-800/50 transition-all cursor-pointer">
                              <div className="flex flex-col items-center text-center gap-4">
                                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                  <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <p className="text-base font-semibold text-slate-900 dark:text-slate-100">Drag and drop documents here</p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">PDF, JPG, or PNG (Max 10MB)</p>
                                </div>
                                <button type="button" className="mt-2 px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                                  Browse Files
                                </button>
                              </div>
                            </div>
                          </section>
                          <div className="h-px bg-slate-100 dark:border-slate-800"></div>
                          <section>
                            <div className="flex flex-col gap-2 mb-4">
                              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Website Verification</h3>
                              <p className="text-sm text-slate-500 dark:text-slate-400">Verify your business domain by entering your professional work email.</p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                              <div className="flex-1 relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                                <input className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="e.g. alex@companyname.com" type="email" />
                              </div>
                              <button type="button" className="whitespace-nowrap px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2">
                                <span>Send Verification Code</span>
                                <span className="material-symbols-outlined text-[20px]">send</span>
                              </button>
                            </div>
                          </section>
                        </div>
                      )}

                      {/* Step 3 Content */}
                      {step === 3 && (
                        <div className="p-8 flex flex-col gap-8 transition-all">
                          <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Invite by Email</h3>
                            <div className="space-y-4">
                              {[1, 2].map((i) => (
                                <div key={i} className="flex flex-wrap items-end gap-4 animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                                  <label className="flex flex-col min-w-[240px] flex-1">
                                    <p className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-2">Email Address</p>
                                    <input className="flex w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="e.g. colleague@company.com" type="email" />
                                  </label>
                                  <label className="flex flex-col min-w-[180px] w-full md:w-auto">
                                    <p className="text-slate-700 dark:text-slate-300 text-sm font-medium pb-2">Role</p>
                                    <select className="flex w-full rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                                      <option>Hiring Manager</option>
                                      <option>Interviewer</option>
                                      <option>Viewer</option>
                                    </select>
                                  </label>
                                  <button type="button" className="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                                    <span className="material-symbols-outlined">delete</span>
                                  </button>
                                </div>
                              ))}
                            </div>
                            <button type="button" className="mt-6 flex items-center gap-2 text-primary font-bold text-sm hover:underline transition-all">
                              <span className="material-symbols-outlined text-lg">add</span>
                              Add another team member
                            </button>
                          </div>

                          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-xl">
                            <h3 className="text-primary text-lg font-bold mb-4">Why collaborate?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-primary">
                                  <span className="material-symbols-outlined text-xl">group</span>
                                  <p className="font-bold text-slate-900 dark:text-white text-sm">Shared Pipeline</p>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Keep everyone aligned on candidate progress in real-time.</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-primary">
                                  <span className="material-symbols-outlined text-xl">sticky_note_2</span>
                                  <p className="font-bold text-slate-900 dark:text-white text-sm">Internal Notes</p>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Centralize feedback and interview scorecards in one place.</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-primary">
                                  <span className="material-symbols-outlined text-xl">verified</span>
                                  <p className="font-bold text-slate-900 dark:text-white text-sm">Role Permissions</p>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Control who sees what with granular access levels.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors">
                        <button 
                          onClick={() => setStep(step - 1)}
                          className="w-full sm:w-auto px-8 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
                        >
                          Back
                        </button>
                        <button 
                          onClick={nextStep as any}
                          className="w-full sm:w-auto px-10 py-3 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                        >
                          <span>{step === 3 ? "Complete Registration" : "Continue to Next Step"}</span>
                          <span className="material-symbols-outlined">{step === 3 ? "check" : "arrow_forward"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <footer className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs transition-colors">
                <div className="flex items-center gap-6">
                  <Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link>
                  <Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link>
                  <Link className="hover:text-primary transition-colors" href="#">Help Center</Link>
                </div>
                <p>© 2024 SkillSync Inc. All rights reserved.</p>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
