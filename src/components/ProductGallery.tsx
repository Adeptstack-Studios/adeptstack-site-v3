"use client";

/* eslint-disable @next/next/no-img-element */
import {useCallback, useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight, X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {AppImage} from "@/Models/app";

interface Props {
    appName: string;
    images: AppImage[];
    videoUrl?: string | null;
}

/**
 * The video (if any) and every screenshot in one horizontal strip. Screenshots open
 * full size with arrows and keyboard navigation. The video comes from our own server
 * and only starts loading when it is played.
 */
export default function ProductGallery({appName, images, videoUrl}: Props) {
    const strip = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<number | null>(null);

    const close = useCallback(() => setOpen(null), []);
    const step = useCallback((delta: number) => {
        setOpen(current => current === null ? null : (current + delta + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
        if (open === null) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, close, step]);

    const scrollBy = (direction: number) => {
        const element = strip.current;
        if (element) element.scrollBy({left: direction * element.clientWidth * 0.8, behavior: "smooth"});
    };

    const itemCount = images.length + (videoUrl ? 1 : 0);
    if (itemCount === 0) return null;

    return (
        <section className="max-w-6xl mx-auto px-6 md:px-12 mb-24" aria-label={`Screenshots of ${appName}`}>
            <div className="relative group/gallery">
                <div
                    ref={strip}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin] [scrollbar-color:#334155_transparent]"
                >
                    {videoUrl && (
                        <div className="snap-start shrink-0 w-[85%] md:w-[calc(50%-10px)] aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl">
                            <video
                                src={videoUrl}
                                controls
                                preload="none"
                                poster={images[0]?.url}
                                className="w-full h-full object-contain"
                            >
                                Your browser can not play this video.
                            </video>
                        </div>
                    )}
                    {images.map((image, index) => (
                        <button
                            key={image.url + index}
                            type="button"
                            onClick={() => setOpen(index)}
                            className="snap-start shrink-0 w-[85%] md:w-[calc(50%-10px)] aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl cursor-zoom-in"
                            aria-label={`Open screenshot ${index + 1} of ${images.length}`}
                        >
                            <img
                                src={image.url}
                                alt={`Screenshot ${index + 1} of ${appName}`}
                                loading={index > 1 ? "lazy" : "eager"}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </button>
                    ))}
                </div>

                {itemCount > 2 && (
                    <>
                        <button
                            type="button"
                            onClick={() => scrollBy(-1)}
                            aria-label="Previous screenshots"
                            className="hidden md:flex absolute -left-5 top-[calc(50%-8px)] -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 transition-opacity"
                        >
                            <ChevronLeft size={20}/>
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollBy(1)}
                            aria-label="Next screenshots"
                            className="hidden md:flex absolute -right-5 top-[calc(50%-8px)] -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white opacity-0 group-hover/gallery:opacity-100 focus:opacity-100 transition-opacity"
                        >
                            <ChevronRight size={20}/>
                        </button>
                    </>
                )}
            </div>

            <AnimatePresence>
                {open !== null && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        onClick={close}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Screenshot ${open + 1} of ${images.length}`}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
                    >
                        <button type="button" onClick={close} aria-label="Close"
                                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                            <X size={32}/>
                        </button>

                        {images.length > 1 && (
                            <>
                                <button type="button" aria-label="Previous screenshot"
                                        onClick={event => { event.stopPropagation(); step(-1); }}
                                        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white">
                                    <ChevronLeft size={22}/>
                                </button>
                                <button type="button" aria-label="Next screenshot"
                                        onClick={event => { event.stopPropagation(); step(1); }}
                                        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white">
                                    <ChevronRight size={22}/>
                                </button>
                            </>
                        )}

                        <motion.img
                            key={open}
                            initial={{scale: 0.95, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{type: "spring", stiffness: 300, damping: 28}}
                            src={images[open].url}
                            alt={`Screenshot ${open + 1} of ${appName}`}
                            onClick={event => event.stopPropagation()}
                            className="max-w-full max-h-full rounded-xl shadow-2xl shadow-blue-500/10 border border-white/10 cursor-default"
                        />

                        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-slate-400 font-mono">
                            {open + 1} / {images.length}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
