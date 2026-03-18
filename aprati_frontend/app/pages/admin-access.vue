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

    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="text-center">
        <NuxtLink to="/" class="text-3xl font-bold text-blue-600">
          Aprati Foods Cambodia
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          {{ showOtpForm ? 'Enter Verification Code' : 'Administrative Access' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ showOtpForm ? 'A 6-digit code has been sent to your Gmail' : 'Authorized personnel only' }}
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

        <!-- ── Step 1: Google Sign-In ── -->
        <div v-if="!showOtpForm">
          <!-- Error from Google callback -->
          <div v-if="callbackError" class="mb-5 rounded-md bg-red-50 p-4">
            <div class="flex">
              <ExclamationTriangleIcon class="h-5 w-5 text-red-400 flex-shrink-0" />
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Access Denied</h3>
                <p class="mt-1 text-sm text-red-700">{{ callbackErrorMessage }}</p>
              </div>
            </div>
          </div>

          <p class="text-sm text-gray-500 text-center mb-6">
            Sign in using your registered admin Gmail account
          </p>

          <!-- Google Sign-In Button -->
          <a
            :href="`${apiBase}/auth/google`"
            class="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </a>

          <div class="mt-4 text-center">
            <NuxtLink to="/" class="text-sm font-medium text-blue-600 hover:text-blue-500">
              Return to website
            </NuxtLink>
          </div>
        </div>

        <!-- ── Step 2: OTP Verification ── -->
        <form v-else @submit.prevent="handleVerifyOTP" class="space-y-6">
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
                autofocus
                class="text-center text-3xl font-bold tracking-widest w-64 px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="000000"
                @input="formatOTP"
              />
            </div>
            <p class="mt-2 text-xs text-gray-500 text-center">
              Check your Gmail inbox for the 6-digit code
            </p>
          </div>

          <!-- Timer -->
          <div v-if="otpExpiresIn > 0" class="text-center">
            <p class="text-sm text-gray-600">
              Code expires in
              <span class="font-semibold text-blue-600">
                {{ Math.floor(otpExpiresIn / 60) }}:{{ String(otpExpiresIn % 60).padStart(2, '0') }}
              </span>
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <ExclamationTriangleIcon class="h-5 w-5 text-red-400 flex-shrink-0" />
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Verification Failed</h3>
                <p class="mt-1 text-sm text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="space-y-3">
            <button
              type="submit"
              :disabled="loading || otpCode.length !== 6"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Verifying...' : 'Verify & Access System' }}
            </button>

            <button
              type="button"
              @click="cancelOTP"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Use a different account
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'System Access - Aprati Food Company',
  description: 'Administrative system access',
  robots: 'noindex, nofollow'
})

const config = useRuntimeConfig()
const route = useRoute()
const apiBase = config.public.apiBase

const showOtpForm = ref(false)
const otpCode = ref('')
const userId = ref(null)
const loading = ref(false)
const errorMessage = ref('')
const otpExpiresIn = ref(1800)
const callbackError = ref(false)
const callbackErrorMessage = ref('')

let otpTimer = null

const startOTPTimer = () => {
  otpExpiresIn.value = 600
  otpTimer = setInterval(() => {
    otpExpiresIn.value--
    if (otpExpiresIn.value <= 0) {
      clearInterval(otpTimer)
      errorMessage.value = 'Code expired. Please sign in again.'
      setTimeout(() => cancelOTP(), 2000)
    }
  }, 1000)
}

const formatOTP = (event) => {
  const input = event.target
  otpCode.value = input.value.replace(/\D/g, '').slice(0, 6)
}

const handleVerifyOTP = async () => {
  if (otpCode.value.length !== 6) {
    errorMessage.value = 'Please enter the 6-digit code'
    return
  }
  loading.value = true
  errorMessage.value = ''
  try {
    const response = await $fetch(`${apiBase}/admin/verify-otp`, {
      method: 'POST',
      body: { user_id: userId.value, otp_code: otpCode.value },
    })
    if (response.success) {
      if (otpTimer) clearInterval(otpTimer)
      const userData = response.data.user
      const token = useCookie('auth-token', { maxAge: 60 * 60 * 24 * 7, httpOnly: false, secure: false, sameSite: 'lax', path: '/' })
      token.value = response.data.token
      const user = useCookie('auth-user', { maxAge: 60 * 60 * 24 * 7, httpOnly: false, secure: false, sameSite: 'lax', path: '/' })
      user.value = userData
      await navigateTo('/admin', { replace: true })
    }
  } catch (err) {
    errorMessage.value = err?.data?.message || 'Invalid or expired code. Please try again.'
  } finally {
    loading.value = false
  }
}

const cancelOTP = () => {
  showOtpForm.value = false
  otpCode.value = ''
  userId.value = null
  errorMessage.value = ''
  if (otpTimer) clearInterval(otpTimer)
}

onMounted(() => {
  // Check if already authenticated
  const authToken = useCookie('auth-token')
  const authUser = useCookie('auth-user')
  if (authToken.value && authUser.value) {
    try {
      const userData = typeof authUser.value === 'string' ? JSON.parse(authUser.value) : authUser.value
      if (userData?.role === 'admin') {
        navigateTo('/admin', { replace: true })
        return
      }
    } catch (e) {
      authToken.value = ''
      authUser.value = ''
    }
  }

  // Handle Google OAuth callback query params
  const step = route.query.step
  const uid = route.query.user_id
  const error = route.query.error

  if (error) {
    callbackError.value = true
    callbackErrorMessage.value = error === 'unauthorized'
      ? 'This Google account is not registered as an admin. Please use your admin Gmail.'
      : 'Google sign-in failed. Please try again.'
    return
  }

  if (step === 'otp' && uid) {
    userId.value = parseInt(uid)
    showOtpForm.value = true
    startOTPTimer()
  }
})

onUnmounted(() => {
  if (otpTimer) clearInterval(otpTimer)
})
</script>
