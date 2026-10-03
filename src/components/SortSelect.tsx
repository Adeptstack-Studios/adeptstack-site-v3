"use client";

import { ArrowUpDown } from "lucide-react";
import type { SortOption } from "@/libs/listing";

type SortSelectProps = {
    options: readonly SortOption[];
    value: string;
};

/**
 * Lives inside the listing's GET form. With JavaScript a new choice applies right away;
 * without it, the choice is sent along with the next search.
 */
export default function SortSelect({ options, value }: SortSelectProps) {
    return (
        <label className="relative flex items-center w-full sm:w-auto">
            <span className="sr-only">Sort by</span>
            <ArrowUpDown className="w-4 h-4 text-slate-500 absolute left-4 pointer-events-none" />
            <select
                name="sort"
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
