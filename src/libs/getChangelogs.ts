import {Changelog} from "@/app/Models/changelog";
import {fetchWithRetry, getBaseUrl} from "@/libs/utils";

export async function getChangelogs(): Promise<Changelog[]> {
    const baseUrl = getBaseUrl();
    return await fetchWithRetry(`${baseUrl}/api/changelogs/get`);
}

export async function getChangelogById(id: string): Promise<Changelog | undefined> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/changelogs/get/${id}`);

    return Array.isArray(data) && data.length === 0 ? undefined : data;
}