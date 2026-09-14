"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaGooglePlay, FaMicrosoft } from "react-icons/fa";
import { X } from "lucide-react";
import { APP_STORE_LINKS, detectStorePlatform, isSharedFromApp, StorePlatform } from "@/libs/appPromo";

const DISMISSED_KEY = "adeptstack:app-promo-dismissed";

function wasDismissed() {
    try {
        return sessionStorage.getItem(DISMISSED_KEY) === "1";
    } catch {
        return false;
    }
}

// URL and user agent only exist in the browser: the server renders nothing,
// the client decides after hydration, so there is no mismatch.
const noSubscription = () => () => {};

function readPromoPlatform(): StorePlatform | null {
    if (!isSharedFromApp(window.location.search) || wasDismissed()) return null;
    return detectStorePlatform(navigator.userAgent);
}

/** Promotes the Adeptstack app to visitors who opened a link shared from it. */
export default function AppPromo() {
    const platform = useSyncExternalStore(noSubscription, readPromoPlatform, () => null);
    const [closed, setClosed] = useState(false);
    const primaryRef = useRef<HTMLAnchorElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    const store = platform ? APP_STORE_LINKS[platform] : null;
    const open = store !== null && !closed;

    const close = useCallback(() => {
        // The backdrop stays mounted while it fades out. Without this it would swallow
        // clicks on the page for the length of the exit animation.
        if (backdropRef.current) backdropRef.current.style.pointerEvents = "none";
        try {
            sessionStorage.setItem(DISMISSED_KEY, "1");
        } catch {
            // storage blocked: the popup still closes, it may just return on reload
        }
        setClosed(true);
    }, []);

    useEffect(() => {
        if (!open) return;
        primaryRef.current?.focus();
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, close]);

    const StoreIcon = platform === "android" ? FaGooglePlay : FaMicrosoft;
    // people who asked their system for less motion only get the fade
    const dialogHidden = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 };

    return (
        // keeps the popup mounted until its exit animation has finished
        <AnimatePresence>
            {open && store && (
                <motion.div
                    key="app-promo"
                    ref={backdropRef}
                    className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:items-center"
                    onClick={close}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="app-promo-title"
                        className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-blue-950/40"
                        onClick={(event) => event.stopPropagation()}
                        initial={dialogHidden}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={dialogHidden}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                        <button
                            type="button"
                            onClick={close}
                            aria-label="Close"
                            className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2.5">
                            <img src="/logo.svg" alt="" className="h-full w-full object-contain" />
                        </div>

                        <h2 id="app-promo-title" className="mb-2 text-xl font-bold text-white">
                            Shared from the Adeptstack App
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed text-slate-400">
                            Follow updates, changelogs and news for all Adeptstack products in one place
                            and know as soon as something new is released.
                        </p>

                        <a
                            ref={primaryRef}
                            href={store.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={close}
                            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition-colors hover:bg-blue-50"
                        >
                            <StoreIcon className="h-5 w-5" />
                            {store.label}
                        </a>
                        <button
                            type="button"
                            onClick={close}
                            className="mt-3 w-full rounded-xl px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            Not now
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
