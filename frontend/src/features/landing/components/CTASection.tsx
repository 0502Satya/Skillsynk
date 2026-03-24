import { Button } from "@/shared/ui";

/**
 * This section is the final step on the page.
 * It encourages the user to create an account or talk to sales.
 */
export default function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden bg-bg transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                {/* Big question to catch user's interest */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text mb-6 leading-tight tracking-tight">
                    Ready to transform your career intelligence?
                </h2>
                <p className="text-lg sm:text-xl text-muted mb-10 leading-relaxed font-medium">
                    Join us and find the best opportunities for your professional growth.
                </p>

                {/* Main action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                    <button className="px-6 py-4 sm:px-10 sm:py-5 bg-primary text-surface font-black rounded-2xl hover:brightness-110 shadow-xl shadow-primary/20 transition-all text-base sm:text-lg min-h-[56px] sm:min-h-[64px] active:scale-[0.98]">
                        Create Free Account
                    </button>
                    <button className="px-6 py-4 sm:px-10 sm:py-5 bg-surface text-text font-black rounded-2xl border border-border hover:bg-bg transition-all text-base sm:text-lg min-h-[56px] sm:min-h-[64px] active:scale-[0.98]">
                        Contact Sales
                    </button>
                </div>
            </div>

            {/* Decorative blurred circles for style */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[256px] bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[60vw] h-[60vw] max-w-[384px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        </section>
    );
}
