<template>
  <div class="favicon-management">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Favicon Management</h1>
      <p class="text-gray-600">Manage your website's favicon settings and upload custom favicon images.</p>
    </div>

    <!-- Current Favicon Preview -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Current Favicon Preview</h2>
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img
            :src="currentFavicon.primary_favicon"
            alt="Primary Favicon"
            class="w-16 h-16 border rounded-lg"
            @error="handleImageError"
          >
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-medium text-gray-900">Primary Favicon</h3>
          <p class="text-sm text-gray-500">{{ currentFavicon.title }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ currentFavicon.primary_favicon }}</p>
        </div>
      </div>
    </div>

    <!-- Favicon Settings -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Favicon Settings</h2>
        <button
          @click="initializeDefaults"
          class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          :disabled="loading"
        >
          Initialize Defaults
        </button>
      </div>

      <!-- Settings List -->
      <div class="space-y-4" v-if="settings.length > 0">
        <div
          v-for="setting in settings"
          :key="setting.key"
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
                    class="w-12 h-12 border rounded"
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
            <div class="ml-4">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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

// API calls
const fetchSettings = async () => {
  try {
    loading.value = true
    const response = await $fetch('/api/admin/favicon-settings', {
      headers: {
        'Authorization': `Bearer ${useAuth().token.value}`
      }
    })

    if (response.status === 'success') {
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
    showMessage('Failed to load favicon settings', 'error')
  } finally {
    loading.value = false
  }
}

const fetchCurrentFavicon = async () => {
  try {
    const response = await $fetch('/api/favicon-settings')
    if (response.status === 'success') {
      currentFavicon.value = response.data
    }
  } catch (error) {
    console.error('Error fetching current favicon:', error)
  }
}

const updateSetting = async (key, value) => {
  try {
    const response = await $fetch(`/api/admin/favicon-settings/${key}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${useAuth().token.value}`,
        'Content-Type': 'application/json'
      },
      body: { value }
    })

    if (response.status === 'success') {
      showMessage('Setting updated successfully', 'success')
      await fetchCurrentFavicon() // Refresh current favicon
    }
  } catch (error) {
    console.error('Error updating setting:', error)
    showMessage('Failed to update setting', 'error')
  }
}

const toggleSetting = async (key) => {
  try {
    const response = await $fetch(`/api/admin/favicon-settings/${key}/toggle`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useAuth().token.value}`
      }
    })

    if (response.status === 'success') {
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
    showMessage('Failed to update setting status', 'error')
  }
}

const handleFileUpload = async (event, key) => {
  const file = event.target.files[0]
  if (!file) return

  uploading.value[key] = true

  try {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('key', key)

    const response = await $fetch('/api/admin/favicon-settings/upload-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useAuth().token.value}`
      },
      body: formData
    })

    if (response.status === 'success') {
      // Update local setting
      const setting = settings.value.find(s => s.key === key)
      if (setting) {
        setting.value = response.data.setting.value
      }
      showMessage('Favicon image uploaded successfully', 'success')
      await fetchCurrentFavicon() // Refresh current favicon
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    showMessage('Failed to upload favicon image', 'error')
  } finally {
    uploading.value[key] = false
  }
}

const initializeDefaults = async () => {
  try {
    loading.value = true
    const response = await $fetch('/api/admin/favicon-settings/initialize-defaults', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useAuth().token.value}`
      }
    })

    if (response.status === 'success') {
      showMessage('Default favicon settings initialized successfully', 'success')
      await fetchSettings()
      await fetchCurrentFavicon()
    }
  } catch (error) {
    console.error('Error initializing defaults:', error)
    showMessage('Failed to initialize default settings', 'error')
  } finally {
    loading.value = false
  }
}

const getImageUrl = (path) => {
  if (path.startsWith('/storage/')) {
    return path
  }
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

// Initialize
onMounted(async () => {
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
