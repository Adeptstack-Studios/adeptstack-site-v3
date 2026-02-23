import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Adeptstack | Vision & History",
    description: "Our mission and history",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
            <Header />

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 rounded-full">
                            Our Mission
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-cyan-400 mb-6 py-2">
                            Complexity made simple!
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            We believe software can be powerful without being complicated.
                            Our mission is to bridge the gap between professional functionality and intuitive operation, building tools that we enjoy using ourselves.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ValueCard
                            title="Simplicity"
                            text="Software should solve problems, not create new ones. We radically reduce complexity."
                            icon="✨"
                        />
                        <ValueCard
                            title="Transparency"
                            text="No hidden data, no bullshit. We build openly and honestly for our users."
                            icon="🛡️"
                        />
                        <ValueCard
                            title="Community"
                            text="We don't build for users, we build with them. Your feedback directly influences the development of the next version."
                            icon="🤝"
                        />
                    </div>
                </section>

                <div className="w-full h-px bg-linear-to-r from-transparent via-slate-800 to-transparent my-32"></div>

                <section className="grid lg:grid-cols-2 gap-16 items-start mb-32">
                    <div className="lg:sticky lg:top-32">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full">
                            Our Story
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            The Adeptstack Story
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Adeptstack is the product of true independence. Rather than serving investor interests, we have one goal: to build software that we want to use ourselves.
                            Our experimental beginnings have grown into a professional-standard workflow over the years.
                        </p>
                    </div>

                    <div className="relative border-l-2 border-slate-800 ml-2 md:ml-4 space-y-16 pl-8 py-2">
                        <div className="relative group">
                            <span className="absolute -left-10.25 top-1 h-5 w-5 rounded-full border-4 border-slate-950 bg-slate-600 group-hover:bg-slate-500 transition-colors"></span>
                            <h3 className="text-xl font-bold text-white">The “ProgrammerLP” era</h3>
                            <span className="text-sm text-slate-500 mb-2 block">The Origin 2021</span>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                It all began as a hobby project under the alias &#34;ProgrammerLP.&#34; It was an intense period of learning and experimentation during which most of today&#39;s products were developed.
                            </p>
                        </div>

                        <div className="relative group">
                            <span className="absolute -left-10.25 top-1 h-5 w-5 rounded-full border-4 border-slate-950 bg-blue-500 group-hover:scale-110 transition-transform"></span>
                            <h3 className="text-xl font-bold text-white">The Creation of Adeptstack</h3>
                            <span className="text-sm text-blue-400 mb-2 block">June 2023</span>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                To bring structure to the growing portfolio, everything was renamed <strong>Adeptstack</strong>. Adeptstack became the label for the products.
                            </p>
                        </div>

                        <div className="relative group">
                            <span className="absolute -left-10.25 top-1 h-5 w-5 rounded-full border-4 border-slate-950 bg-emerald-500 animate-pulse"></span>
                            <h3 className="text-xl font-bold text-white">Rebranding & Refinement</h3>
                            <span className="text-sm text-emerald-400 mb-2 block">Early 2026</span>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Adeptstack is growing up. With our new logo, modern website, and refined profile, we now have a more professional appearance.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Our tech stack</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-sm">
                        We use modern technology to ensure stability and future security.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <TechBadge name="Java & Spring Boot" color="text-green-400" border="border-green-500/20" />
                        <TechBadge name="Next.js" color="text-white" border="border-slate-500/20" />
                        <TechBadge name="Angular & TypeScript" color="text-blue-400" border="border-blue-500/20" />
                        <TechBadge name="C# & WPF" color="text-blue-500" border="border-blue-600/20" />
                        <TechBadge name="PostgreSQL" color="text-indigo-400" border="border-indigo-500/20" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function ValueCard({ title, text, icon }: { title: string; text: string; icon: string }) {
    return (
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 hover:bg-slate-900 hover:-translate-y-1 group">
            <div className="text-4xl mb-4 bg-slate-800/50 w-16 h-16 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{text}</p>
        </div>
    );
}

function TechBadge({ name, color, border }: { name: string; color: string; border: string }) {
    return (
        <span className={`px-3 py-1.5 rounded-md bg-slate-950 border ${border} ${color} font-mono text-xs font-semibold shadow-sm`}>
            {name}
        </span>
    );
}