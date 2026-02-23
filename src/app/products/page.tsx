import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppCard from "@/components/AppCard";
import { Layers } from "lucide-react";
import { getApps } from "@/libs/getApps";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Products | Adeptstack",
    description: "All Adeptstack Products",
};

export default async function ProductsPage() {
    const rawApps = await getApps();

    const sortedApps = [...rawApps].sort((a, b) => {
        if (a.highlighted && !b.highlighted) return -1;
        if (!a.highlighted && b.highlighted) return 1;

        if (a.legacy && !b.legacy) return 1;
        if (!a.legacy && b.legacy) return -1;

        return 0;
    });

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header />

            <main className="grow pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto w-full relative z-10 mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase mb-6">
                        <Layers className="w-3 h-3" /> Software & Platforms
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Our Products
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        Discover the applications we have developed. From small system tools to comprehensive platforms – designed for performance and usability.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto w-full relative z-10">
                    {sortedApps.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedApps.map((app) => (
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
                    ) : (
                        <div className="text-center py-20 bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl">
                            <p className="text-slate-400 text-lg">No apps found.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}