import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Tag, Search } from "lucide-react";
import { getApps } from "@/libs/getApps";
import { getChangelogs } from "@/libs/getChangelogs";
import type { Metadata } from "next";
import ChangelogCard from "@/components/ChangelogCard";

export const metadata: Metadata = {
    title: "Changelogs | Adeptstack",
    description: "Archive of all changelogs.",
};

export default async function ChangelogsPage({searchParams,}: {
    searchParams: Promise<{ app?: string; q?: string }>;
}) {
    // 1. App-Filter UND Suchanfrage aus den Parametern holen
    const params = await searchParams;
    const activeAppFilter = params?.app || "all";
    const searchQuery = params?.q || "";

    const [changelogs, apps] = await Promise.all([getChangelogs(), getApps()]);

    const selectedApp = apps.find(a =>
        a.slug?.toLowerCase() === activeAppFilter.toLowerCase() ||
        a.name?.toLowerCase() === activeAppFilter.toLowerCase()
    );

    // 2. Basis-Filterung nach App
    let filteredChangelogs = activeAppFilter === "all"
        ? changelogs
        : changelogs.filter((log) => {
            if (selectedApp) {
                return log.appId === selectedApp.id;
            }
            return false;
        });

    // 3. Zusätzliche Filterung nach Suchbegriff (Titel, Beschreibung & Version)
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredChangelogs = filteredChangelogs.filter(log =>
            (log.title && log.title.toLowerCase().includes(q)) ||
            (log.description && log.description.toLowerCase().includes(q)) ||
            (log.version && log.version.toLowerCase().includes(q))
        );
    }

    const changelogsWithAppName = filteredChangelogs.map(log => {
        const app = apps.find(a => a.id === log.appId);
        return { ...log, appName: app?.name || "Unknown App" };
    });

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header />
            <main className="grow pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto w-full relative z-10 mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase mb-6">
                        <Tag className="w-3 h-3" /> Updates & Releases
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Changelogs
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-8">
                        Stay up to date or browse through the past. Here you will find all the latest news, bug fixes, and improvements to our software products.
                    </p>

                    {/* FUNKTIONIERENDE SUCHLEISTE */}
                    <form method="GET" action="/changelogs" className="w-full max-w-md relative mb-6">
                        {/* Verstecktes Feld, um den aktiven App-Filter beim Suchen beizubehalten */}
                        {activeAppFilter !== "all" && (
                            <input type="hidden" name="app" value={activeAppFilter} />
                        )}
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="w-4 h-4 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            name="q"
                            defaultValue={searchQuery}
                            placeholder="Search updates... (Press Enter)"
                            className="w-full bg-slate-900/50 border border-slate-800 text-slate-300 text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all placeholder:text-slate-600 shadow-inner"
                        />
                    </form>
                </div>

                <div className="max-w-5xl mx-auto w-full relative z-10">
                    <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-slate-800">
                        {/* 'q' Parameter im Link behalten, falls einer gesetzt ist */}
                        <Link
                            href={`/changelogs${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                activeAppFilter === "all"
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                            All Apps
                        </Link>

                        {apps.map((appItem) => {
                            const queryParam = appItem.slug || appItem.name || "";
                            const isActive = activeAppFilter.toLowerCase() === queryParam.toLowerCase() ||
                                activeAppFilter.toLowerCase() === appItem.name?.toLowerCase();

                            if (!appItem.name) return null;

                            return (
                                <Link
                                    key={appItem.id}
                                    href={`/changelogs?app=${encodeURIComponent(queryParam)}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                            : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                                >
                                    {appItem.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {changelogsWithAppName.length > 0 ? (
                            changelogsWithAppName.map((log) => (
                                <ChangelogCard key={log.id} log={log} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl">
                                <p className="text-slate-400 text-lg mb-2">No entries found.</p>
                                {searchQuery && (
                                    <p className="text-slate-500 text-sm">Try adjusting your search query "{searchQuery}".</p>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}