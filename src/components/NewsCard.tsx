import Image from "next/image";
import Link from "next/link";

type NewsCardProps = {
    id?: number;
    title?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
};

export default function NewsCard({
                                     id,
                                     title = "Kein Titel",
                                     description = "Keine Beschreibung",
                                     imageUrl = "/logo.svg",
                                     category = "Allgemein"
                                 }: NewsCardProps) {

    const linkTarget = id ? `/blog/${id}` : "#";

    return (
        <article className="group relative bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-slate-800 transition duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col h-full shadow-2xl">

            <div className="relative h-48 w-full overflow-hidden bg-slate-800">

                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60"></div>

                <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-md text-[10px] font-bold tracking-wider bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-sm">
          {category}
        </span>

                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 text-white transition leading-tight">
                    {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {description}
                </p>

                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-blue-500 group-hover:gap-3 transition-all">
                    <Link href={linkTarget} className="inset-0 absolute z-30">
                    </Link>
                    <span>Artikel lesen</span>
                    <span>→</span>
                </div>
            </div>
        </article>
    );
}