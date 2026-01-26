export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip on server-side rendering
  if (process.server) return

  try {
    // Get current user and token from localStorage
    const userStr = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    const tokenExpiry = localStorage.getItem('token_expiry')
    
    // Validate data exists
    if (!userStr || !token) {
      throw new Error('No authentication data')
    }

    // Parse user data securely
    let user
    try {
      user = JSON.parse(userStr)
    } catch (e) {
      console.error('Failed to parse user data:', e)
      throw new Error('Invalid user data')
    }

    // Check token expiration (if set)
    if (tokenExpiry) {
      const expiryDate = new Date(tokenExpiry)
      if (expiryDate < new Date()) {
        throw new Error('Token expired')
      }
    }

    // Verify token is valid format (basic check)
    if (!token.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)) {
      throw new Error('Invalid token format')
    }

    // Validate user object has required fields
    if (!user.id || !user.email || !user.role) {
      throw new Error('Invalid user structure')
    }

    // Check for role-based access
    if (to.meta.requiresAdmin && user.role !== 'admin') {
      console.warn('Unauthorized access attempt to admin route by user:', user.id)
      return navigateTo('/')
    }

    // Optional: Verify token with backend (uncomment for enhanced security)
    // const config = useRuntimeConfig()
    // const response = await $fetch(`${config.public.apiBase}/auth/verify`, {
    //   headers: { Authorization: `Bearer ${token}` },
    //   method: 'POST'
    // })
    // if (!response.valid) throw new Error('Token verification failed')

  } catch (error) {
    // Clear invalid authentication data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('token_expiry')
    
    // Redirect to login with return path
    const redirectPath = encodeURIComponent(to.path)
    return navigateTo(`/auth/login?redirect=${redirectPath}`)
  }
})
