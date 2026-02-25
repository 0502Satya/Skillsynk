/**
 * This section shows links for different types of people (like Candidates or Companies).
 * Each link has an icon and a name.
 */
export default function StakeholderNav() {
    const stakeholders = [
        { name: "Candidates", icon: "person" },
        { name: "Companies", icon: "corporate_fare" },
        { name: "Recruiters", icon: "search_check" },
        { name: "Institutes", icon: "school" },
        { name: "Trainers", icon: "model_training" },
    ];

    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10 text-primary">Tailored for your journey</p>

                {/* We map (loop) through the list of people names and icons above */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {stakeholders.map((item) => (
                        <a key={item.name} className="flex flex-col items-center group" href="#">
                            {/* The box containing the icon */}
                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:shadow-lg transition-all duration-300">
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                            </div>
                            {/* The name under the icon */}
                            <span className="mt-3 text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
