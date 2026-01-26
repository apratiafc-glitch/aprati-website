// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Source directory
  srcDir: 'app/',

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-swiper'
  ],

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Aprati Foods Cambodia',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Premium Quality Food Products - Aprati Foods Cambodia' }
      ],
      link: [
        // Default favicon (will be updated dynamically by plugin)
        { rel: 'icon', type: 'image/x-icon', href: '/images/web.ico' }
      ]
    }
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      // Use direct API URL (CORS must be configured on backend)
      apiBase: process.env.API_BASE_URL || 'https://sdev.apratifoods.asia/api',
      apiBaseUrl: process.env.STORAGE_BASE_URL || 'https://sdev.apratifoods.asia',
      appName: 'Aprati Foods (Cambodia) Ltd'
    }
  },

  // Build configuration
  build: {
    transpile: ['@headlessui/vue']
  },

  // Generate static site for production
  ssr: true,

  // Output directory for static generation - directly to public/
  nitro: {
    output: {
      dir: '../aprati_backend/.output',
      publicDir: '../aprati_backend/.output/public'
    },
    prerender: {
      crawlLinks: true,
      failOnError: false,
      ignore: ['/language-demo', '/admin/settings']
    },
    // Development proxy to bypass CORS
    // Maps /api/* -> https://sdev.apratifoods.asia/api/*
    devProxy: {
      '/api': {
        target: 'https://sdev.apratifoods.asia',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Development server configuration
  devServer: {
    port: 3001,
    host: 'localhost'
  },

  // Vite configuration
  vite: {
    server: {
      hmr: {
        port: 3000,
        host: 'localhost'
      }
    }
  },

  // Auto-import configuration
  imports: {
    dirs: [
      'composables/**',
      'stores/**',
      'utils/**'
    ],
    presets: [
      {
        from: 'vue',
        imports: ['ref', 'reactive', 'computed', 'watch', 'onMounted', 'onUnmounted']
      }
    ]
  },

  // Disable problematic auto-imports that might conflict
  experimental: {
    watcher: 'chokidar-granular'
  }
})
