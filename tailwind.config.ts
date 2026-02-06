import type { Config } from "tailwindcss";

import generated from "@tailwindcss/typography";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}", // <--- Wir vereinfachen diesen Pfad mal!
    ],
    theme: {
        extend: {
            colors: {
                'test-rot': '#ff0000', // <--- Testfarbe
            },
        },
    },
    plugins: [
        generated,
    ],
};
export default config;