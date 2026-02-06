// src/components/AppGrid.tsx
import AppCard from "./AppCard"; // Importieren!

type AppGridProps = {
    apps: any[];
};

export default function AppGrid({ apps }: AppGridProps) {
    return (
        <section id="apps" className="py-32 px-6 bg-slate-950 border-t border-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-white">Deine Toolbox</h2>
                    <p className="text-slate-400">Professionelle Software. Einfach gestaltet.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
                    {apps.map((app) => (
                        // Hier die AppCard nutzen
                        <AppCard
                            key={app.id}
                            name={app.name}
                            slogan={app.slogan}
                            desc={app.desc}
                            icon={app.icon}
                            highlight={app.highlight}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}