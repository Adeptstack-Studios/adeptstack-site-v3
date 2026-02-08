import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, Github, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header />

            <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">

                {/* Statischer Hintergrund-Glow (Dezent & Zentriert) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

                {/* Container für die zentrierte Karte */}
                <div className="relative z-10 max-w-2xl w-full">

                    {/* Die Hauptkarte */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden text-center shadow-2xl">

                        {/* Dekoratives Icon im Hintergrund (ganz leicht sichtbar) */}
                        <SearchX className="absolute right-[-20px] bottom-[-40px] w-64 h-64 text-slate-800/20 pointer-events-none rotate-12" />

                        <div className="relative z-10 flex flex-col items-center">

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide uppercase mb-8">
                                Error 404
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                Oops! We must have misplaced them.
                            </h1>

                            {/* Dein Text */}
                            <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
                                We looked everywhere. Even behind the server cabinet. <br className="hidden md:block" />
                                Nothing doing.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-950 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg shadow-white/5 w-full sm:w-auto"
                                >
                                    <Home className="w-4 h-4" />
                                    Homepage
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