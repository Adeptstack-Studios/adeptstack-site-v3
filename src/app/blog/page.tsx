import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import Pagination from "@/components/Pagination";
import SortSelect from "@/components/SortSelect";
import { BLOG_SORTS, getBlogCategories, getBlogPage } from "@/libs/getNews";
import { blogHref } from "@/libs/utils";
import { buildQuery, DEFAULT_PAGE_SIZE, formatListDate, pageCount, parsePage, parsePageSize, parseSort } from "@/libs/listing";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Tag, Search, ArrowRight, Layers, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
    title: "News | Adeptstack",
    description: "Keep up-to-date.",
};

type BlogSearchParams = { category?: string; q?: string; sort?: string; page?: string; size?: string };

/** Values that stay out of the url, so the plain listing keeps its plain address. */
const URL_DEFAULTS = { sort: BLOG_SORTS[0].key, page: 1, size: DEFAULT_PAGE_SIZE };

const chip = "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200";
const chipActive = "bg-blue-600 text-white shadow-lg shadow-blue-500/20";
const chipIdle = "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white";

export default async function BlogPage({ searchParams }: { searchParams: Promise<BlogSearchParams> }) {
    const params = await searchParams;
    const activeCategory = params?.category?.trim().toLowerCase() || "";
    const searchQuery = params?.q?.trim() || "";
    const sort = parseSort(params?.sort, BLOG_SORTS);
    const page = parsePage(params?.page);
    const size = parsePageSize(params?.size);

    const href = (overrides: Partial<{ category: string; page: number; size: number }>) =>
        `/blog${buildQuery({ category: activeCategory, q: searchQuery, sort: sort.key, page, size, ...overrides }, URL_DEFAULTS)}`;

    const [result, categories] = await Promise.all([
        getBlogPage({ category: activeCategory || undefined, q: searchQuery || undefined, sort: sort.api, page, size }),
        getBlogCategories(),
    ]);

    // e.g. an old link to page 5 after posts were removed: show the last page that exists
    const lastPage = pageCount(result.total, size);
    if (result.total > 0 && page > lastPage) redirect(href({ page: lastPage }));

    const posts = result.items;
    // the highlight is the newest post, so it only belongs on top of the newest-first view
    const featuredPost = page === 1 && sort.key === "newest" ? posts[0] : undefined;
    const gridPosts = featuredPost ? posts.slice(1) : posts;
    const hasFilters = Boolean(activeCategory || searchQuery);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header />

            {/* VISUAL ACCENTS & HEADER */}
            <div className="pt-32 pb-8 relative overflow-hidden shrink-0 border-b border-slate-800/50 bg-linear-to-b from-slate-900/50 to-slate-950">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col items-start text-left">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase mb-6">
                        <Tag className="w-3 h-3" /> Adeptstack News
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        Blog Posts
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mb-8">
                        News, tutorials, and deep dives into the world of Adeptstack.
                    </p>

                    {/* search and sort share one form, so each keeps the other when submitted */}
                    <form method="GET" action="/blog" className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 mb-6">
                        {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
                        {size !== DEFAULT_PAGE_SIZE && <input type="hidden" name="size" value={size} />}
                        <div className="relative grow">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-slate-500" />
                            </div>
                            <input
                                type="text"
                                name="q"
                                defaultValue={searchQuery}
                                placeholder="Search articles... (Press Enter)"
                                className="w-full bg-slate-900/50 border border-slate-800 text-slate-300 text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all placeholder:text-slate-600 shadow-inner"
                            />
                        </div>
                        <SortSelect options={BLOG_SORTS} value={sort.key} />
                    </form>

                    {categories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pb-2">
                            <Link href={href({ category: "", page: 1 })} className={`${chip} ${activeCategory ? chipIdle : chipActive}`}>
                                All Posts
                            </Link>
                            {categories.map((category) => {
                                const isActive = activeCategory === category.name.toLowerCase();
                                return (
                                    <Link
                                        key={category.name}
                                        href={href({ category: category.name.toLowerCase(), page: 1 })}
                                        className={`${chip} capitalize inline-flex items-center gap-2 ${isActive ? chipActive : chipIdle}`}
                                    >
                                        {category.name}
                                        <span className={`text-xs font-mono ${isActive ? "text-blue-100" : "text-slate-500"}`}>
                                            {category.count}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="grow max-w-7xl mx-auto w-full px-6 md:px-12 py-12 relative z-10">

                {featuredPost && (
                    <div className="mb-12">
                        <Link
                            href={blogHref(featuredPost)}
                            className="group flex flex-col md:flex-row gap-6 md:gap-8 bg-slate-900/40 border border-slate-800 rounded-2xl p-4 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all items-center shadow-lg"
                        >
                            {/* Bild ohne Hover-Zoom und ohne Badge */}
                            <div className="w-full md:w-1/2 aspect-video relative overflow-hidden rounded-xl bg-slate-800 shrink-0">
                                <img
                                    src={featuredPost.imageUrl || "/placeholder.jpg"}
                                    alt={featuredPost.title || "Featured"}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col py-4 md:pr-6 grow w-full">

                                {/* Meta-Infos: Highlight-Tag, Kategorie, Datum & Lesezeit */}
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase tracking-wide">
                                        Latest Highlight
                                    </span>
                                    <div className="flex items-center gap-1.5 text-slate-300 text-xs font-medium">
                                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                                        <span className="uppercase">{featuredPost.category || "General"}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {formatListDate(featuredPost.publishedAt)}
                                    </div>
                                    {featuredPost.readingTimeMinutes !== undefined && (
                                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                                            <Clock className="w-3.5 h-3.5" />
                                            {featuredPost.readingTimeMinutes} min read
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {featuredPost.title || "without title"}
                                </h2>
                                <p className="text-slate-400 text-base leading-relaxed mb-6 line-clamp-3">
                                    {featuredPost.description}
                                </p>
                                <div className="mt-auto inline-flex items-center gap-2 text-blue-500 text-sm font-semibold opacity-80 group-hover:opacity-100 transition-all">
                                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {gridPosts.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gridPosts.map((post) => {
                            if (!post || !post.id) return null;
                            return (
                                <NewsCard
                                    key={post.id}
                                    id={post.id}
                                    slug={post.slug}
                                    title={post.title || "without title"}
                                    description={post.description}
                                    category={post.category}
                                    imageUrl={post.imageUrl}
                                    date={formatListDate(post.publishedAt)}
                                    readingTimeMinutes={post.readingTimeMinutes}
                                />
                            );
                        })}
                    </div>
                )}

                {posts.length === 0 && (
                    <div className="text-center py-20 bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl">
                        <p className="text-slate-400 text-lg mb-2">No posts found.</p>
                        {searchQuery && (
                            <p className="text-slate-500 text-sm">Try adjusting your search query &#34;{searchQuery}&#34;.</p>
                        )}
                        {hasFilters && (
                            <Link href="/blog" className="inline-block mt-6 text-sm font-semibold text-blue-400 hover:text-blue-300">
                                Clear all filters
                            </Link>
                        )}
                    </div>
                )}

                <Pagination
                    page={page}
                    size={size}
                    total={result.total}
                    noun={result.total === 1 ? "post" : "posts"}
                    hrefFor={(target, targetSize) => href({ page: target, size: targetSize })}
                />

            </main>
            <Footer />
        </div>
    );
}
