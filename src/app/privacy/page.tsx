import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Datenschutzerklärung | Adeptstack",
    description: "Informationen zur Verarbeitung personenbezogener Daten bei Nutzung unserer Website und Apps.",
    robots: "noindex",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
            <Header />

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-12 border-b border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Datenschutzerklärung
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Gültig für Website und Software von Adeptstack. <br/>
                        Stand: Februar 2026
                    </p>
                </div>

                <div className="space-y-16">

                    {/* 1. Einleitung */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">1</span>
                            Verantwortliche Stelle
                        </h2>
                        <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">
                            <p className="mb-4">
                                Verantwortlich für die Datenverarbeitung auf dieser Website und in den Apps ist:
                            </p>
                            <p className="text-white font-medium">Adeptstack / ProgrammerLP</p>
                            <p className="text-slate-400 text-sm mt-2">
                                (Vollständige Kontakt- und Adressdaten entnehmen Sie bitte dem <a href="/imprint" className="text-blue-400 hover:underline">Impressum</a>).
                            </p>
                            <p className="mt-4">
                                E-Mail: <a href="mailto:info@adeptstack.net" className="text-blue-400 hover:underline">info@adeptstack.net</a>
                            </p>
                        </div>
                    </section>

                    {/* 2. Hosting & Technik */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">2</span>
                            Hosting & Infrastruktur
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Vercel (Frontend Hosting)</h3>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Wir hosten das Frontend unserer Website bei <strong>Vercel Inc.</strong> (USA).
                                    Vercel erfasst Logfiles (IP-Adressen, Browserdaten), um die technische Auslieferung und Sicherheit der Seite zu gewährleisten.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Cloudflare (Sicherheit & CDN)</h3>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Der Datenverkehr läuft über das Netzwerk von <strong>Cloudflare Inc.</strong> (USA).
                                    Cloudflare fungiert als Sicherheits-Firewall (WAF) gegen Angriffe und optimiert die Ladezeiten.
                                    Hierbei werden Verbindungsdaten analysiert, um schädliche Bots abzuwehren.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Eigener Backend-Server (APIs)</h3>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Unsere Apps und dynamischen Web-Inhalte kommunizieren mit unserem eigenen API-Server.
                                    Aus Sicherheitsgründen (z.B. zur Abwehr von Brute-Force-Angriffen) speichern wir Server-Logfiles.
                                </p>
                                <ul className="list-disc list-inside text-slate-400 text-sm ml-2 space-y-1">
                                    <li>IP-Adresse (wird nach kurzer Zeit automatisiert gelöscht/anonymisiert)</li>
                                    <li>Zeitpunkt des Zugriffs</li>
                                    <li>Angefragter Pfad (URL)</li>
                                    <li>User-Agent (Browser/App-Version)</li>
                                </ul>
                            </div>
                        </div>

                        <p className="mt-6 text-xs text-slate-500">
                            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse an Sicherheit, Stabilität und Performance).
                        </p>
                    </section>

                    {/* 3. Datenerfassung in Apps */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">3</span>
                            Datenerfassung in unseren Apps
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">
                                <h3 className="text-lg font-bold text-white mb-3">Nutzungsstatistiken (Aktive Nutzer)</h3>
                                <p className="text-sm leading-relaxed mb-4">
                                    Um zu verstehen, wie stark unsere Software genutzt wird, erfassen wir eine minimale Statistik.
                                    Wenn Sie eine unserer Apps nutzen, sendet diese ein kurzes Signal an unseren Server.
                                </p>
                                <p className="text-sm leading-relaxed mb-2 font-medium text-slate-200">
                                    Was wir speichern:
                                </p>
                                <ul className="list-disc list-inside text-slate-400 text-sm mb-4">
                                    <li>Dass die App im aktuellen Monat geöffnet wurde (Ja/Nein).</li>
                                    <li>Den Namen der genutzten App (z.B. "Notivity").</li>
                                </ul>
                                <p className="text-sm leading-relaxed">
                                    <strong>Wir erstellen keine Nutzerprofile.</strong> Diese Daten dienen rein statistischen Zwecken,
                                    um die Weiterentwicklung der beliebtesten Tools zu priorisieren.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Lokale Datenverarbeitung</h3>
                                <p className="text-sm leading-relaxed">
                                    Soweit nicht anders angegeben, arbeiten unsere Desktop-Apps (wie PC-Info) primär lokal auf Ihrem Gerät.
                                    Persönliche Daten verlassen Ihren Computer nicht, es sei denn, Sie nutzen explizit Online-Funktionen (z.B. Cloud-Sync).
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 4. Kontakt & Kommunikation */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">4</span>
                            Kontakt
                        </h2>
                        <p className="text-sm leading-relaxed mb-4">
                            Wenn Sie uns per E-Mail kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten
                            (Name, Anfrage, E-Mail) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert.
                            Wir geben diese Daten nicht ohne Ihre Einwilligung weiter.
                        </p>
                    </section>

                    {/* 5. Ihre Rechte */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">5</span>
                            Ihre Rechte (DSGVO)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-slate-900/20 p-4 rounded-lg border border-slate-800/30">
                                <strong className="text-white block mb-1">Auskunft</strong>
                                Sie können jederzeit erfahren, welche Daten wir über Sie gespeichert haben.
                            </div>
                            <div className="bg-slate-900/20 p-4 rounded-lg border border-slate-800/30">
                                <strong className="text-white block mb-1">Löschung</strong>
                                Sie können verlangen, dass wir Ihre Daten löschen, sofern keine Aufbewahrungspflicht besteht.
                            </div>
                            <div className="bg-slate-900/20 p-4 rounded-lg border border-slate-800/30">
                                <strong className="text-white block mb-1">Widerruf</strong>
                                Erteilte Einwilligungen können Sie jederzeit für die Zukunft widerrufen.
                            </div>
                            <div className="bg-slate-900/20 p-4 rounded-lg border border-slate-800/30">
                                <strong className="text-white block mb-1">Beschwerde</strong>
                                Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren.
                            </div>
                        </div>
                        <p className="mt-6 text-sm">
                            Wenden Sie sich hierfür einfach an die im Impressum angegebene Adresse oder E-Mail.
                        </p>
                    </section>

                </div>

            </main>

            <Footer />
        </div>
    );
}