import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
            <Header />
            <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
                    Software & Tools
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mb-8">
                    Wir arbeiten gerade an der Anbindung unserer Datenbank.
                    Bald findest du hier alle Adeptstack-Apps (PC-Info, Notivity uvm.) zum direkten Download.
                </p>
                <div className="inline-block px-4 py-2 border border-slate-800 rounded-lg bg-slate-900/50 text-slate-500 font-mono text-sm">
                    Status: Backend Integration in progress... ⚙️
                </div>
            </main>
            <Footer />
        </div>
    );
}