/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {notFound} from "next/navigation";
import {Download, History, Layers, Activity, AlertTriangle} from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {getApps} from "@/libs/getApps";
import {Metadata} from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const resolvedParams = await params;
    const allApps = await getApps();
    const app = allApps.find(a => a.slug?.toLowerCase() === resolvedParams.slug.toLowerCase());

    if (!app) {
        return { title: "404 Not Found | Adeptstack" };
    }

    const ogImageUrl = app.iconUrl || app.image1Url || "";

    return {
        title: `${app.name} | Adeptstack`,
        description: app.slogan || `Download ${app.name} now.`,
        openGraph: {
            title: `${app.name} - ${app.slogan}`,
            description: app.slogan,
            images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        },
    };
}

export default async function ProductDetailPage({
                                                    params
                                                }: {
    params: Promise<{ slug: string }>
}) {
    const resolvedParams = await params;

    const allApps = await getApps();
    const app = allApps.find(a => a.slug?.toLowerCase() === resolvedParams.slug.toLowerCase());

    if (!app) {
        notFound();
    }

    const latestVersion = app.latestMainVersion;

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header/>

            <main className="grow pt-24 pb-20 overflow-hidden">

                <div className="flex justify-center">
                    {app.legacy && (
                        <div
                            className="flex items-start gap-3 p-4 mb-8 rounded-xl bg-amber-500/10 border mt-0.5 border-amber-500/20 max-w-4xl mx-auto md:mx-0 text-left">
                            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-3"/>
                            <div>
                                <h4 className="text-amber-400 font-bold text-sm mb-1">Legacy Software</h4>
                                <p className="text-amber-400/80 text-sm leading-relaxed">
                                    This application is no longer actively developed and only receives
                                    security-related or limited updates.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <section className="relative px-6 md:px-12 max-w-5xl mx-auto mb-20">

                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                    <div
                        className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">

                        <div
                            className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-2xl flex items-center justify-center relative overflow-hidden">
                            <div
                                className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent pointer-events-none"></div>
                            {app.iconUrl ? (
                                <img src={app.iconUrl} alt={`${app.name} Icon`}
                                     className="w-full h-full object-contain relative z-10"/>
                            ) : (
                                <Layers className="w-16 h-16 text-slate-700"/>
                            )}
                        </div>

                        <div className="text-center md:text-left grow">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                                {app.legacy && (
                                    <span
                                        className="px-3 py-1 rounded-md bg-slate-800/80 text-slate-400 text-xs font-bold uppercase tracking-wider border border-slate-700">
                                        Legacy
                                      </span>
                                )}
                                {app.highlighted && !app.legacy && (
                                    <span
                                        className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                                        Featured
                                      </span>
                                )}
                                {latestVersion?.version && (
                                    <span
                                        className="px-3 py-1 rounded-md border border-white/10 bg-white/5 text-slate-300 text-xs font-mono">
                                        {latestVersion.version}
                                      </span>
                                )}
                                {latestVersion?.channel && (
                                    <span
                                        className="px-3 py-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                                        <Activity className="w-3 h-3"/> {latestVersion.channel}
                                      </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                {app.name}
                            </h1>
                            <p className="text-md text-blue-400 font-medium uppercase tracking-wide mb-6">
                                {app.slogan}
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8">
                                {latestVersion?.appUrl ? (
                                    <a
                                        href={latestVersion.appUrl}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-slate-950 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-white/5 hover:scale-105 active:scale-95"
                                    >
                                        <Download className="w-5 h-5"/> Download
                                    </a>
                                ) : (
                                    <button disabled
                                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800 text-slate-500 font-bold rounded-xl cursor-not-allowed">
                                        <Download className="w-5 h-5"/> Not available
                                    </button>
                                )}

                                <Link
                                    href={`/changelogs?app=${encodeURIComponent(app.slug || app.name || "")}`}
                                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-800 hover:text-white transition-all"
                                >
                                    <History className="w-5 h-5"/> Changelogs
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {app.description && (
                    <section className="px-6 md:px-12 max-w-4xl mx-auto mb-24 text-center md:text-left">
                        <div
                            className="prose prose-invert prose-lg prose-slate max-w-none text-slate-300 leading-relaxed prose-headings:text-white prose-headings:font-bold prose-h2:mb-6 prose-p:mb-4">
                            <MarkdownRenderer content={app.description}/>
                        </div>
                    </section>
                )}

                <section className="px-6 md:px-12 max-w-5xl mx-auto space-y-24">

                    {(app.image1Url || app.feature1Desc) && (
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            {app.image1Url && (
                                <div
                                    className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/50">
                                    <img src={app.image1Url} alt={`Screenshot 1 von ${app.name}`}
                                         className="w-full h-full"/>
                                </div>
                            )}
                            {app.feature1Desc && (
                                <div className="w-full md:w-1/2 space-y-4">
                                    <div
                                        className="prose prose-invert prose-slate max-w-none text-slate-400 prose-headings:text-white prose-headings:font-bold prose-headings:text-2xl prose-h2:mt-0">
                                        <MarkdownRenderer content={app.feature1Desc}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {(app.image2Url || app.feature2Desc) && (
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
                            {app.image2Url && (
                                <div
                                    className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/50">
                                    <img src={app.image2Url} alt={`Screenshot 2 von ${app.name}`}
                                         className="w-full h-full"/>
                                </div>
                            )}
                            {app.feature2Desc && (
                                <div className="w-full md:w-1/2 space-y-4">
                                    <div
                                        className="prose prose-invert prose-slate max-w-none text-slate-400 prose-headings:text-white prose-headings:font-bold prose-headings:text-2xl prose-h2:mt-0">
                                        <MarkdownRenderer content={app.feature2Desc}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {(app.image3Url || app.feature3Desc) && (
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            {app.image3Url && (
                                <div
                                    className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/50">
                                    <img src={app.image3Url} alt={`Screenshot 3 von ${app.name}`}
                                         className="w-full h-full"/>
                                </div>
                            )}
                            {app.feature3Desc && (
                                <div className="w-full md:w-1/2 space-y-4">
                                    <div
                                        className="prose prose-invert prose-slate max-w-none text-slate-400 prose-headings:text-white prose-headings:font-bold prose-headings:text-2xl prose-h2:mt-0">
                                        <MarkdownRenderer content={app.feature3Desc}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </main>
            <Footer/>
        </div>
    );
}