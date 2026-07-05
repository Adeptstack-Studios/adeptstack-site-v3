import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Terminal, Package, Sparkles } from "lucide-react";

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
                            text="Software should empower, not overwhelm. We focus on intuitive design and cut out the noise so you can focus on what matters."
                            icon="✨"
                        />
                        <ValueCard
                            title="Independence"
                            text="Driven by our own vision, not by investors. Being 100% independent allows us to set our own goals and build great software without compromises."
                            icon="🚀"
                        />
                        <ValueCard
                            title="Craftsmanship"
                            text="We take pride in our code. From a robust backend to a pixel-perfect UI, every product is built with serious attention to detail."
                            icon="🛠️"
                        />
                    </div>
                </section>

                <div className="w-full h-px bg-linear-to-r from-transparent via-slate-800 to-transparent my-32"></div>

                <section className="grid lg:grid-cols-2 gap-16 items-start mb-32">
                    {/* Linke Seite: Sticky Text */}
                    <div className="lg:sticky lg:top-32">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                            Our Story
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            The Adeptstack Story
                        </h2>

                        <div className="space-y-4">
                            <p className="text-slate-400 leading-relaxed text-lg">
                                Adeptstack is the result of true independence and a deep-rooted passion for clean software architecture. Rather than chasing investor milestones or forced release cycles, our core philosophy has always remained the same: to build powerful tools that we genuinely want to use ourselves. Being entirely self-funded gives us the freedom to prioritize quality, performance, and long-term stability over quick profits.
                            </p>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                What began as a collection of ambitious coding experiments has steadily matured into a professional software label. Today, Adeptstack stands for a cohesive ecosystem of applications, designed to solve complex problems with elegant, straightforward solutions.
                            </p>
                        </div>
                    </div>

                    {/* Rechte Seite: Die neue Timeline */}
                    <div className="relative border-l-2 border-slate-800/50 ml-4 md:ml-6 space-y-12 pb-4">

                        {/* 2021: The Foundation */}
                        <div className="relative group pl-8 md:pl-10">
                            <div className="absolute -left-[17px] top-1.5 h-8 w-8 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center group-hover:border-slate-500 group-hover:bg-slate-800 transition-all shadow-lg">
                                <Terminal className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                            </div>

                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 group-hover:border-slate-700 group-hover:bg-slate-900/50 transition-all shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                                <span className="inline-block text-xs font-mono text-slate-500 mb-2 font-bold tracking-wider uppercase">The Origin: July 2021</span>
                                <h3 className="text-xl font-bold text-white mb-3">The Foundation</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    What started as an experimental solo project quickly evolved. Driven by a deep passion for coding, this early era laid the technical groundwork for the core applications we rely on today.
                                </p>
                            </div>
                        </div>

                        {/* 2023: Adeptstack */}
                        <div className="relative group pl-8 md:pl-10">
                            <div className="absolute -left-[17px] top-1.5 h-8 w-8 rounded-full border border-blue-500/30 bg-slate-900 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-900/20 transition-all shadow-lg shadow-blue-500/10">
                                <Package className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                            </div>

                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 group-hover:border-blue-500/30 group-hover:bg-slate-900/50 transition-all shadow-sm group-hover:shadow-blue-500/5 group-hover:-translate-y-1">
                                <span className="inline-block text-xs font-mono text-blue-400 mb-2 font-bold tracking-wider uppercase">June 2023</span>
                                <h3 className="text-xl font-bold text-white mb-3">The Creation of Adeptstack</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    As the individual projects grew in scope and ambition, they needed a unified identity. Adeptstack was established as a professional label to bring our expanding ecosystem of tools under one cohesive, structured roof.
                                </p>
                            </div>
                        </div>

                        {/* 2026: Rebranding */}
                        <div className="relative group pl-8 md:pl-10">
                            <div className="absolute -left-[17px] top-1.5 h-8 w-8 rounded-full border border-emerald-500/30 bg-slate-900 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-900/20 transition-all shadow-lg shadow-emerald-500/10">
                                <Sparkles className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                            </div>

                            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 group-hover:border-emerald-500/30 group-hover:bg-slate-900/50 transition-all shadow-sm group-hover:shadow-emerald-500/5 group-hover:-translate-y-1">
                                <span className="inline-block text-xs font-mono text-emerald-400 mb-2 font-bold tracking-wider uppercase">Early 2026</span>
                                <h3 className="text-xl font-bold text-white mb-3">Rebranding & Refinement</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Adeptstack reaches its next level of maturity. We didn&#39;t just change the logo; we elevated the entire experience with a completely rebuilt design system, a modern architecture, and an uncompromising focus on quality.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Our tech stack</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-sm">
                        We use modern technology to ensure stability and future security.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <TechBadge name="Java" color="text-orange-400" border="border-orange-500/20" />
                        <TechBadge name="Spring Boot" color="text-green-400" border="border-green-500/20" />
                        <TechBadge name="Next.js" color="text-white" border="border-slate-500/20" />
                        <TechBadge name="Angular" color="text-red-500" border="border-red-500/20" />
                        <TechBadge name="TypeScript" color="text-blue-400" border="border-blue-500/20" />
                        <TechBadge name="C#" color="text-purple-400" border="border-purple-500/20" />
                        <TechBadge name="WPF" color="text-sky-400" border="border-sky-500/20" />
                        <TechBadge name=".NET MAUI" color="text-purple-500" border="border-purple-600/20" />
                        <TechBadge name="PostgreSQL" color="text-indigo-400" border="border-indigo-500/20" />
                        <TechBadge name="GitHub Actions" color="text-zinc-300" border="border-zinc-500/20" />
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