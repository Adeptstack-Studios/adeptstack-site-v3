// noinspection HtmlUnknownAnchorTarget

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy | Adeptstack",
    description: "Information on the processing of personal data when using our website and apps.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
            <Header />

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">

                <div className="mb-8 text-right">
                    <a href="#english-version" className="inline-flex items-center justify-end gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
                        <span className="uppercase tracking-wider font-semibold">Switch to English</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-y-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </a>
                </div>

                <div className="mb-12 border-b border-slate-800 pb-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Datenschutz&shy;erklärung
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Gültig für Website und Software von Adeptstack. <br/>
                        Stand: Februar 2026
                    </p>
                </div>

                <div className="space-y-16">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">1</span>
                            Verantwortliche Stelle
                        </h2>
                        <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">
                            <p className="mb-4">
                                Verantwortlich für die Datenverarbeitung auf dieser Website und in den Apps ist:
                            </p>
                            <p className="text-white font-medium">Adeptstack / Luke Polczynski</p>
                            <p className="text-slate-400 text-sm mt-2">
                                (Vollständige Kontakt- und Adressdaten entnehmen Sie bitte dem <a href="/imprint" className="text-blue-400 hover:underline">Impressum</a>).
                            </p>
                            <p className="mt-4">
                                E-Mail: <a href="mailto:info@adeptstack.net" className="text-blue-400 hover:underline">info@adeptstack.net</a>
                            </p>
                        </div>
                    </section>

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

                        <div className="mt-6 bg-blue-500/5 p-4 rounded-lg border border-blue-500/10 text-sm">
                            <strong className="text-white block mb-1">Datenübermittlung in Drittstaaten (USA)</strong>
                            Sowohl Vercel als auch Cloudflare verarbeiten Daten zum Teil auf Servern in den USA.
                            Beide Unternehmen sind nach dem EU-US Data Privacy Framework (DPF) zertifiziert,
                            wodurch ein der DSGVO angemessenes Datenschutzniveau gewährleistet wird.
                        </div>

                        <p className="mt-6 text-xs text-slate-500">
                            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse an Sicherheit, Stabilität und Performance).
                        </p>
                    </section>

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
                                    <li>Den Namen der genutzten App (z.B. &#34;Notivity&#34;).</li>
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

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">6</span>
                            Cookies & Tracking
                        </h2>
                        <p className="text-sm leading-relaxed mb-4">
                            <strong>Wir hassen nervige Cookie-Banner genauso wie Sie.</strong> Deshalb verzichten wir auf dieser Website komplett auf Analyse- oder Tracking-Cookies (wie z.B. Google Analytics) sowie auf Werbe-Tracker.
                            Sollten temporäre Cookies oder lokaler Speicher (Local Storage) zum Einsatz kommen, dienen diese ausschließlich der technischen Bereitstellung der Seite (z.B. Cloudflare Bot-Schutz oder das Speichern von UI-Einstellungen wie dem Dark-Mode).
                        </p>
                    </section>

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


                <div id="english-version" className="my-24 border-t border-slate-800 relative mt-12">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 px-4 text-slate-500 text-sm tracking-widest uppercase">
                    English Version
                  </span>
                </div>

                <div className="space-y-16 mt-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Privacy Policy
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Valid for Adeptstack website and software. <br/>
                            Last updated: February 2026
                        </p>
                    </div>

                    <section>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">1</span>
                            Controller / Responsible Body
                        </h3>
                        <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">
                            <p className="mb-4">
                                The party responsible for data processing on this website and in the apps is:
                            </p>
                            <p className="text-white font-medium">Adeptstack / Luke Polczynski</p>
                            <p className="text-slate-400 text-sm mt-2">
                                (Please refer to the <a href="/imprint" className="text-blue-400 hover:underline">Imprint / Legal Notice</a> for full contact and address details).
                            </p>
                            <p className="mt-4">
                                E-Mail: <a href="mailto:info@adeptstack.net" className="text-blue-400 hover:underline">info@adeptstack.net</a>
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">2</span>
                            Hosting & Infrastructure
                        </h3>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Vercel (Frontend Hosting)</h4>
                                <p className="mb-2 text-sm leading-relaxed">
                                    We host the frontend of our website with <strong>Vercel Inc.</strong> (USA).
                                    Vercel collects log files (IP addresses, browser data) to ensure the technical delivery, stability, and security of the site.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Cloudflare (Security & CDN)</h4>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Traffic is routed through the network of <strong>Cloudflare Inc.</strong> (USA).
                                    Cloudflare acts as a security firewall (WAF) against attacks and optimizes loading times.
                                    Connection data is analyzed to block malicious bots and threats.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Proprietary Backend Server (APIs)</h4>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Our apps and dynamic web content communicate with our own API server.
                                    For security reasons (e.g., to prevent brute-force attacks), we store server log files.
                                </p>
                                <ul className="list-disc list-inside text-slate-400 text-sm ml-2 space-y-1">
                                    <li>IP Address (automatically deleted/anonymized after a short period)</li>
                                    <li>Time of access</li>
                                    <li>Requested path (URL)</li>
                                    <li>User-Agent (Browser/App version)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-500/5 p-4 rounded-lg border border-blue-500/10 text-sm">
                            <strong className="text-white block mb-1">Data Transfer to Third Countries (USA)</strong>
                            Both Vercel and Cloudflare process data partially on servers in the US.
                            Both companies are certified under the EU-US Data Privacy Framework (DPF),
                            ensuring a level of data protection compliant with the GDPR.
                        </div>

                        <p className="mt-6 text-xs text-slate-500">
                            Legal basis: Art. 6 (1) lit. f GDPR (Legitimate interest in security, stability, and performance).
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">3</span>
                            Data Collection in our Apps
                        </h3>

                        <div className="space-y-6">
                            <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">
                                <h4 className="text-lg font-bold text-white mb-3">Usage Statistics (Active Users)</h4>
                                <p className="text-sm leading-relaxed mb-4">
                                    To understand how much our software is being used, we collect minimal statistics.
                                    When you use one of our apps, it sends a short signal to our server.
                                </p>
                                <p className="text-sm leading-relaxed mb-2 font-medium text-slate-200">
                                    What we store:
                                </p>
                                <ul className="list-disc list-inside text-slate-400 text-sm mb-4">
                                    <li>That the app was opened in the current month (Yes/No).</li>
                                    <li>The name of the app used (e.g., &#34;Notivity&#34;).</li>
                                </ul>
                                <p className="text-sm leading-relaxed">
                                    <strong>We do not create user profiles.</strong> These data are strictly for statistical purposes
                                    to prioritize the development of our most popular tools.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Local Data Processing</h4>
                                <p className="text-sm leading-relaxed">
                                    Unless stated otherwise, our desktop apps (like PC-Info) operate primarily locally on your device.
                                    Personal data does not leave your computer unless you explicitly use online features (e.g., cloud sync).
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">4</span>
                            Contact & Communication
                        </h3>
                        <p className="text-sm leading-relaxed mb-4">
                            If you contact us via email, your inquiry, including all personal data provided
                            (name, request, email), will be stored by us for the purpose of processing your request.
                            We do not pass on this data without your consent.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">6</span>
                            Cookies & Tracking
                        </h3>
                        <p className="text-sm leading-relaxed mb-4">
                            <strong>We dislike annoying cookie banners just as much as you do.</strong> Therefore, we completely refrain from using analytics or tracking cookies (such as Google Analytics) and advertising trackers on this website.
                            If temporary cookies or local storage are used, they serve strictly technical purposes to keep the site functioning securely (e.g., Cloudflare bot protection or saving UI preferences like dark mode).
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">5</span>
                            Your Rights (GDPR)
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-slate-900/20 p-4 rounded-lg border border-slate-800/30">
                                <strong className="text-white block mb-1">Access</strong>
                                You can request information about your stored data at any time.
                            </div>
                            <div className="bg-slate-900/20 p-4 rounded-lg border border-slate-800/30">
                                <strong className="text-white block mb-1">Deletion</strong>
                                You can request the deletion of your data, provided there is no legal retention obligation.
                            </div>
                            <div className="bg-slate-900/20 p-4 rounded-lg border border-slate-800/30">
                                <strong className="text-white block mb-1">Revocation</strong>
                                You can revoke any consent given at any time for the future.
                            </div>
                            <div className="bg-slate-900/20 p-4 rounded-lg border border-slate-800/30">
                                <strong className="text-white block mb-1">Complaint</strong>
                                You have the right to lodge a complaint with the competent supervisory authority.
                            </div>
                        </div>
                        <p className="mt-6 text-sm">
                            For any such requests, simply contact us via the address or email provided in the Imprint.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}