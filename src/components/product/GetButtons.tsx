import {ComponentType} from "react";
import {ArrowUpRight, CalendarClock, Download, Globe} from "lucide-react";
import {FaAppStoreIos, FaGooglePlay, FaMicrosoft, FaSteam} from "react-icons/fa";
import {SiCurseforge, SiModrinth} from "react-icons/si";
import {Changelog} from "@/Models/changelog";
import {countedLink, formatReleaseDate} from "@/libs/utils";

type LinkField = "appUrl" | "microsoftStoreUrl" | "steamUrl" | "playStoreUrl" | "appStoreUrl"
    | "modrinthUrl" | "curseforgeUrl" | "saasUrl";

/** Where an app can be had, the most direct way first; the first one a release has is the big button. */
const SOURCES: { field: LinkField; name: string; action: string; icon: ComponentType<{ className?: string }> }[] = [
    {field: "appUrl", name: "Direct download", action: "Download", icon: Download},
    {field: "microsoftStoreUrl", name: "Microsoft Store", action: "Get from Microsoft Store", icon: FaMicrosoft},
    {field: "steamUrl", name: "Steam", action: "Get on Steam", icon: FaSteam},
    {field: "playStoreUrl", name: "Google Play", action: "Get on Google Play", icon: FaGooglePlay},
    {field: "appStoreUrl", name: "App Store", action: "Get on the App Store", icon: FaAppStoreIos},
    {field: "modrinthUrl", name: "Modrinth", action: "Get on Modrinth", icon: SiModrinth},
    {field: "curseforgeUrl", name: "CurseForge", action: "Get on CurseForge", icon: SiCurseforge},
    {field: "saasUrl", name: "Web app", action: "Open the web app", icon: Globe},
];

/** The names of the places a release is available, for "Additional information". */
export function availableOn(release?: Changelog): string[] {
    return release ? SOURCES.filter(source => release[source.field]).map(source => source.name) : [];
}

interface Props {
    release?: Changelog;
    /** the next release, while nothing is out yet */
    comingSoon?: Changelog | null;
}

/** The big button of the store panel, and the other places the app is available below it. */
export default function GetButtons({release, comingSoon}: Props) {
    const sources = release ? SOURCES.filter(source => release[source.field]) : [];

    if (!release || sources.length === 0) {
        return (
            <div>
                <button disabled
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 text-slate-400 font-bold cursor-not-allowed">
                    {comingSoon
                        ? <><CalendarClock className="w-5 h-5"/> Coming soon</>
                        : <><Download className="w-5 h-5"/> Not available yet</>}
                </button>
                {comingSoon?.publishedAt && (
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Out on {formatReleaseDate(comingSoon.publishedAt)}
                    </p>
                )}
            </div>
        );
    }

    const [first, ...others] = sources;
    const external = first.field !== "appUrl";
    const FirstIcon = first.icon;

    return (
        <div>
            <a
                href={countedLink(release, first.field)}
                {...(external ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/25 hover:bg-blue-500 transition-colors"
            >
                <FirstIcon className="w-5 h-5"/> {first.action}
            </a>
            <p className="mt-2 text-center text-xs text-slate-400">
                {release.version && <>Version {release.version}</>}
                {release.version && release.publishedAt && " · "}
                {release.publishedAt && formatReleaseDate(release.publishedAt)}
            </p>

            {others.length > 0 && (
                <div className="mt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Also available on</p>
                    <ul className="space-y-1.5">
                        {others.map(source => {
                            const Icon = source.icon;
                            return (
                                <li key={source.field}>
                                    <a
                                        href={countedLink(release, source.field)}
                                        {...(source.field !== "appUrl" ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/60 text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
                                    >
                                        <Icon className="w-4 h-4 shrink-0"/>
                                        <span className="grow">{source.name}</span>
                                        <ArrowUpRight className="w-4 h-4 text-slate-500"/>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
