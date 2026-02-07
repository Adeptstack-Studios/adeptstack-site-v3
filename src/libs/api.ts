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
    const url = process.env.BACKEND_URL;
    if (!url) {
        console.warn("WARNUNG: BACKEND_URL nicht gesetzt. Nutze localhost.");
        return "http://localhost:8080";
    }
    return url;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
    const baseUrl = getBaseUrl();
    try {
        const res = await fetch(`${baseUrl}/api/news/get`, {
            next: { revalidate: 60 },
            headers: {
                'User-Agent': 'AdeptstackSite-Vercel/1.0',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!res.ok) {
            console.error(`API Error: ${res.status} ${res.statusText}`);
            return [];
        }
        return await res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return [];
    }
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
    const baseUrl = getBaseUrl();
    try {
        const res = await fetch(`${baseUrl}/api/news/get/${id}`, {
            next: { revalidate: 60 },
            headers: {
                'User-Agent': 'AdeptstackSite-Vercel/1.0',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (!res.ok) return undefined;
        return await res.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return undefined;
    }
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