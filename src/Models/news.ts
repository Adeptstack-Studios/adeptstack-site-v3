export type News = {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    content?: string;
    /** Estimated by the backend from the content. */
    readingTimeMinutes?: number;
    publishedAt?: string | Date;
    visibility?: 'PUBLIC' | 'UNLISTED' | 'PRIVATE';
    /** the app the post is about; empty while that app is not public yet */
    appId?: number | null;
    appName?: string | null;
    appSlug?: string | null;
};