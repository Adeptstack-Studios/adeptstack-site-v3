import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { getBlogPosts } from "@/libs/getNews";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "News | Adeptstack",
    description: "Keep up-to-date.",
};

export default async function BlogPage() {
    const posts = await getBlogPosts();

    console.log(`[BlogPage] Found Posts: ${posts?.length}`);

    if (!posts || !Array.isArray(posts)) {
        console.error("[BlogPage] API returned no array!", posts);
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <p>Error loading blog entries.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <Header />

            <div className="pt-32 pb-12 px-6 bg-linear-to-b from-slate-900 to-slate-950 border-b border-white/5">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Posts</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        News, tutorials, and deep dives into the world of Adeptstack.
                    </p>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => {
                        if (!post || !post.id) {
                            console.warn(`[BlogPage] Post at Index ${index} is incorrect (no ID). Skip...`, post);
                            return null;
                        }

                        return (
                            <NewsCard
                                key={post.id}
                                id={post.id}
                                title={post.title || "without title"}
                                description={post.description}
                                category={post.category}
                                imageUrl={post.imageUrl}
                            />
                        );
                    })}
                </div>
            </main>
            <Footer />
        </div>
    );
}