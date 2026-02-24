import { Button, Card } from "@/shared/ui";
import ThemeToggle from "@/shared/ui/ThemeToggle";

const features = [
  {
    title: "Unified Skill Profiles",
    description:
      "Build one source of truth for each learner and track growth over time.",
  },
  {
    title: "Role-Aligned Paths",
    description:
      "Map skills to career outcomes and create guided learning journeys.",
  },
  {
    title: "Actionable Insights",
    description:
      "Use clean dashboards and progress signals to guide decisions faster.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10 md:px-10">
        <header className="flex items-center justify-between">
          <p className="text-xl font-semibold tracking-tight">Skillsynk</p>
          <ThemeToggle />
        </header>

        <section className="rounded-2xl border border-border bg-white/70 p-8 shadow-sm backdrop-blur-sm dark:bg-slate-900/50 md:p-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted">
            Skills Intelligence Platform
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
            Build better teams by making skill development measurable.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
            Skillsynk helps organizations capture capability gaps, define
            growth plans, and track real learning outcomes in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Get Started</Button>
            <Button variant="outline">View Demo</Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border bg-white/90 dark:bg-slate-900/70"
            >
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {feature.description}
              </p>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
