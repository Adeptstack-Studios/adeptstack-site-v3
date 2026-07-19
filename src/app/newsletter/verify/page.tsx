"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerifyContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState("loading");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            return;
        }

        // Dynamische Backend-URL aus den Umgebungsvariablen (z.B. in deiner .env.local definiert)
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.adeptstack.net";

        fetch(`${backendUrl}/api/newsletter/verify?token=${token}`)
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setEmail(data.email); // E-Mail aus der DB holen
                    setStatus("success");
                } else {
                    setStatus("error");
                }
            })
            .catch(() => setStatus("error"));
    }, [token]);

    if (status === "loading") {
        return <div className="p-8 text-gray-500">Verifiziere Anmeldung...</div>;
    }

    if (status === "success") {
        return (
            <div className="border-t-4 border-green-500 p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Willkommen an Bord! 🎉</h1>
                <p className="text-gray-600 mb-6">
                    Die Adresse <b>{email}</b> wurde erfolgreich verifiziert. Du bist jetzt für den Newsletter angemeldet.
                </p>
            </div>
        );
    }

    return (
        <div className="border-t-4 border-red-500 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Fehler 🚨</h1>
            <p className="text-gray-600 mb-6">
                Der Bestätigungslink ist leider ungültig oder bereits abgelaufen.
            </p>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <div className="max-w-md mx-auto mt-20 bg-white rounded-lg shadow-lg text-center overflow-hidden">
            <Suspense fallback={<div className="p-8 text-gray-500">Lade...</div>}>
                <VerifyContent />
            </Suspense>

            <div className="p-6 bg-gray-50">
                <Link
                    href="/"
                    className="inline-block border-2 border-gray-300 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    Zurück zur Startseite
                </Link>
            </div>
        </div>
    );
}