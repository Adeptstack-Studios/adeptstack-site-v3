/* eslint-disable @next/next/no-img-element */
import type {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {notFound} from "next/navigation";
import {AlertTriangle, ArrowRight, CalendarClock, Download, History, Layers} from "lucide-react";
import { FaWindows, FaApple, FaAndroid, FaLinux, FaSteam, FaGlobe } from 'react-icons/fa';
import { SiCurseforge, SiModrinth } from 'react-icons/si';
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {getAppBySlug} from "@/libs/getApps";
import {getPostsForApp} from "@/libs/getNews";
import NewsCard from "@/components/NewsCard";
import {Metadata} from "next";
import BackButton from "@/components/BackButton";
import ZoomableImage from "@/components/ZoomableImage";
import ProductGallery from "@/components/ProductGallery";
import GetButtons, {availableOn} from "@/components/product/GetButtons";
import ShowMore from "@/components/product/ShowMore";
import {appFeatures, appImages} from "@/libs/appMedia";
import { hasDownloadLink, buildOgImage, formatReleaseDate } from "@/libs/utils";

const PlatformIcon = ({ platform }: { platform: string }) => {
    const size = 16;

    switch (platform) {
        case 'windows': return <FaWindows size={size} />;
        case 'android': return <FaAndroid size={size} />;
        case 'mac':
        case 'ios': return <FaApple size={size} />;
        case 'linux': return <FaLinux size={size} />;
        case 'steam': return <FaSteam size={size} />;
        case 'web': return <FaGlobe size={size} />;
        case 'curseforge': return <SiCurseforge size={size} />;
        case 'modrinth': return <SiModrinth size={size} />;
        default: return <FaGlobe size={size} />;
    }
};

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const resolvedParams = await params;
    const app = await getAppBySlug(resolvedParams.slug);

    if (!app) {
        return { title: "404 Not Found | Adeptstack" };
    }

    // the app icon as the small thumbnail card; the screenshot only when there is no icon
    const og = app.iconUrl ? buildOgImage(app.iconUrl, "square") : buildOgImage(appImages(app)[0]?.url);

    return {
        title: `${app.name} | Adeptstack`,
        description: app.slogan || `Download ${app.name} now.`,
        openGraph: {
            type: "website",
            title: `${app.name} - ${app.slogan}`,
            description: app.slogan,
            images: og.images,
        },
        twitter: {
            card: og.card,
            title: `${app.name} - ${app.slogan}`,
            description: app.slogan,
            images: og.images.map(image => image.url),
        },
    };
}

const PLATFORM_NAMES: Record<string, string> = {
    windows: "Windows", android: "Android", mac: "macOS", ios: "iOS", linux: "Linux", steam: "Steam", web: "Web",
    curseforge: "CurseForge", modrinth: "Modrinth",
};

function platformName(platform: string) {
    return PLATFORM_NAMES[platform] ?? platform.charAt(0).toUpperCase() + platform.slice(1);
}

/** Release notes often start with their own "What's new" heading; the section has one already. */
function withoutWhatsNewHeading(notes: string) {
    return notes.replace(/^\s*#{1,3}\s*what['’]?s new[^\n]*\n/i, "");
}

/** A heading of the main column, the same everywhere on the page. */
function SectionTitle({children, id}: { children: ReactNode; id: string }) {
    return <h2 id={id} className="text-xl md:text-2xl font-bold text-white mb-5">{children}</h2>;
}

/**
 * The product page, laid out like the Microsoft Store: on the left the store panel with icon, name and
 * the button to get the app (it stays in view while scrolling on large screens), on the right the
 * screenshots, the description, what is new, the features, the news and the facts.
 */
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;

    const [app, posts] = await Promise.all([
        getAppBySlug(resolvedParams.slug),
        getPostsForApp(resolvedParams.slug, 4),
    ]);

    if (!app) {
        notFound();
    }

    const latestVersion = app.latestMainVersion;
    // announced but not out yet: shown as "coming soon", the backend sends no download links for it
    const upcoming = app.upcomingVersion;
    const upcomingDate = upcoming?.publishedAt ? formatReleaseDate(upcoming.publishedAt) : null;
    const comingSoon = !hasDownloadLink(latestVersion) && !!upcoming;

    const images = appImages(app);
    const features = appFeatures(app);
    const backdrop = images[0]?.url ?? app.iconUrl;
    const changelogsHref = `/changelogs?app=${encodeURIComponent(app.slug || app.name || "")}`;

    const parsedPlatforms = app.platforms
        ? app.platforms.split(/[,;]/).map(p => p.trim().toLowerCase()).filter(Boolean)
        : [];

    // "Additional information", only what is known
    const facts: { label: string; value: ReactNode }[] = [
        {label: "Published by", value: <Link href="/about" className="text-blue-400 hover:text-blue-300">Adeptstack</Link>},
        ...(app.category ? [{label: "Category", value: app.category}] : []),
        ...(latestVersion?.version ? [{label: "Latest version", value: <span className="font-mono">{latestVersion.version}</span>}] : []),
        ...(latestVersion?.publishedAt ? [{label: "Last updated", value: formatReleaseDate(latestVersion.publishedAt)}] : []),
        ...(app.publishedAt ? [{label: "Release date", value: formatReleaseDate(app.publishedAt)}] : []),
        ...(parsedPlatforms.length ? [{label: "Platforms", value: parsedPlatforms.map(platformName).join(", ")}] : []),
        ...(availableOn(latestVersion).length ? [{label: "Available on", value: availableOn(latestVersion).join(", ")}] : []),
        ...(app.downloadsFormatted ? [{label: "Downloads", value: `${app.downloadsFormatted} on Modrinth and CurseForge`}] : []),
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header/>

            <main className="grow pt-24 pb-24 relative overflow-x-clip">
                {/* the first screenshot, blurred, behind the top of the page */}
                {backdrop && (
                    <div className="absolute inset-x-0 top-0 h-[560px] overflow-hidden pointer-events-none" aria-hidden="true">
                        <img src={backdrop} alt="" className="w-full h-full object-cover opacity-30 blur-3xl scale-125"
                             style={{maskImage: "linear-gradient(to bottom, black 30%, transparent)"}}/>
                    </div>
                )}

                <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
                    <BackButton fallbackUrl={"/products"} />

                    <div className="grid lg:grid-cols-[340px_minmax(0,1fr)] gap-10 lg:gap-12 items-start">

                        {/* --- STORE PANEL --- */}
                        <aside className="lg:sticky lg:top-24 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-6 shadow-2xl">
                            <div className="flex lg:flex-col items-center lg:items-start gap-5">
                                <div className="w-24 h-24 lg:w-28 lg:h-28 shrink-0 rounded-3xl bg-slate-950 border border-slate-800 p-3 shadow-xl flex items-center justify-center">
                                    {app.iconUrl ? (
                                        <img src={app.iconUrl} alt={`${app.name} icon`} className="w-full h-full object-contain"/>
                                    ) : (
                                        <Layers className="w-12 h-12 text-slate-700"/>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{app.name}</h1>
                                    <Link href="/about" className="text-sm font-medium text-blue-400 hover:text-blue-300">Adeptstack</Link>
                                    {app.category && <p className="text-sm text-slate-400">{app.category}</p>}
                                </div>
                            </div>

                            {app.slogan && <p className="mt-4 text-slate-300 leading-relaxed">{app.slogan}</p>}

                            {(app.legacy || app.highlighted || app.downloadsFormatted) && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {app.legacy && (
                                        <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider border border-slate-700">Legacy</span>
                                    )}
                                    {app.highlighted && !app.legacy && (
                                        <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">Featured</span>
                                    )}
                                    {app.downloadsFormatted && (
                                        <span
                                            title={app.downloads !== undefined ? `${app.downloads.toLocaleString("en-US")} downloads` : undefined}
                                            className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                                            <Download className="w-3 h-3"/> {app.downloadsFormatted} downloads
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="mt-6">
                                <GetButtons release={latestVersion} comingSoon={comingSoon ? upcoming : null}/>
                            </div>

                            {upcoming && !comingSoon && (
                                <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-300">
                                    <CalendarClock className="w-4 h-4 mt-0.5 shrink-0"/>
                                    <span>Version <span className="font-mono">{upcoming.version}</span> comes on {upcomingDate}.</span>
                                </p>
                            )}

                            {app.legacy && (
                                <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-300">
                                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0"/>
                                    <span>No longer actively developed. It only gets security fixes or small updates.</span>
                                </div>
                            )}

                            {parsedPlatforms.length > 0 && (
                                <div className="mt-6 pt-5 border-t border-white/10">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Works on</p>
                                    <div className="flex flex-wrap gap-2">
                                        {parsedPlatforms.map(platform => (
                                            <span key={platform}
                                                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-300 text-xs font-medium">
                                                <PlatformIcon platform={platform}/> {platformName(platform)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Link href={changelogsHref}
                                  className="mt-5 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                                <History className="w-4 h-4"/> All releases and changelogs
                            </Link>
                        </aside>

                        {/* --- MAIN COLUMN --- */}
                        <div className="min-w-0 space-y-14">
                            {(images.length > 0 || app.videoUrl) && (
                                <section aria-labelledby="screenshots-heading">
                                    <SectionTitle id="screenshots-heading">Screenshots</SectionTitle>
                                    <ProductGallery appName={app.name ?? ""} images={images} videoUrl={app.videoUrl} embedded/>
                                </section>
                            )}

                            {app.description && (
                                <section aria-labelledby="description-heading">
                                    <SectionTitle id="description-heading">Description</SectionTitle>
                                    <ShowMore collapsedHeight={280}>
                                        <div className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed prose-headings:text-white prose-headings:font-bold">
                                            <MarkdownRenderer content={app.description}/>
                                        </div>
                                    </ShowMore>
                                </section>
                            )}

                            {latestVersion?.content && (
                                <section aria-labelledby="whats-new-heading">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-5">
                                        <h2 id="whats-new-heading" className="text-xl md:text-2xl font-bold text-white">
                                            What&apos;s new in {latestVersion.version}
                                        </h2>
                                        {latestVersion.publishedAt && (
                                            <span className="text-sm text-slate-400">{formatReleaseDate(latestVersion.publishedAt)}</span>
                                        )}
                                    </div>
                                    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                                        <ShowMore collapsedHeight={220}>
                                            <div className="prose prose-invert prose-slate prose-sm max-w-none text-slate-300 prose-headings:text-white">
                                                <MarkdownRenderer content={withoutWhatsNewHeading(latestVersion.content)}/>
                                            </div>
                                        </ShowMore>
                                        <Link href={`/changelogs/${latestVersion.id}`}
                                              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white">
                                            Full release notes <ArrowRight className="w-4 h-4"/>
                                        </Link>
                                    </div>
                                </section>
                            )}

                            {/* screenshots with a text, image and text alternating sides */}
                            {features.length > 0 && (
                                <section aria-labelledby="features-heading">
                                    <SectionTitle id="features-heading">Features</SectionTitle>
                                    <div className="space-y-12">
                                        {features.map((feature, index) => (
                                            <div key={feature.url + index}
                                                 className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-6 md:gap-10`}>
                                                <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/50">
                                                    <ZoomableImage src={feature.url} alt={`Feature ${index + 1} of ${app.name}`}/>
                                                </div>
                                                <div className="w-full md:w-1/2 prose prose-invert prose-slate max-w-none text-slate-400 prose-headings:text-white prose-headings:font-bold prose-headings:text-2xl prose-h2:mt-0">
                                                    <MarkdownRenderer content={feature.text ?? ""}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* posts linked to this app in the console, the newest first */}
                            {posts.length > 0 && (
                                <section aria-labelledby="news-heading">
                                    <div className="flex items-end justify-between mb-5">
                                        <h2 id="news-heading" className="text-xl md:text-2xl font-bold text-white">News about {app.name}</h2>
                                        <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition">All posts →</Link>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        {posts.map(post => (
                                            <NewsCard
                                                key={post.id}
                                                id={post.id}
                                                slug={post.slug}
                                                title={post.title}
                                                description={post.description}
                                                category={post.category}
                                                imageUrl={post.imageUrl}
                                                readingTimeMinutes={post.readingTimeMinutes}
                                                date={post.publishedAt ? formatReleaseDate(String(post.publishedAt)) : undefined}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            <section aria-labelledby="info-heading">
                                <SectionTitle id="info-heading">Additional information</SectionTitle>
                                <dl className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                                    {facts.map(fact => (
                                        <div key={fact.label}>
                                            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">{fact.label}</dt>
                                            <dd className="mt-1 text-sm text-slate-200">{fact.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
