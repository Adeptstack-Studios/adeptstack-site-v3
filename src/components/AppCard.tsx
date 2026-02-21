import React from 'react';
import Link from "next/link";

type AppCardProps = {
    name?: string;
    slogan?: string;
    slug?: string;
    icon?: string;
    highlight?: boolean;
    legacy?: boolean;
    downloadUrl?: string;
    version?: string;
    channel?: string;
};

function AppCard({name, slogan, slug, icon, highlight = false, legacy = false, downloadUrl, version, channel
}: AppCardProps) {
    return (
        <div
            className={`
                relative group overflow-hidden rounded-3xl p-6 flex flex-col transition-all duration-500
                ${legacy
                ? 'bg-slate-900/30 border-slate-800/50 opacity-90'
                : highlight
                    ? 'bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:border-blue-400/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]'
                    : 'bg-slate-900/50 border-white/5 hover:bg-slate-800/80 hover:border-white/10'
            }
                border
            `}
        >
            {highlight && (
                <>
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition duration-1000 pointer-events-none"></div>
                </>
            )}

            <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner overflow-hidden p-2 group-hover:scale-105 transition-transform duration-500">
                    {icon ? (
                        <img src={icon} alt={`Icon für ${name}`} className="w-full h-full object-contain" />
                    ) : (
                        <div className="w-full h-full bg-slate-800 rounded-xl" />
                    )}
                </div>

                <div className="flex flex-col gap-2 items-end">
                    {legacy && (
                        <span title="Diese App erhält nur noch eingeschränkte Updates." className="cursor-help px-3 py-1 rounded-md bg-slate-800/80 text-slate-400 text-xs font-bold uppercase tracking-wider border border-slate-700 backdrop-blur-sm">
                            Legacy
                        </span>
                    )}
                    {highlight && !legacy && (
                        <span className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20 backdrop-blur-sm">
                            Featured
                        </span>
                    )}
                </div>
            </div>

            <div className="relative z-10 flex-grow">
                <h3 className={`font-bold mb-1.5 text-white ${highlight ? 'text-2xl' : 'text-xl'}`}>
                    {name}
                </h3>
                <p className={`font-medium text-xs md:text-sm uppercase tracking-wider line-clamp-2 ${legacy ? 'text-slate-500' : 'text-blue-400/80'}`}>
                    {slogan}
                </p>

                {(version || channel) && (
                    <div className="flex flex-wrap items-center gap-2.5 mt-4">
                        {version && (
                            <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-slate-300 text-xs font-mono">
                                {version}
                            </span>
                        )}
                        {channel && (
                            <span className="px-2.5 py-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                {channel}
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-6 relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                    {downloadUrl ? (
                        <a
                            href={downloadUrl}
                            className={`
                                px-5 py-2.5 rounded-xl font-bold text-sm transition-all text-center
                                ${legacy
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                : 'bg-white text-slate-950 hover:bg-blue-50 shadow-lg shadow-white/5 hover:scale-105 active:scale-95'
                            }
                            `}
                        >
                            Download
                        </a>
                    ) : (
                        <button
                            className={`
                                px-5 py-2.5 rounded-xl font-bold text-sm transition-all
                                ${legacy
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                : 'bg-white text-slate-950 hover:bg-blue-50 shadow-lg shadow-white/5 hover:scale-105 active:scale-95'
                            }
                            `}
                        >
                            Download
                        </button>
                    )}

                        <a href={"/products/"+slug}>
                            <button className="px-4 py-2.5 rounded-xl text-slate-300 font-medium text-sm hover:text-white hover:bg-white/5 transition-colors">
                                Details
                            </button>
                        </a>
                </div>
            </div>
        </div>
    );
}

export default AppCard;