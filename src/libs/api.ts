export type AppItem = {
    id: string;
    name: string;
    slogan: string;
    desc: string;
    icon: string;
    highlight: boolean;
    link: string;
};

export type BlogPost = {
    id?: number;
    title?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    content?: string;
    publishedAt?: string | Date;
};

const getBaseUrl = () => {
    return process.env.BACKEND_URL || "http://localhost:8080";
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, retries = 3) {
    const headers = {
        'User-Agent': 'Adeptstack-Frontend-Vercel',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': 'https://adeptstack.net'
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
            if (i === retries - 1) return []; // Beim letzten Versuch aufgeben
            await wait(1000);
        }
    }
    console.log("[API] Alle Versuche gescheitert. Gebe leeres Array zurück.");
    return [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const baseUrl = getBaseUrl();
    return await fetchWithRetry(`${baseUrl}/api/news/get`);
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
    const baseUrl = getBaseUrl();
    const data = await fetchWithRetry(`${baseUrl}/api/news/get/${id}`);

    return Array.isArray(data) && data.length === 0 ? undefined : data;
}

export async function getApps(): Promise<AppItem[]> {
    return [
        {
            id: "core",
            name: "Adeptstack Core",
            slogan: "Die All-in-One Suite.",
            desc: "Verwalte deine Projekte in einer einzigen, rasend schnellen Oberfläche.",
            icon: "🚀",
            highlight: true,
            link: "#"
        },
        {
            id: "vault",
            name: "Secure Vault",
            slogan: "Unknackbar sicher.",
            desc: "Passwörter und Secrets lokal verschlüsselt.",
            icon: "🛡️",
            highlight: false,
            link: "#"
        },
        {
            id: "pixel",
            name: "Pixel Perfect",
            slogan: "Design to Code.",
            desc: "Exportiere Designs direkt als React Components.",
            icon: "🎨",
            highlight: false,
            link: "#"
        }
    ];
}