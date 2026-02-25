import Link from "next/link";

/**
 * The footer at the bottom of the page.
 * It has the platform details, social links, and lists of links for navigation.
 */
export default function Footer() {
    return (
        <footer className="bg-white dark:bg-[#101622] border-t border-slate-200 dark:border-slate-800 py-16 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
                    {/* Logo and short description */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1 bg-primary rounded-lg text-white">
                                <svg className="w-5 h-5 font-bold" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">SkillSync</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">
                            One Stop Solution For Your Career.
                        </p>
                        {/* Social media icons */}
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-slate-600 dark:text-slate-400" href="#">
                                <span className="material-symbols-outlined text-xl">public</span>
                            </a>
                            <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-slate-600 dark:text-slate-400" href="#">
                                <span className="material-symbols-outlined text-xl">alternate_email</span>
                            </a>
                            <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-slate-600 dark:text-slate-400" href="#">
                                <span className="material-symbols-outlined text-xl">rss_feed</span>
                            </a>
                        </div>
                    </div>

                    {/* Lists of important links grouped by topic */}
                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Platform</h5>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="#">Find Jobs</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Courses</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Talent Search</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Company</h5>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="#">About Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Blog</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Resources</h5>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="#">Help Center</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Partners</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Institutes</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Developers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Legal</h5>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="#">Privacy</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Terms</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Security</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Simple copyright line at the very bottom */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">© 2026 SkillSync AI Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <button className="text-xs text-slate-500 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">language</span>
                            English (US)
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
