// src/components/NewsSection.tsx
import Link from "next/link";
import NewsCard from "./NewsCard";
import { News } from "@/libs/getNews"; // Typ importieren

type NewsSectionProps = {
    posts: News[]; // Hier nutzen wir jetzt deinen Typen
};

export default function NewsSection({ posts }: NewsSectionProps) {
    return (
        <section id="news" className="relative z-30 mt-12 px-6 pb-32">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-end justify-between mb-8 px-2">
                    <h2 className="text-3xl font-bold text-white">Aktuelles</h2>
                    <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition">Alle anzeigen →</Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map((item) => (
                        <NewsCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            category={item.category}
                            imageUrl={item.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}