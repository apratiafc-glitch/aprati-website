<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">About Content Management</h1>
            <p class="text-gray-600 mt-2">Manage all content sections for the About page</p>
          </div>
          <div class="flex space-x-4">
            <button 
              @click="initializeDefaults"
              :disabled="initializing"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {{ initializing ? 'Initializing...' : 'Initialize Defaults' }}
            </button>
            <button 
              @click="showCreateModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Add New Section
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading content...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Content Management Grid -->
      <div v-if="!loading && !error" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div 
          v-for="item in content" 
          :key="item.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ item.title }}</h3>
              <p class="text-sm text-gray-500 mb-2">Key: {{ item.key }}</p>
              <p class="text-gray-600 text-sm line-clamp-3">{{ item.content }}</p>
            </div>
            <div class="flex space-x-2 ml-4">
              <button 
                @click="editContent(item)"
                class="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg"
                title="Edit"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button 
                @click="deleteContent(item)"
                class="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
                title="Delete"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Metadata Preview -->
          <div v-if="item.metadata && Object.keys(item.metadata).length > 0" class="mt-4 p-3 bg-gray-50 rounded">
            <p class="text-xs text-gray-500 mb-2">Metadata:</p>
            <pre class="text-xs text-gray-600 overflow-x-auto">{{ JSON.stringify(item.metadata, null, 2) }}</pre>
          </div>

          <!-- Timestamps -->
          <div class="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <p>Created: {{ formatDate(item.created_at) }}</p>
            <p>Updated: {{ formatDate(item.updated_at) }}</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && content.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No content found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating your first content section.</p>
        <div class="mt-6">
          <button 
            @click="initializeDefaults"
            :disabled="initializing"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {{ initializing ? 'Initializing...' : 'Initialize Default Content' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ showEditModal ? 'Edit Content' : 'Create New Content' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveContent" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Key *</label>
                <input 
                  v-model="form.key"
                  type="text" 
                  :disabled="showEditModal"
                  placeholder="e.g., company_overview, mission, value_quality"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  required
                />
                <p class="text-xs text-gray-500 mt-1">Unique identifier for this content section</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input 
                  v-model="form.title"
                  type="text" 
                  placeholder="Content title"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <textarea 
                v-model="form.content"
                rows="8"
                placeholder="Enter the content text..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Metadata (JSON)</label>
              <textarea 
                v-model="metadataJson"
                rows="6"
                placeholder='{"icon": "check-circle", "stats": [{"label": "Years", "value": "10+"}]}'
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">Optional JSON metadata for additional configuration</p>
              <div v-if="metadataError" class="text-red-600 text-xs mt-1">{{ metadataError }}</div>
            </div>

            <div class="flex justify-end space-x-4">
              <button 
                type="button"
                @click="closeModal"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="saving"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {{ saving ? 'Saving...' : (showEditModal ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="bg-red-100 rounded-full p-2 mr-3">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Delete Content</h3>
          </div>
          
          <p class="text-gray-600 mb-6">
            Are you sure you want to delete "{{ itemToDelete?.title }}"? This action cannot be undone.
          </p>

          <div class="flex justify-end space-x-4">
            <button 
              @click="showDeleteModal = false; itemToDelete = null"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              @click="confirmDelete"
              :disabled="deleting"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useApi } from '../../composables/useApi'
import { useToast } from '~/composables/useToast'

definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

const { user } = useAuth()
const { api } = useApi()
const { showToast } = useToast()

// Reactive data
const content = ref([])
const loading = ref(true)
const error = ref(null)
const saving = ref(false)
const deleting = ref(false)
const initializing = ref(false)

// Modal states
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

// Form data
const form = ref({
  key: '',
  title: '',
  content: '',
  metadata: {}
})

const metadataJson = ref('')
const metadataError = ref('')

// Computed properties
const isAdmin = computed(() => user.value?.role === 'admin')

// Methods
const loadContent = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await api.aboutContent.getAll()
    
    // Handle the API response structure
    if (response && response.data) {
      // The public API returns an object with keys as content keys
      // Convert object values to array for admin interface
      content.value = Object.values(response.data)
    } else {
      content.value = []
    }
  } catch (err) {
    error.value = 'Failed to load content. Please try again later.'
    console.error('Failed to load about content:', err)
    content.value = [] // Ensure content is always an array
  } finally {
    loading.value = false
  }
}

const editContent = (item) => {
  form.value = {
    id: item.id,
    key: item.key,
    title: item.title,
    content: item.content,
    metadata: item.metadata || {}
  }
  metadataJson.value = JSON.stringify(item.metadata || {}, null, 2)
  showEditModal.value = true
}

const deleteContent = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const saveContent = async () => {
  try {
    saving.value = true
    metadataError.value = ''

    // Parse metadata JSON
    let metadata = {}
    if (metadataJson.value.trim()) {
      try {
        metadata = JSON.parse(metadataJson.value)
      } catch (err) {
        metadataError.value = 'Invalid JSON format'
        return
      }
    }

    const payload = {
      key: form.value.key,
      title: form.value.title,
      content: form.value.content,
      metadata: metadata
    }

    if (showEditModal.value) {
      await api.aboutContent.update(form.value.id, payload)
      showToast('Content updated successfully!', 'success')
    } else {
      await api.aboutContent.create(payload)
      showToast('Content created successfully!', 'success')
    }

    await loadContent()
    closeModal()
  } catch (err) {
    showToast(`Failed to ${showEditModal.value ? 'update' : 'create'} content. Please try again.`, 'error')
    console.error('Failed to save content:', err)
  } finally {
    saving.value = false
  }
}

const confirmDelete = async () => {
  try {
    deleting.value = true
    await api.aboutContent.delete(itemToDelete.value.id)
    showToast('Content deleted successfully!', 'success')
    await loadContent()
    showDeleteModal.value = false
    itemToDelete.value = null
  } catch (err) {
    showToast('Failed to delete content. Please try again.', 'error')
    console.error('Failed to delete content:', err)
  } finally {
    deleting.value = false
  }
}

const initializeDefaults = async () => {
  try {
    initializing.value = true
    await api.aboutContent.initializeDefaults()
    showToast('Default content initialized successfully!', 'success')
    await loadContent()
  } catch (err) {
    showToast('Failed to initialize content. Please try again.', 'error')
    console.error('Failed to initialize defaults:', err)
  } finally {
    initializing.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  form.value = {
    key: '',
    title: '',
    content: '',
    metadata: {}
  }
  metadataJson.value = ''
  metadataError.value = ''
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

// Lifecycle
onMounted(() => {
  if (process.server) return
  if (!isAdmin.value) {
    navigateTo('/login')
    return
  }
  loadContent()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
