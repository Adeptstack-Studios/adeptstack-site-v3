// noinspection HtmlUnknownAnchorTarget

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Privacy | Adeptstack",
    description: "Information on the processing of personal data when using our website and apps.",
};

/** A numbered section; German headings are h2, the English ones h3 below the English title. */
function Section({ number, title, english = false, children }: {
    number: number; title: string; english?: boolean; children: ReactNode;
}) {
    const Heading = english ? "h3" : "h2";
    return (
        <section>
            <Heading className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-blue-500/10 text-blue-400 w-8 h-8 flex items-center justify-center rounded-lg text-sm">{number}</span>
                {title}
            </Heading>
            {children}
        </section>
    );
}

function Sub({ english = false, children }: { english?: boolean; children: ReactNode }) {
    const Heading = english ? "h4" : "h3";
    return <Heading className="text-lg font-bold text-white mb-2">{children}</Heading>;
}

function Box({ children }: { children: ReactNode }) {
    return <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">{children}</div>;
}

function Basis({ children }: { children: ReactNode }) {
    return <p className="mt-4 text-xs text-slate-500">{children}</p>;
}

function Right({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="bg-slate-900/20 p-4 rounded-lg border border-slate-800/30">
            <strong className="text-white block mb-1">{title}</strong>
            {children}
        </div>
    );
}

const list = "list-disc list-inside text-slate-400 text-sm ml-2 space-y-1";

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
                        Stand: Oktober 2026
                    </p>
                </div>

                <div className="space-y-16">
                    <Section number={1} title="Verantwortliche Stelle">
                        <Box>
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
                        </Box>
                    </Section>

                    <Section number={2} title="Hosting & Infrastruktur">
                        <div className="space-y-8">
                            <div>
                                <Sub>Vercel (Frontend Hosting)</Sub>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Wir hosten das Frontend unserer Website bei <strong>Vercel Inc.</strong> (USA).
                                    Vercel erfasst Logfiles (IP-Adressen, Browserdaten), um die technische Auslieferung und Sicherheit der Seite zu gewährleisten.
                                </p>
                            </div>

                            <div>
                                <Sub>Cloudflare (Sicherheit & CDN für die Website)</Sub>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Die Aufrufe unserer Website (adeptstack.net) laufen über das Netzwerk von <strong>Cloudflare Inc.</strong> (USA).
                                    Cloudflare fungiert als Sicherheits-Firewall (WAF) gegen Angriffe und optimiert die Ladezeiten.
                                    Hierbei werden Verbindungsdaten analysiert, um schädliche Bots abzuwehren.
                                    Unser API-Server (api.adeptstack.net) wird nicht über Cloudflare geleitet.
                                </p>
                            </div>

                            <div>
                                <Sub>Eigener Backend-Server (APIs)</Sub>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Unsere Apps und dynamischen Web-Inhalte kommunizieren mit unserem eigenen API-Server.
                                    Aus Sicherheitsgründen (z.B. zur Abwehr von Brute-Force-Angriffen) speichern wir Server-Logfiles.
                                </p>
                                <ul className={list}>
                                    <li>IP-Adresse (wird nach kurzer Zeit automatisiert gelöscht/anonymisiert)</li>
                                    <li>Zeitpunkt des Zugriffs</li>
                                    <li>Angefragter Pfad (URL)</li>
                                    <li>User-Agent (Browser/App-Version)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-500/5 p-4 rounded-lg border border-blue-500/10 text-sm">
                            <strong className="text-white block mb-1">Datenübermittlung in Drittstaaten (USA)</strong>
                            Vercel, Cloudflare und die weiteren in dieser Erklärung genannten US-Anbieter verarbeiten Daten zum Teil auf Servern in den USA.
                            Sie sind nach dem EU-US Data Privacy Framework (DPF) zertifiziert,
                            wodurch ein der DSGVO angemessenes Datenschutzniveau gewährleistet wird.
                        </div>

                        <Basis>
                            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Berechtigtes Interesse an Sicherheit, Stabilität und Performance).
                        </Basis>
                    </Section>

                    <Section number={3} title="Reichweitenmessung ohne Cookies">
                        <Box>
                            <p className="text-sm leading-relaxed mb-4">
                                Um zu verstehen, welche Inhalte gelesen und welche Programme heruntergeladen werden, zählen wir
                                Seitenaufrufe, Downloads und Klicks auf Store-Links. Dabei setzen wir <strong>keine Cookies</strong>,
                                speichern nichts in Ihrem Browser und erstellen <strong>keine Nutzerprofile</strong>.
                            </p>
                            <p className="text-sm leading-relaxed mb-2 font-medium text-slate-200">
                                Bei einem Aufruf verarbeiten wir kurzzeitig:
                            </p>
                            <ul className={list + " mb-4"}>
                                <li>die aufgerufene Seite und das Datum</li>
                                <li>die verweisende Seite (Referrer), gespeichert wird nur deren Name bzw. Domain, z.B. „Google“</li>
                                <li>Betriebssystem, Browser und Gerätetyp, abgeleitet aus dem User-Agent</li>
                                <li>die bevorzugte Sprache Ihres Browsers</li>
                            </ul>
                            <p className="text-sm leading-relaxed mb-4">
                                Gespeichert werden ausschließlich zusammengefasste Tageszählungen, zum Beispiel
                                „Windows: 412 Besucher am 3. Oktober“. Jedes Merkmal wird für sich gezählt und nicht mit anderen verknüpft,
                                sodass die Zahlen keiner Person zugeordnet werden können.
                            </p>
                            <p className="text-sm leading-relaxed mb-4">
                                Um Mehrfachzählungen und Manipulation zu erkennen, bilden wir aus IP-Adresse, User-Agent und einem täglich
                                wechselnden Zufallswert einen nicht umkehrbaren Prüfwert (Hash). Die IP-Adresse selbst speichern wir dafür nicht.
                                Der Zufallswert existiert nur im Arbeitsspeicher und wird jeden Tag um Mitternacht verworfen, danach ist keine
                                Zuordnung mehr möglich.
                            </p>
                            <p className="text-sm leading-relaxed mb-4">
                                Download- und Store-Buttons führen dazu kurz über unseren Server, der den Klick zählt und Sie sofort
                                zur Datei bzw. zum Store weiterleitet.
                            </p>
                            <p className="text-sm leading-relaxed">
                                Sendet Ihr Browser das Signal „Do Not Track“ oder „Global Privacy Control“, zählen wir Ihre Seitenaufrufe nicht.
                            </p>
                            <Basis>
                                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem bedarfsgerechten Angebot).
                                Sie können dieser Verarbeitung jederzeit widersprechen (Art. 21 DSGVO).
                            </Basis>
                        </Box>
                    </Section>

                    <Section number={4} title="Datenerfassung in unseren Apps">
                        <div className="space-y-6">
                            <Box>
                                <Sub>Push-Benachrichtigungen (Adeptstack App)</Sub>
                                <p className="text-sm leading-relaxed mb-4">
                                    Die Adeptstack App für Android und iOS kann Sie über neue Versionen und Beiträge informieren.
                                    Dafür nutzen wir <strong>OneSignal</strong> (OneSignal, Inc., USA). Die App fragt beim Start nach Ihrer Erlaubnis
                                    für Benachrichtigungen; ohne diese Erlaubnis werden keine Pushes gesendet.
                                </p>
                                <p className="text-sm leading-relaxed mb-2 font-medium text-slate-200">
                                    Verarbeitet werden dabei:
                                </p>
                                <ul className={list + " mb-4"}>
                                    <li>ein Push-Token und eine Abonnement-ID Ihres Geräts</li>
                                    <li>technische Angaben wie Gerätemodell, Betriebssystem- und App-Version, Sprache und Zeitzone</li>
                                    <li>die IP-Adresse (zur ungefähren Bestimmung des Landes)</li>
                                    <li>ob Benachrichtigungen zugestellt und geöffnet wurden</li>
                                    <li>Ihre Einstellung, ob Sie Benachrichtigungen zu neuen Versionen erhalten möchten</li>
                                </ul>
                                <p className="text-sm leading-relaxed">
                                    Wir verwenden kein Nutzerkonto, keine E-Mail-Adresse oder Telefonnummer und keinen Standort.
                                    OneSignal ist nach dem EU-US Data Privacy Framework zertifiziert.
                                </p>
                                <Basis>
                                    Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über den Erlaubnis-Dialog Ihres Geräts).
                                    Sie können die Einwilligung jederzeit in den Einstellungen Ihres Geräts oder der App widerrufen.
                                </Basis>
                            </Box>

                            <Box>
                                <Sub>Prüfung der Internetverbindung</Sub>
                                <p className="text-sm leading-relaxed">
                                    Die Adeptstack App prüft, ob eine Internetverbindung besteht, indem sie eine leere Adresse von Google
                                    (clients3.google.com) abruft. Dabei erhält <strong>Google LLC</strong> (USA) technisch bedingt Ihre IP-Adresse
                                    und den User-Agent. Weitere Daten werden nicht übertragen. Google ist nach dem EU-US Data Privacy Framework zertifiziert.
                                </p>
                                <Basis>
                                    Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer funktionierenden App).
                                </Basis>
                            </Box>

                            <div>
                                <Sub>Lokale Datenverarbeitung</Sub>
                                <p className="text-sm leading-relaxed">
                                    Soweit nicht anders angegeben, arbeiten unsere Desktop-Apps (wie PC-Info) primär lokal auf Ihrem Gerät.
                                    Persönliche Daten verlassen Ihren Computer nicht, es sei denn, Sie nutzen explizit Online-Funktionen (z.B. Cloud-Sync).
                                </p>
                            </div>
                        </div>
                    </Section>

                    <Section number={5} title="Kontakt">
                        <p className="text-sm leading-relaxed mb-4">
                            Wenn Sie uns per E-Mail kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten
                            (Name, Anfrage, E-Mail) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert.
                            Wir geben diese Daten nicht ohne Ihre Einwilligung weiter.
                        </p>
                    </Section>

                    <Section number={6} title="Cookies & Tracking">
                        <p className="text-sm leading-relaxed mb-4">
                            <strong>Wir hassen nervige Cookie-Banner genauso wie Sie.</strong> Deshalb verzichten wir auf dieser Website komplett auf Analyse- oder Tracking-Cookies (wie z.B. Google Analytics) sowie auf Werbe-Tracker.
                            Unsere eigene Reichweitenmessung kommt ohne Cookies aus, siehe Abschnitt 3.
                            Sollten temporäre Cookies oder lokaler Speicher (Local Storage) zum Einsatz kommen, dienen diese ausschließlich der technischen Bereitstellung der Seite (z.B. Cloudflare Bot-Schutz oder das Speichern von UI-Einstellungen wie dem Dark-Mode).
                        </p>
                    </Section>

                    <Section number={7} title="Ihre Rechte (DSGVO)">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <Right title="Auskunft (Art. 15)">Sie können jederzeit erfahren, welche Daten wir über Sie gespeichert haben.</Right>
                            <Right title="Berichtigung (Art. 16)">Sie können verlangen, dass wir unrichtige Daten berichtigen.</Right>
                            <Right title="Löschung (Art. 17)">Sie können verlangen, dass wir Ihre Daten löschen, sofern keine Aufbewahrungspflicht besteht.</Right>
                            <Right title="Einschränkung (Art. 18)">Sie können verlangen, dass wir die Verarbeitung Ihrer Daten einschränken.</Right>
                            <Right title="Datenübertragbarkeit (Art. 20)">Sie können Ihre Daten in einem gängigen, maschinenlesbaren Format erhalten.</Right>
                            <Right title="Widerruf (Art. 7 Abs. 3)">Erteilte Einwilligungen können Sie jederzeit für die Zukunft widerrufen.</Right>
                            <Right title="Beschwerde (Art. 77)">Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren.</Right>
                        </div>
                        <div className="mt-4 bg-blue-500/5 p-4 rounded-lg border border-blue-500/10 text-sm">
                            <strong className="text-white block mb-1">Widerspruchsrecht (Art. 21)</strong>
                            Soweit wir Daten auf Grundlage berechtigter Interessen verarbeiten (Art. 6 Abs. 1 lit. f DSGVO), können Sie
                            dieser Verarbeitung aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen.
                        </div>
                        <p className="mt-6 text-sm">
                            Wenden Sie sich hierfür einfach an die im Impressum angegebene Adresse oder E-Mail.
                        </p>
                    </Section>
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
                            Last updated: October 2026
                        </p>
                    </div>

                    <Section english number={1} title="Controller / Responsible Body">
                        <Box>
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
                        </Box>
                    </Section>

                    <Section english number={2} title="Hosting & Infrastructure">
                        <div className="space-y-8">
                            <div>
                                <Sub english>Vercel (Frontend Hosting)</Sub>
                                <p className="mb-2 text-sm leading-relaxed">
                                    We host the frontend of our website with <strong>Vercel Inc.</strong> (USA).
                                    Vercel collects log files (IP addresses, browser data) to ensure the technical delivery, stability, and security of the site.
                                </p>
                            </div>

                            <div>
                                <Sub english>Cloudflare (Security & CDN for the website)</Sub>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Requests to our website (adeptstack.net) are routed through the network of <strong>Cloudflare Inc.</strong> (USA).
                                    Cloudflare acts as a security firewall (WAF) against attacks and optimizes loading times.
                                    Connection data is analyzed to block malicious bots and threats.
                                    Our API server (api.adeptstack.net) is not routed through Cloudflare.
                                </p>
                            </div>

                            <div>
                                <Sub english>Proprietary Backend Server (APIs)</Sub>
                                <p className="mb-2 text-sm leading-relaxed">
                                    Our apps and dynamic web content communicate with our own API server.
                                    For security reasons (e.g., to prevent brute-force attacks), we store server log files.
                                </p>
                                <ul className={list}>
                                    <li>IP Address (automatically deleted/anonymized after a short period)</li>
                                    <li>Time of access</li>
                                    <li>Requested path (URL)</li>
                                    <li>User-Agent (Browser/App version)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 bg-blue-500/5 p-4 rounded-lg border border-blue-500/10 text-sm">
                            <strong className="text-white block mb-1">Data Transfer to Third Countries (USA)</strong>
                            Vercel, Cloudflare and the other US providers named in this policy process data partially on servers in the US.
                            They are certified under the EU-US Data Privacy Framework (DPF),
                            ensuring a level of data protection compliant with the GDPR.
                        </div>

                        <Basis>
                            Legal basis: Art. 6 (1) lit. f GDPR (Legitimate interest in security, stability, and performance).
                        </Basis>
                    </Section>

                    <Section english number={3} title="Cookieless Audience Measurement">
                        <Box>
                            <p className="text-sm leading-relaxed mb-4">
                                To understand which content is read and which programs are downloaded, we count page views,
                                downloads and clicks on store links. We set <strong>no cookies</strong>, store nothing in your browser
                                and create <strong>no user profiles</strong>.
                            </p>
                            <p className="text-sm leading-relaxed mb-2 font-medium text-slate-200">
                                For a page view we briefly process:
                            </p>
                            <ul className={list + " mb-4"}>
                                <li>the page visited and the date</li>
                                <li>the referring page (referrer); only its name or domain is kept, e.g. &#34;Google&#34;</li>
                                <li>operating system, browser and device type, derived from the user agent</li>
                                <li>the preferred language of your browser</li>
                            </ul>
                            <p className="text-sm leading-relaxed mb-4">
                                Only aggregated daily counts are stored, for example &#34;Windows: 412 visitors on October 3&#34;.
                                Each trait is counted on its own and never combined with another, so the numbers cannot be linked to a person.
                            </p>
                            <p className="text-sm leading-relaxed mb-4">
                                To detect double counting and manipulation, we compute an irreversible check value (hash) from your IP address,
                                user agent and a random value that changes every day. The IP address itself is not stored for this.
                                The random value only exists in memory and is discarded every day at midnight; after that, no link is possible anymore.
                            </p>
                            <p className="text-sm leading-relaxed mb-4">
                                For this, download and store buttons briefly pass through our server, which counts the click and immediately
                                forwards you to the file or the store.
                            </p>
                            <p className="text-sm leading-relaxed">
                                If your browser sends &#34;Do Not Track&#34; or &#34;Global Privacy Control&#34;, your page views are not counted.
                            </p>
                            <Basis>
                                Legal basis: Art. 6 (1) lit. f GDPR (legitimate interest in an offer that meets demand).
                                You can object to this processing at any time (Art. 21 GDPR).
                            </Basis>
                        </Box>
                    </Section>

                    <Section english number={4} title="Data Collection in our Apps">
                        <div className="space-y-6">
                            <Box>
                                <Sub english>Push Notifications (Adeptstack App)</Sub>
                                <p className="text-sm leading-relaxed mb-4">
                                    The Adeptstack app for Android and iOS can notify you about new versions and posts.
                                    For this we use <strong>OneSignal</strong> (OneSignal, Inc., USA). The app asks for your permission to show
                                    notifications when it starts; without that permission no pushes are sent.
                                </p>
                                <p className="text-sm leading-relaxed mb-2 font-medium text-slate-200">
                                    The following is processed:
                                </p>
                                <ul className={list + " mb-4"}>
                                    <li>a push token and a subscription ID of your device</li>
                                    <li>technical details such as device model, operating system and app version, language and time zone</li>
                                    <li>the IP address (to roughly determine the country)</li>
                                    <li>whether notifications were delivered and opened</li>
                                    <li>your setting whether you want notifications about new versions</li>
                                </ul>
                                <p className="text-sm leading-relaxed">
                                    We use no user account, no e-mail address or phone number and no location.
                                    OneSignal is certified under the EU-US Data Privacy Framework.
                                </p>
                                <Basis>
                                    Legal basis: Art. 6 (1) lit. a GDPR (consent via your device&#39;s permission dialog).
                                    You can revoke your consent at any time in the settings of your device or the app.
                                </Basis>
                            </Box>

                            <Box>
                                <Sub english>Internet Connection Check</Sub>
                                <p className="text-sm leading-relaxed">
                                    The Adeptstack app checks whether an internet connection is available by requesting an empty address from Google
                                    (clients3.google.com). For technical reasons <strong>Google LLC</strong> (USA) receives your IP address and user agent.
                                    No other data is transferred. Google is certified under the EU-US Data Privacy Framework.
                                </p>
                                <Basis>
                                    Legal basis: Art. 6 (1) lit. f GDPR (legitimate interest in a working app).
                                </Basis>
                            </Box>

                            <div>
                                <Sub english>Local Data Processing</Sub>
                                <p className="text-sm leading-relaxed">
                                    Unless stated otherwise, our desktop apps (like PC-Info) operate primarily locally on your device.
                                    Personal data does not leave your computer unless you explicitly use online features (e.g., cloud sync).
                                </p>
                            </div>
                        </div>
                    </Section>

                    <Section english number={5} title="Contact & Communication">
                        <p className="text-sm leading-relaxed mb-4">
                            If you contact us via email, your inquiry, including all personal data provided
                            (name, request, email), will be stored by us for the purpose of processing your request.
                            We do not pass on this data without your consent.
                        </p>
                    </Section>

                    <Section english number={6} title="Cookies & Tracking">
                        <p className="text-sm leading-relaxed mb-4">
                            <strong>We dislike annoying cookie banners just as much as you do.</strong> Therefore, we completely refrain from using analytics or tracking cookies (such as Google Analytics) and advertising trackers on this website.
                            Our own audience measurement works without cookies, see section 3.
                            If temporary cookies or local storage are used, they serve strictly technical purposes to keep the site functioning securely (e.g., Cloudflare bot protection or saving UI preferences like dark mode).
                        </p>
                    </Section>

                    <Section english number={7} title="Your Rights (GDPR)">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <Right title="Access (Art. 15)">You can request information about your stored data at any time.</Right>
                            <Right title="Rectification (Art. 16)">You can request that we correct inaccurate data.</Right>
                            <Right title="Deletion (Art. 17)">You can request the deletion of your data, provided there is no legal retention obligation.</Right>
                            <Right title="Restriction (Art. 18)">You can request that we restrict the processing of your data.</Right>
                            <Right title="Data Portability (Art. 20)">You can receive your data in a common, machine-readable format.</Right>
                            <Right title="Revocation (Art. 7 (3))">You can revoke any consent given at any time for the future.</Right>
                            <Right title="Complaint (Art. 77)">You have the right to lodge a complaint with the competent supervisory authority.</Right>
                        </div>
                        <div className="mt-4 bg-blue-500/5 p-4 rounded-lg border border-blue-500/10 text-sm">
                            <strong className="text-white block mb-1">Right to Object (Art. 21)</strong>
                            Where we process data based on legitimate interests (Art. 6 (1) lit. f GDPR), you can object to this processing
                            at any time on grounds relating to your particular situation.
                        </div>
                        <p className="mt-6 text-sm">
                            For any such requests, simply contact us via the address or email provided in the Imprint.
                        </p>
                    </Section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
