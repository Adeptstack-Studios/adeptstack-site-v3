import {FaAndroid, FaApple, FaGlobe, FaLinux, FaSteam, FaWindows} from "react-icons/fa";
import {SiCurseforge, SiModrinth} from "react-icons/si";

const PLATFORM_NAMES: Record<string, string> = {
    windows: "Windows", android: "Android", mac: "macOS", ios: "iOS", linux: "Linux", steam: "Steam", web: "Web",
    curseforge: "CurseForge", modrinth: "Modrinth",
};

/** "Windows;Web" or "windows, web" from the console, as lower-case keys */
export function parsePlatforms(platforms?: string): string[] {
    return platforms ? platforms.split(/[,;]/).map(p => p.trim().toLowerCase()).filter(Boolean) : [];
}

export function platformName(platform: string) {
    return PLATFORM_NAMES[platform] ?? platform.charAt(0).toUpperCase() + platform.slice(1);
}

export function PlatformIcon({platform, size = 16}: { platform: string; size?: number }) {
    switch (platform) {
        case "windows": return <FaWindows size={size}/>;
        case "android": return <FaAndroid size={size}/>;
        case "mac":
        case "ios": return <FaApple size={size}/>;
        case "linux": return <FaLinux size={size}/>;
        case "steam": return <FaSteam size={size}/>;
        case "curseforge": return <SiCurseforge size={size}/>;
        case "modrinth": return <SiModrinth size={size}/>;
        default: return <FaGlobe size={size}/>;
    }
}
