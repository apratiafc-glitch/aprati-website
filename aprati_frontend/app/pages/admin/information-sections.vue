<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Modern Page Header -->
      <div class="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-500 shadow-2xl">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative px-6 sm:px-8 lg:px-10 py-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Information Sections</h1>
              </div>
              <p class="text-base sm:text-lg text-white/90 font-medium">Manage homepage information sections</p>
            </div>
            <button
              @click="showCreateModal = true"
              class="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 shadow-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>Add New Section</span>
            </button>
          </div>
        </div>
        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Modern Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">Total</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Sections</p>
          <p class="text-3xl font-bold text-gray-900">{{ stats.total }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full">Active</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Active</p>
          <p class="text-3xl font-bold text-gray-900">{{ stats.active }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-red-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full">Inactive</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Inactive</p>
          <p class="text-3xl font-bold text-gray-900">{{ stats.inactive }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">Images</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">With Images</p>
          <p class="text-3xl font-bold text-gray-900">{{ stats.withImages }}</p>
        </div>
      </div>

      <!-- Sections List -->
      <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50">
          <h3 class="text-lg font-bold text-gray-900">Information Sections</h3>
          <p class="mt-1 text-sm text-gray-600">Manage your website's information sections</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="px-4 py-8">
          <div class="flex justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>

        <!-- Sections List -->
        <ul v-else-if="sections.length > 0" class="divide-y divide-gray-200">
          <li v-for="section in sections" :key="section.id" class="px-4 py-4 hover:bg-gray-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <img
                    :src="section.image_url || placeholderImage"
                    :alt="section.title"
                    :key="section.image_url"
                    class="h-16 w-16 rounded-lg object-cover border border-gray-200"
                    @error="(e) => e.target.src = placeholderImage"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center space-x-2">
                    <h4 class="text-sm font-medium text-gray-900">{{ section.title }}</h4>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        section.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ section.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">{{ truncateText(section.description, 120) }}</p>
                  <div class="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <span>Sort: {{ section.sort_order }}</span>
                    <span>Created: {{ formatDate(section.created_at) }}</span>
                    <span>By: {{ section.created_by }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="toggleStatus(section)"
                  :class="[
                    'inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md',
                    section.is_active
                      ? 'text-red-700 bg-red-100 hover:bg-red-200'
                      : 'text-green-700 bg-green-100 hover:bg-green-200'
                  ]"
                >
                  {{ section.is_active ? 'Deactivate' : 'Activate' }}
                </button>
                <button
                  @click="editSection(section)"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  @click="deleteSection(section)"
                  class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>

        <!-- Empty State -->
        <div v-else class="px-4 py-8 text-center">
          <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">No information sections</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new information section.</p>
          <div class="mt-6">
            <button
              @click="showCreateModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon class="h-4 w-4 mr-2" />
              Add Information Section
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <TransitionRoot as="template" :show="showCreateModal || showEditModal">
      <Dialog as="div" class="relative z-10" @close="closeModal">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form @submit.prevent="submitForm">
                  <div>
                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <DocumentTextIcon class="h-6 w-6 text-blue-600" />
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                        {{ editingSection ? 'Edit Information Section' : 'Create Information Section' }}
                      </DialogTitle>
                    </div>
                  </div>

                  <div class="mt-5 space-y-4">
                    <!-- Title -->
                    <div>
                      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        id="title"
                        v-model="form.title"
                        type="text"
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter section title"
                      />
                    </div>

                    <!-- Description -->
                    <div>
                      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="description"
                        v-model="form.description"
                        rows="3"
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter section description"
                      ></textarea>
                    </div>

                    <!-- Image Upload -->
                    <div>
                      <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
                      <input
                        id="image"
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        @change="handleImageChange"
                        class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p class="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 2MB. <span class="font-bold text-blue-600">Recommended size: 800x600px</span></p>
                    </div>

                    <!-- Image Preview -->
                    <div v-if="imagePreview" class="mt-2">
                      <div class="relative inline-block">
                        <img 
                          :src="imagePreview" 
                          alt="Preview" 
                          class="h-32 w-32 object-cover rounded-lg border-2"
                          :class="form.image ? 'border-green-500' : 'border-gray-300'"
                          @error="(e) => e.target.src = placeholderImage"
                        />
                        <div v-if="form.image" class="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                          ✓ New
                        </div>
                      </div>
                      <p v-if="form.image" class="text-xs text-green-600 mt-1 font-semibold">✓ New image selected - will replace current image on save</p>
                      <p v-else class="text-xs text-gray-500 mt-1">Current image (select a new file above to replace)</p>
                    </div>

                    <!-- Sort Order -->
                    <div>
                      <label for="sort_order" class="block text-sm font-medium text-gray-700">Sort Order</label>
                      <input
                        id="sort_order"
                        v-model.number="form.sort_order"
                        type="number"
                        min="0"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="0"
                      />
                    </div>

                    <!-- Active Status -->
                    <div class="flex items-center">
                      <input
                        id="is_active"
                        v-model="form.is_active"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label for="is_active" class="ml-2 block text-sm text-gray-900">Active</label>
                    </div>
                  </div>

                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      :disabled="submitting"
                      class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2 disabled:opacity-50"
                    >
                      <span v-if="submitting" class="flex items-center">
                        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {{ editingSection ? 'Updating...' : 'Creating...' }}
                      </span>
                      <span v-else>{{ editingSection ? 'Update' : 'Create' }}</span>
                    </button>
                    <button
                      type="button"
                      @click="closeModal"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  PlusIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhotoIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

// Use API Composable
const api = useApi()

// Reactive data
const sections = ref([])
const loading = ref(true)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingSection = ref(null)
const submitting = ref(false)
const imagePreview = ref('')
const fileInput = ref(null)

// Placeholder image - gray square with document icon
const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23e5e7eb"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="40" fill="%239ca3af" text-anchor="middle" dy=".3em"%3E📄%3C/text%3E%3C/svg%3E'

// Form data
const form = reactive({
  title: '',
  description: '',
  image: null,
  is_active: true,
  sort_order: 0
})

// Computed stats
const stats = computed(() => ({
  total: sections.value.length,
  active: sections.value.filter(s => s.is_active).length,
  inactive: sections.value.filter(s => !s.is_active).length,
  withImages: sections.value.filter(s => s.image_url && !s.image_url.includes('placeholder')).length
}))

// Methods
const loadSections = async () => {
  loading.value = true
  try {
    const response = await api.informationSections.adminGetAll()
    
    if (response.success) {
      const data = response.data || []
      console.log('📦 Loaded sections:', data.length)
      
      const config = useRuntimeConfig()
      const apiBaseUrl = config.public.apiBaseUrl
      
      sections.value = data.map(section => {
        let imageUrl = placeholderImage
        
        if (section.image) {
          if (section.image.startsWith('http')) {
            imageUrl = section.image
          } else {
            imageUrl = `${apiBaseUrl}${section.image}`
          }
        }
        
        return {
          ...section,
          image_url: imageUrl
        }
      })
    }
  } catch (error) {
    console.error('Error loading sections:', error)
    sections.value = []
  } finally {
    loading.value = false
  }
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.image = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = async () => {
  submitting.value = true
  try {
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('is_active', form.is_active ? '1' : '0')
    // No sort_order in our model yet, but keeping for compatibility
    
    if (form.image) {
      // If image is selected, we should upload it first or send as multipart
      // Our implementation plan says InformationSectionController@store accepts image as string URL
      // So we upload it first
      const imageFormData = new FormData()
      imageFormData.append('image', form.image)
      const uploadResponse = await api.informationSections.uploadImage(imageFormData)
      
      if (uploadResponse.success) {
        formData.set('image', uploadResponse.url)
      } else {
        throw new Error(uploadResponse.error || 'Image upload failed')
      }
    } else if (editingSection.value && editingSection.value.image) {
      formData.append('image', editingSection.value.image)
    }

    // Convert FormData to object for JSON request if not using multipart for main request
    const payload = {
      title: form.title,
      description: form.description,
      is_active: form.is_active,
      image: formData.get('image')
    }

    let response
    if (editingSection.value) {
      response = await api.informationSections.update(editingSection.value.id, payload)
    } else {
      response = await api.informationSections.create(payload)
    }
    
    if (response.success) {
      closeModal()
      loadSections()
      alert(editingSection.value ? 'Section updated successfully!' : 'Section created successfully!')
    } else {
      alert(`Error: ${response.error}`)
    }
  } catch (error) {
    console.error('Error saving section:', error)
    alert(`Error: ${error.message}`)
  } finally {
    submitting.value = false
  }
}

const editSection = (section) => {
  editingSection.value = section
  form.title = section.title
  form.description = section.description
  form.is_active = !!section.is_active
  form.image = null
  imagePreview.value = section.image_url
  showEditModal.value = true
}

const toggleStatus = async (section) => {
  try {
    const payload = { ...section, is_active: !section.is_active }
    const response = await api.informationSections.update(section.id, payload)
    
    if (response.success) {
      loadSections()
    }
  } catch (error) {
    console.error('Error toggling status:', error)
  }
}

const deleteSection = async (section) => {
  if (confirm(`Are you sure you want to delete "${section.title}"?`)) {
    try {
      const response = await api.informationSections.delete(section.id)
      if (response.success) {
        loadSections()
      }
    } catch (error) {
      console.error('Error deleting section:', error)
    }
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingSection.value = null
  Object.assign(form, {
    title: '',
    description: '',
    image: null,
    is_active: true,
    sort_order: 0
  })
  imagePreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

onMounted(() => {
  loadSections()
})
</script>
