"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <img
                src={src}
                alt={alt}
                onClick={() => setIsOpen(true)}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 hover:scale-105"
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
                    >
                        <button className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                            <X size={32} />
                        </button>

                        <motion.img
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-full rounded-xl shadow-2xl shadow-blue-500/10 border border-white/10"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}