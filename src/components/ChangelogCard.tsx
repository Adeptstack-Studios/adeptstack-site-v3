import Link from "next/link";
import { Calendar, Layers, Activity, ArrowRight } from "lucide-react";

export default function ChangelogCard({ log }: { log: any }) {
    const formattedDate = log.publishedAt
        ? new Date(log.publishedAt).toLocaleDateString('en-EN', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : "Unknown Date";

    return (
        <Link
            href={`/changelogs/${log.id}`}
            className="flex flex-col h-full group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 hover:bg-slate-900 transition-all"
        >
            <div className="w-full h-40 relative overflow-hidden bg-slate-800 shrink-0">
                <img
                    src={log.imageUrl}
                    alt={log.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="p-5 flex flex-col grow">

                {/* Oben: App Name (Links) und Datum (Rechts) in einer Zeile */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs font-medium">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span className="truncate max-w-[140px]">{log.appName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {formattedDate}
                    </div>
                </div>

                <h2 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {log.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4 grow">
                    {log.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-800/50 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                            {log.version || "v1.0.0"}
                        </span>
                        <span className="text-[10px] font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded flex items-center">
                            <Activity className="w-3 h-3 mr-1" /> {log.channel || "Release"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-blue-500 text-sm font-semibold opacity-80 group-hover:opacity-100 transition-all shrink-0">
                        Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

            </div>
        </Link>
    );
}