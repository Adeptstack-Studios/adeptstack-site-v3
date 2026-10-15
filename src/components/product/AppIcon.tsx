"use client";

/* eslint-disable @next/next/no-img-element */
import {useEffect, useRef, useState} from "react";
import {Layers} from "lucide-react";
import {safeImageSrc} from "@/libs/utils";

interface Props {
    src?: string;
    name?: string;
    className?: string;
}

/** The app icon, or a neutral placeholder when there is none or it does not load, instead of the alt text. */
export default function AppIcon({src, name, className = ""}: Props) {
    const image = useRef<HTMLImageElement>(null);
    const [broken, setBroken] = useState(false);
    const usable = safeImageSrc(src, "");

    // an icon that failed before the page came alive fired its error event when nobody listened yet
    useEffect(() => {
        const element = image.current;
        if (element?.complete && element.naturalWidth === 0) setBroken(true);
    }, []);

    if (!usable || broken) {
        return <Layers className={`w-1/2 h-1/2 text-slate-600 ${className}`} aria-hidden="true"/>;
    }
    return (
        <img ref={image} src={usable} alt={name ? `${name} icon` : ""} onError={() => setBroken(true)}
             className={`w-full h-full object-contain ${className}`}/>
    );
}
