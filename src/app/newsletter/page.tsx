"use client";

import { useState } from "react";
import {getBaseUrl} from "@/libs/utils";

export default function NewsletterSubscribePage() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (formData: FormData) => {
        setLoading(true);
        setMessage("");

        const email = formData.get("email");

        try {
            const url = getBaseUrl() + "/api/newsletter/subscribe";

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const text = await res.text();
            setMessage(text);
        } catch (error) {
            setMessage("Es gab ein Problem bei der Anmeldung.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-black">Newsletter abonnieren</h2>
            {/* action anstelle von onSubmit nutzen */}
            <form action={handleSubscribe} className="flex flex-col gap-4">
                <input
                    type="email"
                    name="email"
                    placeholder="deine@email.de"
                    required
                    className="p-2 border rounded text-black"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Lädt..." : "Abonnieren"}
                </button>
            </form>
            {message && <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>}
        </div>
    );
}