type AppCardProps = {
    name?: string;
    slogan?: string;
    icon?: string;
    highlight?: boolean;
};

function AppCard({name, slogan, icon, highlight = false}: AppCardProps) {
    return (
        <div
            className={`
        relative group overflow-hidden rounded-3xl p-8 border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-blue-500/30 transition duration-500
        ${highlight ? 'md:col-span-2 md:row-span-1 bg-gradient-to-br from-slate-900 to-blue-950/20' : 'md:col-span-1'}
      `}
        >
            <div
                className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition duration-1000"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-6 shadow-inner">
                        <img src={icon} alt={`Icon für ${name}`} className="w-full h-full object-cover"/>
                    </div>
                    <h3 className={`font-bold mb-2 text-white ${highlight ? 'text-3xl' : 'text-2xl'}`}>
                        {name}
                    </h3>
                    <p className="text-blue-400 font-medium mb-4 text-sm uppercase tracking-wide">
                        {slogan}
                    </p>
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <button
                        className="px-5 py-2.5 rounded-lg bg-white text-slate-950 font-bold text-sm hover:bg-blue-50 transition shadow-lg shadow-white/5">
                        Download
                    </button>
                    {highlight && (
                        <button
                            className="px-5 py-2.5 rounded-lg text-white font-medium text-sm hover:bg-white/5 transition">
                            Features ansehen
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AppCard