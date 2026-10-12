import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { Mail, History } from "lucide-react";

export const metadata: Metadata = {
    title: "Newsletter | Adeptstack",
    description: "The Adeptstack newsletter starts soon.",
};

/**
 * Signing up is closed until e-mail sending is enabled, so no address is collected for
 * nothing. Confirming and unsubscribing (the pages below this one) keep working.
 */
export default function NewsletterPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30 flex flex-col">
            <Header />
            <main className="grow pt-32 pb-20 px-6 md:px-12 max-w-2xl mx-auto w-full">
                <section className="bg-slate-900/30 p-8 md:p-10 rounded-2xl border border-slate-800/50 text-center">
                    <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <Mail className="w-7 h-7" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">The newsletter starts soon</h1>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Signing up opens as soon as we can send it. Until then you find every new release
                        in the changelogs and, with push notifications, in the Adeptstack app.
                    </p>
                    <Link
                        href="/changelogs"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl hover:bg-slate-700 hover:text-white transition-colors"
                    >
                        <History className="w-5 h-5" /> View changelogs
                    </Link>
                </section>
            </main>
            <Footer />
        </div>
    );
}
