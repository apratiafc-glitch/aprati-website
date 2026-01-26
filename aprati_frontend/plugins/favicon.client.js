// plugins/favicon.client.js
export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run on client side
  if (process.client) {
    try {
      // Fetch favicon configuration from API
      const response = await $fetch('/api/favicon-settings')

      if (response.status === 'success') {
        const config = response.data

        // Update document title
        if (config.title) {
          document.title = config.title
        }

        // Update meta description
        if (config.description) {
          const metaDescription = document.querySelector('meta[name="description"]')
          if (metaDescription) {
            metaDescription.setAttribute('content', config.description)
          }
        }

        // Update favicon links
        const links = []

        // Primary favicon
        if (config.primary_favicon) {
          links.push({
            rel: 'icon',
            type: 'image/x-icon',
            href: config.primary_favicon
          })

          // Apple touch icon
          if (config.enable_apple_touch) {
            links.push({
              rel: 'apple-touch-icon',
              sizes: '180x180',
              href: config.primary_favicon
            })
          }

          // Multiple sizes
          if (config.enable_multiple_sizes) {
            links.push({
              rel: 'icon',
              type: 'image/x-icon',
              sizes: '16x16',
              href: config.primary_favicon
            })
            links.push({
              rel: 'icon',
              type: 'image/x-icon',
              sizes: '32x32',
              href: config.primary_favicon
            })
          }
        }

        // Company favicon as shortcut
        if (config.company_favicon) {
          links.push({
            rel: 'shortcut icon',
            type: 'image/x-icon',
            href: config.company_favicon
          })
        }

        // Update or create favicon links
        links.forEach(linkConfig => {
          let link = document.querySelector(`link[rel="${linkConfig.rel}"]${linkConfig.sizes ? `[sizes="${linkConfig.sizes}"]` : ''}`)

          if (!link) {
            link = document.createElement('link')
            document.head.appendChild(link)
          }

          link.rel = linkConfig.rel
          link.type = linkConfig.type
          link.href = linkConfig.href
          if (linkConfig.sizes) {
            link.sizes = linkConfig.sizes
          }
        })

        console.log('✅ Favicon updated dynamically from API')
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch favicon configuration, using defaults:', error)
    }
  }
})
