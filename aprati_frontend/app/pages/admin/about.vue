<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">About Us Management</h1>
            <p class="text-gray-600 mt-2">Create and manage About Us posts with title and description</p>
          </div>
          <button 
            @click="showCreateModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Add New Post
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading posts...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Posts Grid -->
      <div v-if="!loading && !error" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div 
          v-for="post in posts" 
          :key="post.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <!-- Image thumbnail if exists -->
              <div v-if="post.image_url" class="mb-3">
                <img 
                  :src="post.image_url" 
                  :alt="post.title || post.name"
                  class="w-16 h-12 object-cover rounded border"
                />
              </div>
              
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ post.title || post.name }}</h3>
              <p class="text-gray-600 text-sm mb-2">{{ post.content || post.description }}</p>
              
              <!-- Sort Order Badge -->
              <div class="flex items-center">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                  Order: {{ post.sort_order || 1 }}
                </span>
              </div>
            </div>
            <div class="flex space-x-2 ml-4">
              <button 
                @click="editPost(post)"
                class="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-lg"
                title="Edit"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button 
                @click="deletePost(post)"
                class="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
                title="Delete"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Timestamps -->
          <div class="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <p>Created: {{ formatDate(post.created_at) }}</p>
            <p>Updated: {{ formatDate(post.updated_at) }}</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && posts.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating your first About Us post.</p>
        <div class="mt-6">
          <button 
            @click="showCreateModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Add New Post
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ showEditModal ? 'Edit Post' : 'Create New Post' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form @submit.prevent="savePost" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input 
                v-model="form.title"
                type="text" 
                placeholder="Enter post title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea 
                v-model="form.description"
                rows="6"
                placeholder="Enter post description..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <!-- Sort Order -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <select 
                v-model="form.sort_order"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">First (Top Priority)</option>
                <option value="2">Second</option>
                <option value="3">Third</option>
                <option value="4">Fourth</option>
                <option value="5">Fifth</option>
                <option value="10">Lower Priority</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">Posts with lower numbers appear first on the public page</p>
            </div>

            <!-- Image Upload Section -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Image</label>
              
              <!-- Current Image Preview (for edit mode) -->
              <div v-if="showEditModal && form.image_url" class="mb-4">
                <p class="text-sm text-gray-600 mb-2">Current Image:</p>
                <div class="relative inline-block">
                  <img 
                    :src="form.image_url" 
                    alt="Current image" 
                    class="w-32 h-24 object-cover rounded-lg border"
                  />
                  <button 
                    type="button"
                    @click="removeCurrentImage"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>

              <!-- File Upload -->
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                />
                
                <!-- Upload Area -->
                <div v-if="!imagePreview" @click="$refs.fileInput.click()" class="cursor-pointer">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="mt-2 text-sm text-gray-600">Click to upload an image</p>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                </div>

                <!-- Image Preview -->
                <div v-else class="relative">
                  <img 
                    :src="imagePreview" 
                    alt="Preview" 
                    class="w-32 h-24 object-cover rounded-lg mx-auto"
                  />
                  <div class="mt-2 flex justify-center space-x-2">
                    <button 
                      type="button"
                      @click="$refs.fileInput.click()"
                      class="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Change
                    </button>
                    <button 
                      type="button"
                      @click="removeImage"
                      class="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <!-- Upload Progress -->
              <div v-if="uploadProgress > 0 && uploadProgress < 100" class="mt-2">
                <div class="bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    :style="`width: ${uploadProgress}%`"
                  ></div>
                </div>
                <p class="text-sm text-gray-600 mt-1">Uploading... {{ uploadProgress }}%</p>
              </div>
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
            <h3 class="text-lg font-medium text-gray-900">Delete Post</h3>
          </div>
          
          <p class="text-gray-600 mb-6">
            Are you sure you want to delete "{{ itemToDelete?.title || itemToDelete?.name }}"? This action cannot be undone.
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useApi } from '../../composables/useApi'
import { useNotifications } from '~/composables/useNotifications'

definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

const { user } = useAuth()
const api = useApi() // Call useApi directly
const { success: showSuccess, error: showError } = useNotifications()

// Reactive data
const posts = ref([])
const loading = ref(true)
const error = ref(null)
const saving = ref(false)
const deleting = ref(false)

// Modal states
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

// Form data
const form = ref({
  title: '',
  description: '',
  image_url: '',
  image_file: null,
  key: '',
  sort_order: 1
})

// Image upload states
const imagePreview = ref('')
const uploadProgress = ref(0)
const fileInput = ref(null)

// Computed properties
const isAdmin = computed(() => user.value?.role === 'admin')

// ESC key handler
const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeModal()
    if (showDeleteModal.value) {
      showDeleteModal.value = false
      itemToDelete.value = null
    }
  }
}

// Methods
const loadPosts = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    loading.value = true
    error.value = null
    
    const response = await api.aboutContent.adminGetAll()
    
    if (response && response.success && response.data) {
      posts.value = response.data
    } else if (response && response.data) {
      posts.value = Array.isArray(response.data) ? response.data : Object.values(response.data)
    } else {
      posts.value = []
    }
  } catch (err) {
    error.value = 'Failed to load posts. Please try again later.'
    console.error('Failed to load about posts:', err)
    posts.value = []
  } finally {
    loading.value = false
  }
}

const editPost = (item) => {
  form.value = {
    id: item.id,
    key: item.key,
    title: item.title || item.name, // Handle both title and name fields
    description: item.content || item.description,
    image_url: item.image_url || '',
    image_file: null,
    sort_order: item.sort_order || 1
  }
  imagePreview.value = ''
  showEditModal.value = true
}

// Image handling methods
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    showError('Please select a valid image file')
    return
  }

  // Validate file size (2MB limit)
  if (file.size > 2 * 1024 * 1024) {
    showError('Image size must be less than 2MB')
    return
  }

  form.value.image_file = file

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  form.value.image_file = null
  imagePreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeCurrentImage = () => {
  form.value.image_url = ''
}

const deletePost = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const savePost = async () => {
  try {
    saving.value = true
    uploadProgress.value = 0

    const payload = {
      key: showEditModal.value ? form.value.key || `post_${Date.now()}` : `post_${Date.now()}`,
      title: form.value.title,
      content: form.value.description,
      image_url: form.value.image_url || '',
      is_active: true,
      sort_order: form.value.sort_order || 1
    }

    let postResponse

    // Create or update the post first
    if (showEditModal.value) {
      postResponse = await api.aboutContent.update(form.value.id, payload)
      if (postResponse.success) {
        showSuccess('Post updated successfully!')
      } else {
        throw new Error('Failed to update post: ' + (postResponse.error || 'Unknown error'))
      }
    } else {
      postResponse = await api.aboutContent.create(payload)
      if (postResponse.success) {
        showSuccess('Post created successfully!')
      } else {
        throw new Error('Failed to create post: ' + (postResponse.error || 'Unknown error'))
      }
    }

    uploadProgress.value = 30

    // If there's an image file, upload it after the post is created/updated
    if (form.value.image_file) {
      uploadProgress.value = 40
      
      const formData = new FormData()
      formData.append('image', form.value.image_file)
      
      // Get the post ID (either from edit mode or from create response)
      const postId = showEditModal.value ? form.value.id : postResponse.data.id
      
      console.log('About to upload image:', {
        postId,
        fileSize: form.value.image_file.size,
        fileName: form.value.image_file.name,
        hasAuthToken: !!api.getAuthToken(),
        currentUser: user.value,
        isAuthenticated: !!user.value
      })
      
      try {
        // First validate the auth token
        console.log('Validating auth token...')
        console.log('Current token:', api.getAuthToken())
        const tokenValidation = await api.request('/validate-token', {
          method: 'POST'
        })
        console.log('Raw token validation response:', tokenValidation)
        
        // Check if the response indicates the token is valid
        if (tokenValidation.success !== true) {
          console.error('Token validation failed:', tokenValidation)
          throw new Error('Authentication token is invalid: ' + (tokenValidation.message || tokenValidation.error || 'Unknown error'))
        }
        
        console.log('Token is valid, user:', tokenValidation.data?.name || tokenValidation.user?.name)

        // Upload image
        uploadProgress.value = 60
        const uploadResponse = await api.aboutContent.uploadImage(postId, formData, {
          onUploadProgress: (progressEvent) => {
            uploadProgress.value = Math.round((progressEvent.loaded * 30) / progressEvent.total) + 60
          }
        })
        
        if (!uploadResponse.success) {
          throw new Error('Failed to upload image: ' + (uploadResponse.error || 'Unknown error'))
        }

        console.log('Image uploaded successfully:', uploadResponse)
        showSuccess('Image uploaded successfully!')
        uploadProgress.value = 95
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError)
        showError('Failed to upload image: ' + uploadError.message)
        // Continue with post creation/update even if image upload fails
        uploadProgress.value = 95
      }
    } else {
      console.log('No image file to upload')
      uploadProgress.value = 95
    }

    uploadProgress.value = 100
    
    // Final success message
    if (form.value.image_file) {
      showSuccess(`Post ${showEditModal.value ? 'updated' : 'created'} and image uploaded successfully!`)
    } else {
      showSuccess(`Post ${showEditModal.value ? 'updated' : 'created'} successfully!`)
    }
    
    await loadPosts()
    closeModal()
  } catch (err) {
    showError(`Failed to ${showEditModal.value ? 'update' : 'create'} post. Please try again.`)
    console.error('Failed to save post:', err)
  } finally {
    saving.value = false
    uploadProgress.value = 0
  }
}

const confirmDelete = async () => {
  try {
    deleting.value = true
    await api.aboutContent.delete(itemToDelete.value.id)
    showSuccess('Post deleted successfully!')
    await loadPosts()
    showDeleteModal.value = false
    itemToDelete.value = null
  } catch (err) {
    showError('Failed to delete post. Please try again.')
    console.error('Failed to delete post:', err)
  } finally {
    deleting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  form.value = {
    title: '',
    description: '',
    image_url: '',
    image_file: null,
    key: '',
    sort_order: 1
  }
  imagePreview.value = ''
  uploadProgress.value = 0
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString()
}

// Lifecycle
onMounted(() => {
  if (process.server) return
  loadPosts()
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
/* No custom styles needed */
</style>
