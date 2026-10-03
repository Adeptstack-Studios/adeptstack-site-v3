import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Tag, Search } from "lucide-react";
import { getApps } from "@/libs/getApps";
import { CHANGELOG_SORTS, getChangelogChannels, getChangelogPage } from "@/libs/getChangelogs";
import { buildQuery, DEFAULT_PAGE_SIZE, pageCount, parsePage, parsePageSize, parseSort } from "@/libs/listing";
import type { Metadata } from "next";
import ChangelogCard from "@/components/ChangelogCard";
import Pagination from "@/components/Pagination";
import SortSelect from "@/components/SortSelect";

export const metadata: Metadata = {
    title: "Changelogs | Adeptstack",
    description: "Archive of all changelogs.",
};

type ChangelogSearchParams = { app?: string; channel?: string; q?: string; sort?: string; page?: string; size?: string };

/** Values that stay out of the url, so the plain listing keeps its plain address. */
const URL_DEFAULTS = { sort: CHANGELOG_SORTS[0].key, page: 1, size: DEFAULT_PAGE_SIZE };

const chip = "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200";
const chipActive = "bg-blue-600 text-white shadow-lg shadow-blue-500/20";
const chipIdle = "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white";

export default async function ChangelogsPage({ searchParams }: { searchParams: Promise<ChangelogSearchParams> }) {
    const params = await searchParams;
    const activeApp = params?.app?.trim() || "";
    const activeChannel = params?.channel?.trim().toLowerCase() || "";
    const searchQuery = params?.q?.trim() || "";
    const sort = parseSort(params?.sort, CHANGELOG_SORTS);
    const page = parsePage(params?.page);
    const size = parsePageSize(params?.size);

    const href = (overrides: Partial<{ app: string; channel: string; page: number; size: number }>) =>
        `/changelogs${buildQuery({ app: activeApp, channel: activeChannel, q: searchQuery, sort: sort.key, page, size, ...overrides }, URL_DEFAULTS)}`;

    const apps = await getApps(true);

    // older links name the app instead of using its slug, so both are accepted here
    const selectedApp = activeApp ? apps.find(a =>
        a.slug?.toLowerCase() === activeApp.toLowerCase() ||
        a.name?.toLowerCase() === activeApp.toLowerCase()
    ) : undefined;
    // an app we do not know still goes to the backend, which then matches nothing
    const appFilter = selectedApp?.id ?? (activeApp || undefined);

    const [result, channels] = await Promise.all([
        getChangelogPage({ app: appFilter, channel: activeChannel || undefined, q: searchQuery || undefined, sort: sort.api, page, size }),
        getChangelogChannels(appFilter),
    ]);

    // e.g. an old link to page 5 after entries were removed: show the last page that exists
    const lastPage = pageCount(result.total, size);
    if (result.total > 0 && page > lastPage) redirect(href({ page: lastPage }));

    const changelogsWithAppName = result.items.map(log => {
        const app = apps.find(a => a.id === log.appId);
        return { ...log, appName: app?.name || "Unknown App" };
    });
    const hasFilters = Boolean(activeApp || activeChannel || searchQuery);
    // a single channel is no choice, unless it is the one filtered by
    const showChannels = channels.length > 1 || Boolean(activeChannel);

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

                    {/* search and sort share one form, so each keeps the other when submitted */}
                    <form method="GET" action="/changelogs" className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 mb-6">
                        {activeApp && <input type="hidden" name="app" value={activeApp} />}
                        {activeChannel && <input type="hidden" name="channel" value={activeChannel} />}
                        {size !== DEFAULT_PAGE_SIZE && <input type="hidden" name="size" value={size} />}
                        <div className="relative grow">
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
                        </div>
                        <SortSelect options={CHANGELOG_SORTS} value={sort.key} />
                    </form>
                </div>

                <div className="max-w-5xl mx-auto w-full relative z-10">
                    <div className="mb-12 pb-6 border-b border-slate-800 flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            {/* switching the app drops the channel: the new app may not have it */}
                            <Link href={href({ app: "", channel: "", page: 1 })} className={`${chip} ${activeApp ? chipIdle : chipActive}`}>
                                All Apps
                            </Link>

                            {apps.map((appItem) => {
                                if (!appItem.name) return null;
                                const queryParam = appItem.slug || appItem.name;
                                const isActive = selectedApp?.id === appItem.id;

                                return (
                                    <Link
                                        key={appItem.id}
                                        href={href({ app: queryParam, channel: "", page: 1 })}
                                        className={`${chip} ${isActive ? chipActive : chipIdle}`}
                                    >
                                        {appItem.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {showChannels && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate-500 mr-1">Channel</span>
                                <Link
                                    href={href({ channel: "", page: 1 })}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${activeChannel ? chipIdle : chipActive}`}
                                >
                                    All
                                </Link>
                                {channels.map((channel) => {
                                    const isActive = activeChannel === channel.name.toLowerCase();
                                    return (
                                        <Link
                                            key={channel.name}
                                            href={href({ channel: channel.name.toLowerCase(), page: 1 })}
                                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 inline-flex items-center gap-2 ${isActive ? chipActive : chipIdle}`}
                                        >
                                            {channel.name}
                                            <span className={`font-mono ${isActive ? "text-blue-100" : "text-slate-500"}`}>{channel.count}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
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
                                    <p className="text-slate-500 text-sm">Try adjusting your search query &#34;{searchQuery}&#34;.</p>
                                )}
                                {hasFilters && (
                                    <Link href="/changelogs" className="inline-block mt-6 text-sm font-semibold text-blue-400 hover:text-blue-300">
                                        Clear all filters
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <Pagination
                        page={page}
                        size={size}
                        total={result.total}
                        noun={result.total === 1 ? "entry" : "entries"}
                        hrefFor={(target, targetSize) => href({ page: target, size: targetSize })}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
