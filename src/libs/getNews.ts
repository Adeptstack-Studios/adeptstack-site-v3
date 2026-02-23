import {News} from "@/Models/news";
import {fetchWithRetry, getBaseUrl} from "@/libs/utils";

export async function getBlogPosts(): Promise<News[]> {
    const baseUrl = getBaseUrl();
    return await fetchWithRetry(`${baseUrl}/api/news/get`);
}

export async function getPostById(id: string): Promise<News | undefined> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/news/get/${id}`);

    return Array.isArray(data) && data.length === 0 ? undefined : data;
}