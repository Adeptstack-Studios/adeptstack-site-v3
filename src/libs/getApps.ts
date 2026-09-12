import {fetchWithRetry, getBaseUrl} from "@/libs/utils";
import {App} from "@/Models/app";

/**
 * Public listings show PUBLIC apps only. Pass includeUnlisted where unlisted apps
 * still have to be nameable or selectable, e.g. the changelog overview.
 */
export async function getApps(includeUnlisted = false): Promise<App[]> {
    const baseUrl = getBaseUrl();
    const query = includeUnlisted ? "?include=unlisted" : "";
    return await fetchWithRetry(`${baseUrl}/api/apps/get${query}`);
}

export async function getAppById(id: string): Promise<App | undefined> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/apps/get/${id}`);

    return Array.isArray(data) && data.length === 0 ? undefined : data;
}

/** Direct link: resolves PUBLIC and UNLISTED apps, but never PRIVATE ones. */
export async function getAppBySlug(slug: string): Promise<App | undefined> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/apps/get/${encodeURIComponent(slug)}`);

    return Array.isArray(data) || !data ? undefined : data;
}
