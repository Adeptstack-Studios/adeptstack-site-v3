/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, Layers, Tag, ExternalLink, Activity, Download } from "lucide-react";
import { notFound } from "next/navigation";
import {getChangelogById} from "@/libs/getChangelogs";
import {getAppById} from "@/libs/getApps";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata} from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const resolvedParams = await params;
    const changelog = await getChangelogById(resolvedParams.id);

    if (!changelog) {
        return { title: "404 Not Found | Adeptstack" };
    }

    const app = await getAppById(changelog.appId.toString());
    const appName = app?.name || "Unknown App";

    const ogImageUrl = changelog.imageUrl || "";

    return {
        title: `${changelog.title} ${changelog.version ? `(${changelog.version})` : ''} | Adeptstack`,
        description: changelog.description || `Changelog for ${appName}.`,
        openGraph: {
            title: `${appName} Update: ${changelog.title}`,
            description: changelog.description,
            images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        },
    };
}

export default async function ChangelogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const changelog = await getChangelogById(resolvedParams.id);

    if (!changelog) {
        notFound();
    }

    const app = await getAppById(changelog.appId.toString());
    const appName = app?.name || "Unknown App";

    const formattedDate = new Date(changelog.publishedAt).toLocaleDateString('en-EN', {
        day: '2-digit', month: 'long', year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header />
            <main className="grow pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
                <article className="max-w-3xl mx-auto w-full relative z-10">
                    <Link href="/changelogs" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 font-medium text-sm group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        go back
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase">
                          <Layers className="w-3.5 h-3.5" /> {appName}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold font-mono">
                          <Tag className="w-3 h-3" /> {changelog.version}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                          <Activity className="w-3 h-3" /> {changelog.channel}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400 text-sm ml-auto">
                          <Calendar className="w-4 h-4" /> {formattedDate}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        {changelog.title}
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed mb-10">
                        {changelog.description}
                    </p>

                    {changelog.imageUrl && (
                        <div className="w-full h-auto mb-12 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                            <img src={changelog.imageUrl} alt={`Cover for ${changelog.title}`} className="w-full h-full object-cover"/>
                        </div>
                    )}

                    <div className="prose prose-invert prose-slate prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-none bg-slate-900/30 border border-slate-800/50 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
                        <MarkdownRenderer content={changelog.content || "No content available."} />
                    </div>

                    {(changelog.appUrl || changelog.microsoftStoreUrl || changelog.playStoreUrl || changelog.appStoreUrl || changelog.steamUrl) && (
                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                            {changelog.appUrl && (
                                <a href={changelog.appUrl} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg shadow-white/5">
                                    <Download className="w-4 h-4"/>
                                    Download
                                </a>
                            )}
                            {changelog.microsoftStoreUrl && (
                                <a href={changelog.microsoftStoreUrl} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 shadow-sm">
                                    <ExternalLink className="w-4 h-4"/>
                                    Microsoft Store
                                </a>
                            )}
                            {changelog.appStoreUrl && (
                                <a href={changelog.appStoreUrl} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 shadow-sm">
                                    <ExternalLink className="w-4 h-4"/>
                                    App Store
                                </a>
                            )}
                            {changelog.playStoreUrl && (
                                <a href={changelog.playStoreUrl} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 shadow-sm">
                                    <ExternalLink className="w-4 h-4"/>
                                    Play Store
                                </a>
                            )}
                            {changelog.steamUrl && (
                                <a href={changelog.steamUrl} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 shadow-sm">
                                    <ExternalLink className="w-4 h-4"/>
                                    Steam
                                </a>
                            )}
                        </div>
                    )}
                </article>
            </main>
            <Footer />
        </div>
    );
}