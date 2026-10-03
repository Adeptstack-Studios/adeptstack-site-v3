import {Changelog} from "@/Models/changelog";
import {fetchPageWithRetry, fetchWithRetry, getBaseUrl} from "@/libs/utils";
import {buildQuery, Facet, Page, SortOption} from "@/libs/listing";

export const CHANGELOG_SORTS = [
    { key: "newest", label: "Newest first", api: "publishedAt,desc" },
    { key: "oldest", label: "Oldest first", api: "publishedAt,asc" },
    { key: "version", label: "Highest version", api: "version,desc" },
    { key: "version-asc", label: "Lowest version", api: "version,asc" },
    { key: "app", label: "App A–Z", api: "app,asc" },
    { key: "title", label: "Title A–Z", api: "title,asc" },
] as const satisfies readonly SortOption[];

export type ChangelogQuery = {
    /** app id or slug */
    app?: number | string;
    channel?: string;
    q?: string;
    /** backend sort, e.g. "version,desc" */
    sort: string;
    /** 1-based */
    page: number;
    size: number;
};

/** One page of changelogs, filtered and sorted by the backend. */
export async function getChangelogPage({ app, channel, q, sort, page, size }: ChangelogQuery): Promise<Page<Changelog>> {
    const baseUrl = getBaseUrl();
    const query = buildQuery({ app, channel, q, sort, page: page - 1, size });
    return await fetchPageWithRetry<Changelog>(`${baseUrl}/api/changelogs/get${query}`, page, size);
}

/** Channels in use, optionally only those of one app, with their changelog count. */
export async function getChangelogChannels(app?: number | string): Promise<Facet[]> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/changelogs/channels${buildQuery({ app })}`);
    return Array.isArray(data) ? data : [];
}

export async function getChangelogById(id: string): Promise<Changelog | undefined> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/changelogs/get/${id}`);

    return Array.isArray(data) && data.length === 0 ? undefined : data;
}
