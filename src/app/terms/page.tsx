import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Terms of Use | Adeptstack",
    description: "Terms of Use applying to all software applications and web pages provided by Adeptstack.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
            <Header/>

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-3xl mx-auto">
                <div className="mb-10 border-b border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Terms of Use
                    </h1>
                    <p className="text-slate-400 text-lg">
                        These Terms of Use apply to all software applications and web pages provided by Adeptstack.
                    </p>
                </div>

                <div
                    className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 mb-12 flex flex-col sm:flex-row sm:gap-8 gap-4 text-sm font-mono text-slate-400">
                    <div>
                        <span
                            className="block text-slate-500 mb-1 uppercase tracking-wider text-xs">Effective Date</span>
                        <span className="text-slate-200">18.05.2022</span>
                    </div>
                    <div>
                        <span className="block text-slate-500 mb-1 uppercase tracking-wider text-xs">Last Updated</span>
                        <span className="text-white font-semibold">21.02.2026</span>
                    </div>
                </div>

                <div className="space-y-10 prose prose-invert max-w-none">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                        <p className="leading-relaxed">
                            By using the application, you automatically agree to these terms. This agreement remains
                            valid as long as the application is installed on your device. If you uninstall the
                            application or breach any provision, your right to use the software terminates immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. License & Intellectual Property</h2>
                        <p className="leading-relaxed mb-4">
                            All rights, titles, and interests in the Application (including copyrights and trademarks)
                            remain the exclusive property of Adeptstack.
                        </p>
                        <ul className="space-y-3 list-disc list-outside pl-5 text-slate-300 marker:text-blue-500">
                            <li>
                                <strong className="text-white">Personal Use:</strong> You are granted a non-exclusive
                                license for personal, non-commercial use only.
                            </li>
                            <li>
                                <strong className="text-white">Restrictions:</strong> Unauthorized copying, decompiling,
                                reverse-engineering, reselling, or distributing is strictly prohibited.
                            </li>
                            <li>
                                <strong className="text-white">Attribution:</strong> For public demonstrations, you must
                                credit &quot;&copy; Adeptstack&quot; and provide a link to the official download page.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Limitation of Liability</h2>
                        <p className="leading-relaxed">
                            The Application is provided &quot;as is&quot; without warranties of any kind. Adeptstack is
                            not liable for damages (including data loss or hardware issues) resulting from the use of
                            the software, except in cases of willful misconduct or gross negligence. You use this
                            software at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Privacy</h2>
                        <p className="leading-relaxed">
                            Adeptstack respects your privacy. Our applications are designed to process system data
                            locally. For details on data handling and your rights, please visit our <Link
                            href="/privacy"
                            className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4">Privacy
                            Policy</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Changes & Updates</h2>
                        <p className="leading-relaxed">
                            The developer reserves the right to update these terms or the application at any time.
                            Continued use of the application constitutes acceptance of any modified terms.
                        </p>
                    </section>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
                    <div className="space-y-2 text-slate-300">
                        <p>
                            <strong className="text-white">Discord:</strong> <Link
                            href={"https://adeptstack.net/discord"}
                            className="text-blue-400 hover:text-blue-300 transition-colors">Adeptstack Discord</Link>
                        </p>
                        <p>
                            <strong className="text-white">Email:</strong> <a href="mailto:support@adeptstack.net"
                                                                              className="text-blue-400 hover:text-blue-300 transition-colors">support@adeptstack.net</a>
                        </p>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}