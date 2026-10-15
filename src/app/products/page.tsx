import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {Archive, Search} from "lucide-react";
import type {Metadata} from "next";
import SortSelect from "@/components/SortSelect";
import ProductTile from "@/components/product/ProductTile";
import Spotlight, {SpotlightItem} from "@/components/product/Spotlight";
import {parsePlatforms, platformName} from "@/components/product/platforms";
import {getApps} from "@/libs/getApps";
import {buildQuery} from "@/libs/listing";
import {
    coverImage, matchesSearch, PRODUCT_SORTS, ProductSort, productCategories, productPlatforms, sortProducts,
} from "@/libs/productList";

export const metadata: Metadata = {
    title: "Products | Adeptstack",
    description: "All Adeptstack apps, tools and mods.",
};

type ProductSearchParams = { category?: string; platform?: string; q?: string; sort?: string };

/** Values that stay out of the url, so the plain catalogue keeps its plain address. */
const URL_DEFAULTS = {sort: PRODUCT_SORTS[0].key};

const chip = "shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors";
const chipActive = "bg-blue-600 text-white";
const chipIdle = "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white";

/**
 * The catalogue, like the start of a store: the featured apps large on top, then every app as a tile, to
 * filter by category and platform, to search and to sort. Apps that are no longer developed come last,
 * in a section of their own. Everything works by url, without JavaScript too.
 */
export default async function ProductsPage({searchParams}: { searchParams: Promise<ProductSearchParams> }) {
    const params = await searchParams;
    const category = params?.category?.trim().toLowerCase() || "";
    const platform = params?.platform?.trim().toLowerCase() || "";
    const query = params?.q?.trim() || "";
    const sort: ProductSort = PRODUCT_SORTS.find(option => option.key === params?.sort)?.key ?? PRODUCT_SORTS[0].key;

    const href = (overrides: Partial<ProductSearchParams>) =>
        `/products${buildQuery({category, platform, q: query, sort, ...overrides}, URL_DEFAULTS)}`;

    const apps = await getApps();
    const categories = productCategories(apps);
    const platforms = productPlatforms(apps);

    const shown = sortProducts(apps.filter(app =>
        (!category || app.category?.trim().toLowerCase() === category)
        && (!platform || parsePlatforms(app.platforms).includes(platform))
        && (!query || matchesSearch(app, query))
    ), sort);
    const current = shown.filter(app => !app.legacy);
    const legacy = shown.filter(app => app.legacy);

    const filtered = Boolean(category || platform || query);
    // the banner belongs to the plain catalogue; while looking for something it is in the way
    const spotlight: SpotlightItem[] = filtered ? [] : sortProducts(apps, "featured")
        .filter(app => app.highlighted && !app.legacy && app.slug)
        .map(app => ({
            slug: app.slug!,
            name: app.name ?? "",
            slogan: app.slogan,
            category: app.category,
            iconUrl: app.iconUrl,
            cover: coverImage(app),
            platforms: parsePlatforms(app.platforms),
        }));

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header/>

            <main className="grow pt-28 pb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Products</h1>
                        <p className="mt-3 text-slate-400 text-lg max-w-2xl">
                            Apps, tools and mods by Adeptstack. Small, fast and made to be used.
                        </p>
                    </div>

                    {spotlight.length > 0 && (
                        <div className="mb-16">
                            <Spotlight items={spotlight}/>
                        </div>
                    )}

                    <section aria-labelledby="catalogue-heading">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-5">
                            <h2 id="catalogue-heading" className="text-2xl font-bold text-white">
                                {filtered ? "Results" : "All apps"}
                                <span className="ml-3 text-base font-medium text-slate-500">{shown.length}</span>
                            </h2>

                            {/* search, platform and sort share one form, so each keeps the others when sent */}
                            <form method="GET" action="/products" className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                {category && <input type="hidden" name="category" value={category}/>}
                                <label className="relative grow sm:min-w-64">
                                    <span className="sr-only">Search apps</span>
                                    <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"/>
                                    <input type="search" name="q" defaultValue={query} placeholder="Search apps"
                                           className="w-full bg-slate-900/50 border border-slate-800 text-slate-300 text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-colors placeholder:text-slate-600"/>
                                </label>
                                {platforms.length > 1 && (
                                    <SortSelect name="platform" label="Platform" icon="platform" value={platform}
                                                options={[{key: "", label: "All platforms"}, ...platforms.map(key => ({key, label: platformName(key)}))]}/>
                                )}
                                <SortSelect options={PRODUCT_SORTS} value={sort}/>
                            </form>
                        </div>

                        {categories.length > 1 && (
                            // one row to swipe on phones, wrapping from tablets up
                            <nav aria-label="Categories"
                                 className="-mx-6 px-6 sm:mx-0 sm:px-0 flex sm:flex-wrap gap-2 mb-8 overflow-x-auto sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                <Link href={href({category: ""})} aria-current={category ? undefined : "page"}
                                      className={`${chip} ${category ? chipIdle : chipActive}`}>
                                    All
                                </Link>
                                {categories.map(entry => {
                                    const active = category === entry.name.toLowerCase();
                                    return (
                                        <Link key={entry.name} href={href({category: entry.name.toLowerCase()})}
                                              aria-current={active ? "page" : undefined}
                                              className={`${chip} ${active ? chipActive : chipIdle}`}>
                                            {entry.name}
                                            <span className={`text-xs font-mono ${active ? "text-blue-100" : "text-slate-500"}`}>{entry.count}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        )}

                        {current.length > 0 && (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {current.map(app => <ProductTile key={app.id ?? app.slug} app={app}/>)}
                            </div>
                        )}

                        {legacy.length > 0 && (
                            <div className={current.length > 0 ? "mt-16" : ""}>
                                <div className="flex items-center gap-3 mb-2">
                                    <Archive className="w-5 h-5 text-slate-500"/>
                                    <h3 className="text-xl font-bold text-slate-300">Legacy</h3>
                                </div>
                                <p className="text-sm text-slate-500 mb-6 max-w-2xl">
                                    No longer actively developed. These still work and get security fixes or small updates.
                                </p>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {legacy.map(app => <ProductTile key={app.id ?? app.slug} app={app}/>)}
                                </div>
                            </div>
                        )}

                        {shown.length === 0 && (
                            <div className="text-center py-20 bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl">
                                <p className="text-slate-300 text-lg mb-2">
                                    {apps.length === 0 ? "No apps to show right now." : "No app matches."}
                                </p>
                                {filtered && (
                                    <Link href="/products" className="text-sm text-blue-400 hover:text-blue-300">Show all apps</Link>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <Footer/>
        </div>
    );
}
