/** Shared rules for the paginated, sortable listings (blog and changelogs). */

export const PAGE_SIZES = [10, 25, 50] as const;
export type PageSize = (typeof PAGE_SIZES)[number];
export const DEFAULT_PAGE_SIZE: PageSize = 10;

/** One page of a listing plus the number of matches across all pages. */
export type Page<T> = { items: T[]; total: number };

/** A filter value with the number of entries carrying it, e.g. a blog category. */
export type Facet = { name: string; count: number };

/** `key` is what appears in our url, `api` is what the backend expects. */
export type SortOption = { key: string; label: string; api: string };

/** Pages are 1-based in the url, because people read them; the backend counts from 0. */
export function parsePage(raw?: string): number {
    const page = Number(raw);
    return Number.isInteger(page) && page >= 1 ? page : 1;
}

export function parsePageSize(raw?: string): PageSize {
    const size = Number(raw);
    return (PAGE_SIZES as readonly number[]).includes(size) ? (size as PageSize) : DEFAULT_PAGE_SIZE;
}

/** Unknown keys fall back to the first option, which is the default. */
export function parseSort<T extends SortOption>(raw: string | undefined, options: readonly T[]): T {
    return options.find(option => option.key === raw) ?? options[0];
}

export function pageCount(total: number, size: number) {
    return Math.max(1, Math.ceil(total / size));
}

/**
 * Builds "?a=1&b=2" from the given values, leaving out empty ones and the ones that
 * equal their default, so the plain listing keeps its plain url.
 */
export function buildQuery(
    values: Record<string, string | number | undefined>,
    defaults: Record<string, string | number> = {},
) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
        if (value === undefined || value === "") continue;
        if (defaults[key] !== undefined && String(defaults[key]) === String(value)) continue;
        params.set(key, String(value));
    }
    const query = params.toString();
    return query ? `?${query}` : "";
}

/**
 * The page numbers to show: always the first and last page, the current one with its
 * neighbours, and "gap" where pages are skipped. 1 … 4 5 6 … 12
 */
export function pageWindow(current: number, total: number): (number | "gap")[] {
    const pages = new Set<number>([1, total, current - 1, current, current + 1]);
    // a gap of exactly one page is pointless, show that page instead
    if (current - 3 === 1) pages.add(2);
    if (current + 3 === total) pages.add(total - 1);

    const sorted = [...pages].filter(page => page >= 1 && page <= total).sort((a, b) => a - b);
    const result: (number | "gap")[] = [];
    sorted.forEach((page, index) => {
        if (index > 0 && page - sorted[index - 1] > 1) result.push("gap");
        result.push(page);
    });
    return result;
}

export function formatListDate(date?: string | Date) {
    return date
        ? new Date(date).toLocaleDateString("en-EN", { day: "2-digit", month: "2-digit", year: "numeric" })
        : "Unknown Date";
}
