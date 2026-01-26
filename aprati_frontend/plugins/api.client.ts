// @ts-nocheck - Ignore TypeScript errors for Nuxt auto-imports
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  // Create $api instance
  const $api = $fetch.create({
    baseURL: config.public.apiBase as string,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    onRequest({ request, options }) {
      // Add auth token if available
      const token = useState<string | null>('auth.token')
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`
        }
      }
    },
    onResponseError({ response }) {
      // Handle 401 errors (unauthorized)
      if (response.status === 401) {
        // Clear auth and redirect to login
        const { clearAuth } = useAuth()
        clearAuth()
        navigateTo('/auth/login')
      }
    }
  })

  // Provide $api to the app
  return {
    provide: {
      api: $api
    }
  }
})
