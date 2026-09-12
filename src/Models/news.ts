export type News = {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    content?: string;
    publishedAt?: string | Date;
    visibility?: 'PUBLIC' | 'UNLISTED' | 'PRIVATE';
};