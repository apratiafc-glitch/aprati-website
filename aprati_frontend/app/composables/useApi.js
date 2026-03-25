export const useApi = () => {
  // Use runtime config for API base - respects proxy in development
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.public.apiBase || 'https://sdev.apratifoods.asia/api'

  // Get auth token (check both localStorage and cookies)
  const getAuthToken = (silent = false) => {
    // First try cookies (for compatibility)
    const tokenCookie = useCookie('auth-token')
    if (tokenCookie.value) {
      if (!silent) console.log('🔑 Auth token found in cookie')
      return tokenCookie.value
    }

    // Then try localStorage
    if (process.client) {
      const lsToken = localStorage.getItem('token')
      if (lsToken) {
        if (!silent) console.log('🔑 Auth token found in localStorage')
        return lsToken
      }
    }

    // Don't log for public endpoints - it's expected behavior
    return ''
  }

  // List of public endpoints that don't require authentication
  const publicEndpoints = [
    '/brands',
    '/products',
    '/careers',
    '/footer-settings',
    '/header-settings',
    '/admin-profile-image',
    '/management-posts',
    '/about',
    '/register',
    '/login'
  ]
  // Check if endpoint is public
  const isPublicEndpoint = (endpoint) => {
    return publicEndpoints.some(publicPath => endpoint.startsWith(publicPath))
  }



  // Generic API request function
  const request = async (endpoint, options = {}) => {
    const isPublic = isPublicEndpoint(endpoint)
    const token = getAuthToken(isPublic)

    // Only log API requests in development or for authenticated requests
    if (!isPublic || token) {
      console.log('📡 API Request:', {
        endpoint,
        method: options.method || 'GET',
        authenticated: !!token
      })
    }

    try {
      // Check if body is FormData to avoid setting Content-Type header
      const isFormData = options.body instanceof FormData

      const headers = {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      }

      // Only set Content-Type for non-FormData requests
      if (!isFormData && options.body) {
        headers['Content-Type'] = 'application/json'
      }

      const fetchOptions = {
        ...options,
        headers,
        method: options.method || 'GET',
        timeout: options.timeout || 15000 // Default 15 second timeout for single-threaded artisan serve
      }

      // Only add body if it exists
      if (options.body !== undefined) {
        // $fetch automatically stringifies objects, so don't stringify if it's already a string or FormData
        fetchOptions.body = options.body
      }

      const response = await $fetch(`${apiBase}${endpoint}`, fetchOptions)

      // Handle Laravel API response format
      if (response.success === true) {
        return { ...response }
      } else if (response.success === false) {
        return { ...response, error: response.message || response.error }
      }

      // Legacy Laravel format check
      if (response.status === 'success') {
        return { success: true, data: response.data, message: response.message }
      } else if (response.status === 'error') {
        return { success: false, error: response.message, errors: response.errors }
      }

      // Fallback for non-Laravel responses
      return { success: true, data: response }
    } catch (error) {
      console.error('API Error:', error)

      // Handle Laravel validation errors (422 status)
      if (error.status === 422 || error.statusCode === 422) {
        const errorData = error.data || error.response?.data
        console.log('422 Error - Raw error:', error)
        console.log('422 Error - Error data:', errorData)
        if (errorData) {
          return {
            success: false,
            error: errorData.message || 'Validation failed',
            errors: errorData.errors || {}
          }
        }
      }

      // Handle Laravel validation errors in response data
      if (error.data && error.data.status === 'error') {
        return { success: false, error: error.data.message, errors: error.data.errors }
      }

      // Handle general error responses
      if (error.data && error.data.message) {
        return { success: false, error: error.data.message }
      }

      return { success: false, error: error.message || 'An error occurred' }
    }
  }

  // Brand API methods
  const brands = {
    // Get all brands (admin endpoint for full access)
    getAll: () => request('/admin/brands'),

    // Get public brands (for frontend display)
    getPublic: () => request('/brands'),

    // Get single brand
    get: (id) => request(`/brands/${id}`),

    // Create brand
    create: (data) => request('/admin/brands', {
      method: 'POST',
      body: data
    }),

    // Create brand with file upload
    createWithFile: (formData) => request('/admin/brands', {
      method: 'POST',
      body: formData
    }),

    // Update brand
    update: (id, data) => request(`/admin/brands/${id}`, {
      method: 'PUT',
      body: data
    }),

    // Update brand with file upload
    updateWithFile: (id, formData) => request(`/admin/brands/${id}`, {
      method: 'POST', // Using POST with _method=PUT for file uploads
      body: formData
    }),

    // Delete brand
    delete: (id) => request(`/admin/brands/${id}`, {
      method: 'DELETE'
    })
  }

  // User API methods
  const users = {
    // Get all users (admin only)
    getAll: () => request('/users'),

    // Create user
    create: (data) => request('/users', {
      method: 'POST',
      body: data
    }),

    // Update user
    update: (id, data) => request(`/users/${id}`, {
      method: 'PUT',
      body: data
    }),

    // Delete user
    delete: (id) => request(`/users/${id}`, {
      method: 'DELETE'
    }),

    // Toggle user status
    toggleStatus: (id) => request(`/users/${id}/toggle-status`, {
      method: 'POST'
    })
  }

  // Auth API methods
  const auth = {
    // Regular login
    login: (credentials) => request('/login', {
      method: 'POST',
      body: credentials
    }),

    // Admin login (specific endpoint for admin authentication)
    adminLogin: (credentials) => request('/admin/login', {
      method: 'POST',
      body: credentials
    }),

    // Register
    register: (data) => request('/register', {
      method: 'POST',
      body: data
    }),

    // Logout
    logout: () => request('/logout', {
      method: 'POST'
    }),

    // Get user profile
    profile: () => request('/user'),

    // Get current user (me endpoint)
    me: () => request('/me')
  }

  // Product API methods
  const products = {
    // Get all products
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString()
      return request(`/products${query ? `?${query}` : ''}`)
    },

    // Get single product
    get: (id) => request(`/products/${id}`),

    // Create product
    create: (data) => request('/admin/products', {
      method: 'POST',
      body: data
    }),

    // Update product
    update: (id, data) => request(`/admin/products/${id}`, {
      method: 'PUT',
      body: data
    }),

    // Delete product
    delete: (id) => request(`/admin/products/${id}`, {
      method: 'DELETE'
    }),

    // Search products
    search: (query) => request('/products/search', {
      method: 'POST',
      body: { query }
    })
  }

  // Dashboard API methods
  const dashboard = {
    // Get admin dashboard stats
    stats: () => request('/admin/dashboard')
  }

  // Career API methods
  const careers = {
    // Get all active careers (public endpoint)
    getAll: () => request('/careers'),

    // Get all careers for admin
    adminGetAll: () => request('/admin/careers'),

    // Get single career
    get: (id) => request(`/careers/${id}`),

    // Get careers by department
    getByDepartment: (department) => request(`/careers/department/${department}`),

    // Create career (admin only)
    create: (data) => request('/admin/careers', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

    // Update career (admin only)
    update: (id, data) => request(`/admin/careers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

    // Delete career (admin only)
    delete: (id) => request(`/admin/careers/${id}`, {
      method: 'DELETE'
    })
  }

  // Auth utility methods
  const utils = {
    // Check if user is authenticated
    isAuthenticated: () => {
      // Check cookies first
      const tokenCookie = useCookie('auth-token')
      if (tokenCookie.value) return true

      // Check localStorage
      if (process.client) {
        const lsToken = localStorage.getItem('token')
        return !!lsToken
      }

      return false
    },

    // Check if user is admin
    isAdmin: () => {
      // Check cookies first
      const userCookie = useCookie('auth-user')
      if (userCookie.value?.role === 'admin') return true

      // Check localStorage
      if (process.client) {
        const lsUser = localStorage.getItem('user')
        if (lsUser) {
          try {
            const userData = JSON.parse(lsUser)
            return userData?.role === 'admin'
          } catch (e) {
            return false
          }
        }
      }

      return false
    },

    // Get current user
    getCurrentUser: () => {
      // Check cookies first
      const userCookie = useCookie('auth-user')
      if (userCookie.value) return userCookie.value

      // Check localStorage
      if (process.client) {
        const lsUser = localStorage.getItem('user')
        if (lsUser) {
          try {
            return JSON.parse(lsUser)
          } catch (e) {
            return null
          }
        }
      }

      return null
    },

    // Clear auth data from both systems
    clearAuth: () => {
      // Clear cookies
      const tokenCookie = useCookie('auth-token')
      const userCookie = useCookie('auth-user')
      tokenCookie.value = null
      userCookie.value = null

      // Clear localStorage
      if (process.client) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },

    // Get current auth status for debugging
    getAuthStatus: () => {
      const token = getAuthToken()
      const hasToken = !!token
      const user = utils.getCurrentUser()

      return {
        authenticated: hasToken,
        token: token ? token.substring(0, 20) + '...' : null,
        user: user,
        tokenLength: token ? token.length : 0,
        isAdmin: utils.isAdmin()
      }
    },

    // Debug authentication
    debugAuth: () => {
      console.log('🔍 Auth Debug:', utils.getAuthStatus())
      return utils.getAuthStatus()
    },

    // Sync localStorage to cookies (for consistency)
    syncAuth: () => {
      if (process.client) {
        const lsToken = localStorage.getItem('token')
        const lsUser = localStorage.getItem('user')

        if (lsToken && lsUser) {
          const tokenCookie = useCookie('auth-token')
          const userCookie = useCookie('auth-user')

          tokenCookie.value = lsToken
          try {
            userCookie.value = JSON.parse(lsUser)
          } catch (e) {
            userCookie.value = lsUser
          }
        }
      }
    }
  }

  const jobApplications = {
    // Submit job application (public endpoint)
    apply: (careerId, formData) => request(`/careers/${careerId}/apply`, {
      method: 'POST',
      body: formData // FormData for file upload
    }),

    // Get single application
    get: (id) => request(`/job-applications/${id}`),

    // Admin endpoints
    adminGetAll: (params = {}) => {
      const query = new URLSearchParams(params).toString()
      const endpoint = query ? `/admin/job-applications?${query}` : '/admin/job-applications'
      return request(endpoint)
    },

    // Get application statistics (admin only)
    getStatistics: () => request('/admin/job-applications/statistics'),

    // Get recent applications (admin only)
    getRecent: () => request('/admin/job-applications/recent'),

    // Update application status (admin only)
    updateStatus: (id, data) => request(`/admin/job-applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

    // Delete application (admin only)
    delete: (id) => request(`/admin/job-applications/${id}`, {
      method: 'DELETE'
    }),

    // Download CV file (admin only)
    downloadCV: async (id) => {
      const token = getAuthToken()
      try {
        const response = await fetch(`${apiBase}/admin/job-applications/${id}/download-cv`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          // Try to parse error response as JSON
          try {
            const errorData = await response.json()
            throw new Error(errorData.error || errorData.message || 'Failed to download CV')
          } catch (jsonError) {
            // If not JSON, use generic error
            throw new Error(`Failed to download CV (${response.status})`)
          }
        }

        // Check if response is actually a file (binary data)
        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.includes('application/json')) {
          // Response is JSON, likely an error
          const errorData = await response.json()
          throw new Error(errorData.error || errorData.message || 'Failed to download CV')
        }

        const blob = await response.blob()
        const filename = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'cv.pdf'

        // Create download link
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        return { success: true, message: 'CV downloaded successfully' }
      } catch (error) {
        console.error('Download CV error:', error)
        return { success: false, error: error.message }
      }
    },

    // Get CV view URL (admin only)
    getCVViewURL: (id) => {
      const token = getAuthToken()
      return `${apiBase}/admin/job-applications/${id}/view-cv?token=${token}`
    }
  }

  // About Content API
  const aboutContent = {
    getAll: () => request('/about-contents'),
    adminGetAll: () => request('/admin/about-contents'),
    get: (id) => request(`/admin/about-contents/${id}`),
    create: (data) => request('/admin/about-contents', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => request(`/admin/about-contents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => request(`/admin/about-contents/${id}`, {
      method: 'DELETE'
    }),
    uploadImage: (formData) => request('/admin/about-contents/upload-image', {
      method: 'POST',
      body: formData
    })
  }

  // Management Posts API
  const managementPosts = {
    // Get all posts (public endpoint)
    getAll: () => request('/management-posts'),

    // Get single post
    get: (id) => request(`/management-posts/${id}`),

    // Admin endpoints
    adminGetAll: () => request('/admin/management-posts'),

    // Create post (admin only)
    create: (data) => request('/admin/management-posts', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

    // Update post (admin only)
    update: (id, data) => request(`/admin/management-posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

    // Delete post (admin only)
    delete: (id) => request(`/admin/management-posts/${id}`, {
      method: 'DELETE'
    }),

    // Toggle status (admin only)
    toggleStatus: (id) => request(`/admin/management-posts/${id}/toggle-status`, {
      method: 'PUT'
    }),

    // Upload image (admin only)
    uploadImage: (formData) => request('/admin/management-posts/upload-image', {
      method: 'POST',
      body: formData
    })
  }

  // Visitors/Analytics API methods
  const visitors = {
    getStats: () => request('/admin/visitors/stats'),
    getAnalytics: () => request('/admin/visitors/analytics')
  }

  // Information Sections API
  const informationSections = {
    getAll: () => request('/information-sections'),
    adminGetAll: () => request('/admin/information-sections'),
    get: (id) => request(`/admin/information-sections/${id}`),
    create: (data) => request('/admin/information-sections', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => request(`/admin/information-sections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => request(`/admin/information-sections/${id}`, {
      method: 'DELETE'
    }),
    uploadImage: (formData) => request('/admin/information-sections/upload-image', {
      method: 'POST',
      body: formData
    })
  }


  // Privacy Content API
  const privacyContent = {
    getAll: () => request('/privacy-content'),
    adminGetAll: () => request('/admin/privacy-content'),
    get: (id) => request(`/admin/privacy-content/${id}`),
    create: (data) => request('/admin/privacy-content', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => request(`/admin/privacy-content/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (id) => request(`/admin/privacy-content/${id}`, {
      method: 'DELETE'
    })
  }

  // Categories API methods
  const categories = {
    // Get all categories (public endpoint)
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString()
      return request(`/categories${query ? `?${query}` : ''}`)
    },

    // Get single category
    get: (slug) => request(`/categories/${slug}`),

    // Get category with products
    getWithProducts: (slug, params = {}) => {
      const query = new URLSearchParams(params).toString()
      return request(`/categories/${slug}/products${query ? `?${query}` : ''}`)
    },

    // Admin endpoints
    adminGetAll: (params = {}) => {
      const query = new URLSearchParams(params).toString()
      return request(`/admin/categories${query ? `?${query}` : ''}`)
    },

    // Create category (admin only)
    create: (data) => request('/admin/categories', {
      method: 'POST',
      body: data
    }),

    // Update category (admin only)
    update: (slug, data) => request(`/admin/categories/${slug}`, {
      method: 'PUT',
      body: data
    }),

    // Delete category (admin only)
    delete: (slug) => request(`/admin/categories/${slug}`, {
      method: 'DELETE'
    }),

    // Get category statistics (admin only)
    getStats: () => request('/admin/categories-stats'),

    // Toggle category status (admin only)
    toggleStatus: (slug) => request(`/admin/categories/${slug}/toggle-status`, {
      method: 'PUT'
    }),

    // Reorder categories (admin only)
    reorder: (data) => request('/admin/categories/reorder', {
      method: 'PUT',
      body: data
    })
  }

  // Favicon API methods
  const favicon = {
    // Get all favicon settings (admin only)
    getAll: () => request('/admin/favicon-settings'),

    // Get single favicon setting
    get: (key) => request(`/admin/favicon-settings/${key}`),

    // Create favicon setting
    create: (data) => request('/admin/favicon-settings', {
      method: 'POST',
      body: data
    }),

    // Update favicon setting
    update: (key, data) => request(`/admin/favicon-settings/${key}`, {
      method: 'PUT',
      body: data
    }),

    // Delete favicon setting
    delete: (key) => request(`/admin/favicon-settings/${key}`, {
      method: 'DELETE'
    }),

    // Toggle favicon setting status
    toggle: (key) => request(`/admin/favicon-settings/${key}/toggle`, {
      method: 'POST'
    }),

    // Upload favicon image
    uploadImage: (formData) => request('/admin/favicon-settings/upload-image', {
      method: 'POST',
      body: formData
    }),

    // Initialize default favicon settings
    initializeDefaults: () => request('/admin/favicon-settings/initialize-defaults', {
      method: 'POST'
    }),

    // Get public favicon configuration
    getConfig: () => request('/favicon-settings')
  }

  // Hero Slides API methods
  const heroSlides = {
    // Get all slides (public)
    getAll: () => request('/hero-slides'),

    // Get all slides (admin)
    adminGetAll: () => request('/admin/hero-slides'),

    // Create slide
    create: (formData) => request('/admin/hero-slides', {
      method: 'POST',
      body: formData
    }),

    // Update slide
    update: (id, formData) => request(`/admin/hero-slides/${id}`, {
      method: 'POST', // Use POST for FormData updates in Laravel
      body: formData
    }),

    // Delete slide
    delete: (id) => request(`/admin/hero-slides/${id}`, {
      method: 'DELETE'
    }),

    // Toggle active status
    toggleActive: (id) => request(`/admin/hero-slides/${id}/toggle-active`, {
      method: 'POST'
    })
  }

  return {
    // Auth methods
    getAuthToken,

    // API methods
    request,
    brands,
    users,
    auth,
    products,
    categories,
    dashboard,
    careers,
    jobApplications,
    managementPosts,
    privacyContent,
    aboutContent,
    informationSections,
    favicon,
    heroSlides,
    visitors,
    utils
  }
}
