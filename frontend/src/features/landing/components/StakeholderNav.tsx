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
        <section className="py-12 bg-bg border-y border-border transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-bold text-muted uppercase tracking-widest mb-10">Tailored for your journey</p>

                {/* We map (loop) through the list of people names and icons above */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
                    {stakeholders.map((item) => (
                        <a key={item.name} className="flex flex-col items-center group min-w-0 py-2" href="#">
                            {/* The box containing the icon */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface flex items-center justify-center text-muted group-hover:text-primary group-hover:shadow-lg transition-all duration-300 shadow-sm border border-border">
                                <span className="material-symbols-outlined text-2xl sm:text-3xl">{item.icon}</span>
                            </div>
                            {/* The name under the icon */}
                            <span className="mt-3 text-sm font-black text-text group-hover:text-primary transition-colors tracking-tight truncate w-full text-center">{item.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
