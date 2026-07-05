import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-slate-950 text-sm text-slate-500">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

                {/* 1. Spalte: Adeptstack */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-2 mb-4 opacity-90">
                        <div className="w-6 h-6 relative">
                            <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="font-bold text-white text-base">Adeptstack</span>
                    </div>

                    <ul className="space-y-2 mb-3">
                        <li className="text-slate-400">Complexity made simple.</li>
                        <li>
                            <Link href="/about" className="group inline-flex items-center gap-1 hover:text-blue-400 transition">
                                About Adeptstack
                                <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </li>
                    </ul>

                    <p className="text-xs text-slate-600">© 2026 Adeptstack</p>
                </div>

                {/* 2. Spalte: Products */}
                <div className="flex flex-col items-center md:space-around">
                    <div>
                        <h4 className="font-bold text-white mb-4">Products</h4>
                        <ul className="space-y-2">
                            <li><Link href="/products/activity-pulse" className="hover:text-blue-400 transition">Activity Pulse</Link></li>
                            <li><Link href="/products/pc-info" className="hover:text-blue-400 transition">PC-Info</Link></li>
                            <li><Link href="/products/adeptstack-app" className="hover:text-blue-400 transition">Adeptstack-App</Link></li>
                        </ul>
                    </div>
                </div>

                {/* 3. Spalte: Legal */}
                <div className="flex flex-col items-center md:space-around">
                    <div>
                        <h4 className="font-bold text-white mb-4 md:text-right">Legal</h4>
                        <ul className="space-y-2 md:text-right">
                            <li><Link href="/imprint" className="hover:text-blue-400 transition">Imprint</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-400 transition">Privacy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-400 transition">Terms of Use</Link></li>
                        </ul>
                    </div>
                </div>

                {/* 4. Spalte: Social */}
                <div className="flex flex-col items-center md:space-around">
                    <div>
                        <h4 className="font-bold text-white mb-4 md:text-right">Social</h4>
                        <ul className="space-y-2 md:text-right">
                            <li><Link href="https://youtube.com/@Adeptstack" target={"_blank"} className="hover:text-blue-400 transition">Youtube</Link></li>
                            <li><Link href="https://discord.gg/PXRZm3XQDb" className="hover:text-blue-400 transition">Discord</Link></li>
                            <li><Link href="https://github.com/adeptstack-studios" className="hover:text-blue-400 transition">Github</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}