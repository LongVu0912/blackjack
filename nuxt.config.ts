// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-08-23",
    devtools: { enabled: true },
    ssr: false,
    devServer: { host: process.env.TAURI_DEV_HOST || "localhost" },
    vite: {
        // Better support for Tauri CLI output
        clearScreen: false,
        // Enable environment variables
        // Additional environment variables can be found at
        // https://v2.tauri.app/reference/environment-variables/
        envPrefix: ["VITE_", "TAURI_"],
        server: {
            // Tauri requires a consistent port
            strictPort: true,
        },
    },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],
    runtimeConfig: {
        public: {
            backendUrl: process.env.BACKEND_URL || "http://localhost:8080",
        },
    },
    modules: [
        "@nuxt/ui",
        "@nuxt/icon",
        "@nuxtjs/color-mode",
        "@vueuse/nuxt",
        "@nuxt/image",
    ],
    app: {
        head: {
            title: "Xì dách",
            htmlAttrs: {
                lang: "vi",
            },
            link: [
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: "/favicon.ico",
                },
            ],
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    charset: "utf-8",
                },
                {
                    property: "og:image",
                    content: "/avatar.png",
                },
                {
                    property: "og:type",
                    content: "website",
                },
            ],
        },
    },
});
