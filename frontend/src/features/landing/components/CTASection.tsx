import { Button } from "@/shared/ui";

/**
 * This section is the final step on the page.
 * It encourages the user to create an account or talk to sales.
 */
export default function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-[#101622] transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                {/* Big question to catch user's interest */}
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                    Ready to transform your career intelligence?
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                    Join us and find the best opportunities for your professional growth.
                </p>

                {/* Main action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-10 py-5 bg-accent text-white font-black rounded-2xl hover:bg-accent/90 shadow-xl shadow-accent/20 transition-all text-lg">
                        Create Free Account
                    </button>
                    <button className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-lg">
                        Contact Sales
                    </button>
                </div>
            </div>

            {/* Decorative blurred circles for style */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
}
