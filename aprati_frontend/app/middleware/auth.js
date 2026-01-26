export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, user } = useAuth()
  
  // Initialize auth state from localStorage
  if (process.client) {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        // Set auth state if we have stored credentials
        if (!isAuthenticated.value) {
          // This will be handled by the composable's initAuth method
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      }
    }
  }
  
  // Check if route requires authentication
  if (!isAuthenticated.value) {
    // If not authenticated, redirect to login
    return navigateTo('/login')
  }
  
  // Check if route requires admin access
  if (to.path.startsWith('/admin') && user.value?.role !== 'admin') {
    // If not admin, redirect to home
    return navigateTo('/')
  }
})
