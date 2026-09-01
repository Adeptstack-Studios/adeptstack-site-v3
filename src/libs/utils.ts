import { Changelog } from "@/Models/changelog";

export const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchWithRetry(url: string, retries = 3) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': 'https://adeptstack.net',
        'X-Adeptstack-Bypass': process.env.BYPASS_KEY || 'none',
    };

    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, {
                next: { revalidate: 60 },
                headers: headers
            });

            if (res.ok) {
                return await res.json();
            }

            if (res.status === 403 || res.status === 429) {
                console.warn(`[API] Blockiert (403/429). Versuch ${i + 1} von ${retries}. Warte 1500ms...`);
                await wait(1500);
                continue;
            }

            console.error(`[API ERROR] Status: ${res.status}`);
            return [];

        } catch (error) {
            console.error(`[API NETWORK ERROR] Versuch ${i + 1} gescheitert:`, error);
            if (i === retries - 1) throw error;
            await wait(1000);
        }
    }
    console.log("[API] Alle Versuche gescheitert. Gebe leeres Array zurück.");
    return [];
}

/**
 * The link the primary "Download" button points at. Mods have no appUrl,
 * so they fall back to their store pages.
 */
export function primaryDownloadUrl(changelog?: Changelog) {
    return changelog?.appUrl
        || changelog?.modrinthUrl
        || changelog?.curseforgeUrl
        || undefined;
}

/** True when the release has any download link at all. Narrows the type for the caller. */
export function hasDownloadLink(changelog?: Changelog): changelog is Changelog {
    return Boolean(
        changelog?.appUrl || changelog?.microsoftStoreUrl || changelog?.playStoreUrl
        || changelog?.appStoreUrl || changelog?.steamUrl
        || changelog?.curseforgeUrl || changelog?.modrinthUrl
    );
}

/**
 * next/image throws on anything that is neither an absolute http(s) url nor a
 * root-relative path, which would take the whole page down for one bad cms entry.
 */
export function safeImageSrc(src?: string, fallback = "/logo.svg") {
    if (!src) return fallback;
    if (src.startsWith("/")) return src;
    try {
        const { protocol } = new URL(src);
        return protocol === "http:" || protocol === "https:" ? src : fallback;
    } catch {
        return fallback;
    }
}
