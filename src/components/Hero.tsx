import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative pt-48 pb-32 px-6 min-h-[85vh] flex items-center overflow-hidden">

            {/* --- Lokales CSS für diese Komponente --- */}
            <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(50px, -80px) scale(1.2); }
          66% { transform: translate(-40px, 50px) scale(0.8); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes drift {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(30px, 40px); }
          100% { transform: translate(0px, 0px); }
        }
        .animate-blob { animation: blob 10s infinite alternate; }
        .animate-drift { animation: drift 15s infinite ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

            {/* Hintergrund Animation */}
            <div className="absolute inset-0 w-full h-full bg-slate-950">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-25 animate-blob"></div>
                <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-pink-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-blob animation-delay-4000"></div>
                {/* Grid Pattern: Wir nutzen hier CSS statt Bild-Datei, falls die SVG fehlt */}
                <div className="absolute inset-0 z-10 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2">
                <div className="text-left">
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md text-sm font-medium text-blue-300">
                        🚀 Version 3.0 ist da
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] text-white">
                        Complexity <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              made simple.
            </span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
                        Software muss nicht kompliziert sein, um mächtig zu sein.
                        Wir geben dir die Werkzeuge für morgen.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition shadow-lg shadow-blue-900/20 hover:-translate-y-1">
                            Apps entdecken
                        </button>
                    </div>
                </div>
                {/* Platzhalter rechts für Balance */}
                <div className="hidden lg:block"></div>
            </div>
        </section>
    );
}