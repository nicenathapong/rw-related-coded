export default {
    buildModules: [
        '@nuxt/postcss8'
    ],
    build: {
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },
    css: [
        '@/assets/css/main.css',
    ],
    head: {
        link: [
            { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap' }
        ]
    }
}