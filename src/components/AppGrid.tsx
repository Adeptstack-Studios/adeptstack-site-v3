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

                {/* Hier ist der Zauber: Flexbox statt Grid, damit auch 2, 4 oder 5 Items mittig zentriert werden */}
                <div className="flex flex-wrap justify-center gap-6">
                    {apps.map((app) => (
                        <div
                            key={app.id}
                            // w-full (Mobile), 2 pro Zeile (Tablet), max 3 pro Zeile (Desktop)
                            className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] h-[285px] flex"
                        >
                            <div className="w-full h-full">
                                <AppCard
                                    name={app.name}
                                    slogan={app.slogan}
                                    slug={app.slug}
                                    icon={app.iconUrl}
                                    highlight={app.highlighted}
                                    legacy={app.legacy}
                                    platforms={app.platforms}

                                    version={app.latestMainVersion?.version}
                                    channel={app.latestMainVersion?.channel}
                                    downloadUrl={app.latestMainVersion?.appUrl}
                                />
                            </div>
                        </div>
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