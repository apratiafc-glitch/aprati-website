export default defineNuxtPlugin(() => {
  const { initAuth } = useAuth()
  
  // Initialize auth state from localStorage when the app starts
  if (process.client) {
    initAuth()
  }
})
