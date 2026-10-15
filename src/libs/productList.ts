import {App} from "@/Models/app";
import {appImages} from "@/libs/appMedia";
import {hasDownloadLink, safeImageSrc} from "@/libs/utils";
import {Facet} from "@/libs/listing";
import {parsePlatforms} from "@/components/product/platforms";

/** The products page filters the whole catalogue itself, it is small enough to come in one request. */
export const PRODUCT_SORTS = [
    {key: "featured", label: "Featured first"},
    {key: "updated", label: "Recently updated"},
    {key: "newest", label: "Newest apps"},
    {key: "name", label: "Name A–Z"},
] as const;

export type ProductSort = (typeof PRODUCT_SORTS)[number]["key"];

const DAY = 24 * 60 * 60 * 1000;

function time(date?: string) {
    const value = date ? Date.parse(date) : NaN;
    return Number.isNaN(value) ? 0 : value;
}

/**
 * The picture of a tile or the spotlight: the background chosen in the console, else the first screenshot.
 * Nothing when that is no usable address, the tile then shows the icon instead.
 */
export function coverImage(app: App): string | undefined {
    return safeImageSrc(app.backgroundUrl || appImages(app)[0]?.url, "") || undefined;
}

/** One small label for a tile, the most telling first. */
export function productBadge(app: App, now = Date.now()): { text: string; tone: "blue" | "amber" | "emerald" | "slate" } | null {
    if (app.legacy) return {text: "Legacy", tone: "slate"};
    if (!hasDownloadLink(app.latestMainVersion) && app.upcomingVersion) return {text: "Coming soon", tone: "amber"};
    if (now - time(app.publishedAt) < 30 * DAY && time(app.publishedAt) <= now) return {text: "New", tone: "emerald"};
    if (now - time(app.latestMainVersion?.publishedAt) < 14 * DAY) return {text: "Updated", tone: "blue"};
    if (app.highlighted) return {text: "Featured", tone: "blue"};
    return null;
}

export function sortProducts(apps: App[], sort: ProductSort): App[] {
    const byName = (a: App, b: App) => (a.name ?? "").localeCompare(b.name ?? "");
    const byUpdate = (a: App, b: App) => time(b.latestMainVersion?.publishedAt) - time(a.latestMainVersion?.publishedAt);
    const compare: Record<ProductSort, (a: App, b: App) => number> = {
        featured: (a, b) => Number(!!b.highlighted) - Number(!!a.highlighted) || byUpdate(a, b) || byName(a, b),
        updated: (a, b) => byUpdate(a, b) || byName(a, b),
        newest: (a, b) => time(b.publishedAt) - time(a.publishedAt) || byName(a, b),
        name: byName,
    };
    return [...apps].sort(compare[sort]);
}

export function matchesSearch(app: App, query: string) {
    const needle = query.toLowerCase();
    return [app.name, app.slogan, app.category].some(value => value?.toLowerCase().includes(needle));
}

/** Every category with the number of apps in it, the biggest first. */
export function productCategories(apps: App[]): Facet[] {
    const counts = new Map<string, Facet>();
    for (const app of apps) {
        const name = app.category?.trim();
        if (!name) continue;
        const entry = counts.get(name.toLowerCase()) ?? {name, count: 0};
        entry.count++;
        counts.set(name.toLowerCase(), entry);
    }
    return [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** The platforms any app runs on, as lower-case keys. */
export function productPlatforms(apps: App[]): string[] {
    return [...new Set(apps.flatMap(app => parsePlatforms(app.platforms)))].sort();
}
