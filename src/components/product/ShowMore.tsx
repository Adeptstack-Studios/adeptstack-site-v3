"use client";

import {ReactNode, useEffect, useId, useRef, useState} from "react";
import {ChevronDown} from "lucide-react";

interface Props {
    children: ReactNode;
    /** height in px shown before "Show more" */
    collapsedHeight?: number;
}

/**
 * Long text cut off with a fade and a "Show more" button, like the description in the Microsoft Store.
 * Text that fits stays as it is, without a button.
 */
export default function ShowMore({children, collapsedHeight = 260}: Props) {
    const content = useRef<HTMLDivElement>(null);
    const id = useId();
    const [overflows, setOverflows] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const element = content.current;
        if (!element) return;
        const measure = () => setOverflows(element.scrollHeight > collapsedHeight + 40);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return () => observer.disconnect();
    }, [collapsedHeight]);

    const collapsed = overflows && !open;

    return (
        <div>
            <div
                id={id}
                ref={content}
                className="relative overflow-hidden"
                // the end fades out on whatever background the text sits on
                style={collapsed ? {
                    maxHeight: collapsedHeight,
                    maskImage: "linear-gradient(to bottom, black calc(100% - 80px), transparent)",
                } : undefined}
            >
                {children}
            </div>
            {overflows && (
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-controls={id}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                    {open ? "Show less" : "Show more"}
                    <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}/>
                </button>
            )}
        </div>
    );
}
