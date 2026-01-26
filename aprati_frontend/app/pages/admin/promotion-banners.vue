<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 py-6">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h1 class="text-3xl font-bold text-gray-900">Promotion Banners Management</h1>
            <p class="mt-2 text-gray-600">Manage the graphical specific promotional banners displayed on the homepage.</p>
          </div>
          <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-700 transition-colors font-medium">
            ← Back to Dashboard
          </NuxtLink>
        </div>
      </div>

      <!-- Add New Banner Button -->
      <div class="mb-8 flex justify-end">
        <button 
          @click="openCreateModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New Banner
        </button>
      </div>

      <!-- Banners List -->
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">All Banners</h2>
          <span class="text-sm text-gray-500">Ordered by active status & time</span>
        </div>
        
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-500">Loading banners...</p>
        </div>

        <div v-else-if="banners.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No banners</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new banner.</p>
        </div>

        <ul v-else class="divide-y divide-gray-200">
          <li v-for="banner in banners" :key="banner.id" class="p-6 hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-6">
              <!-- Image Preview -->
              <div 
                class="flex-shrink-0 h-32 w-64 relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group"
                :style="{ backgroundColor: banner.background_color || '#f3f4f6' }"
              >
                <img 
                  :src="getFormattedImageUrl(banner)" 
                  :alt="banner.title" 
                  class="h-full w-full object-contain"
                  @error="handleImageError"
                >
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-medium text-gray-900 truncate" :title="banner.title">{{ banner.title || 'No Title' }}</h3>
                  <span 
                    :class="[
                      banner.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800',
                      'px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide'
                    ]"
                  >
                    {{ banner.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 mb-2 line-clamp-2">
                   <span class="font-semibold" v-if="banner.subtitle">{{ banner.subtitle }}</span>
                   <span v-else class="italic text-gray-400">No subtitle</span>
                </p>
                 <div class="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <span class="flex items-center gap-1">
                        <div class="w-3 h-3 rounded-full border border-gray-300" :style="{ backgroundColor: banner.background_color }"></div>
                        BG Color
                    </span>
                    <span v-if="banner.button_text" class="px-2 py-0.5 bg-gray-100 rounded border">
                        Btn: {{ banner.button_text }}
                    </span>
                 </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col space-y-2">
                <button 
                  @click="editBanner(banner)"
                  class="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </button>
                <button 
                  @click="toggleActive(banner)"
                  :class="[
                    banner.is_active 
                        ? 'border-amber-500 text-amber-600 hover:bg-amber-50' 
                        : 'border-green-600 text-green-600 hover:bg-green-50',
                    'inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'
                  ]"
                >
                   <svg v-if="!banner.is_active" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
                  </svg>
                  {{ banner.is_active ? 'Deactivate' : 'Activate' }}
                </button>
                <button 
                  @click="deleteBanner(banner)"
                  class="inline-flex items-center justify-center px-4 py-2 border border-red-200 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity">
      <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <!-- Modal Header -->
        <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 class="text-xl font-bold text-gray-900">
            {{ isEditing ? 'Edit Banner' : 'Create New Banner' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-8 overflow-y-auto flex-1">
          <form @submit.prevent="saveBanner" class="space-y-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Left Column: Image & Basic Info -->
              <div class="space-y-6">
                 <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Banner Image (Transparent PNG recommended)</label>
                  <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors relative group">
                    <div class="space-y-1 text-center" v-if="!imagePreview">
                      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <div class="flex text-sm text-gray-600 justify-center">
                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/*" @change="handleImageSelect" ref="fileInput">
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs text-gray-500">PNG, JPG up to 10MB. <span class="font-bold text-blue-600">Recommended size: 1920x480px</span></p>
                    </div>
                    
                    <div v-else class="relative w-full" :style="{ backgroundColor: form.background_color }">
                        <img :src="imagePreview" class="w-full h-48 object-contain rounded-md shadow-sm" />
                        <button type="button" @click="removeImage" class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 focus:outline-none">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input 
                    v-model="form.title" 
                    type="text" 
                    class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5"
                    placeholder="e.g. Special Sales"
                  >
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                  <textarea 
                    v-model="form.subtitle" 
                    rows="2" 
                    class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Short description..."
                  ></textarea>
                </div>
              </div>

              <!-- Right Column: Buttons & Settings -->
              <div class="space-y-6">
                <!-- Styling -->
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Styling</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-500 uppercase mb-1">Background Color</label>
                            <div class="flex gap-2">
                                <input v-model="form.background_color" type="color" class="h-10 w-14 p-1 rounded border border-gray-300 cursor-pointer">
                                <input v-model="form.background_color" type="text" class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm font-mono" placeholder="#EF4444">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-500 uppercase mb-1">Text Color Class</label>
                            <select v-model="form.text_color" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
                                <option value="text-white">White</option>
                                <option value="text-gray-900">Black/Dark</option>
                                <option value="text-blue-100">Light Blue</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Call to Action</h4>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-medium text-gray-500 uppercase mb-1">Button Text</label>
                            <input v-model="form.button_text" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" placeholder="e.g. Shop Now">
                        </div>
                         <div>
                            <label class="block text-xs font-medium text-gray-500 uppercase mb-1">Button Link</label>
                            <input v-model="form.button_link" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" placeholder="e.g. /products">
                        </div>
                    </div>
                </div>

                <div class="flex items-center pt-4">
                  <input 
                    v-model="form.is_active" 
                    type="checkbox" 
                    id="is_active"
                    class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label for="is_active" class="ml-2 block text-sm text-gray-900 font-medium">Set as Active</label>
                </div>
              </div>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
          <button 
            @click="closeModal"
            class="px-5 py-2.5 rounded-lg text-gray-700 bg-white border border-gray-300 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            @click="saveBanner"
            :disabled="processing"
            class="px-5 py-2.5 rounded-lg text-white bg-blue-600 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
             <svg v-if="processing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ processing ? 'Saving...' : (isEditing ? 'Update Banner' : 'Create Banner') }}
          </button>
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

useSeoMeta({
  title: 'Promotion Banners - Admin'
})

// State
const banners = ref([])
const loading = ref(true)
const processing = ref(false)
const showModal = ref(false)
const isEditing = ref(false)
const imagePreview = ref(null)
const fileInput = ref(null)

const form = ref({
  id: null,
  title: '',
  subtitle: '',
  image: null,
  background_color: '#EF4444',
  text_color: 'text-white',
  button_text: '',
  button_link: '',
  is_active: true
})

const config = useRuntimeConfig()

// Initial Load
onMounted(() => {
  fetchBanners()
})

// Actions
const fetchBanners = async () => {
    loading.value = true
    try {
        const token = useCookie('auth-token').value
        const response = await fetch(`${config.public.apiBase}/admin/promotion-banners`, {
             headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        if (data.status === 'success') {
            banners.value = data.data
        }
    } catch (e) {
        console.error('Failed to fetch banners', e)
    } finally {
        loading.value = false
    }
}

const openCreateModal = () => {
    resetForm()
    isEditing.value = false
    showModal.value = true
}

const editBanner = (banner) => {
    isEditing.value = true
    form.value = {
        id: banner.id,
        title: banner.title,
        subtitle: banner.subtitle,
        background_color: banner.background_color,
        text_color: banner.text_color,
        button_text: banner.button_text,
        button_link: banner.button_link,
        is_active: Boolean(banner.is_active),
        image: null
    }
    
    // For previewing existing image
    imagePreview.value = getFormattedImageUrl(banner)
    
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    resetForm()
}

const resetForm = () => {
    form.value = {
        id: null,
        title: '',
        subtitle: '',
        image: null,
        background_color: '#EF4444',
        text_color: 'text-white',
        button_text: '',
        button_link: '',
        is_active: true
    }
    imagePreview.value = null
    if (fileInput.value) fileInput.value.value = null
}

const saveBanner = async () => {
    processing.value = true
    try {
        const token = useCookie('auth-token').value
        const formData = new FormData()
        
        // Append simple fields
        formData.append('title', form.value.title || '')
        formData.append('subtitle', form.value.subtitle || '')
        formData.append('background_color', form.value.background_color || '#EF4444')
        formData.append('text_color', form.value.text_color || 'text-white')
        formData.append('button_text', form.value.button_text || '')
        formData.append('button_link', form.value.button_link || '')
        formData.append('is_active', form.value.is_active ? '1' : '0')
        
        // Debug: Check image state
        console.log('Image check:', {
            'form.value.image exists': !!form.value.image,
            'is File': form.value.image instanceof File,
            'imagePreview exists': !!imagePreview.value,
            'isEditing': isEditing.value
        })
        
        // Append image if exists and is a valid File
        if (form.value.image && form.value.image instanceof File) {
            formData.append('image', form.value.image)
            console.log('✅ Image appended to FormData:', form.value.image.name)
        } else if (!isEditing.value) {
            // New banner MUST have an image
            alert('Please select an image file before creating the banner')
            processing.value = false
            return
        } else {
            console.log('ℹ️ No new image selected (editing mode)')
        }

        let url = `${config.public.apiBase}/admin/promotion-banners`

        if (isEditing.value && form.value.id) {
            url = `${config.public.apiBase}/admin/promotion-banners/${form.value.id}`
             // Laravel requires _method=PUT for processing FormData with files in PUT requests
            formData.append('_method', 'PUT') 
        }

        // Debug: Log FormData contents
        console.log('=== SUBMITTING BANNER ===')
        console.log('URL:', url)
        console.log('Is Editing:', isEditing.value)
        console.log('FormData contents:')
        for (let [key, value] of formData.entries()) {
            console.log(`  ${key}:`, value instanceof File ? `File(${value.name})` : value)
        }

        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        
        const data = await response.json()
        
        console.log('=== SERVER RESPONSE ===')
        console.log('Status:', data.status)
        console.log('Full Response:', JSON.stringify(data, null, 2))
        
        if (data.status === 'success') {
            closeModal()
            fetchBanners() // Refresh list
            alert(isEditing.value ? 'Banner updated successfully' : 'Banner created successfully')
        } else {
            console.error('❌ SERVER ERROR:', data)
            
            // Show the full error response
            let errorMessage = 'Error occurred:\n\n'
            errorMessage += JSON.stringify(data, null, 2)
            
            alert(errorMessage)
        }

    } catch (e) {
        console.error('Save failed', e)
        alert('Failed to save banner. Check console.')
    } finally {
        processing.value = false
    }
}

const deleteBanner = async (banner) => {
    if(!confirm('Are you sure you want to delete this banner?')) return

    try {
        const token = useCookie('auth-token').value
        const response = await fetch(`${config.public.apiBase}/admin/promotion-banners/${banner.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        if (data.status === 'success') {
            fetchBanners()
        } else {
            alert('Failed to delete: ' + data.message)
        }
    } catch (e) {
        console.error('Delete failed', e)
    }
}

const toggleActive = async (banner) => {
    try {
        const token = useCookie('auth-token').value
        const response = await fetch(`${config.public.apiBase}/admin/promotion-banners/${banner.id}/toggle-active`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        if(data.status === 'success') {
             banner.is_active = !banner.is_active
        }
    } catch (e) {
        console.error('Toggle failed', e)
    }
}

// Helpers
const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
        form.value.image = file
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const removeImage = () => {
    form.value.image = null
    imagePreview.value = null
    if (fileInput.value) fileInput.value.value = null
}

const handleImageError = (e) => {
    e.target.style.display = 'none'
}

const getFormattedImageUrl = (banner) => {
    if (!banner || !banner.image_url) return ''
    if (banner.image_url.startsWith('http')) return banner.image_url
    return `${config.public.apiBaseUrl}${banner.image_url}`
}

</script>
