// src/app/blog/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { getBlogPosts } from "@/libs/api";

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <Header />

            <div className="pt-32 pb-12 px-6 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Unser Blog</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Neuigkeiten, Tutorials und Deep-Dives in die Welt von Adeptstack.
                    </p>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <NewsCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            description={post.description}
                            category={post.category}
                            imageUrl={post.imageUrl}
                        />
                    ))}
                </div>

            </main>

            <Footer />
        </div>
    );
}