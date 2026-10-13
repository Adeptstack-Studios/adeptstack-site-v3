"use client";

/* eslint-disable @next/next/no-img-element */
import {useCallback, useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight, Play, X} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {AppImage} from "@/Models/app";

interface Props {
    appName: string;
    images: AppImage[];
    videoUrl?: string | null;
    /** inside a column of the page: no own width */
    embedded?: boolean;
}

/**
 * The video (if any) and every screenshot, one large at a time like a store page, with arrows and
 * thumbnails below. Swiping works on phones. A screenshot opens full size with arrows and keyboard
 * navigation. The video comes from our own server and only starts loading when it is played.
 */
export default function ProductGallery({appName, images, videoUrl, embedded = false}: Props) {
    const strip = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);
    const [open, setOpen] = useState<number | null>(null);

    const close = useCallback(() => setOpen(null), []);
    const step = useCallback((delta: number) => {
        setOpen(shown => shown === null ? null : (shown + delta + images.length) % images.length);
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

    const itemCount = images.length + (videoUrl ? 1 : 0);
    const offset = videoUrl ? 1 : 0;

    /** the slide that fills the frame, after swiping or scrolling */
    const onScroll = () => {
        const element = strip.current;
        if (element) setCurrent(Math.round(element.scrollLeft / element.clientWidth));
    };

    const show = (index: number) => {
        const element = strip.current;
        const target = (index + itemCount) % itemCount;
        if (element) element.scrollTo({left: target * element.clientWidth, behavior: "smooth"});
        setCurrent(target);
    };

    if (itemCount === 0) return null;

    return (
        <section className={embedded ? "" : "max-w-5xl mx-auto px-6 md:px-12 mb-24"} aria-label={`Screenshots of ${appName}`}>
            <div className="relative">
                <div
                    ref={strip}
                    onScroll={onScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {videoUrl && (
                        <div className="snap-center shrink-0 w-full aspect-video bg-black">
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
                            className="snap-center shrink-0 w-full aspect-video cursor-zoom-in"
                            aria-label={`Open screenshot ${index + 1} of ${images.length} full size`}
                        >
                            <img
                                src={image.url}
                                alt={`Screenshot ${index + 1} of ${appName}`}
                                loading={index + offset > 1 ? "lazy" : "eager"}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>

                {itemCount > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => show(current - 1)}
                            aria-label="Previous screenshot"
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-950/70 backdrop-blur border border-white/10 text-slate-200 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                        >
                            <ChevronLeft size={20}/>
                        </button>
                        <button
                            type="button"
                            onClick={() => show(current + 1)}
                            aria-label="Next screenshot"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-slate-950/70 backdrop-blur border border-white/10 text-slate-200 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                        >
                            <ChevronRight size={20}/>
                        </button>
                        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur text-xs font-medium text-slate-200 pointer-events-none">
                            {current + 1} / {itemCount}
                        </span>
                    </>
                )}
            </div>

            {itemCount > 1 && (
                <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:thin] [scrollbar-color:#334155_transparent]"
                     role="group" aria-label="Choose a screenshot">
                    {videoUrl && (
                        <button
                            type="button"
                            onClick={() => show(0)}
                            aria-label="Show the video"
                            aria-current={current === 0}
                            className={`relative shrink-0 w-24 sm:w-28 aspect-video rounded-lg overflow-hidden border-2 bg-black transition-all cursor-pointer ${current === 0 ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-100"}`}
                        >
                            {images[0] && <img src={images[0].url} alt="" className="w-full h-full object-cover opacity-60"/>}
                            <Play className="absolute inset-0 m-auto w-5 h-5 text-white" fill="currentColor"/>
                        </button>
                    )}
                    {images.map((image, index) => (
                        <button
                            key={image.url + index}
                            type="button"
                            onClick={() => show(index + offset)}
                            aria-label={`Show screenshot ${index + 1}`}
                            aria-current={current === index + offset}
                            className={`shrink-0 w-24 sm:w-28 aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${current === index + offset ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-100"}`}
                        >
                            <img src={image.url} alt="" loading="lazy" className="w-full h-full object-cover"/>
                        </button>
                    ))}
                </div>
            )}

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
