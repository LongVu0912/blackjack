// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-08-23",
    devtools: { enabled: true },
    ssr: true,
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
