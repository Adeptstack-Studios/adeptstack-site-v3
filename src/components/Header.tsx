"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Blog", href: "/blog" },
        { name: "Products", href: "/products" },
        { name: "Changelogs", href: "/changelogs" },
        { name: "Vision", href: "/about" },
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, x: -10 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                        <Image src="/logo.svg" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-white">Adeptstack</span>
                </Link>

                <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-white transition">
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/products" className="hidden sm:block px-4 py-2 bg-white text-slate-950 text-sm font-bold rounded-lg hover:bg-slate-200 transition">
                        Discover
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-slate-300 hover:text-white transition relative z-50"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="md:hidden absolute top-0 left-0 w-full bg-slate-950 border-b border-white/5 px-6 pt-24 pb-12 space-y-8 shadow-2xl"
                    >
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <motion.div key={link.href} variants={linkVariants}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-bold text-slate-300 hover:text-white transition"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div variants={linkVariants}>
                            <Link
                                href="/products"
                                onClick={() => setIsOpen(false)}
                                className="block w-full px-4 py-4 bg-white text-slate-950 text-center font-bold rounded-xl text-lg shadow-lg shadow-white/5"
                            >
                                Discover
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}