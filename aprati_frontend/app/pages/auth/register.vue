<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <NuxtLink to="/" class="text-3xl font-bold text-blue-600">
          Aprati Foods Cambodia
        </NuxtLink>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </NuxtLink>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Full Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                autocomplete="name"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.name }"
                placeholder="Enter your full name"
              />
              <p v-if="errors.name" class="mt-2 text-sm text-red-600">
                {{ errors.name }}
              </p>
            </div>
          </div>

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

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div class="mt-1">
              <input
                id="phone"
                v-model="form.phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.phone }"
                placeholder="Enter your phone number"
              />
              <p v-if="errors.phone" class="mt-2 text-sm text-red-600">
                {{ errors.phone }}
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
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.password }"
                placeholder="Create a password"
              />
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">
                {{ errors.password }}
              </p>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                name="password_confirmation"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.password_confirmation }"
                placeholder="Confirm your password"
              />
              <p v-if="errors.password_confirmation" class="mt-2 text-sm text-red-600">
                {{ errors.password_confirmation }}
              </p>
            </div>
          </div>

          <!-- Address -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">
              Address (Optional)
            </label>
            <div class="mt-1">
              <textarea
                id="address"
                v-model="form.address"
                name="address"
                rows="2"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-300': errors.address }"
                placeholder="Enter your address"
              />
              <p v-if="errors.address" class="mt-2 text-sm text-red-600">
                {{ errors.address }}
              </p>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input
              id="terms"
              v-model="form.terms"
              name="terms"
              type="checkbox"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <NuxtLink to="/terms" class="text-blue-600 hover:text-blue-500">Terms and Conditions</NuxtLink>
              and
              <NuxtLink to="/privacy" class="text-blue-600 hover:text-blue-500">Privacy Policy</NuxtLink>
            </label>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <ExclamationTriangleIcon class="h-5 w-5 text-red-400" />
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  Registration failed
                </h3>
                <div class="mt-2 text-sm text-red-700">
                  {{ errorMessage }}
                </div>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="rounded-md bg-green-50 p-4">
            <div class="flex">
              <CheckCircleIcon class="h-5 w-5 text-green-400" />
              <div class="ml-3">
                <h3 class="text-sm font-medium text-green-800">
                  Registration successful!
                </h3>
                <div class="mt-2 text-sm text-green-700">
                  {{ successMessage }}
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
              {{ loading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

// Page meta
useSeoMeta({
  title: 'Register - Aprati Food Company',
  description: 'Create your Aprati Food Company account'
})

// Form data
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  address: '',
  terms: false
})

const loading = ref(false)
const errors = ref({})
const errorMessage = ref('')
const successMessage = ref('')

// Validate form
const validateForm = () => {
  errors.value = {}
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Name is required'
  }
  
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Email format is invalid'
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }
  
  if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = 'Passwords do not match'
  }
  
  if (!form.value.terms) {
    errorMessage.value = 'You must agree to the terms and conditions'
    return false
  }
  
  return Object.keys(errors.value).length === 0
}

// Handle registration
const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  if (!validateForm()) {
    return
  }
  
  loading.value = true

  try {
    // For now, simulate registration - will be replaced with actual API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate successful registration
    successMessage.value = 'Account created successfully! Redirecting to login...'
    
    // Redirect to login after success
    setTimeout(() => {
      navigateTo('/auth/login')
    }, 2000)
    
  } catch (error) {
    errorMessage.value = error.message || 'Registration failed. Please try again.'
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