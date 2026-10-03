import {News} from "@/Models/news";
import {fetchPageWithRetry, fetchWithRetry, getBaseUrl} from "@/libs/utils";
import {buildQuery, Facet, Page, SortOption} from "@/libs/listing";

export const BLOG_SORTS = [
    { key: "newest", label: "Newest first", api: "publishedAt,desc" },
    { key: "oldest", label: "Oldest first", api: "publishedAt,asc" },
    { key: "title", label: "Title A–Z", api: "title,asc" },
    { key: "quick", label: "Quick reads first", api: "readingTime,asc" },
    { key: "long", label: "Long reads first", api: "readingTime,desc" },
] as const satisfies readonly SortOption[];

export type BlogQuery = {
    category?: string;
    q?: string;
    /** backend sort, e.g. "publishedAt,desc" */
    sort: string;
    /** 1-based */
    page: number;
    size: number;
};

/** The newest posts, e.g. for the start page. */
export async function getBlogPosts(limit?: number): Promise<News[]> {
    const baseUrl = getBaseUrl();
    const query = limit ? buildQuery({ page: 0, size: limit }) : "";
    return await fetchWithRetry(`${baseUrl}/api/news/get${query}`);
}

/** One page of the blog, filtered and sorted by the backend. */
export async function getBlogPage({ category, q, sort, page, size }: BlogQuery): Promise<Page<News>> {
    const baseUrl = getBaseUrl();
    const query = buildQuery({ category, q, sort, page: page - 1, size });
    return await fetchPageWithRetry<News>(`${baseUrl}/api/news/get${query}`, page, size);
}

/** Categories in use, with the number of posts in each. */
export async function getBlogCategories(): Promise<Facet[]> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/news/categories`);
    return Array.isArray(data) ? data : [];
}

export async function getPostById(id: string): Promise<News | undefined> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/news/get/${id}`);

    return Array.isArray(data) && data.length === 0 ? undefined : data;
}
