import Image from "next/image";
import Link from "next/link";
import { Calendar, Layers, ArrowRight } from "lucide-react";
import { safeImageSrc } from "@/libs/utils";

type NewsCardProps = {
    id?: number;
    title?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    date?: string;
};

export default function NewsCard({
                                     id,
                                     title = "no title",
                                     description = "no description",
                                     imageUrl = "/logo.svg",
                                     category = "general",
                                     date = "Unknown Date"
                                 }: NewsCardProps) {
    const linkTarget = id ? `/blog/${id}` : "#";

    return (
        <Link
            href={linkTarget}
            className="flex flex-col h-full group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 hover:bg-slate-900 transition-all shadow-lg"
        >
            <div className="w-full h-40 relative overflow-hidden bg-slate-800 shrink-0">
                <Image
                    src={safeImageSrc(imageUrl)}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="p-5 flex flex-col grow">

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs font-medium">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span className="truncate max-w-[140px] uppercase">{category}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {date}
                    </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4 grow">
                    {description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center gap-1.5 text-blue-500 text-sm font-semibold opacity-80 group-hover:opacity-100 transition-all">
                    Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>

            </div>
        </Link>
    );
}