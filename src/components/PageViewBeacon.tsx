"use client";

import {useEffect} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {getBaseUrl} from "@/libs/utils";

/**
 * Reports each page view to our own backend, without cookies and without anything stored in
 * the browser. The backend only keeps daily sums (see the privacy page). Browsers that send
 * Do Not Track or Global Privacy Control are not counted at all.
 */
export default function PageViewBeacon() {
    const pathname = usePathname();
    const source = useSearchParams().get("source");

    useEffect(() => {
        if (optedOut()) return;
        const body = JSON.stringify({
            path: pathname,
            // only the first page of a visit has an outside referrer; later ones point to us
            referrer: document.referrer,
            ...(source ? {source} : {}),
        });
        // text/plain needs no CORS preflight, and sendBeacon survives leaving the page
        const data = new Blob([body], {type: "text/plain"});
        const url = `${getBaseUrl()}/api/stats/view`;
        if (!navigator.sendBeacon?.(url, data)) {
            fetch(url, {method: "POST", body: data, keepalive: true}).catch(() => undefined);
        }
    }, [pathname, source]);

    return null;
}

function optedOut() {
    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    return nav.globalPrivacyControl === true || navigator.doNotTrack === "1";
}
