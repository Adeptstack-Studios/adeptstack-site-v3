import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPostById } from "@/libs/getNews";
import Image from "next/image";
import { safeImageSrc } from "@/libs/utils";
import { Metadata } from "next";
import BackButton from "@/components/BackButton"; // <-- Der neue Button!
import { Calendar, Layers } from "lucide-react"; // Icons für den einheitlichen Look

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getPostById(resolvedParams.id);

    if (!post) {
        return { title: "404 Not Found | Adeptstack" };
    }

    const ogImageUrl = post.imageUrl || "/logo.svg";

    return {
        title: `${post.title} | Adeptstack Blog`,
        description: post.description || "",
        openGraph: {
            title: post.title,
            description: post.description || "",
            images: ogImageUrl ? [{ url: ogImageUrl }] : [],
        },
    };
}

type Props = {
    params: Promise<{ id: string }>;
};

export default async function BlogPostPage({ params }: Props) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
        : "";

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col text-white font-sans selection:bg-blue-500/30">
            <Header />
            <main className="grow pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

                <article className="max-w-3xl mx-auto w-full relative z-10">

                    <BackButton fallbackUrl={"/blog"} />

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {post.category && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase">
                                <Layers className="w-3.5 h-3.5" /> {post.category}
                            </span>
                        )}
                        {formattedDate && (
                            <span className="flex items-center gap-1.5 text-slate-400 text-sm ml-auto">
                                <Calendar className="w-4 h-4" /> {formattedDate}
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                        <Image
                            src={safeImageSrc(post.imageUrl)}
                            alt={post.title || "Blog Post"}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Einheitlicher Markdown-Container */}
                    <div className="prose prose-invert prose-slate prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-none bg-slate-900/30 border border-slate-800/50 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
                        <MarkdownRenderer content={post.content || "No content available."} />
                    </div>

                </article>
            </main>
            <Footer />
        </div>
    );
}