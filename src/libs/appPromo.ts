export type StorePlatform = "android" | "windows";

export const APP_STORE_LINKS: Record<StorePlatform, { href: string; label: string }> = {
    android: {
        href: "https://play.google.com/store/apps/details?id=com.adeptstack.adeptstack_app",
        label: "Get it on Google Play",
    },
    windows: {
        href: "https://apps.microsoft.com/detail/9PKTGV1P8NHD",
        label: "Get it from Microsoft Store",
    },
};

/** Links shared from the Adeptstack app end in ?source=app. */
export function isSharedFromApp(search: string) {
    return new URLSearchParams(search).get("source") === "app";
}

/**
 * Only Android and Windows have a store listing. Everything else gets no promo,
 * because there would be nothing to install.
 */
export function detectStorePlatform(userAgent: string): StorePlatform | null {
    const ua = userAgent.toLowerCase();
    // Windows Phone reports both "windows" and "android" but runs neither store app
    if (ua.includes("windows phone")) return null;
    if (ua.includes("android")) return "android";
    if (ua.includes("windows")) return "windows";
    return null;
}
