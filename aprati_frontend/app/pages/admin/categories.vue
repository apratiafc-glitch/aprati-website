<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800">
              ← Back to Dashboard
            </NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">Category Management</h1>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin/products" class="text-gray-600 hover:text-gray-800">
              Products
            </NuxtLink>
            <button 
              @click="loadCategories" 
              :disabled="loading"
              class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
            >
              <svg 
                class="w-4 h-4 mr-2" 
                :class="{ 'animate-spin': loading }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span v-if="loading">Loading...</span>
              <span v-else>Refresh</span>
            </button>
            <span class="text-gray-600">Welcome, Admin</span>
            <button @click="logout" class="text-red-600 hover:text-red-800">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Category Management</h2>
            <p class="text-gray-600">Organize your products with custom categories</p>
          </div>
          <button 
            @click="openCreateModal"
            class="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add New Category
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Categories</p>
              <p class="text-2xl font-semibold text-gray-900">
                <span v-if="loading" class="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block"></span>
                <span v-else>{{ stats.total_categories || 0 }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Active Categories</p>
              <p class="text-2xl font-semibold text-gray-900">
                <span v-if="loading" class="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block"></span>
                <span v-else>{{ stats.active_categories || 0 }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Products Using Categories</p>
              <p class="text-2xl font-semibold text-gray-900">
                <span v-if="loading" class="animate-pulse bg-gray-200 rounded w-8 h-8 inline-block"></span>
                <span v-else>{{ stats.products_with_categories || 0 }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Search Categories</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by name or description..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @input="debouncedSearch"
            />
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Category Type</label>
            <select
              v-model="filters.type"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="loadCategories"
            >
              <option value="">All Types</option>
              <option value="main">Main Category</option>
              <option value="sub">Subcategory</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Status</label>
            <select
              v-model="filters.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="loadCategories"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800 flex items-center">
            Categories
            <span class="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{{ categories.length || 0 }}</span>
          </h3>
        </div>
        
        <div v-if="loading" class="p-8 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading categories...</p>
        </div>
        
        <!-- Categories Grid View -->
        <div v-else-if="categories.length > 0" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="category in categories" 
              :key="category.id" 
              class="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
            >
              <!-- Category Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <div 
                      class="w-3 h-3 rounded-full mr-2"
                      :style="{ backgroundColor: category.color || '#3B82F6' }"
                    ></div>
                    <h4 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {{ category.name }}
                    </h4>
                  </div>
                  <p v-if="category.description" class="text-sm text-gray-600 leading-relaxed mb-3">
                    {{ truncateText(category.description, 80) }}
                  </p>
                </div>
                
                <!-- Actions Dropdown -->
                <div class="relative">
                  <button
                    @click="toggleDropdown(category.id)"
                    class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                    </svg>
                  </button>
                  
                  <!-- Dropdown Menu -->
                  <div 
                    v-if="activeDropdown === category.id"
                    class="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]"
                  >
                    <button
                      @click="editCategory(category)"
                      class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      @click="confirmDelete(category)"
                      class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <!-- Category Stats -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Products:</span>
                  <span class="font-medium text-gray-900">{{ category.products_count || 0 }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">Type:</span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        :class="category.parent_id ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'">
                    {{ category.parent_id ? 'Subcategory' : 'Main Category' }}
                  </span>
                </div>
              </div>

              <!-- Status and Parent -->
              <div class="flex items-center justify-between">
                <span 
                  :class="category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  class="px-2 py-1 text-xs rounded-full font-medium"
                >
                  {{ category.is_active ? 'Active' : 'Inactive' }}
                </span>
                
                <div v-if="category.parent" class="text-xs text-gray-500">
                  Parent: {{ category.parent.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="p-16 text-center">
          <div class="bg-gray-100 rounded-2xl p-12 max-w-md mx-auto">
            <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">No categories yet</h3>
            <p class="text-gray-600 mb-4">Create your first category to organize your products.</p>
            <button 
              @click="openCreateModal"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-2xl font-semibold text-gray-900">
            {{ isEditing ? 'Edit Category' : 'Create New Category' }}
          </h3>
        </div>
        
        <form @submit.prevent="saveCategory" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Category Name *</label>
                <input
                  v-model="categoryForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Description</label>
                <textarea
                  v-model="categoryForm.description"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief category description"
                ></textarea>
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Parent Category</label>
                <select
                  v-model="categoryForm.parent_id"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">None (Main Category)</option>
                  <option 
                    v-for="category in mainCategories" 
                    :key="category.id" 
                    :value="category.id"
                    :disabled="isEditing && category.id === categoryForm.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Category Settings -->
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Category Color</label>
                <div class="flex items-center space-x-3">
                  <input
                    v-model="categoryForm.color"
                    type="color"
                    class="w-12 h-10 border border-gray-300 rounded-md"
                  />
                  <input
                    v-model="categoryForm.color"
                    type="text"
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Display Order</label>
                <input
                  v-model.number="categoryForm.sort_order"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div class="space-y-3">
                <div class="flex items-center">
                  <input
                    v-model="categoryForm.is_active"
                    type="checkbox"
                    id="is_active"
                    class="w-4 h-4 text-green-400 bg-white border-gray-300 rounded focus:ring-green-400 focus:ring-2"
                  />
                  <label for="is_active" class="ml-2 text-sm text-gray-700">Active Category</label>
                </div>
                <div class="flex items-center">
                  <input
                    v-model="categoryForm.is_featured"
                    type="checkbox"
                    id="is_featured"
                    class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label for="is_featured" class="ml-2 text-sm text-gray-700">Featured Category</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="saving">{{ isEditing ? 'Updating...' : 'Creating...' }}</span>
              <span v-else>{{ isEditing ? 'Update Category' : 'Create Category' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg border w-full max-w-md shadow-xl">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Delete Category</h3>
              <p class="text-gray-600">This action cannot be undone</p>
            </div>
          </div>
          
          <p class="text-gray-800 mb-6">
            Are you sure you want to delete "<strong>{{ categoryToDelete?.name }}</strong>"? 
            <span v-if="categoryToDelete?.products_count > 0" class="text-red-600">
              This category has {{ categoryToDelete.products_count }} product(s) associated with it.
            </span>
          </p>
          
          <div class="flex justify-end space-x-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteCategory"
              :disabled="deleting"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="deleting">Deleting...</span>
              <span v-else">Delete Category</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div
      v-if="notification.show"
      class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl transition-all duration-300 transform"
      :class="{
        'translate-x-0 opacity-100': notification.show,
        'translate-x-full opacity-0': !notification.show
      }"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Success Icon -->
            <svg v-if="notification.type === 'success'" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <!-- Error Icon -->
            <svg v-else-if="notification.type === 'error'" class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <!-- Warning Icon -->
            <svg v-else-if="notification.type === 'warning'" class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <!-- Info Icon -->
            <svg v-else class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1">
            <p 
              class="text-sm font-medium"
              :class="{
                'text-green-800': notification.type === 'success',
                'text-red-800': notification.type === 'error',
                'text-yellow-800': notification.type === 'warning',
                'text-blue-800': notification.type === 'info'
              }"
            >
              {{ notification.message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="hideNotification"
              class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { debounce } from 'lodash-es'

// Define layout
definePageMeta({
  layout: 'admin'
})

// Reactive data
const loading = ref(true)
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const deleting = ref(false)
const categoryToDelete = ref(null)
const activeDropdown = ref(null)

// Notification system
const notification = ref({
  show: false,
  type: 'success',
  message: '',
  timeout: null
})

const categories = ref([])
const stats = ref({})

const filters = ref({
  search: '',
  type: '',
  status: ''
})

const categoryForm = ref({
  id: null,
  name: '',
  slug: '',
  description: '',
  parent_id: '',
  color: '#3B82F6',
  sort_order: 0,
  is_active: true,
  is_featured: false
})

// Computed properties
const mainCategories = computed(() => {
  return categories.value.filter(cat => !cat.parent_id)
})

// Notification methods
const showNotification = (type, message) => {
  if (notification.value.timeout) {
    clearTimeout(notification.value.timeout)
  }
  
  notification.value = {
    show: true,
    type: type,
    message: message,
    timeout: null
  }
  
  notification.value.timeout = setTimeout(() => {
    hideNotification()
  }, 5000)
}

const hideNotification = () => {
  notification.value.show = false
  if (notification.value.timeout) {
    clearTimeout(notification.value.timeout)
    notification.value.timeout = null
  }
}

// Modal methods
const openCreateModal = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const editCategory = (category) => {
  isEditing.value = true
  categoryForm.value = {
    id: category.id,
    name: category.name || '',
    slug: category.slug || '',
    description: category.description || '',
    parent_id: category.parent_id || '',
    color: category.color || '#3B82F6',
    sort_order: category.sort_order || 0,
    is_active: category.is_active || false,
    is_featured: category.is_featured || false
  }
  showModal.value = true
  activeDropdown.value = null
}

const resetForm = () => {
  categoryForm.value = {
    id: null,
    name: '',
    slug: '',
    description: '',
    parent_id: '',
    color: '#3B82F6',
    sort_order: 0,
    is_active: true,
    is_featured: false
  }
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const toggleDropdown = (categoryId) => {
  activeDropdown.value = activeDropdown.value === categoryId ? null : categoryId
}

// CRUD operations
const saveCategory = async () => {
  saving.value = true
  
  try {
    const api = useApi()
    const url = isEditing.value 
      ? `/api/admin/categories/${categoryForm.value.id}`
      : '/api/admin/categories'
    
    const data = { ...categoryForm.value }
    
    // Convert boolean values
    data.is_active = data.is_active ? 1 : 0
    data.is_featured = data.is_featured ? 1 : 0
    
    // Remove empty parent_id
    if (!data.parent_id) {
      data.parent_id = null
    }
    
    const response = await api.request(url, {
      method: isEditing.value ? 'PUT' : 'POST',
      body: data
    })
    
    if (response.success) {
      await loadCategories()
      await loadStats()
      closeModal()
      showNotification('success', `Category "${categoryForm.value.name}" has been ${isEditing.value ? 'updated' : 'created'} successfully.`)
    } else {
      console.error('API Error:', response.error)
      if (response.errors) {
        const errorMessages = Object.values(response.errors).flat()
        showNotification('error', `Validation failed: ${errorMessages.join(', ')}`)
      } else {
        showNotification('error', `Failed to ${isEditing.value ? 'update' : 'create'} category: ${response.error || 'Unknown error'}`)
      }
    }
  } catch (error) {
    console.error('Failed to save category:', error)
    showNotification('error', `Failed to ${isEditing.value ? 'update' : 'create'} category: ${error.message}`)
  } finally {
    saving.value = false
  }
}

const confirmDelete = (category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
  activeDropdown.value = null
}

const deleteCategory = async () => {
  if (!categoryToDelete.value) return
  
  deleting.value = true
  
  try {
    const api = useApi()
    const response = await api.request(`/api/admin/categories/${categoryToDelete.value.id}`, {
      method: 'DELETE'
    })
    
    if (response.success) {
      const deletedCategoryName = categoryToDelete.value.name
      await loadCategories()
      await loadStats()
      showDeleteModal.value = false
      categoryToDelete.value = null
      showNotification('success', `Category "${deletedCategoryName}" has been deleted successfully.`)
    } else {
      console.error('Failed to delete category:', response.error)
      if (response.error && response.error.includes('constraint')) {
        showNotification('error', `Cannot delete "${categoryToDelete.value?.name}" because it has products or subcategories. Please reassign them first.`)
      } else {
        // Show the actual error message from the server
        const errorMessage = response.error || response.message || 'Unknown error occurred'
        showNotification('error', `Failed to delete category: ${errorMessage}`)
      }
    }
  } catch (error) {
    console.error('Failed to delete category:', error)
    
    // Try to extract more specific error information
    let errorMessage = 'Unknown error occurred'
    
    if (error.response && error.response.data) {
      // If it's an HTTP error with response data
      errorMessage = error.response.data.error || error.response.data.message || errorMessage
    } else if (error.data) {
      // If it's a structured error
      errorMessage = error.data.error || error.data.message || errorMessage
    } else if (error.message) {
      // If it's a regular error with message
      errorMessage = error.message
    }
    
    showNotification('error', `Failed to delete category: ${errorMessage}`)
  } finally {
    deleting.value = false
  }
}

// Data loading
const loadCategories = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  loading.value = true
  
  try {
    const api = useApi()
    const params = new URLSearchParams()
    
    Object.keys(filters.value).forEach(key => {
      if (filters.value[key] !== '' && filters.value[key] !== null) {
        params.append(key, filters.value[key])
      }
    })
    
    const response = await api.request(`/api/admin/categories?${params.toString()}`)
    
    if (response.success && response.data) {
      categories.value = response.data.categories || []
    } else {
      console.error('API Error:', response.error)
      categories.value = []
    }
  } catch (error) {
    console.error('Failed to load categories:', error)
    categories.value = []
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    const api = useApi()
    const response = await api.request('/admin/categories/statistics')
    
    if (response.success && response.data) {
      stats.value = response.data || {}
    } else {
      console.error('Failed to load stats:', response.error)
      stats.value = {}
    }
  } catch (error) {
    console.error('Failed to load stats:', error)
    stats.value = {}
  }
}

const debouncedSearch = debounce(() => {
  loadCategories()
}, 500)

// Utility functions
const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const logout = async () => {
  try {
    const api = useApi()
    await api.auth.logout()
    api.utils.clearAuth()
    await navigateTo('/admin-access')
  } catch (error) {
    console.error('Logout failed:', error)
    await navigateTo('/admin-access')
  }
}

// Click outside to close dropdown
onMounted(() => {
  if (process.server) return
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.relative')) {
      activeDropdown.value = null
    }
  })
  
  // Load initial data
  Promise.all([
    loadCategories(),
    loadStats()
  ])
})

onUnmounted(() => {
  document.removeEventListener('click', () => {})
})
</script>

<style scoped>
/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
