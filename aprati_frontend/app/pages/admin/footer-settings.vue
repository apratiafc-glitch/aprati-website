<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <!-- Admin Navigation (Handled by layout) -->
    <nav class="bg-white shadow-sm" style="display: none;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800 mr-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">Footer Settings</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              @click="initializeDefaults"
              :disabled="loading"
              class="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 text-gray-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Initialize Defaults
            </button>
            <button 
              @click="saveAll" 
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
      <div v-if="loading && !settings.contact" class="space-y-6">
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
        <!-- No Settings Message -->
        <div v-if="!settings.contact?.length && !settings.social?.length && !settings.company?.length" class="bg-white rounded-lg shadow-lg p-8 text-center">
          <div class="max-w-md mx-auto">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No Footer Settings Found</h3>
            <p class="text-gray-600 mb-6">
              It looks like footer settings haven't been set up yet. Click the button below to initialize default settings.
            </p>
            <button 
              @click="initializeDefaults"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Initialize Footer Settings
            </button>
          </div>
        </div>
        <!-- Contact Information -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-blue-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">Contact Information</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="setting in settings.contact" :key="setting.id" class="space-y-2">
              <label :for="`contact-${setting.id}`" class="block text-sm font-medium text-gray-700">
                {{ setting.label }}
              </label>
              <input
                :id="`contact-${setting.id}`"
                v-model="setting.value"
                :type="getInputType(setting.type)"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                :placeholder="setting.label"
                @input="markAsChanged"
              />
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-green-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">Social Media Links</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="setting in settings.social" :key="setting.id" class="space-y-2">
              <label :for="`social-${setting.id}`" class="block text-sm font-medium text-gray-700">
                {{ setting.label }}
              </label>
              <input
                :id="`social-${setting.id}`"
                v-model="setting.value"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                :placeholder="setting.label"
                @input="markAsChanged"
              />
            </div>
          </div>
        </div>

        <!-- Company Information -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-purple-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900">Company Information</h2>
          </div>
          
          <div class="space-y-6">
            <div v-for="setting in settings.company" :key="setting.id" class="space-y-2">
              <label :for="`company-${setting.id}`" class="block text-sm font-medium text-gray-700">
                {{ setting.label }}
              </label>
              
              <!-- Image Upload Field -->
              <div v-if="setting.type === 'image'" class="space-y-4">
                <!-- Current Image Preview -->
                <div v-if="setting.value" class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <img 
                      :src="getImageUrl(setting.value)" 
                      :alt="setting.label"
                      class="h-12 w-auto object-contain bg-gray-900 rounded p-2"
                    >
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-600">Current: {{ setting.value }}</p>
                  </div>
                </div>
                
                <!-- File Upload -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    :id="`company-${setting.id}`"
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload(setting, $event)"
                    class="hidden"
                  />
                  <label 
                    :for="`company-${setting.id}`" 
                    class="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span class="text-sm text-gray-600">
                      Click to upload new {{ setting.label.toLowerCase() }}
                    </span>
                    <span class="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</span>
                  </label>
                </div>
                
                <!-- Upload Progress -->
                <div v-if="uploadProgress[setting.id]" class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    :style="`width: ${uploadProgress[setting.id]}%`"
                  ></div>
                </div>
              </div>
              
              <!-- Textarea Field -->
              <textarea
                v-else-if="setting.type === 'textarea'"
                :id="`company-${setting.id}`"
                v-model="setting.value"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                :placeholder="setting.label"
                @input="markAsChanged"
              ></textarea>
              
              <!-- Regular Input Field -->
              <input
                v-else
                :id="`company-${setting.id}`"
                v-model="setting.value"
                :type="getInputType(setting.type)"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                :placeholder="setting.label"
                @input="markAsChanged"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Check admin authentication
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

useSeoMeta({
  title: 'Footer Settings - Aprati Food Company',
  description: 'Manage footer contact information and social media links'
})

// Reactive data
const loading = ref(true)
const settings = ref({
  contact: [],
  social: [],
  company: []
})
const message = ref('')
const messageType = ref('success')
const hasChanges = ref(false)
const uploadProgress = ref({})

// Methods
const getAuthToken = () => {
  const token = useCookie('auth-token')
  return token.value || ''
}

const getHeaders = () => ({
  'Accept': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`
})

const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  if (imagePath.startsWith('/storage/')) return `https://sdev.apratifoods.asia${imagePath}`
  return imagePath
}

const handleImageUpload = async (setting, event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    showMessage('Please select a valid image file', 'error')
    return
  }

  // Validate file size (2MB limit)
  if (file.size > 2 * 1024 * 1024) {
    showMessage('File size must be less than 2MB', 'error')
    return
  }

  try {
    uploadProgress.value[setting.id] = 0
    
    const formData = new FormData()
    formData.append('image', file)
    formData.append('key', setting.key)
    
    const response = await fetch('https://sdev.apratifoods.asia/api/admin/footer-settings/upload-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: formData
    })

    if (response.ok) {
      const data = await response.json()
      if (data.status === 'success') {
        setting.value = data.data.url
        markAsChanged()
        showMessage('Image uploaded successfully', 'success')
        uploadProgress.value[setting.id] = 100
        
        // Clear progress after a delay
        setTimeout(() => {
          delete uploadProgress.value[setting.id]
        }, 2000)
      } else {
        throw new Error(data.message || 'Upload failed')
      }
    } else {
      throw new Error('Upload failed')
    }
  } catch (error) {
    console.error('Upload error:', error)
    showMessage(error.message || 'Failed to upload image', 'error')
    delete uploadProgress.value[setting.id]
  }
}

const showMessage = (msg, type = 'success') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const getInputType = (type) => {
  const typeMap = {
    'text': 'text',
    'url': 'url', 
    'email': 'email',
    'phone': 'tel',
    'textarea': 'text'
  }
  return typeMap[type] || 'text'
}

const markAsChanged = () => {
  hasChanges.value = true
}

const loadSettings = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    loading.value = true
    const headers = getHeaders()
    
    const response = await fetch('https://sdev.apratifoods.asia/api/admin/footer-settings', { headers })
    
    if (response.ok) {
      const data = await response.json()
      if (data.status === 'success') {
        // Handle both grouped and ungrouped data formats
        if (data.data.contact || data.data.social || data.data.company) {
          // Data is already grouped
          settings.value = {
            contact: data.data.contact || [],
            social: data.data.social || [],
            company: data.data.company || []
          }
        } else {
          // Data is not grouped, group it manually
          const groupedData = { contact: [], social: [], company: [] }
          Object.values(data.data).flat().forEach(setting => {
            if (groupedData[setting.group]) {
              groupedData[setting.group].push(setting)
            }
          })
          settings.value = groupedData
        }
      } else {
        throw new Error(data.message || 'Failed to load footer settings')
      }
    } else if (response.status === 401) {
      showMessage('Authentication failed. Please login again.', 'error')
      // Redirect to login if needed
    } else {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error loading footer settings:', error)
    showMessage('Failed to load footer settings: ' + error.message, 'error')
    
    // Initialize with empty structure if loading fails
    settings.value = {
      contact: [],
      social: [],
      company: []
    }
  } finally {
    loading.value = false
  }
}

const saveAll = async () => {
  try {
    loading.value = true
    const headers = {
      ...getHeaders(),
      'Content-Type': 'application/json'
    }
    
    // Prepare all settings for bulk update
    const allSettings = [
      ...settings.value.contact,
      ...settings.value.social,
      ...settings.value.company
    ].map(setting => ({
      id: setting.id,
      value: setting.value
    }))
    
    const response = await fetch('https://sdev.apratifoods.asia/api/admin/footer-settings/bulk-update', {
      method: 'POST',
      headers,
      body: JSON.stringify({ settings: allSettings })
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data.status === 'success') {
        showMessage('Footer settings saved successfully!')
        hasChanges.value = false
        // Refresh settings
        await loadSettings()
        
        // Trigger a custom event to refresh footer component
        if (process.client) {
          window.dispatchEvent(new CustomEvent('footer-settings-updated'))
        }
      } else {
        throw new Error(data.message || 'Failed to save settings')
      }
    } else {
      throw new Error('Failed to save footer settings')
    }
  } catch (error) {
    console.error('Error saving footer settings:', error)
    showMessage('Failed to save footer settings', 'error')
  } finally {
    loading.value = false
  }
}

const initializeDefaults = async () => {
  try {
    loading.value = true
    const headers = getHeaders()
    
    const response = await fetch('https://sdev.apratifoods.asia/api/admin/footer-settings/initialize-defaults', {
      method: 'POST',
      headers
    })
    
    if (response.ok) {
      const data = await response.json()
      if (data.status === 'success') {
        showMessage('Default footer settings initialized successfully!')
        await loadSettings()
        
        // Trigger a custom event to refresh footer component
        if (process.client) {
          window.dispatchEvent(new CustomEvent('footer-settings-updated'))
        }
      } else {
        throw new Error(data.message || 'Failed to initialize defaults')
      }
    } else {
      throw new Error('Failed to initialize default settings')
    }
  } catch (error) {
    console.error('Error initializing defaults:', error)
    showMessage('Failed to initialize default settings', 'error')
  } finally {
    loading.value = false
  }
}

// Load settings on mount
onMounted(async () => {
  if (process.server) return
  await loadSettings()
})
</script>
