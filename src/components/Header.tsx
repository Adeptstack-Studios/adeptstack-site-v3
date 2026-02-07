import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                        <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">Adeptstack</span>
                </Link>

                <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                    <Link href="/blog" className="hover:text-white transition">Blog</Link>
                    <Link href="#apps" className="hover:text-white transition">Products</Link>
                    <Link href="#" className="hover:text-white transition">Changelogs</Link>
                    <Link href="/about" className="hover:text-white transition">Vision</Link>
                </nav>

                <Link href="#download" className="px-4 py-2 bg-white text-slate-950 text-sm font-bold rounded-lg hover:bg-slate-200 transition">
                    Get Started
                </Link>
            </div>
        </header>
    );
}