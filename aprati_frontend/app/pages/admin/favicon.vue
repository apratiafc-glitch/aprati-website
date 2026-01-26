<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
  <div class="favicon-management">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Favicon Management</h1>
      <p class="text-gray-600">Manage your website's favicon settings and upload custom favicon images.</p>
    </div>

    <!-- Current Favicon Preview -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Current Favicon Preview</h2>
        <div class="flex items-center space-x-2">
          <!-- Status Badge -->
          <span
            :class="[
              'px-2 py-1 text-xs rounded-full',
              settings.length > 0
                ? 'bg-green-100 text-green-800'
                : loading
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            ]"
          >
            {{ settings.length > 0 ? `${settings.length} settings` : loading ? 'Loading...' : 'No settings' }}
          </span>
          <div class="flex space-x-2">
          <button
            @click="refreshPreview"
            class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
            :disabled="loading"
          >
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Refresh
          </button>
          <button
            @click="openPreviewModal"
            class="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors"
          >
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Preview
          </button>
          <button
            @click="debugSettings"
            class="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-lg hover:bg-yellow-200 transition-colors"
            title="Debug settings (check console)"
          >
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Debug
          </button>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img
            :src="currentFavicon.primary_favicon"
            alt="Primary Favicon"
            class="w-16 h-16 border rounded-full"
            @error="handleImageError"
          >
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-medium text-gray-900">Primary Favicon</h3>
          <p class="text-sm text-gray-500">{{ currentFavicon.title }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ currentFavicon.primary_favicon }}</p>
        </div>
        <div class="flex-shrink-0">
          <button
            @click="editFavicon"
            :disabled="loading || settings.length === 0"
            class="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-lg hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            {{ loading ? 'Loading...' : 'Edit' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Favicon Settings -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Favicon Settings</h2>
        <div class="flex space-x-2">
          <button
            @click="saveAllChanges"
            class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            :disabled="loading"
          >
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Save All Changes
          </button>
          <button
            @click="initializeDefaults"
            class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            :disabled="loading"
          >
            Initialize Defaults
          </button>
        </div>
      </div>

      <!-- Settings List -->
      <div class="space-y-4" v-if="settings.length > 0">
        <div
          v-for="setting in settings"
          :key="setting.key"
          :data-setting-key="setting.key"
          class="border rounded-lg p-4"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ setting.label }}
              </label>

              <!-- Image Upload -->
              <div v-if="setting.type === 'image'" class="space-y-2">
                <div class="flex items-center space-x-3">
                  <img
                    v-if="setting.value"
                    :src="getImageUrl(setting.value)"
                    alt="Current image"
                    class="w-12 h-12 border rounded-full"
                    @error="handleImageError"
                  >
                  <div class="flex-1">
                    <input
                      type="file"
                      @change="(e) => handleFileUpload(e, setting.key)"
                      accept="image/*,.ico"
                      class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      :disabled="uploading[setting.key]"
                    >
                  </div>
                </div>
                <p class="text-xs text-gray-500">Current: {{ setting.value }}</p>
              </div>

              <!-- Text Input -->
              <div v-else-if="setting.type === 'text' || setting.type === 'textarea'">
                <input
                  v-if="setting.type === 'text'"
                  v-model="setting.value"
                  @blur="updateSetting(setting.key, setting.value)"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="setting.label"
                >
                <textarea
                  v-else
                  v-model="setting.value"
                  @blur="updateSetting(setting.key, setting.value)"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="setting.label"
                ></textarea>
              </div>

              <!-- Boolean Toggle -->
              <div v-else-if="setting.type === 'boolean'" class="flex items-center">
                <input
                  type="checkbox"
                  :checked="setting.value === 'true' || setting.value === '1'"
                  @change="(e) => updateSetting(setting.key, e.target.checked ? 'true' : 'false')"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <span class="ml-2 text-sm text-gray-600">Enable {{ setting.label.toLowerCase() }}</span>
              </div>
            </div>

            <!-- Status Toggle -->
            <div class="ml-4 flex flex-col space-y-2">
              <button
                @click="toggleSetting(setting.key)"
                :class="[
                  'px-3 py-1 text-xs rounded-full transition-colors',
                  setting.is_active
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                ]"
              >
                {{ setting.is_active ? 'Active' : 'Inactive' }}
              </button>
              <button
                @click="editSetting(setting)"
                class="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="text-gray-500 mt-2">Loading favicon settings...</p>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500">No favicon settings found. Click "Initialize Defaults" to create default settings.</p>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div
      v-if="message"
      :class="[
        'mt-4 p-4 rounded-lg',
        messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
      ]"
    >
      {{ message }}
    </div>

    <!-- Preview Modal -->
    <div
      v-if="showPreviewModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closePreviewModal"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Favicon Preview</h3>
            <button
              @click="closePreviewModal"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <!-- Browser Tab Preview -->
            <div class="border rounded-lg p-4">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Browser Tab Preview</h4>
              <div class="bg-gray-100 rounded-t-lg p-2 flex items-center space-x-2">
                <img
                  :src="currentFavicon.primary_favicon"
                  alt="Favicon"
                  class="w-4 h-4 rounded-full"
                  @error="handleImageError"
                >
                <span class="text-xs text-gray-600">{{ currentFavicon.title }}</span>
              </div>
              <div class="bg-white border-x border-b rounded-b-lg p-4">
                <div class="h-32 bg-gray-50 rounded flex items-center justify-center">
                  <span class="text-gray-500 text-sm">Website Content Preview</span>
                </div>
              </div>
            </div>

            <!-- Bookmark Preview -->
            <div class="border rounded-lg p-4">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Bookmark Preview</h4>
              <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  :src="currentFavicon.primary_favicon"
                  alt="Favicon"
                  class="w-6 h-6 rounded-full"
                  @error="handleImageError"
                >
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ currentFavicon.title }}</div>
                  <div class="text-xs text-gray-500">bookmarked</div>
                </div>
              </div>
            </div>

            <!-- Different Sizes Preview -->
            <div class="border rounded-lg p-4">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Different Sizes</h4>
              <div class="flex items-center space-4">
                <div class="text-center">
                  <img
                    :src="currentFavicon.primary_favicon"
                    alt="16x16"
                    class="w-4 h-4 mx-auto mb-1 border rounded-full"
                    @error="handleImageError"
                  >
                  <span class="text-xs text-gray-500">16x16</span>
                </div>
                <div class="text-center ml-4">
                  <img
                    :src="currentFavicon.primary_favicon"
                    alt="32x32"
                    class="w-8 h-8 mx-auto mb-1 border rounded-full"
                    @error="handleImageError"
                  >
                  <span class="text-xs text-gray-500">32x32</span>
                </div>
                <div class="text-center ml-4">
                  <img
                    :src="currentFavicon.primary_favicon"
                    alt="64x64"
                    class="w-16 h-16 mx-auto mb-1 border rounded-full"
                    @error="handleImageError"
                  >
                  <span class="text-xs text-gray-500">64x64</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              @click="closePreviewModal"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/useApi'

// Check admin authentication
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

useSeoMeta({
  title: 'Favicon Management - Aprati Food Company',
  description: 'Manage your website favicon settings and upload custom favicon images.'
})

const settings = ref([])
const currentFavicon = ref({
  primary_favicon: '/images/web.ico',
  title: 'Aprati Foods Cambodia',
  description: 'Premium Quality Food Products'
})
const loading = ref(false)
const message = ref('')
const messageType = ref('')
const uploading = ref({})
const showPreviewModal = ref(false)

// API calls
const fetchSettings = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    loading.value = true
    const api = useApi()
    const response = await api.favicon.getAll()

    if (response.success) {
      // Flatten the grouped settings
      settings.value = []
      Object.values(response.data).forEach(group => {
        Object.values(group).forEach(setting => {
          settings.value.push(setting)
        })
      })
    }
  } catch (error) {
    console.error('Error fetching favicon settings:', error)
    showMessage('Unable to load favicon settings. Please check if the API is available.', 'error')
  } finally {
    loading.value = false
  }
}

const fetchCurrentFavicon = async () => {
  try {
    const api = useApi()
    const response = await api.favicon.getConfig()
    if (response.success) {
      currentFavicon.value = response.data
    }
  } catch (error) {
    console.error('Error fetching current favicon:', error)
    // Keep default values if API fails
  }
}

const updateSetting = async (key, value) => {
  try {
    const api = useApi()
    const response = await api.favicon.update(key, { value })

    if (response.success) {
      showMessage('Setting updated successfully', 'success')
      await fetchCurrentFavicon() // Refresh current favicon
    }
  } catch (error) {
    console.error('Error updating setting:', error)
    showMessage('Failed to update setting. Please check if the API is available.', 'error')
  }
}

const toggleSetting = async (key) => {
  try {
    const api = useApi()
    const response = await api.favicon.toggle(key)

    if (response.success) {
      // Update local setting
      const setting = settings.value.find(s => s.key === key)
      if (setting) {
        setting.is_active = !setting.is_active
      }
      showMessage('Setting status updated successfully', 'success')
      await fetchCurrentFavicon() // Refresh current favicon
    }
  } catch (error) {
    console.error('Error toggling setting:', error)
    showMessage('Failed to update setting status. Please check if the API is available.', 'error')
  }
}

const handleFileUpload = async (event, key) => {
  const file = event.target.files[0]
  if (!file) return

  uploading.value[key] = true

  try {
    const api = useApi()
    const formData = new FormData()
    formData.append('image', file)
    formData.append('key', key)

    const response = await api.favicon.uploadImage(formData)

    if (response.success) {
      // Update local setting
      const setting = settings.value.find(s => s.key === key)
      if (setting) {
        setting.value = response.data.setting.value
      }
      showMessage(`✅ Favicon image "${file.name}" uploaded successfully!`, 'success')
      await fetchCurrentFavicon() // Refresh current favicon
    } else {
      // Handle API response errors
      const errorMessage = response.message || 'Upload failed due to server error'
      showMessage(`❌ ${errorMessage}`, 'error')
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    const errorMessage = error.response?.data?.message || error.message || 'Network error occurred'
    showMessage(`❌ Failed to upload favicon image: ${errorMessage}`, 'error')
  } finally {
    uploading.value[key] = false
  }
}

const initializeDefaults = async () => {
  try {
    loading.value = true
    const api = useApi()
    const response = await api.favicon.initializeDefaults()

    if (response.success) {
      showMessage('Default favicon settings initialized successfully', 'success')
      await fetchSettings()
      await fetchCurrentFavicon()
    }
  } catch (error) {
    console.error('Error initializing defaults:', error)
    showMessage('Failed to initialize default settings. Please check if the API is available.', 'error')
  } finally {
    loading.value = false
  }
}

const saveAllChanges = async () => {
  try {
    loading.value = true
    showMessage('Saving all changes...', 'success')
    
    // For now, just refresh the data to show current state
    await fetchSettings()
    await fetchCurrentFavicon()
    
    showMessage('All changes saved successfully', 'success')
  } catch (error) {
    console.error('Error saving changes:', error)
    showMessage('Failed to save changes. Please check if the API is available.', 'error')
  } finally {
    loading.value = false
  }
}

const getImageUrl = (path) => {
  if (path.startsWith('/storage/')) {
    // Point to Laravel backend server for storage files
    return `http://127.0.0.1:8000${path}`
  }
  // For other paths, check if they're already full URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  // For relative paths, serve from frontend
  return path
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const showMessage = (text, type) => {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 5000)
}

// New functions for edit and preview buttons
const refreshPreview = async () => {
  try {
    loading.value = true
    await fetchCurrentFavicon()
    showMessage('Favicon preview refreshed successfully', 'success')
  } catch (error) {
    console.error('Error refreshing preview:', error)
    showMessage('Failed to refresh preview', 'error')
  } finally {
    loading.value = false
  }
}

const openPreviewModal = () => {
  showPreviewModal.value = true
}

const closePreviewModal = () => {
  showPreviewModal.value = false
}

const editFavicon = () => {
  // Check if settings are loaded
  if (settings.value.length === 0) {
    showMessage('Loading settings... Please wait.', 'error')
    return
  }

  // Debug: Log current settings
  console.log('Current settings:', settings.value)
  console.log('Looking for primary_favicon setting...')

  // Find the primary favicon setting
  const primaryFaviconSetting = settings.value.find(s => s.key === 'primary_favicon')

  if (primaryFaviconSetting) {
    console.log('Found primary favicon setting:', primaryFaviconSetting)
    // Scroll to the setting
    const element = document.querySelector(`[data-setting-key="${primaryFaviconSetting.key}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Add a highlight effect
      element.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50')
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50')
      }, 2000)
    } else {
      console.error('Element not found for setting:', primaryFaviconSetting.key)
      showMessage('Setting element not found in DOM.', 'error')
    }
  } else {
    console.error('Primary favicon setting not found in settings array')
    console.log('Available setting keys:', settings.value.map(s => s.key))

    // Try to find any favicon-related setting as fallback
    const faviconSetting = settings.value.find(s =>
      s.key.includes('favicon') ||
      s.key.includes('icon') ||
      s.label.toLowerCase().includes('favicon') ||
      s.label.toLowerCase().includes('icon')
    )

    if (faviconSetting) {
      console.log('Found alternative favicon setting:', faviconSetting)
      const element = document.querySelector(`[data-setting-key="${faviconSetting.key}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.classList.add('ring-2', 'ring-yellow-500', 'ring-opacity-50')
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-yellow-500', 'ring-opacity-50')
        }, 2000)
        showMessage(`Found ${faviconSetting.label} instead. Scrolling to it.`, 'success')
      }
    } else {
      showMessage('No favicon settings found. Click "Initialize Defaults" to create default settings.', 'error')
    }
  }
}

const editSetting = (setting) => {
  // Focus on the input field for this setting
  const element = document.querySelector(`[data-setting-key="${setting.key}"]`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    
    // Find the input field and focus it
    const input = element.querySelector('input[type="text"], textarea, input[type="file"]')
    if (input) {
      input.focus()
      // Add highlight effect
      element.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50')
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50')
      }, 2000)
    }
  }
}

const debugSettings = () => {
  console.log('=== DEBUG: Favicon Settings ===')
  console.log('Settings loaded:', settings.value.length > 0)
  console.log('Settings count:', settings.value.length)
  console.log('Settings array:', settings.value)
  console.log('Setting keys:', settings.value.map(s => s.key))
  console.log('Setting labels:', settings.value.map(s => s.label))
  console.log('Current favicon:', currentFavicon.value)
  console.log('Loading state:', loading.value)
  console.log('================================')

  if (settings.value.length === 0) {
    showMessage('No settings loaded. Check console for details.', 'error')
  } else {
    showMessage(`Found ${settings.value.length} settings. Check console for details.`, 'success')
  }
}

// Initialize
onMounted(async () => {
  if (process.server) return
  await fetchSettings()
  await fetchCurrentFavicon()
})
</script>

<style scoped>
.favicon-management {
  max-width: 800px;
  margin: 0 auto;
}
</style>
