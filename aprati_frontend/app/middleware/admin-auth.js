export default defineNuxtRouteMiddleware((to, from) => {
  // Skip verbose logging during SSR/prerendering
  const isPrerendering = import.meta.prerender || process.server
  
  // Removed verbose logging for production
  // if (!isPrerendering) {
  //   console.log('=== ADMIN AUTH MIDDLEWARE ===')
  //   console.log('📍 Checking route:', to.path)
  //   console.log('🔙 From route:', from?.path || 'direct')
  // }
  
  // Get auth token and user data from cookies
  const authToken = useCookie('auth-token')
  const authUser = useCookie('auth-user')
  
  // if (!isPrerendering) {
  //   console.log('🔑 Token exists:', !!authToken.value)
  //   console.log('👤 User exists:', !!authUser.value)
  //   if (authToken.value) console.log('🔑 Token preview:', authToken.value.substring(0, 20) + '...')
  //   if (authUser.value) console.log('👤 User data type:', typeof authUser.value)
  // }
  
  // Check if user is authenticated
  if (!authToken.value || !authUser.value) {
    // if (!isPrerendering) {
    //   console.error('❌ No authentication found - redirecting to /admin-access')
    // }
    return navigateTo('/admin-access')
  }
  
  // Parse user data if it's a string
  let userData = authUser.value
  
  if (typeof userData === 'string') {
    try {
      userData = JSON.parse(userData)
    } catch (error) {
      // if (!isPrerendering) {
      //   console.error('❌ JSON parse error:', error)
      // }
      return navigateTo('/admin-access')
    }
  }
  
  // Check if user has admin role
  const userRole = userData?.role
  
  if (userRole !== 'admin') {
    // if (!isPrerendering) {
    //   console.error('❌ ACCESS DENIED - Role mismatch')
    //   console.log('Expected: admin, Got:', userRole)
    // }
    
    throw createError({
      statusCode: 403,
      statusMessage: `Access denied. Role "${userRole}" does not have administrative privileges.`
    })
  }
  
  // Admin access granted - allow navigation
})
