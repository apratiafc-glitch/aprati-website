<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Animated Fruit Characters -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/4 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/4 right-1/6 w-20 h-20 object-contain opacity-20 animate-float-delayed" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/3 right-1/4 w-16 h-16 object-contain opacity-15 animate-float" style="animation-delay: 0.5s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="animation-delay: 1s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-1/6 right-1/6 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 1.5s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/6 left-1/3 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="animation-delay: 2s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-2/5 left-2/5 w-14 h-14 object-contain opacity-13 animate-float" style="animation-delay: 0.8s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-2/5 right-2/5 w-20 h-20 object-contain opacity-17 animate-float-delayed" style="animation-delay: 1.3s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-3/5 left-1/5 w-16 h-16 object-contain opacity-11 animate-float" style="animation-delay: 1.8s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-3/5 right-1/5 w-14 h-14 object-contain opacity-19 animate-float-delayed" style="animation-delay: 0.3s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-4/5 left-3/5 w-16 h-16 object-contain opacity-14 animate-float" style="animation-delay: 2.2s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-4/5 right-3/5 w-20 h-20 object-contain opacity-16 animate-float-delayed" style="animation-delay: 0.6s;" />
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="text-3xl font-bold text-blue-600">
          Aprati Foods Cambodia
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Administrative Access
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Authorized personnel only
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.email }"
                placeholder="Enter your email"
              />
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.password }"
                placeholder="Enter your password"
              />
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">
                {{ errors.password }}
              </p>
            </div>
          </div>

          <!-- Remember me -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.remember"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <NuxtLink to="/" class="font-medium text-blue-600 hover:text-blue-500">
                Return to website
              </NuxtLink>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <ExclamationTriangleIcon class="h-5 w-5 text-red-400" />
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  Access Denied
                </h3>
                <div class="mt-2 text-sm text-red-700">
                  {{ errorMessage }}
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Authenticating...' : 'Access System' }}
            </button>
          </div>
        </form>

        <!-- Demo Credentials (only show in development) -->
        <div v-if="$config.public.dev" class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Development Mode</span>
            </div>
          </div>

          <div class="mt-4">
            <button
              @click="fillAdminCredentials"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <UserIcon class="h-5 w-5 mr-2 text-blue-500" />
              Fill Demo Credentials
            </button>
          </div>
          
          <div class="mt-4 text-xs text-gray-500 text-center">
            <p><strong>Email:</strong> admin@aprati.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon, UserIcon } from '@heroicons/vue/24/outline'

// Page meta
useSeoMeta({
  title: 'System Access - Aprati Food Company',
  description: 'Administrative system access',
  robots: 'noindex, nofollow' // Prevent search engines from indexing this page
})

// Form data
const form = ref({
  email: '',
  password: '',
  remember: false
})

const loading = ref(false)
const errors = ref({})
const errorMessage = ref('')

// Demo credentials helper (only in development)
const fillAdminCredentials = () => {
  form.value.email = 'admin@aprati.com'
  form.value.password = 'admin123'
  errors.value = {}
  errorMessage.value = ''
}

// Handle login
const handleLogin = async () => {
  loading.value = true
  errors.value = {}
  errorMessage.value = ''

  try {
    const { auth } = useApi()
    
    const result = await auth.adminLogin({
      email: form.value.email,
      password: form.value.password
    })
    
    console.log('Full API result:', result)
    console.log('API result type:', typeof result)
    console.log('API result keys:', Object.keys(result || {}))
    
    if (result.success) {
      console.log('Login successful, data:', result.data)
      console.log('Data type:', typeof result.data)
      console.log('Data keys:', Object.keys(result.data || {}))
      console.log('User object from API:', result.data.user)
      console.log('User role from API:', result.data.user?.role)
      
      // Check if we have proper user data structure
      if (!result.data || !result.data.user) {
        console.error('❌ No user data in response:', result.data)
        console.error('❌ Full result object:', JSON.stringify(result, null, 2))
        errorMessage.value = 'Invalid response structure from server'
        return
      }
      
      const userData = result.data.user
      const userRole = userData.role
      
      console.log('Extracted user data:', userData)
      console.log('Extracted user role:', userRole)
      
      // Verify we have a role
      if (!userRole) {
        console.error('❌ No role field in user data:', userData)
        errorMessage.value = 'User role information missing from server'
        return
      }
      
      // Store the token with 7 days expiration
      const token = useCookie('auth-token', {
        default: () => '',
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        path: '/'
      })
      token.value = result.data.token
      
      // Store user data as object (useCookie handles serialization) with 7 days expiration
      const user = useCookie('auth-user', {
        default: () => null,
        maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        path: '/'
      })
      user.value = userData
      
      console.log('Token stored:', token.value)
      console.log('User data stored:', userData)
      
      // Immediately verify what was stored
      setTimeout(() => {
        const storedToken = useCookie('auth-token').value
        const storedUser = useCookie('auth-user').value
        console.log('Verification - stored token:', storedToken)
        console.log('Verification - stored user string:', storedUser)
        
        if (storedUser) {
          try {
            // Check if storedUser is already an object or a string
            let parsedUser
            if (typeof storedUser === 'string') {
              parsedUser = JSON.parse(storedUser)
            } else {
              // Already an object, use directly
              parsedUser = storedUser
            }
            console.log('Verification - parsed user:', parsedUser)
            console.log('Verification - parsed role:', parsedUser.role)
          } catch (e) {
            console.error('Verification - parse error:', e)
          }
        }
      }, 100)
      
      // Check role for navigation
      console.log('User role for navigation check:', userRole)
      
      if (userRole === 'admin') {
        console.log('✅ Admin role confirmed, navigating to /admin')
        // Use navigateTo with replace to ensure fresh navigation
        await navigateTo('/admin', { replace: true })
      } else {
        console.error('❌ Not admin role:', userRole)
        errorMessage.value = `Access denied. User role is "${userRole}", but admin required.`
        // Clear stored data
        token.value = ''
        user.value = ''
      }
    } else {
      console.error('❌ Login failed:', result)
      errorMessage.value = result.error || 'Invalid credentials or insufficient privileges'
    }
  } catch (error) {
    console.error('❌ Login exception:', error)
    console.error('❌ Error type:', error.constructor.name)
    console.error('❌ Error message:', error.message)
    console.error('❌ Error stack:', error.stack)
    errorMessage.value = `Authentication failed: ${error.message || 'Please verify your credentials.'}`
  } finally {
    loading.value = false
  }
}

// Check if already authenticated as admin
onMounted(() => {
  const authToken = useCookie('auth-token')
  const authUser = useCookie('auth-user')
  
  console.log('OnMounted - checking existing auth')
  console.log('OnMounted - token exists:', !!authToken.value)
  console.log('OnMounted - user exists:', !!authUser.value)
  
  if (authToken.value && authUser.value) {
    try {
      const userData = typeof authUser.value === 'string' ? JSON.parse(authUser.value) : authUser.value
      const userRole = userData?.role
      console.log('OnMounted - parsed user role:', userRole)
      
      if (userRole === 'admin') {
        console.log('OnMounted - already authenticated as admin, redirecting')
        navigateTo('/admin')
      }
    } catch (error) {
      console.error('OnMounted - error parsing user data:', error)
      // Clear invalid data
      authToken.value = ''
      authUser.value = ''
    }
  }
})
</script>
