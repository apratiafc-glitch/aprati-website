// composables/useFavicon.js
export const useFavicon = () => {
  const faviconConfig = ref({
    primary_favicon: '/images/web.ico',
    company_favicon: '/images/Companylogo.ico',
    title: 'Aprati Foods Cambodia',
    description: 'Premium Quality Food Products',
    enable_apple_touch: true,
    enable_multiple_sizes: true
  })

  const loading = ref(false)
  const error = ref(null)

  // Fetch favicon configuration from API
  const fetchFaviconConfig = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await $fetch('/api/favicon-settings')

      if (response.status === 'success') {
        faviconConfig.value = response.data
      }
    } catch (err) {
      error.value = err.message || 'Failed to fetch favicon configuration'
      console.error('Error fetching favicon config:', err)
    } finally {
      loading.value = false
    }
  }

  // Generate link tags for Nuxt config
  const generateLinkTags = () => {
    const links = []

    // Primary favicon
    if (faviconConfig.value.primary_favicon) {
      links.push({
        rel: 'icon',
        type: 'image/x-icon',
        href: faviconConfig.value.primary_favicon
      })

      // Apple touch icon
      if (faviconConfig.value.enable_apple_touch) {
        links.push({
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: faviconConfig.value.primary_favicon
        })
      }

      // Multiple sizes
      if (faviconConfig.value.enable_multiple_sizes) {
        links.push({
          rel: 'icon',
          type: 'image/x-icon',
          sizes: '16x16',
          href: faviconConfig.value.primary_favicon
        })
        links.push({
          rel: 'icon',
          type: 'image/x-icon',
          sizes: '32x32',
          href: faviconConfig.value.primary_favicon
        })
      }
    }

    // Company favicon as shortcut
    if (faviconConfig.value.company_favicon) {
      links.push({
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: faviconConfig.value.company_favicon
      })
    }

    return links
  }

  // Update document title
  const updateTitle = (newTitle) => {
    if (newTitle && typeof document !== 'undefined') {
      document.title = newTitle
    }
  }

  // Initialize favicon on client side
  const initializeFavicon = async () => {
    if (process.client) {
      await fetchFaviconConfig()

      // Update document title if different
      if (faviconConfig.value.title && document.title !== faviconConfig.value.title) {
        updateTitle(faviconConfig.value.title)
      }
    }
  }

  return {
    faviconConfig: readonly(faviconConfig),
    loading: readonly(loading),
    error: readonly(error),
    fetchFaviconConfig,
    generateLinkTags,
    updateTitle,
    initializeFavicon
  }
}
