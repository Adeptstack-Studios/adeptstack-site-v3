import {fetchWithRetry, getBaseUrl} from "@/libs/utils";
import {App} from "@/app/Models/app";

export async function getApps(): Promise<App[]> {
    const baseUrl = getBaseUrl();
    return await fetchWithRetry(`${baseUrl}/api/apps/get`);
}

export async function getAppById(id: string): Promise<App | undefined> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/apps/get/${id}`);

    return Array.isArray(data) && data.length === 0 ? undefined : data;
}