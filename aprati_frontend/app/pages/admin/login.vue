<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-indigo-600">
          Admin Portal
        </h1>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          {{ showOtpForm ? 'Enter Verification Code' : 'Sign in to admin panel' }}
        </h2>
        <p v-if="showOtpForm" class="mt-2 text-sm text-gray-600">
          A 6-digit code has been sent to your Telegram
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
        
        <!-- Login Form -->
        <form v-if="!showOtpForm" @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="admin@aprati.com"
              />
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
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>

        <!-- OTP Form -->
        <form v-else @submit.prevent="handleVerifyOTP" class="space-y-6">
          <!-- OTP Input -->
          <div>
            <label for="otp" class="block text-sm font-medium text-gray-700 text-center">
              Verification Code
            </label>
            <div class="mt-4 flex justify-center">
              <input
                id="otp"
                v-model="otpCode"
                type="text"
                inputmode="numeric"
                maxlength="6"
                required
                class="text-center text-3xl font-bold tracking-widest w-64 px-4 py-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="000000"
                @input="formatOTP"
              />
            </div>
            <p class="mt-2 text-xs text-gray-500 text-center">
              Check your Telegram for the 6-digit code
            </p>
          </div>

          <!-- Timer -->
          <div v-if="otpExpiresIn > 0" class="text-center">
            <p class="text-sm text-gray-600">
              Code expires in <span class="font-semibold text-indigo-600">{{ Math.floor(otpExpiresIn / 60) }}:{{ String(otpExpiresIn % 60).padStart(2, '0') }}</span>
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <div class="space-y-3">
            <button
              type="submit"
              :disabled="loading || otpCode.length !== 6"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ loading ? 'Verifying...' : 'Verify Code' }}
            </button>

            <button
              type="button"
              @click="cancelOTP"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to Login
            </button>
          </div>
        </form>

        <!-- Telegram Notice -->
        <div v-if="!showOtpForm" class="mt-6 p-4 bg-blue-50 rounded-md">
          <div class="flex">
            <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            <p class="ml-3 text-sm text-blue-700">
              <strong>Two-Factor Authentication:</strong> If enabled, you'll receive a verification code on Telegram after entering your password.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

definePageMeta({
  layout: false,
})

const config = useRuntimeConfig()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const otpCode = ref('')
const userId = ref<number | null>(null)
const showOtpForm = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const otpExpiresIn = ref(300) // 5 minutes in seconds
let otpTimer: NodeJS.Timeout | null = null

// Start OTP timer
const startOTPTimer = () => {
  otpExpiresIn.value = 300
  otpTimer = setInterval(() => {
    otpExpiresIn.value--
    if (otpExpiresIn.value <= 0) {
      if (otpTimer) clearInterval(otpTimer)
      errorMessage.value = 'Code expired. Please login again.'
      setTimeout(() => {
        cancelOTP()
      }, 2000)
    }
  }, 1000)
}

// Format OTP input (numbers only)
const formatOTP = (event: Event) => {
  const input = event.target as HTMLInputElement
  otpCode.value = input.value.replace(/\D/g, '').slice(0, 6)
}

// Handle login
const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response: any = await $fetch(`${config.public.apiBase}/admin/login`, {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password
      }
    })

    if (response.success) {
      if (response.requires_otp) {
        // Show OTP form
        userId.value = response.user_id
        showOtpForm.value = true
        startOTPTimer()
        
        if (!response.telegram_sent) {
          errorMessage.value = 'Warning: Failed to send code to Telegram. Please contact support.'
        }
      } else {
        // Login successful without OTP
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 24)
        localStorage.setItem('token_expiry', expiryDate.toISOString())
        
        router.push('/admin/dashboard')
      }
    }
  } catch (error: any) {
    console.error('Login error:', error)
    errorMessage.value = error?.data?.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}

// Handle OTP verification
const handleVerifyOTP = async () => {
  if (otpCode.value.length !== 6) {
    errorMessage.value = 'Please enter a 6-digit code'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response: any = await $fetch(`${config.public.apiBase}/admin/verify-otp`, {
      method: 'POST',
      body: {
        user_id: userId.value,
        otp_code: otpCode.value
      }
    })

    if (response.success) {
      // Clear timer
      if (otpTimer) clearInterval(otpTimer)
      
      // Store auth data
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 24)
      localStorage.setItem('token_expiry', expiryDate.toISOString())
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    }
  } catch (error: any) {
    console.error('OTP verification error:', error)
    errorMessage.value = error?.data?.message || 'Invalid or expired code'
  } finally {
    loading.value = false
  }
}

// Cancel OTP and go back to login
const cancelOTP = () => {
  showOtpForm.value = false
  otpCode.value = ''
  userId.value = null
  errorMessage.value = ''
  if (otpTimer) clearInterval(otpTimer)
}

// Cleanup timer on unmount
onUnmounted(() => {
  if (otpTimer) clearInterval(otpTimer)
})
</script>

<style scoped>
input[type="text"]::-webkit-inner-spin-button,
input[type="text"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
