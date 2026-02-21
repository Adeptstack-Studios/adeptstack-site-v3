import {notFound} from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {getPostById} from "@/libs/getNews";
import Link from "next/link";
import Image from "next/image";
import {Metadata} from "next";

export async function generateMetadata(
    {params}: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getPostById(resolvedParams.id);

    if (!post) {
        return {title: "404 Not Found | Adeptstack"};
    }

    const ogImageUrl = post.imageUrl || "/logo.svg";

    return {
        title: `${post.title} | Adeptstack Blog`,
        description: post.description || ``,
        openGraph: {
            title: post.title,
            description: post.description || "",
            images: ogImageUrl ? [{url: ogImageUrl}] : [],
        },
    };
}

type Props = {
    params: Promise<{ id: string }>;
};

export default async function BlogPostPage({params}: Props) {
    const {id} = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-EN", {day: '2-digit', month: 'long', year: 'numeric'})
        : "";

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <Header/>
            <main className="pt-32 pb-20">
                <article className="max-w-4xl mx-auto px-6">

                    <Link href="/blog"
                          className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition group">
                        <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span>
                        go back
                    </Link>

                    <div className="flex gap-4 items-center mb-6 text-sm">
                        {post.category && (
                            <span
                                className="px-3 py-1 rounded bg-blue-900/30 text-blue-400 border border-blue-800 font-bold tracking-wider">
                {post.category}
              </span>
                        )}
                        <span className="text-slate-500">{formattedDate}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div
                        className="relative w-full h-100 mb-12 rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
                        <Image src={post.imageUrl || "/logo.svg"} alt={post.title || "Blog Post"} fill
                               className="object-cover opacity-80"/>
                    </div>

                    <MarkdownRenderer content={post.content || "No content available."}/>

                </article>
            </main>
            <Footer/>
        </div>
    );
}