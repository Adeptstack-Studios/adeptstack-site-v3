import AppCard from "./AppCard";
import {App} from "@/Models/app";

type AppGridProps = {
    apps: App[];
};

export default function AppGrid({ apps }: AppGridProps) {
    return (
        <section id="apps" className="py-32 px-6 bg-slate-950 border-t border-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-white">Our Products</h2>
                    <p className="text-slate-400">Professional software. Simply designed.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[285px]">
                    {apps.map((app) => (
                        <AppCard
                            key={app.id}
                            name={app.name}
                            slogan={app.slogan}
                            slug={app.slug}
                            icon={app.iconUrl}
                            highlight={app.highlighted}
                            legacy={app.legacy}
                            version={app.latestMainVersion?.version}
                            channel={app.latestMainVersion?.channel}
                            downloadUrl={app.latestMainVersion?.appUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}