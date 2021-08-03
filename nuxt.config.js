export default {
  head: {
    title: 'Fashion Express',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@assets/styles/common.less',
    "@assets/iconfont/iconfont.css",
    'swiper/swiper-bundle.css'
  ],
  plugins: [
    { src: '@/plugins/element-ui', ssr: true },
    { src: "~/plugins/axios", ssr: true },
    { src: '@/plugins/filters' }
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
  ],
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],
  axios: {
    baseURL: 'https://adm.mixshop.world',
    proxy: true
  },
  proxy: { '/api': { target: 'http://buk.mixshop.world', changeOrigin: true } },
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      config.node = {
        fs: "empty"
      }
    },
  }
}
