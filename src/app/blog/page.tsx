import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { getBlogPosts } from "@/libs/getNews";
import type { Metadata } from "next";
import Link from "next/link";
// WICHTIG: Layers und Calendar hier hinzufügen!
import { Tag, Search, ArrowRight, Layers, Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "News | Adeptstack",
    description: "Keep up-to-date.",
};

export default async function BlogPage({ searchParams }: {
    searchParams: Promise<{ category?: string; q?: string }>;
}) {
    const params = await searchParams;
    const activeCategory = params?.category || "all";
    const searchQuery = params?.q || "";

    const posts = await getBlogPosts();

    if (!posts || !Array.isArray(posts)) {
        console.error("[BlogPage] API returned no array!", posts);
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
                <p className="text-slate-400 text-lg">Error loading blog entries.</p>
            </div>
        );
    }

    const categories = Array.from(new Set(posts.map(p => p.category).filter((cat): cat is string => !!cat)));

    let filteredPosts = posts;

    if (activeCategory !== "all") {
        filteredPosts = filteredPosts.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());
    }

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(p =>
            (p.title && p.title.toLowerCase().includes(q)) ||
            (p.description && p.description.toLowerCase().includes(q))
        );
    }

    const featuredPost = filteredPosts[0];
    const remainingPosts = filteredPosts.slice(1);

    // Datum für den Hero-Post formatieren
    const featuredFormattedDate = featuredPost?.publishedAt
        ? new Date(featuredPost.publishedAt).toLocaleDateString('en-EN', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : "Unknown Date";

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

                    <form method="GET" action="/blog" className="w-full max-w-md relative mb-6">
                        {activeCategory !== "all" && (
                            <input type="hidden" name="category" value={activeCategory} />
                        )}
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
                    </form>

                    {categories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pb-2">
                            <Link
                                href={`/blog${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}
                                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    activeCategory === "all"
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
                            >
                                All Posts
                            </Link>
                            {categories.map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/blog?category=${encodeURIComponent(cat.toLowerCase())}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
                                        activeCategory === cat.toLowerCase()
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                            : "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="grow max-w-7xl mx-auto w-full px-6 md:px-12 py-12 relative z-10">

                {featuredPost && (
                    <div className="mb-12">
                        <Link
                            href={`/blog/${featuredPost.id}`}
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

                                {/* Meta-Infos: Highlight-Tag, Kategorie & Datum */}
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
                                        {featuredFormattedDate}
                                    </div>
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

                {remainingPosts.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {remainingPosts.map((post) => {
                            if (!post || !post.id) return null;
                            return (
                                <NewsCard
                                    key={post.id}
                                    id={post.id}
                                    title={post.title || "without title"}
                                    description={post.description}
                                    category={post.category}
                                    imageUrl={post.imageUrl}
                                    date={post.publishedAt? new Date(post.publishedAt).toLocaleDateString('en-EN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "Unknown Date"}
                                />
                            );
                        })}
                    </div>
                )}

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl">
                        <p className="text-slate-400 text-lg mb-2">No posts found.</p>
                        {searchQuery && (
                            <p className="text-slate-500 text-sm">Try adjusting your search query "{searchQuery}".</p>
                        )}
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}