import Image from "next/image";
import Link from "next/link";
import {Download} from "lucide-react";
import {App} from "@/Models/app";
import AppIcon from "@/components/product/AppIcon";
import {PlatformIcon, parsePlatforms, platformName} from "@/components/product/platforms";
import {coverImage, productBadge} from "@/libs/productList";

const TONES = {
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/25",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/25",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
    slate: "bg-slate-800 text-slate-400 border-slate-700",
};

/**
 * A product in the catalogue like a store tile: the picture of the app on top, the icon on its edge, then name,
 * category, slogan and what it runs on. The whole tile leads to the product page, where the app is to be had.
 */
export default function ProductTile({app}: { app: App }) {
    const cover = coverImage(app);
    const badge = productBadge(app);
    const platforms = parsePlatforms(app.platforms);
    const version = app.latestMainVersion?.version;

    return (
        <Link
            href={`/products/${app.slug}`}
            className={`group flex flex-col rounded-2xl border bg-slate-900/60 overflow-hidden transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-blue-500 ${
                app.legacy ? "border-slate-800/70 hover:border-slate-700" : "border-slate-800 hover:border-slate-600 hover:bg-slate-900"
            }`}
        >
            <div className="relative aspect-video bg-linear-to-br from-slate-800 via-slate-900 to-slate-950 overflow-hidden">
                {cover ? (
                    <Image src={cover} alt="" fill quality={60}
                           sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
                           className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${app.legacy ? "grayscale-[60%] opacity-80" : ""}`}/>
                ) : (
                    // without a picture the icon stands in, large and quiet
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <div className="w-24 h-24 flex items-center justify-center"><AppIcon src={app.iconUrl}/></div>
                    </div>
                )}
                {badge && (
                    <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-md border text-[11px] font-bold uppercase tracking-wider bg-slate-950/85 ${TONES[badge.tone]}`}>
                        {badge.text}
                    </span>
                )}
            </div>

            <div className="relative flex flex-col grow px-5 pb-5">
                <div className="-mt-8 mb-3 w-16 h-16 rounded-2xl bg-slate-950 border-4 border-slate-900 p-2 shadow-lg flex items-center justify-center">
                    <AppIcon src={app.iconUrl} name={app.name}/>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">{app.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                    {app.category ? <>{app.category} · </> : null}Adeptstack
                </p>
                {app.slogan && <p className="mt-2.5 text-sm text-slate-400 leading-relaxed line-clamp-2">{app.slogan}</p>}

                <div className="mt-auto pt-4 flex items-center gap-3 text-slate-500">
                    {platforms.length > 0 && (
                        <ul className="flex items-center gap-2" aria-label="Platforms">
                            {platforms.map(platform => (
                                <li key={platform} title={platformName(platform)}>
                                    <PlatformIcon platform={platform} size={14}/>
                                    <span className="sr-only">{platformName(platform)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <span className="ml-auto flex items-center gap-3 text-xs">
                        {app.downloadsFormatted && (
                            <span className="flex items-center gap-1"
                                  title={app.downloads !== undefined ? `${app.downloads.toLocaleString("en-US")} downloads` : undefined}>
                                <Download className="w-3.5 h-3.5"/> {app.downloadsFormatted}
                            </span>
                        )}
                        {version && <span className="font-mono text-slate-400">v{version.replace(/^v/i, "")}</span>}
                    </span>
                </div>
            </div>
        </Link>
    );
}
