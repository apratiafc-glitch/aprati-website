<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="text-3xl font-bold text-blue-600">
          Aprati Foods Cambodia
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <NuxtLink to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </NuxtLink>
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
              Email address
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
              <NuxtLink to="/auth/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </NuxtLink>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <ExclamationTriangleIcon class="h-5 w-5 text-red-400" />
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  Login failed
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
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>

        <!-- Social Login -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-4">
            <TelegramLogin 
              @login-success="handleTelegramSuccess"
              @login-error="handleTelegramError"
            />
          </div>
        </div>

        <!-- Admin Portal Link -->
        <div class="mt-6">
          <div class="bg-indigo-50 border border-indigo-200 rounded-md p-4">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-indigo-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <div class="flex-1">
                <p class="text-sm font-medium text-indigo-800">
                  Admin users should use the
                  <NuxtLink to="/admin/login" class="font-bold underline hover:text-indigo-900">
                    Admin Portal
                  </NuxtLink>
                  with 2FA security
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Demo Credentials -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Demo Credentials</span>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-1 gap-3">
            <button
              @click="fillDemoCredentials('user')"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <UserIcon class="h-5 w-5 mr-2 text-green-500" />
              Fill User Credentials
            </button>
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
  title: 'Login - Aprati Food Company',
  description: 'Sign in to your Aprati Food Company account'
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

// Demo credentials helper
const fillDemoCredentials = (type) => {
  if (type === 'admin') {
    form.value.email = 'admin@aprati.com'
    form.value.password = 'admin123'
  } else if (type === 'user') {
    form.value.email = 'user@aprati.com'
    form.value.password = 'user123'
  }
  errors.value = {}
  errorMessage.value = ''
}

// Handle Telegram login success
const handleTelegramSuccess = (user) => {
  console.log('Telegram login successful:', user)
}

// Handle Telegram login error
const handleTelegramError = (error) => {
  errorMessage.value = error
}

// Handle login
const handleLogin = async () => {
  loading.value = true
  errors.value = {}
  errorMessage.value = ''

  try {
    const { auth } = useApi()
    
    const result = await auth.login({
      email: form.value.email,
      password: form.value.password
    })
    
    if (result.success) {
      // Store auth token
      const token = useCookie('auth-token', {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      token.value = result.data.token
      
      // Store user data
      const user = useCookie('auth-user', {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7
      })
      user.value = result.data.user
      
      // Redirect based on user role
      const userRole = result.data.user?.role || 'user'
      if (userRole === 'admin') {
        await navigateTo('/admin')
      } else if (userRole === 'brand_admin') {
        await navigateTo('/dashboard')
      } else {
        await navigateTo('/')
      }
    } else {
      errorMessage.value = result.error || 'Invalid email or password'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Network error. Please check your connection and try again.'
  } finally {
    loading.value = false
  }
}

// Check if already authenticated
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('auth_token')
    if (token) {
      navigateTo('/')
    }
  }
})
</script>