import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, Layers, Activity } from "lucide-react";
import {getApps} from "@/libs/getApps";
import {getChangelogs} from "@/libs/getChangelogs";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Changelogs | Adeptstack",
    description: "Archive of all changelogs.",
};

export default async function ChangelogsPage({searchParams,}: {
    searchParams: Promise<{ app?: string }>;
}) {
    const params = await searchParams;
    const activeAppFilter = params?.app || "all";

    const [changelogs, apps] = await Promise.all([getChangelogs(), getApps()]);

    const selectedApp = apps.find(a =>
        a.slug?.toLowerCase() === activeAppFilter.toLowerCase() ||
        a.name?.toLowerCase() === activeAppFilter.toLowerCase()
    );

    const filteredChangelogs = activeAppFilter === "all"
        ? changelogs
        : changelogs.filter((log) => {
            if (selectedApp) {
                return log.app?.toLowerCase() === selectedApp.name?.toLowerCase() ||
                    log.app?.toLowerCase() === selectedApp.slug?.toLowerCase();
            }
            return log.app?.toLowerCase() === activeAppFilter.toLowerCase();
        });

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header />
            <main className="grow pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto w-full relative z-10 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase mb-6">
                        <Tag className="w-3 h-3" /> Updates & Releases
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Changelogs
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                        Bleib auf dem Laufenden oder stöbere in der Vergangenheit. Hier findest du alle Neuigkeiten, Bugfixes und Verbesserungen zu unseren Software-Produkten.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto w-full relative z-10">

                    <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-slate-800">

                        <Link
                            href="/changelogs"
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                activeAppFilter === "all"
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                            Alle Apps
                        </Link>

                        {apps.map((appItem) => {
                            const queryParam = appItem.slug || appItem.name || "";

                            const isActive = activeAppFilter.toLowerCase() === queryParam.toLowerCase() ||
                                activeAppFilter.toLowerCase() === appItem.name?.toLowerCase();

                            if (!appItem.name) return null;

                            return (
                                <Link
                                    key={appItem.id}
                                    href={`/changelogs?app=${encodeURIComponent(queryParam)}`}
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

                    <div className="space-y-6">
                        {filteredChangelogs.length > 0 ? (
                            filteredChangelogs.map((log) => {
                                const formattedDate = log.publishedAt
                                    ? new Date(log.publishedAt).toLocaleDateString('en-EN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                    : "Unbekanntes Datum";

                                return (
                                    <Link key={log.id} href={`/changelogs/${log.id}`} className="block group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-blue-500/50 hover:bg-slate-900 transition-all">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                                            <div className="shrink-0 w-48 space-y-3">
                                                <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                                                    <Calendar className="w-4 h-4" />
                                                    {formattedDate}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                                    <Layers className="w-4 h-4 text-blue-500" />
                                                    {log.app}
                                                </div>
                                            </div>

                                            <div className="grow">
                                                <div className="flex items-center gap-3 mb-3">
                                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                                                    {log.version || "v1.0.0"}
                                                  </span>
                                                    <span className="text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-md">
                                                        <Activity className="w-3 h-3 mr-1 inline" /> {log.channel || "Release"}
                                                      </span>
                                                </div>

                                                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                                    {log.title}
                                                </h2>
                                                <p className="text-slate-400 leading-relaxed line-clamp-2">
                                                    {log.description}
                                                </p>

                                                <div className="mt-4 flex items-center gap-2 text-blue-500 text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                                    Vollständigen Log lesen <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="text-center py-20 bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl">
                                <p className="text-slate-400 text-lg">Keine Einträge für diese App gefunden.</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}