import {App, AppImage} from "@/Models/app";

/**
 * The screenshots of an app in gallery order. A backend from before the gallery only
 * sends the three fixed image/text pairs; those are turned into the same list.
 */
export function appImages(app: App): AppImage[] {
    if (app.images) {
        return app.images.filter(image => image.url);
    }
    const legacy: [string | undefined, string | undefined][] = [
        [app.image1Url, app.feature1Desc],
        [app.image2Url, app.feature2Desc],
        [app.image3Url, app.feature3Desc],
    ];
    return legacy
        .filter(([url]) => url)
        .map(([url, text]) => ({url: url!, text}));
}

/** Screenshots with a text are features: image and text side by side. */
export function appFeatures(app: App): AppImage[] {
    return appImages(app).filter(image => image.text?.trim());
}
