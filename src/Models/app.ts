import {Changelog} from "@/Models/changelog";

/** A screenshot; one with a text is also a feature on the product page (Markdown). */
export interface AppImage {
    url: string;
    text?: string | null;
}

export interface App {
    id?: number;
    name?: string;
    slogan?: string;
    description?: string;
    iconUrl?: string;
    slug?: string;
    category?: string;
    platforms?: string;
    highlighted?: boolean;
    legacy?: boolean;
    /** Screenshots in gallery order. Older backends only send image1Url etc. */
    images?: AppImage[];
    /** Optional uploaded video, shown first in the gallery */
    videoUrl?: string | null;
    image1Url?: string;
    image2Url?: string;
    image3Url?: string;
    feature1Desc?: string;
    feature2Desc?: string;
    feature3Desc?: string;
    modrinthId?: string;
    curseforgeId?: string;
    visibility?: 'PUBLIC' | 'UNLISTED' | 'PRIVATE';
    downloads?: number;
    downloadsFormatted?: string;
    publishedAt?: string;
    /** The newest release that is already out */
    latestMainVersion?: Changelog;
    /** The next release dated in the future, for "coming soon" */
    upcomingVersion?: Changelog | null;
}