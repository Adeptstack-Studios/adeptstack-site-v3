import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-slate-950 text-sm text-slate-500">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="flex flex-col items-center md:space-around">
                    <div className="flex items-center gap-2 mb-4 opacity-80">
                        <div className="w-6 h-6 relative">
                            <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
                        </div>
                        <span className="font-bold text-white">Adeptstack</span>
                    </div>
                    <p className="mb-4">Complexity made simple.</p>
                    <p>© 2026 Adeptstack</p>
                </div>

                <div className="flex flex-col items-center md:space-around">
                    <div>
                        <h4 className="font-bold text-white mb-4">Produkte</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-blue-400 transition">Core Suite</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Secure Vault</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center md:space-around">
                    <div>
                        <h4 className="font-bold text-white mb-4 md:text-right">Rechtliches</h4>
                        <ul className="space-y-2 md:text-right">
                            <li><Link href="/imprint" className="hover:text-blue-400 transition">Imprint</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-400 transition">Privacy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}