export interface Changelog {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    appUrl: string;
    microsoftStoreUrl?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    steamUrl?: string;
    content: string;
    channel: string;
    appId: number;
    version: string;
    publishedAt: string;
}