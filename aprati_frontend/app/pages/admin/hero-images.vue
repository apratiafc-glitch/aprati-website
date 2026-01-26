<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-6">
          <h1 class="text-3xl font-bold text-gray-900">Hero Image Management</h1>
          <p class="mt-2 text-gray-600">Manage the hero image displayed on the homepage</p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Current Active Hero Image -->
      <div v-if="activeHeroImage" class="bg-white rounded-lg shadow-lg mb-8">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Current Active Hero Image</h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img 
                :src="getImageUrl(activeHeroImage.image_url)" 
                :alt="activeHeroImage.alt_text"
                class="w-full h-64 object-cover rounded-lg shadow-md"
                @error="handleImageError"
              />
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <p class="text-gray-900">{{ activeHeroImage.title || 'No title set' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p class="text-gray-900">{{ activeHeroImage.description || 'No description set' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <p class="text-gray-900">{{ activeHeroImage.alt_text || 'No alt text set' }}</p>
              </div>
              <div class="flex space-x-4">
                <button 
                  @click="editHeroImage(activeHeroImage)"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Edit Current Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upload New Hero Image -->
      <div class="bg-white rounded-lg shadow-lg mb-8">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Upload New Hero Image</h2>
          
          <form @submit.prevent="uploadNewHeroImage" class="space-y-6">
            <!-- Image Upload -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
              <input 
                ref="imageInput"
                type="file" 
                accept="image/*"
                @change="handleImageSelect"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p class="text-sm text-gray-500 mt-1">Recommended size: 1200x600px or larger. Max size: 5MB</p>
              
              <!-- Image Preview -->
              <div v-if="imagePreview" class="mt-4">
                <img :src="imagePreview" alt="Preview" class="w-full max-w-md h-48 object-cover rounded-lg shadow-md" />
              </div>
            </div>

            <!-- Hero Image Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title (Optional)</label>
                <input 
                  v-model="newHeroForm.title"
                  type="text" 
                  placeholder="e.g., Premium Quality"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                <input 
                  v-model="newHeroForm.alt_text"
                  type="text" 
                  placeholder="e.g., Aprati Food Company Products"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea 
                v-model="newHeroForm.description"
                rows="3"
                placeholder="e.g., Fresh Food Products"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <div class="flex items-center">
              <input 
                v-model="newHeroForm.is_active"
                type="checkbox" 
                id="setActive"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label for="setActive" class="ml-2 text-sm font-medium text-gray-700">
                Set as active hero image immediately
              </label>
            </div>

            <div class="flex justify-end">
              <button 
                type="submit"
                :disabled="uploading"
                class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <span v-if="uploading">Uploading...</span>
                <span v-else>Upload Hero Image</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- All Hero Images -->
      <div class="bg-white rounded-lg shadow-lg">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">All Hero Images</h2>
          
          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p class="text-gray-600 mt-4">Loading hero images...</p>
          </div>

          <div v-else-if="heroImages.length === 0" class="text-center py-8">
            <p class="text-gray-600">No hero images found. Upload your first one above.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="image in heroImages" 
              :key="image.id"
              class="border border-gray-200 rounded-lg overflow-hidden"
              :class="{ 'ring-2 ring-green-500': image.is_active }"
            >
              <img 
                :src="getImageUrl(image.image_url)" 
                :alt="image.alt_text"
                class="w-full h-48 object-cover"
                @error="handleImageError"
              />
              <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-medium text-gray-900">{{ image.title || 'Untitled' }}</h3>
                  <span 
                    v-if="image.is_active" 
                    class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    Active
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ image.description || 'No description' }}</p>
                <div class="flex space-x-2">
                  <button 
                    @click="editHeroImage(image)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    v-if="!image.is_active"
                    @click="setActiveHeroImage(image.id)"
                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Set Active
                  </button>
                  <button 
                    @click="deleteHeroImage(image.id)"
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
    </div>

    <!-- Edit Hero Image Modal -->
    <div 
      v-if="showEditModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Edit Hero Image</h3>
          
          <form @submit.prevent="updateHeroImage" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input 
                v-model="editForm.title"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
              <input 
                v-model="editForm.alt_text"
                type="text" 
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                v-model="editForm.description"
                rows="3"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Replace Image (Optional)</label>
              <input 
                ref="editImageInput"
                type="file" 
                accept="image/*"
                @change="handleEditImageSelect"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="flex items-center">
              <input 
                v-model="editForm.is_active"
                type="checkbox" 
                id="editSetActive"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label for="editSetActive" class="ml-2 text-sm font-medium text-gray-700">
                Set as active hero image
              </label>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button"
                @click="showEditModal = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="updating"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <span v-if="updating">Updating...</span>
                <span v-else>Update</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page meta
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

useSeoMeta({
  title: 'Hero Image Management - Admin'
})

// Reactive data
const loading = ref(true)
const uploading = ref(false)
const updating = ref(false)
const heroImages = ref([])
const activeHeroImage = ref(null)
const imagePreview = ref(null)
const showEditModal = ref(false)

// Forms
const newHeroForm = ref({
  title: '',
  alt_text: '',
  description: '',
  is_active: true
})

const editForm = ref({
  id: null,
  title: '',
  alt_text: '',
  description: '',
  is_active: false,
  image: null
})

// Refs
const imageInput = ref(null)
const editImageInput = ref(null)

// Initialize data
onMounted(() => {
  if (process.server) return
  loadHeroImages()
})

// Load all hero images
const loadHeroImages = async () => {
  if (process.server) return
  loading.value = true
  try {
    const token = useCookie('auth-token').value
    if (!token) {
      console.warn('No auth token found')
      return
    }
    const response = await fetch('https://sdev.apratifoods.asia/api/admin/hero-images', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()

    if (data.success) {
      heroImages.value = data.data
      activeHeroImage.value = heroImages.value.find(img => img.is_active) || null
    }
  } catch (error) {
    console.error('Failed to load hero images:', error)
    alert('Failed to load hero images')
  } finally {
    loading.value = false
  }
}

// Handle image selection for new upload
const handleImageSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    imagePreview.value = null
  }
}

// Handle image selection for edit
const handleEditImageSelect = (event) => {
  const file = event.target.files[0]
  editForm.value.image = file
}

// Upload new hero image
const uploadNewHeroImage = async () => {
  const imageFile = imageInput.value.files[0]
  if (!imageFile) {
    alert('Please select an image')
    return
  }

  uploading.value = true
  try {
    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('title', newHeroForm.value.title)
    formData.append('alt_text', newHeroForm.value.alt_text)
    formData.append('description', newHeroForm.value.description)
    formData.append('is_active', newHeroForm.value.is_active ? '1' : '0')

    const token = useCookie('auth-token').value
    const response = await fetch('https://sdev.apratifoods.asia/api/admin/hero-images', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    
    const data = await response.json()

    if (data.success) {
      alert('Hero image uploaded successfully!')
      
      // Reset form
      newHeroForm.value = {
        title: '',
        alt_text: '',
        description: '',
        is_active: true
      }
      imagePreview.value = null
      imageInput.value.value = ''
      
      // Reload data
      await loadHeroImages()
    } else {
      alert(data.message || 'Failed to upload hero image')
    }
  } catch (error) {
    console.error('Failed to upload hero image:', error)
    alert('Failed to upload hero image')
  } finally {
    uploading.value = false
  }
}

// Edit hero image
const editHeroImage = (image) => {
  editForm.value = {
    id: image.id,
    title: image.title || '',
    alt_text: image.alt_text || '',
    description: image.description || '',
    is_active: image.is_active,
    image: null
  }
  showEditModal.value = true
}

// Update hero image
const updateHeroImage = async () => {
  updating.value = true
  try {
    const formData = new FormData()
    formData.append('title', editForm.value.title)
    formData.append('alt_text', editForm.value.alt_text)
    formData.append('description', editForm.value.description)
    formData.append('is_active', editForm.value.is_active ? '1' : '0')
    formData.append('_method', 'PUT')
    
    if (editForm.value.image) {
      formData.append('image', editForm.value.image)
    }

    const token = useCookie('auth-token').value
    const response = await fetch(`https://sdev.apratifoods.asia/api/admin/hero-images/${editForm.value.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    
    const data = await response.json()

    if (data.success) {
      alert('Hero image updated successfully!')
      showEditModal.value = false
      await loadHeroImages()
    } else {
      alert(data.message || 'Failed to update hero image')
    }
  } catch (error) {
    console.error('Failed to update hero image:', error)
    alert('Failed to update hero image')
  } finally {
    updating.value = false
  }
}

// Set active hero image
const setActiveHeroImage = async (imageId) => {
  try {
    const token = useCookie('auth-token').value
    const response = await fetch(`https://sdev.apratifoods.asia/api/admin/hero-images/${imageId}/set-active`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()

    if (data.success) {
      alert('Hero image set as active!')
      await loadHeroImages()
    } else {
      alert(data.message || 'Failed to set active hero image')
    }
  } catch (error) {
    console.error('Failed to set active hero image:', error)
    alert('Failed to set active hero image')
  }
}

// Delete hero image
const deleteHeroImage = async (imageId) => {
  if (!confirm('Are you sure you want to delete this hero image?')) {
    return
  }

  try {
    const token = useCookie('auth-token').value
    const response = await fetch(`https://sdev.apratifoods.asia/api/admin/hero-images/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    
    const data = await response.json()

    if (data.success) {
      alert('Hero image deleted successfully!')
      await loadHeroImages()
    } else {
      alert(data.message || 'Failed to delete hero image')
    }
  } catch (error) {
    console.error('Failed to delete hero image:', error)
    alert('Failed to delete hero image')
  }
}

// Utility functions
const getImageUrl = (url) => {
  if (!url) return '/images/default-hero.svg'
  if (url.startsWith('/storage/')) {
    return `https://sdev.apratifoods.asia${url}`
  }
  return url
}

const handleImageError = (event) => {
  event.target.src = '/images/default-hero.svg'
}
</script>
