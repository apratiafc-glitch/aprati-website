<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 py-6">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h1 class="text-3xl font-bold text-gray-900">Hero Content Management</h1>
            <p class="mt-2 text-gray-600">Manage the main hero section content displayed on the homepage</p>
          </div>
           <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-700 transition-colors font-medium">
              ← Back to Dashboard
            </NuxtLink>
          <div class="mt-4 flex md:mt-0 md:ml-4">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="bg-blue-50 rounded-lg p-3 min-w-0">
                <div class="text-2xl font-bold text-blue-600">{{ totalContentCount }}</div>
                <div class="text-sm text-blue-600">Total</div>
              </div>
              <div class="bg-green-50 rounded-lg p-3 min-w-0">
                <div class="text-2xl font-bold text-green-600">{{ activeContentCount }}</div>
                <div class="text-sm text-green-600">Active</div>
              </div>
              <div class="bg-orange-50 rounded-lg p-3 min-w-0">
                <div class="text-2xl font-bold text-orange-600">{{ inactiveContentCount }}</div>
                <div class="text-sm text-orange-600">Inactive</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Current Active Hero Content -->
      <div v-if="activeHeroContent" class="bg-white rounded-lg shadow-sm border mb-8 p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Current Active Content</h2>
          <div class="flex space-x-2">
            <button
              @click="openPreview(activeHeroContent)"
              class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Preview
            </button>
            <button
              @click="editActiveContent()"
              class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Edit Active Content
            </button>
          </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="mb-4">
            <h3 class="font-medium text-gray-700">Title:</h3>
            <div v-html="activeHeroContent.title" class="text-lg font-bold"></div>
          </div>
          <div class="mb-4">
            <h3 class="font-medium text-gray-700">Subtitle:</h3>
            <p class="text-gray-600">{{ activeHeroContent.subtitle }}</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 class="font-medium text-gray-700">Primary Button:</h3>
              <p class="text-sm text-gray-600">{{ activeHeroContent.primary_button_text }} → {{ activeHeroContent.primary_button_link }}</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700">Secondary Button:</h3>
              <p class="text-sm text-gray-600">{{ activeHeroContent.secondary_button_text }} → {{ activeHeroContent.secondary_button_link }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Add New Hero Content -->
      <div class="bg-white rounded-lg shadow-sm border mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Add New Hero Content</h2>
        </div>
        <div class="p-6">
          <form @submit.prevent="createHeroContent" class="space-y-6">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Title (HTML allowed)
              </label>
              <input
                v-model="newContentForm.title"
                type="text"
                required
                placeholder="Welcome to <span class=&quot;text-yellow-300&quot;>Aprati</span> Food Company"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <p class="text-xs text-gray-500 mt-1">You can use HTML tags like &lt;span class="text-yellow-300"&gt;...&lt;/span&gt;</p>
            </div>

            <!-- Subtitle -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <textarea
                v-model="newContentForm.subtitle"
                rows="3"
                placeholder="Enhanced introduction website with advanced product search..."
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <!-- Primary Button -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Text
                </label>
                <input
                  v-model="newContentForm.primary_button_text"
                  type="text"
                  required
                  placeholder="Explore Our Brands"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Link
                </label>
                <input
                  v-model="newContentForm.primary_button_link"
                  type="text"
                  required
                  placeholder="/brands"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </div>

            <!-- Secondary Button -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Text
                </label>
                <input
                  v-model="newContentForm.secondary_button_text"
                  type="text"
                  required
                  placeholder="Join Our Team"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Link
                </label>
                <input
                  v-model="newContentForm.secondary_button_link"
                  type="text"
                  required
                  placeholder="/careers"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </div>

            <!-- Options -->
            <div class="flex items-center space-x-4">
              <label class="flex items-center">
                <input
                  v-model="newContentForm.is_active"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-700">Set as active immediately</span>
              </label>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="loading"
                class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                <span v-if="loading">Creating...</span>
                <span v-else>Create Hero Content</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Hero Content List -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">All Hero Contents</h2>
        </div>
        <div class="p-6">
          <!-- Global Error Message -->
          <div v-if="errorMessage" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Error</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ errorMessage }}</p>
                </div>
                <div class="mt-4">
                  <div class="-mx-2 -my-1.5 flex">
                    <button
                      @click="retryLoad"
                      class="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none"
                    >
                      Retry
                    </button>
                    <button
                      @click="clearError"
                      class="ml-3 bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-2 text-gray-500">Loading...</p>
          </div>

          <div v-else-if="heroContents.length === 0" class="text-center py-8">
            <p class="text-gray-500">No hero contents found. Create your first one above.</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="content in heroContents"
              :key="content.id"
              class="border border-gray-200 rounded-lg p-4"
              :class="{ 'border-green-500 bg-green-50': content.is_active }"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-2">
                    <div v-html="content.title" class="font-medium"></div>
                    <span v-if="content.is_active" class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm mb-2">{{ content.subtitle }}</p>
                  <div class="text-xs text-gray-500 space-x-4">
                    <span>{{ content.primary_button_text }} → {{ content.primary_button_link }}</span>
                    <span>{{ content.secondary_button_text }} → {{ content.secondary_button_link }}</span>
                  </div>
                </div>
                <div class="flex items-center space-x-2 ml-4">
                  <button
                    @click="openPreview(content)"
                    class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    v-if="!content.is_active"
                    @click="setActiveContent(content.id)"
                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Set Active
                  </button>
                  <button
                    @click="editContent(content)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteContent(content.id)"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Edit Hero Content</h3>
          </div>
          <div class="p-6">
            <form @submit.prevent="updateContent" class="space-y-6">
              <!-- Same form fields as create form -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title (HTML allowed)</label>
                <input
                  v-model="editForm.title"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <textarea
                  v-model="editForm.subtitle"
                  rows="3"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
                  <input
                    v-model="editForm.primary_button_text"
                    type="text"
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Primary Button Link</label>
                  <input
                    v-model="editForm.primary_button_link"
                    type="text"
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
                  <input
                    v-model="editForm.secondary_button_text"
                    type="text"
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Secondary Button Link</label>
                  <input
                    v-model="editForm.secondary_button_link"
                    type="text"
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <label class="flex items-center">
                  <input
                    v-model="editForm.is_active"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">Set as active</span>
                </label>
              </div>

              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="cancelEdit"
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <span v-if="loading">Updating...</span>
                  <span v-else>Update Content</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Preview Modal -->
      <div v-if="showPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Preview Hero Content</h3>
            <button
              @click="closePreview"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div v-if="previewContent" class="p-6">
            <!-- Hero Section Preview -->
            <div class="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-lg overflow-hidden">
              <div class="absolute inset-0 bg-black opacity-20"></div>
              <div class="relative px-8 py-16">
                <div class="text-center">
                  <h1 class="text-4xl lg:text-5xl font-bold mb-6 leading-tight" v-html="previewContent.title"></h1>
                  <p class="text-xl mb-8 text-blue-100">{{ previewContent.subtitle }}</p>
                  <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <div class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center">
                      {{ previewContent.primary_button_text }}
                    </div>
                    <div class="border-2 border-white hover:bg-white hover:text-blue-800 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center">
                      {{ previewContent.secondary_button_text }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Content Details -->
            <div class="mt-6 bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Content Details:</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="font-medium text-gray-700">Primary Button:</span>
                  <span class="text-gray-600 ml-2">{{ previewContent.primary_button_text }} → {{ previewContent.primary_button_link }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Secondary Button:</span>
                  <span class="text-gray-600 ml-2">{{ previewContent.secondary_button_text }} → {{ previewContent.secondary_button_link }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Status:</span>
                  <span :class="previewContent.is_active ? 'text-green-600' : 'text-gray-600'" class="ml-2">
                    {{ previewContent.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

// Page meta
useSeoMeta({
  title: 'Hero Content Management - Admin',
  description: 'Manage hero section content for the website'
})

// Reactive data
const loading = ref(false)
const heroContents = ref([])
const activeHeroContent = ref(null)
const showEditModal = ref(false)
const errorMessage = ref('')

const newContentForm = ref({
  title: '',
  subtitle: '',
  primary_button_text: '',
  primary_button_link: '',
  secondary_button_text: '',
  secondary_button_link: '',
  is_active: false
})

const editForm = ref({
  id: null,
  title: '',
  subtitle: '',
  primary_button_text: '',
  primary_button_link: '',
  secondary_button_text: '',
  secondary_button_link: '',
  is_active: false
})

// Computed properties for statistics
const activeContentCount = computed(() => {
  return heroContents.value.filter(content => content.is_active).length
})

const inactiveContentCount = computed(() => {
  return heroContents.value.filter(content => !content.is_active).length
})

const totalContentCount = computed(() => {
  return heroContents.value.length
})

// Preview modal state
const showPreviewModal = ref(false)
const previewContent = ref(null)

// Load data on mount
onMounted(() => {
  if (process.server) return
  loadHeroContents()
  loadActiveContent()
})

// Error handling functions
const clearError = () => {
  errorMessage.value = ''
}

const retryLoad = async () => {
  clearError()
  loading.value = true
  try {
    await Promise.all([loadHeroContents(), loadActiveContent()])
  } catch (error) {
    console.error('Retry failed:', error)
  } finally {
    loading.value = false
  }
}

// Load all hero contents
const loadHeroContents = async () => {
  if (process.server) return
  loading.value = true
  clearError()
  try {
    const token = useCookie('auth-token').value
    if (!token) {
      console.warn('No auth token found')
      return
    }
    
    const response = await fetch('https://sdev.apratifoods.asia/api/admin/hero-contents', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please login again.')
      }
      throw new Error(`Server error: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Hero contents API response:', data)
    
    if (data.success) {
      heroContents.value = data.data || []
      console.log('Loaded hero contents:', heroContents.value.length, 'items')
    } else {
      throw new Error(data.message || 'Failed to load hero contents')
    }
  } catch (error) {
    console.error('Failed to load hero contents:', error)
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}

// Load active hero content
const loadActiveContent = async () => {
  if (process.server) return
  try {
    const response = await fetch('https://sdev.apratifoods.asia/api/hero-content')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Active hero content response:', data)
    
    if (data.success && data.data) {
      activeHeroContent.value = data.data
      console.log('Active hero content loaded:', data.data)
    } else {
      console.warn('No active hero content found')
      activeHeroContent.value = null
    }
  } catch (error) {
    console.error('Failed to load active content:', error)
    // Don't show alert for this as it's not critical
    activeHeroContent.value = null
  }
}

// Create new hero content
const createHeroContent = async () => {
  loading.value = true
  try {
    const token = useCookie('auth-token').value
    if (!token) {
      throw new Error('No authentication token found')
    }
    
    const response = await fetch('https://sdev.apratifoods.asia/api/admin/hero-contents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newContentForm.value)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    if (data.success) {
      alert('Hero content created successfully!')
      
      // Reset form
      newContentForm.value = {
        title: '',
        subtitle: '',
        primary_button_text: '',
        primary_button_link: '',
        secondary_button_text: '',
        secondary_button_link: '',
        is_active: false
      }
      
      // Reload data
      await loadHeroContents()
      await loadActiveContent()
    } else {
      throw new Error(data.message || 'Failed to create hero content')
    }
  } catch (error) {
    console.error('Failed to create hero content:', error)
    const errorMessage = error.message.includes('401') ? 'Authentication failed. Please login again.' : 'Failed to create hero content. Please try again.'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

// Set active content
const setActiveContent = async (contentId) => {
  try {
    const token = useCookie('auth-token').value
    if (!token) {
      throw new Error('No authentication token found')
    }
    
    const response = await fetch(`https://sdev.apratifoods.asia/api/admin/hero-contents/${contentId}/set-active`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    if (data.success) {
      alert('Hero content set as active successfully!')
      await loadHeroContents()
      await loadActiveContent()
    } else {
      throw new Error(data.message || 'Failed to set content as active')
    }
  } catch (error) {
    console.error('Failed to set content as active:', error)
    const errorMessage = error.message.includes('401') ? 'Authentication failed. Please login again.' : 'Failed to set content as active. Please try again.'
    alert(errorMessage)
  }
}

// Edit content
const editContent = (content, index = null) => {
  if (!content) {
    alert('Error: Cannot edit this content')
    return
  }
  
  // Use the content ID directly - no need for toRaw since we're just accessing properties
  const contentId = content.id
  
  if (!contentId) {
    alert('Error: Cannot edit this content (missing ID)')
    return
  }
  
  console.log('Editing content with ID:', contentId)
  
  editForm.value = {
    id: contentId,
    title: content.title || '',
    subtitle: content.subtitle || '',
    primary_button_text: content.primary_button_text || '',
    primary_button_link: content.primary_button_link || '',
    secondary_button_text: content.secondary_button_text || '',
    secondary_button_link: content.secondary_button_link || '',
    is_active: content.is_active || false
  }
  showEditModal.value = true
}

// Edit active content specifically
const editActiveContent = () => {
  if (!activeHeroContent.value) {
    alert('No active content to edit')
    return
  }
  
  const content = activeHeroContent.value
  const contentId = content.id
  
  if (!contentId) {
    alert('Error: Cannot edit active content (missing ID)')
    return
  }
  
  console.log('Editing active content with ID:', contentId)
  
  editForm.value = {
    id: contentId,
    title: content.title || '',
    subtitle: content.subtitle || '',
    primary_button_text: content.primary_button_text || '',
    primary_button_link: content.primary_button_link || '',
    secondary_button_text: content.secondary_button_text || '',
    secondary_button_link: content.secondary_button_link || '',
    is_active: true // Force to true since this is active content
  }
  showEditModal.value = true
}

// Update content
const updateContent = async () => {
  if (!editForm.value.id) {
    alert('Error: Cannot update content without ID')
    return
  }
  
  loading.value = true
  try {
    const token = useCookie('auth-token').value
    if (!token) {
      throw new Error('No authentication token found')
    }
    
    const { id, ...updateData } = editForm.value
    
    console.log('Updating content with ID:', id, 'Data:', updateData)
    
    const response = await fetch(`https://sdev.apratifoods.asia/api/admin/hero-contents/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('Update response:', data)
    
    if (data.success) {
      alert('Hero content updated successfully!')
      showEditModal.value = false
      await loadHeroContents()
      await loadActiveContent()
    } else {
      throw new Error(data.message || 'Failed to update hero content')
    }
  } catch (error) {
    console.error('Failed to update hero content:', error)
    const errorMessage = error.message.includes('401') ? 'Authentication failed. Please login again.' : 'Failed to update hero content. Please try again.'
    alert(errorMessage)
  } finally {
    loading.value = false
  }
}

// Cancel edit
const cancelEdit = () => {
  showEditModal.value = false
  editForm.value = {
    id: null,
    title: '',
    subtitle: '',
    primary_button_text: '',
    primary_button_link: '',
    secondary_button_text: '',
    secondary_button_link: '',
    is_active: false
  }
}

// Delete content
const deleteContent = async (contentId) => {
  if (!confirm('Are you sure you want to delete this hero content?')) {
    return
  }
  
  try {
    const token = useCookie('auth-token').value
    if (!token) {
      throw new Error('No authentication token found')
    }
    
    const response = await fetch(`https://sdev.apratifoods.asia/api/admin/hero-contents/${contentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    if (data.success) {
      alert('Hero content deleted successfully!')
      await loadHeroContents()
      await loadActiveContent()
    } else {
      throw new Error(data.message || 'Failed to delete hero content')
    }
  } catch (error) {
    console.error('Failed to delete hero content:', error)
    const errorMessage = error.message.includes('401') ? 'Authentication failed. Please login again.' : 'Failed to delete hero content. Please try again.'
    alert(errorMessage)
  }
}

// Preview content
const openPreview = (content) => {
  previewContent.value = content
  showPreviewModal.value = true
}

const closePreview = () => {
  showPreviewModal.value = false
  previewContent.value = null
}
</script>
