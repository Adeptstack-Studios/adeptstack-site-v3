"use client";

import {useEffect, useRef} from "react";

interface Props {
    src: string;
    /** shown until the video plays */
    poster?: string;
    className?: string;
}

/**
 * A muted video looping in the background. React sets "muted" only as a property, so after moving here
 * by a link the browser would refuse to start it on its own; it is muted and started here instead.
 * Visitors who asked their system for less motion get no video at all.
 */
export default function BackgroundVideo({src, poster, className}: Props) {
    const video = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const element = video.current;
        if (!element) return;
        const lessMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const start = () => {
            if (lessMotion.matches) {
                element.pause();
                return;
            }
            element.muted = true;
            element.defaultMuted = true;
            element.play().catch(() => {
                // the browser still says no (e.g. power saving): the image behind it stays
            });
        };
        start();
        lessMotion.addEventListener("change", start);
        return () => lessMotion.removeEventListener("change", start);
    }, [src]);

    return (
        <video
            ref={video}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            className={className}
        />
    );
}
