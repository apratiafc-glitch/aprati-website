<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <!-- Admin Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800 mr-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">General Settings</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              @click="loadSettings"
              :disabled="loading"
              class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh
            </button>
            <button 
              @click="saveSettings" 
              :disabled="loading || !hasChanges"
              class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
              </svg>
              <span v-if="loading">Saving...</span>
              <span v-else>Save All Changes</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Success/Error Messages -->
    <div v-if="message" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div 
        :class="[
          'p-4 rounded-md',
          messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        ]"
      >
        {{ message }}
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading && !settings.site_info" class="space-y-6">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="animate-pulse space-y-4">
            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Groups -->
      <div v-else class="space-y-8">
        <!-- Site Information -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-blue-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Site Information</h3>
              <p class="text-gray-600">Basic identification for your website</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input
                v-model="formData.site_info.site_name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input
                v-model="formData.site_info.meta_title"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
              <textarea
                v-model="formData.site_info.site_description"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-green-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Contact Information</h3>
              <p class="text-gray-600">Company contact details as shown on the website</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                v-model="formData.contact_info.phone"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                v-model="formData.contact_info.email"
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Office Address</label>
              <textarea
                v-model="formData.contact_info.address"
                rows="2"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              ></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Google Maps URL</label>
              <input
                v-model="formData.contact_info.google_maps_url"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
            <!-- Business Hours Section -->
            <div class="md:col-span-2 mt-4 pt-4 border-t border-gray-100">
              <h4 class="text-sm font-semibold text-gray-900 mb-4">Business Hours</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Mon - Fri</label>
                  <input
                    v-model="formData.contact_info.business_hours_mon_fri"
                    type="text"
                    placeholder="8:00 AM - 6:00 PM"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    @input="markAsChanged"
                  >
                </div>
                <div>
                  <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Saturday</label>
                  <input
                    v-model="formData.contact_info.business_hours_sat"
                    type="text"
                    placeholder="9:00 AM - 4:00 PM"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    @input="markAsChanged"
                  >
                </div>
                <div>
                  <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Sunday</label>
                  <input
                    v-model="formData.contact_info.business_hours_sun"
                    type="text"
                    placeholder="Closed"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    @input="markAsChanged"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-purple-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Social Media</h3>
              <p class="text-gray-600">Links to your social media profiles</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
              <input
                v-model="formData.social_links.facebook"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
              <input
                v-model="formData.social_links.instagram"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
              <input
                v-model="formData.social_links.linkedin"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
              <input
                v-model="formData.social_links.youtube"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-orange-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Notification Settings</h3>
              <p class="text-gray-600">Configure Telegram Alerts for job applications</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telegram Bot Token</label>
              <input
                v-model="formData.notification_settings.telegram_bot_token"
                type="password"
                placeholder="Enter your bot token"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telegram Chat ID</label>
              <input
                v-model="formData.notification_settings.telegram_chat_id"
                type="text"
                placeholder="e.g. -100123456789"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="markAsChanged"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Authentication and layout
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

// Reactive data
const loading = ref(false)
const message = ref('')
const messageType = ref('success')
const hasChanges = ref(false)

// Settings data
const settings = ref({})
const formData = ref({
  site_info: {
    site_name: '',
    site_description: '',
    meta_title: ''
  },
  contact_info: {
    phone: '',
    email: '',
    address: '',
    google_maps_url: '',
    business_hours_mon_fri: '',
    business_hours_sat: '',
    business_hours_sun: ''
  },
  social_links: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  },
  notification_settings: {
    telegram_bot_token: '',
    telegram_chat_id: ''
  }
})

// Load settings from API
const loadSettings = async () => {
  if (process.server) return
  
  try {
    loading.value = true
    const api = useApi()
    const response = await api.request('/admin/settings')
    
    if (response.success && response.data) {
      settings.value = response.data
      
      // Initialize form data with current settings
      formData.value = JSON.parse(JSON.stringify(response.data))
      
      // Load notification settings
      const notifResponse = await api.request('/admin/notification-settings')
      if (notifResponse.success) {
        formData.value.notification_settings = {
          telegram_bot_token: notifResponse.data.telegram_bot_token || '',
          telegram_chat_id: notifResponse.data.telegram_chat_id || ''
        }
      }

      console.log('Loaded settings:', settings.value)
      hasChanges.value = false
    } else {
      throw new Error('Failed to load settings')
    }
  } catch (error) {
    console.error('Failed to load settings:', error)
    showMessage('Failed to load settings', 'error')
  } finally {
    loading.value = false
  }
}

// Mark form as changed
const markAsChanged = () => {
  hasChanges.value = true
}

// Save settings
const saveSettings = async () => {
  try {
    loading.value = true
    const api = useApi()
    
    const response = await api.request('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(formData.value)
    })
    
    if (response.success) {
      // Save notification settings
      await api.request('/admin/notification-settings', {
        method: 'POST',
        body: JSON.stringify(formData.value.notification_settings)
      })

      settings.value = JSON.parse(JSON.stringify(formData.value))
      hasChanges.value = false
      showMessage('Settings saved successfully', 'success')
    } else {
      throw new Error(response.error || 'Failed to save settings')
    }
  } catch (error) {
    console.error('Failed to save settings:', error)
    showMessage(error.message || 'Failed to save settings', 'error')
  } finally {
    loading.value = false
  }
}

// Show message
const showMessage = (msg, type = 'success') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

// Load settings on mount
onMounted(() => {
  if (process.server) return
  loadSettings()
})
</script>
