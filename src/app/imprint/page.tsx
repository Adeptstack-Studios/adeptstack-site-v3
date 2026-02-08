import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Impressum | Adeptstack",
    description: "Rechtliche Angaben und Impressum gemäß § 5 TMG.",
    robots: "noindex",
};

export default function ImprintPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
            <Header />

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-12 border-b border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Impressum
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Legal Notice / Angaben gemäß § 5 TMG
                    </p>
                </div>

                {/* Scope Notice (Dein englischer Satz) */}
                <div className="bg-slate-900/50 border border-blue-500/20 rounded-lg p-4 mb-10 text-sm text-blue-300 flex items-center gap-3">
                    <span className="text-xl">ℹ️</span>
                    <p>This policy applies to any software and web pages of <strong>Adeptstack</strong>.</p>
                </div>

                <div className="space-y-12">

                    {/* KONTAKT & ANGABEN */}
                    <section className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
                        <h2 className="text-xl font-bold text-white mb-4">Angaben gemäß § 5 TMG</h2>
                        <div className="space-y-2 text-slate-300">
                            <p className="font-semibold text-white">Adeptstack</p>
                            <p>Vertreten durch: <span className="text-white">ProgrammerLP</span></p>

                            {/* PLATZHALTER FÜR ANSCHRIFT (Rechtlich empfohlen!) */}
                            {/* <p>Musterstraße 1<br />12345 Musterstadt</p> */}
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-800">
                            <h3 className="text-lg font-bold text-white mb-2">Kontakt</h3>
                            <p>E-Mail: <a href="mailto:info@adeptstack.net" className="text-blue-400 hover:text-blue-300 transition-colors">info@adeptstack.net</a></p>
                        </div>
                    </section>

                    {/* HAFTUNG FÜR INHALTE */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Haftung für Inhalte</h2>
                        <p className="leading-relaxed mb-4">
                            Die Inhalte unserer Seiten und Apps wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach
                            den allgemeinen Gesetzen verantwortlich.
                        </p>
                        <p className="leading-relaxed">
                            Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                            gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                            Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung
                            ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                            Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                        </p>
                    </section>

                    {/* HAFTUNG FÜR LINKS */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Haftung für Links</h2>
                        <p className="leading-relaxed mb-4">
                            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                        </p>
                        <p className="leading-relaxed">
                            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
                            Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
                            Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                        </p>
                    </section>

                    {/* URHEBERRECHT */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Urheberrecht</h2>
                        <p className="leading-relaxed mb-4">
                            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten und Apps unterliegen dem deutschen Urheberrecht.
                            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                            bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                        </p>
                        <p className="leading-relaxed mb-4">
                            Downloads und Kopien dieser Seiten und Apps sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.
                            Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                        </p>
                        <p className="leading-relaxed">
                            Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
                            Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                        </p>
                    </section>

                </div>

                {/* Quellenangabe klein und grau */}
                <div className="mt-20 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
                    <p>Website Impressum erstellt durch Impressum von der Kanzlei Hasselbach</p>
                </div>

            </main>

            <Footer />
        </div>
    );
}