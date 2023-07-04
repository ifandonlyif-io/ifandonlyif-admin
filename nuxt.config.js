// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: false,
    runtimeConfig: {
        adminPassword: 'valid-password',
        public: {
            apiBase: 'http://example.com'
        }
    },
    app: {
        head: {
            title: 'ifandonlyif admin',
            link: [
                {
                    id: 'theme-css',
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: '/themes/lara-light-indigo/theme.css'
                }
            ]
        }
    },
    build: {
        transpile: ['primevue']
    },
    css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss']
});
