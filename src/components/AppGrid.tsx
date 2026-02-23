import AppCard from "./AppCard";
import { App } from "@/Models/app";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type AppGridProps = {
    apps: App[];
};

export default function AppGrid({ apps }: AppGridProps) {
    return (
        <section id="apps" className="py-32 px-6 bg-slate-950 border-t border-slate-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured Products</h2>
                    <p className="text-slate-400 text-lg">
                        Professional software. Simply designed. Discover our highlights.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[285px]">
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

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900/80 border border-slate-800 text-slate-300 font-semibold rounded-xl hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all shadow-lg group"
                    >
                        Explore all products
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}