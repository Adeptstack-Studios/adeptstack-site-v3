import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Loading... | Adeptstack",
    robots: "noindex",
};

export default function GlobalLoading() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30">
            <Header />

            <main className="grow flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center shadow-2xl relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-2xl animate-ping opacity-20"></div>
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>

                    <div className="text-center space-y-2">
                        <h2 className="text-xl font-bold text-white tracking-wide">
                            Einen Moment...
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Inhalte werden geladen
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}