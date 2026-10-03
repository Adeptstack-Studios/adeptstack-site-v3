import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZES, pageCount, pageWindow } from "@/libs/listing";

type PaginationProps = {
    page: number;
    size: number;
    total: number;
    /** Link to another page or page size, keeping the active filters. */
    hrefFor: (page: number, size: number) => string;
    /** e.g. "posts" in "Showing 1–10 of 57 posts" */
    noun: string;
};

const pill = "min-w-10 h-10 px-3 inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200";
const idle = "bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white";
const active = "bg-blue-600 text-white shadow-lg shadow-blue-500/20";
const disabled = "bg-slate-900/40 border border-slate-800/50 text-slate-700 cursor-not-allowed";

export default function Pagination({ page, size, total, hrefFor, noun }: PaginationProps) {
    if (total === 0) return null;

    const pages = pageCount(total, size);
    const first = (page - 1) * size + 1;
    const last = Math.min(page * size, total);

    return (
        <nav aria-label="Pagination" className="mt-12 pt-8 border-t border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-sm text-slate-400 order-2 lg:order-1">
                Showing <span className="text-white font-semibold">{first}–{last}</span> of{" "}
                <span className="text-white font-semibold">{total}</span> {noun}
            </p>

            {pages > 1 && (
                <ul className="flex flex-wrap items-center justify-center gap-2 order-1 lg:order-2">
                    <li>
                        {page > 1 ? (
                            <Link href={hrefFor(page - 1, size)} className={`${pill} ${idle}`} aria-label="Previous page">
                                <ChevronLeft className="w-4 h-4" />
                            </Link>
                        ) : (
                            <span className={`${pill} ${disabled}`} aria-hidden="true"><ChevronLeft className="w-4 h-4" /></span>
                        )}
                    </li>

                    {pageWindow(page, pages).map((entry, index) =>
                        entry === "gap" ? (
                            <li key={`gap-${index}`} className="px-1 text-slate-600" aria-hidden="true">…</li>
                        ) : (
                            <li key={entry}>
                                <Link
                                    href={hrefFor(entry, size)}
                                    className={`${pill} ${entry === page ? active : idle}`}
                                    aria-current={entry === page ? "page" : undefined}
                                    aria-label={`Page ${entry}`}
                                >
                                    {entry}
                                </Link>
                            </li>
                        )
                    )}

                    <li>
                        {page < pages ? (
                            <Link href={hrefFor(page + 1, size)} className={`${pill} ${idle}`} aria-label="Next page">
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <span className={`${pill} ${disabled}`} aria-hidden="true"><ChevronRight className="w-4 h-4" /></span>
                        )}
                    </li>
                </ul>
            )}

            <div className="flex items-center gap-3 order-3">
                <span className="text-sm text-slate-500">Per page</span>
                <div className="inline-flex p-1 rounded-full bg-slate-900 border border-slate-800">
                    {PAGE_SIZES.map(option => (
                        <Link
                            key={option}
                            // a new page size starts over at page 1, the old page may not exist anymore
                            href={hrefFor(1, option)}
                            aria-current={option === size ? "true" : undefined}
                            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                option === size ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            {option}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
