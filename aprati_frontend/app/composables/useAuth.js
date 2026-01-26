import { ref, computed, readonly } from 'vue'

const user = ref(null)
const token = ref(null)
const isAuthenticated = ref(false)

export const useAuth = () => {
  const login = async (credentials) => {
    try {
      const { api } = useApi()
      const response = await api.auth.login(credentials)
      
      if (response.success && response.data) {
        user.value = response.data.user
        token.value = response.data.token
        isAuthenticated.value = true
        
        // Store in localStorage
        if (process.client) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }
        
        return { success: true, data: response.data }
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login failed' 
      }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken && storedUser) {
        try {
          token.value = storedToken
          user.value = JSON.parse(storedUser)
          isAuthenticated.value = true
        } catch (error) {
          console.error('Error parsing stored user:', error)
          logout()
        }
      }
    }
  }

  const register = async (userData) => {
    try {
      const { api } = useApi()
      const response = await api.auth.register(userData)
      
      if (response.success && response.data) {
        user.value = response.data.user
        token.value = response.data.token
        isAuthenticated.value = true
        
        // Store in localStorage
        if (process.client) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }
        
        return { success: true, data: response.data }
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Registration failed' 
      }
    }
  }

  const isAdmin = computed(() => user.value?.role === 'admin')
  const isUser = computed(() => user.value?.role === 'user')

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated: readonly(isAuthenticated),
    isAdmin,
    isUser,
    login,
    logout,
    register,
    initAuth
  }
}
