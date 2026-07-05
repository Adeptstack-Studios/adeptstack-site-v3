import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Tag } from "lucide-react";
import { getApps } from "@/libs/getApps";
import { getChangelogs } from "@/libs/getChangelogs";
import type { Metadata } from "next";
import ChangelogCard from "@/components/ChangelogCard";

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
                return log.appId === selectedApp.id;
            }
            return false;
        });

    const changelogsWithAppName = filteredChangelogs.map(log => {
        const app = apps.find(a => a.id === log.appId);
        return { ...log, appName: app?.name || "Unknown App" };
    });

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header />
            <main className="grow pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto w-full relative z-10 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase mb-6">
                        <Tag className="w-3 h-3" /> Updates & Releases
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Changelogs
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                        Stay up to date or browse through the past. Here you will find all the latest news, bug fixes, and improvements to our software products.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto w-full relative z-10">
                    <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-slate-800">
                        <Link
                            href="/changelogs"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {changelogsWithAppName.length > 0 ? (
                            changelogsWithAppName.map((log) => (
                                <ChangelogCard key={log.id} log={log} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl">
                                <p className="text-slate-400 text-lg">No entries found for this app.</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}