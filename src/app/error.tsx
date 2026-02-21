"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, RefreshCcw, ServerCrash } from "lucide-react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Error while loading | Adeptstack",
    description: "Systems offline!",
    robots: "noindex",
};

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Ein kritischer Fehler ist aufgetreten:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header />

            <main className="grow flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl w-full">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden text-center shadow-2xl">

                        <ServerCrash className="absolute -right-5 -bottom-10 w-64 h-64 text-red-900/10 pointer-events-none rotate-12" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide uppercase mb-8">
                                System Error
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                Verbindung fehlgeschlagen.
                            </h1>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
                                Unsere Systeme können aktuell nicht erreicht werden. Möglicherweise wird gerade ein Update durchgeführt oder das Backend ist offline.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <button
                                    onClick={() => reset()}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg shadow-white/5 w-full sm:w-auto"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                    Erneut versuchen
                                </button>

                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors border border-slate-700 w-full sm:w-auto"
                                >
                                    <Home className="w-4 h-4" />
                                    Zur Startseite
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}