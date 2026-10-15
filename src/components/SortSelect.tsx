"use client";

import { ArrowUpDown, Monitor } from "lucide-react";
import type { SortOption } from "@/libs/listing";

/** by name, a component can not be handed over from the server */
const ICONS = { sort: ArrowUpDown, platform: Monitor };

type SortSelectProps = {
    options: readonly Pick<SortOption, "key" | "label">[];
    value: string;
    /** the url parameter, "sort" unless the select filters something else */
    name?: string;
    label?: string;
    icon?: keyof typeof ICONS;
};

/**
 * Lives inside the listing's GET form. With JavaScript a new choice applies right away;
 * without it, the choice is sent along with the next search.
 */
export default function SortSelect({ options, value, name = "sort", label = "Sort by", icon = "sort" }: SortSelectProps) {
    const Icon = ICONS[icon];
    return (
        <label className="relative flex items-center w-full sm:w-auto">
            <span className="sr-only">{label}</span>
            <Icon className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
            <select
                name={name}
                defaultValue={value}
                onChange={event => event.currentTarget.form?.requestSubmit()}
                className="w-full appearance-none bg-slate-900/50 border border-slate-800 text-slate-300 text-sm rounded-full pl-11 pr-10 py-2.5 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all cursor-pointer"
            >
                {options.map(option => (
                    <option key={option.key} value={option.key} className="bg-slate-900">
                        {option.label}
                    </option>
                ))}
            </select>
            <svg className="w-3 h-3 text-slate-500 absolute right-4 pointer-events-none" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </label>
    );
}
