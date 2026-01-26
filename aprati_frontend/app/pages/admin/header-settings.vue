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
            <h1 class="text-2xl font-bold text-gray-900">Header Settings</h1>
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
      <div v-if="loading && !settings.branding" class="space-y-6">
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
        <!-- Branding Settings -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-blue-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4h.01M13 13h.01"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Branding Information</h3>
              <p class="text-gray-600">Manage your website's header logo and company information</p>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Header Logo -->
            <div v-if="settings.branding">
              <label class="block text-sm font-medium text-gray-700 mb-2">Header Logo</label>
              <div class="flex items-center space-x-6">
                <!-- Current Logo Display -->
                <div class="flex-shrink-0">
                  <div class="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <img 
                      v-if="getCurrentLogo()"
                      :src="getCurrentLogo()" 
                      alt="Header Logo"
                      class="max-w-full max-h-full object-contain"
                      @error="onImageError"
                    >
                    <div v-else class="text-center text-gray-400">
                      <svg class="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span class="text-xs">No logo</span>
                    </div>
                  </div>
                </div>

                <!-- Upload Control -->
                <div class="flex-1">
                  <input
                    ref="logoFileInput"
                    type="file"
                    accept="image/*"
                    @change="handleLogoUpload"
                    class="hidden"
                  >
                  <button
                    @click="$refs.logoFileInput.click()"
                    :disabled="uploading"
                    class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <span v-if="uploading">Uploading...</span>
                    <span v-else>Upload New Logo</span>
                  </button>
                  <p class="text-xs text-gray-500 mt-1">Recommended: PNG, JPG or SVG. Max 2MB.</p>
                </div>
              </div>
            </div>

            <!-- Company Name -->
            <div v-if="settings.branding">
              <label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input
                v-model="formData.branding.company_name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
                @input="markAsChanged"
              >
            </div>

            <!-- Company Tagline -->
            <div v-if="settings.branding">
              <label class="block text-sm font-medium text-gray-700 mb-2">Company Tagline</label>
              <input
                v-model="formData.branding.tagline"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company tagline"
                @input="markAsChanged"
              >
            </div>
          </div>
        </div>

        <!-- Search Settings -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center mb-6">
            <div class="p-2 bg-green-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Search Settings</h3>
              <p class="text-gray-600">Configure search functionality in the header</p>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Enable Search -->
            <div v-if="settings.search">
              <label class="flex items-center">
                <input
                  v-model="formData.search.enable_search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  @change="markAsChanged"
                >
                <span class="ml-2 text-sm font-medium text-gray-700">Enable Search Bar</span>
              </label>
            </div>

            <!-- Search Placeholder -->
            <div v-if="settings.search">
              <label class="block text-sm font-medium text-gray-700 mb-2">Search Placeholder Text</label>
              <input
                v-model="formData.search.search_placeholder"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter search placeholder text"
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
const uploading = ref(false)
const message = ref('')
const messageType = ref('success')
const hasChanges = ref(false)

// Settings data
const settings = ref({})
const formData = ref({
  branding: {},
  search: {}
})

// Load settings from API
const loadSettings = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    loading.value = true
    const api = useApi()
    const response = await api.request('/admin/header-settings')
    
    if (response.success && response.data) {
      settings.value = response.data
      
      // Initialize form data with current settings
      formData.value = {
        branding: {
          header_logo: settings.value.branding?.header_logo || '',
          company_name: settings.value.branding?.company_name || '',
          tagline: settings.value.branding?.tagline || ''
        },
        search: {
          search_placeholder: settings.value.search?.search_placeholder || '',
          enable_search: settings.value.search?.enable_search === 'true' || settings.value.search?.enable_search === true
        }
      }
      
      console.log('Loaded header settings:', settings.value)
      showMessage('Header settings loaded successfully', 'success')
    } else {
      throw new Error('Failed to load settings')
    }
  } catch (error) {
    console.error('Failed to load header settings:', error)
    showMessage('Failed to load header settings', 'error')
  } finally {
    loading.value = false
  }
}

// Handle logo upload
const handleLogoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    uploading.value = true
    const api = useApi()
    
    const formDataUpload = new FormData()
    formDataUpload.append('image', file)
    formDataUpload.append('key', 'header_logo')

    const response = await api.request('/admin/header-settings/upload-image', {
      method: 'POST',
      body: formDataUpload
    })

    if (response.success) {
      // Update the logo in settings
      if (!settings.value.branding) settings.value.branding = {}
      settings.value.branding.header_logo = response.data.setting.value
      formData.value.branding.header_logo = response.data.setting.value
      
      showMessage('Logo uploaded successfully', 'success')
      markAsChanged()
    } else {
      throw new Error(response.message || 'Upload failed')
    }
  } catch (error) {
    console.error('Logo upload failed:', error)
    showMessage('Failed to upload logo', 'error')
  } finally {
    uploading.value = false
    // Clear the file input
    event.target.value = ''
  }
}

// Get current logo URL
const getCurrentLogo = () => {
  const logoPath = formData.value.branding?.header_logo || settings.value.branding?.header_logo
  if (!logoPath || logoPath === '/images/logo.png') return null
  
  if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
    return logoPath
  }
  
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.apiBaseUrl?.replace('/api', '') || 'https://sdev.apratifoods.asia'
  return logoPath.startsWith('/storage/') ? `${baseUrl}${logoPath}` : `${baseUrl}/storage/${logoPath}`
}

// Handle image error
const onImageError = (event) => {
  console.warn('Header logo failed to load:', event.target?.src)
  if (event.target) {
    event.target.style.display = 'none'
  }
}

// Mark form as changed
const markAsChanged = () => {
  hasChanges.value = true
}

// Save all changes
const saveAll = async () => {
  try {
    loading.value = true
    const api = useApi()
    
    // Prepare update requests
    const updatePromises = []
    
    // Update branding settings
    if (formData.value.branding.company_name !== settings.value.branding?.company_name) {
      updatePromises.push(
        api.request('/admin/header-settings/company_name', {
          method: 'PUT',
          body: JSON.stringify({
            value: formData.value.branding.company_name
          })
        })
      )
    }
    
    if (formData.value.branding.tagline !== settings.value.branding?.tagline) {
      updatePromises.push(
        api.request('/admin/header-settings/tagline', {
          method: 'PUT',
          body: JSON.stringify({
            value: formData.value.branding.tagline
          })
        })
      )
    }
    
    // Update search settings
    if (formData.value.search.search_placeholder !== settings.value.search?.search_placeholder) {
      updatePromises.push(
        api.request('/admin/header-settings/search_placeholder', {
          method: 'PUT',
          body: JSON.stringify({
            value: formData.value.search.search_placeholder
          })
        })
      )
    }
    
    if (formData.value.search.enable_search !== (settings.value.search?.enable_search === 'true' || settings.value.search?.enable_search === true)) {
      updatePromises.push(
        api.request('/admin/header-settings/enable_search', {
          method: 'PUT',
          body: JSON.stringify({
            value: formData.value.search.enable_search ? 'true' : 'false'
          })
        })
      )
    }
    
    // Execute all updates
    if (updatePromises.length > 0) {
      await Promise.all(updatePromises)
      await loadSettings() // Reload to get fresh data
      hasChanges.value = false
      showMessage('Header settings saved successfully', 'success')
    } else {
      showMessage('No changes to save', 'success')
    }
  } catch (error) {
    console.error('Failed to save header settings:', error)
    showMessage('Failed to save header settings', 'error')
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
