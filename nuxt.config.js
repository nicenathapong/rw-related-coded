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
        title: process.env.title,
        // titleTemplate: `${process.env.title} </ %s >`,
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'rw-code' },
            { name: 'theme-color', content: '#4968da' },
        ],
        link: [
            { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap' }
        ]
    },

    serverMiddleware: [ '@/api/index.js' ],
 
    hooks: {
      ready(nuxt) {
        const signals = ['SIGINT', 'SIGTERM'];
        const handler = async (signal) => {
          try {
            signals.forEach(sig => process.removeListener(sig, handler));
            await nuxt.close();
            process.kill(process.pid, signal);
          } catch(error) {
            console.error('error during shutdown', error);
            process.exit(1);
          }
        };
        signals.forEach(signal => process.on(signal, handler));
      }
    },

    env: {
        NODE_ENV: process.env.NODE_ENV
    }
}