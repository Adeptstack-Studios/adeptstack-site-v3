"use client";

import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import AppIcon from "@/components/product/AppIcon";
import {PlatformIcon, platformName} from "@/components/product/platforms";

/** What the spotlight needs of an app, prepared on the server. */
export interface SpotlightItem {
    slug: string;
    name: string;
    slogan?: string;
    category?: string;
    iconUrl?: string;
    cover?: string;
    platforms: string[];
}

/**
 * The featured apps on top of the catalogue, one large at a time like the banner of a store, with the others
 * to pick next to it. All banners lie on top of each other and only fade, so a change costs no layout; only the
 * first picture loads right away.
 *
 * It turns to the next app by itself. The timer is the progress bar of the active choice: when its animation
 * ends, the next app comes, so bar and change can never drift apart. It holds while the pointer or the focus is
 * on it or it is out of view, and does not run at all for people who asked for reduced motion.
 */
export default function Spotlight({items}: { items: SpotlightItem[] }) {
    const section = useRef<HTMLElement>(null);
    const [current, setCurrent] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [inView, setInView] = useState(true);

    useEffect(() => {
        const element = section.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {threshold: 0.5});
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    if (items.length === 0) return null;

    const turning = items.length > 1;
    const paused = hovered || focused || !inView;
    const next = () => setCurrent(shown => (shown + 1) % items.length);

    /** fills while the app is shown; hidden for reduced motion, which also stops the turning */
    const progress = (className: string) => (
        <span key={current} aria-hidden="true" onAnimationEnd={next}
              style={{animationPlayState: paused ? "paused" : "running"}}
              className={`absolute inset-0 origin-left animate-[spotlight-progress_8s_linear_forwards] motion-reduce:hidden ${className}`}/>
    );

    return (
        <section ref={section} aria-roledescription="carousel" aria-label="Featured apps"
                 onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                 // only the keyboard holds it; a clicked choice keeps the focus, and the turning would never come back
                 onFocus={event => setFocused(event.target.matches(":focus-visible"))}
                 onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
                 className="relative h-[440px] md:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900">
            {items.map((item, index) => {
                const active = index === current;
                return (
                    <div key={item.slug} aria-hidden={!active} inert={!active}
                         className={`absolute inset-0 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}>
                        {item.cover ? (
                            <Image src={item.cover} alt="" fill quality={60} priority={index === 0}
                                   sizes="(min-width: 1280px) 1232px, 100vw" className="object-cover"/>
                        ) : (
                            <div className="absolute inset-0 bg-linear-to-br from-blue-950 via-slate-900 to-slate-950"/>
                        )}
                        {/* dark where the text is: from the left on wide screens, from below on phones */}
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-slate-950/10 md:bg-linear-to-r md:from-slate-950/95 md:via-slate-950/60 md:to-transparent"/>
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-slate-950/80 to-transparent"/>

                        <div className="relative h-full flex flex-col justify-end md:justify-center p-6 pb-14 md:p-12 md:pb-12 max-w-xl">
                            <span className="self-start px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-bold uppercase tracking-wider">
                                Featured
                            </span>
                            <div className="mt-5 flex items-center gap-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl bg-slate-950/90 border border-white/10 p-2.5 flex items-center justify-center shadow-xl">
                                    <AppIcon src={item.iconUrl} name={item.name}/>
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">{item.name}</h2>
                                    {item.category && <p className="text-sm text-slate-300">{item.category}</p>}
                                </div>
                            </div>
                            {item.slogan && <p className="mt-4 text-lg text-slate-200 leading-relaxed line-clamp-2">{item.slogan}</p>}
                            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                                <Link href={`/products/${item.slug}`} tabIndex={active ? undefined : -1}
                                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-blue-50 transition-colors">
                                    View app <ArrowRight className="w-4 h-4"/>
                                </Link>
                                {item.platforms.length > 0 && (
                                    <ul className="flex items-center gap-3 text-slate-300" aria-label="Platforms">
                                        {item.platforms.map(platform => (
                                            <li key={platform} title={platformName(platform)}>
                                                <PlatformIcon platform={platform} size={18}/>
                                                <span className="sr-only">{platformName(platform)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}

            {turning && (
                <>
                    {/* the featured apps to pick from: with name on wide screens, as dots on phones */}
                    <div role="tablist" aria-label="Choose a featured app"
                         className="hidden md:flex absolute right-5 bottom-5 gap-2">
                        {items.map((item, index) => (
                            <button key={item.slug} type="button" role="tab" aria-selected={index === current}
                                    onClick={() => setCurrent(index)}
                                    className={`relative overflow-hidden flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                                        index === current
                                            ? "bg-slate-950/90 border-blue-500/60 text-white"
                                            : "bg-slate-950/70 border-white/10 text-slate-400 hover:text-white hover:border-white/25"
                                    }`}>
                                <span className="w-8 h-8 rounded-lg bg-slate-900 p-1 flex items-center justify-center">
                                    <AppIcon src={item.iconUrl}/>
                                </span>
                                {item.name}
                                {index === current && turning && (
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
                                        {progress("bg-blue-400")}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="md:hidden absolute inset-x-0 bottom-3 flex justify-center gap-1">
                        {items.map((item, index) => (
                            <button key={item.slug} type="button" onClick={() => setCurrent(index)}
                                    aria-label={`Show ${item.name}`} aria-current={index === current}
                                    className="p-2 cursor-pointer">
                                <span className={`relative block h-2 rounded-full overflow-hidden transition-all ${index === current ? "w-6 bg-white/40" : "w-2 bg-white/40"}`}>
                                    {index === current && progress("bg-white")}
                                </span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
