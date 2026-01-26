<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Modern Page Header -->
      <div class="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 shadow-2xl">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative px-6 sm:px-8 lg:px-10 py-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Brand Portfolio</h2>
              </div>
              <p class="text-base sm:text-lg text-white/90 font-medium">Manage your company brands and their settings</p>
            </div>
            <button 
              @click="openCreateModal"
              class="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 shadow-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>Add New Brand</span>
            </button>
          </div>
        </div>
        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Brands List -->
      <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50">
          <h3 class="text-lg font-bold text-gray-900 flex items-center">
            All Brands 
            <span class="ml-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm rounded-full font-semibold shadow-sm">{{ brands.length }}</span>
          </h3>
        </div>
        
        <div class="overflow-x-auto">
          <div v-if="loading" class="p-8 text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p class="text-gray-600">Loading brands...</p>
          </div>
          
          <ClientOnly>
            <table v-if="!loading" class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="brands.length === 0">
                <td colspan="7" class="px-6 py-8 text-center">
                  <div class="text-gray-500 mb-4">
                    <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    No brands found. Create your first brand to get started.
                  </div>
                </td>
              </tr>
              <tr v-for="brand in brands" :key="brand.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="relative">
                      <div class="w-12 h-12 rounded-lg mr-4 flex items-center justify-center overflow-hidden border border-gray-200 bg-gray-50">
                        <!-- Brand Logo Image -->
                        <img 
                          v-if="brand.logo_url" 
                          :src="brand.logo_url" 
                          :alt="brand.name + ' logo'" 
                          class="w-full h-full object-contain"
                          @error="(e) => handleImageError(e, brand)"
                        />
                        <!-- Fallback Initial -->
                        <div 
                          v-else 
                          class="w-full h-full flex items-center justify-center" 
                          :class="getBrandColor(brand.slug)"
                        >
                          <span class="text-white font-bold text-lg">
                            {{ brand.name.charAt(0) }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ brand.name }}</div>
                      <div class="text-sm text-gray-500">{{ brand.slug }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-700 max-w-xs truncate">{{ brand.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm font-semibold text-gray-900">{{ brand.products_count || 0 }}</span>
                    <span 
                      v-if="brand.products_count > 0"
                      class="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full border border-orange-200"
                    >
                      Will Delete All
                    </span>
                    <span 
                      v-else
                      class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full border border-green-200"
                    >
                      No Products
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm font-semibold text-gray-900">{{ brand.users_count || 0 }}</span>
                    <span 
                      v-if="brand.users_count > 0"
                      class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200"
                    >
                      Has Users
                    </span>
                    <span 
                      v-else
                      class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full border border-green-200"
                    >
                      No Users
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="brand.is_active ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'"
                    class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border"
                  >
                    {{ brand.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(brand.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <NuxtLink 
                    :to="`/admin/brands/${brand.slug}/products`"
                    class="text-green-600 hover:text-green-700 transition-colors inline-flex items-center"
                    :title="`Manage ${brand.products_count || 0} products`"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                    Products
                    <span v-if="brand.products_count > 0" class="ml-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                      {{ brand.products_count }}
                    </span>
                  </NuxtLink>
                  <button 
                    @click="editBrand(brand)"
                    class="text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center"
                    title="Edit brand"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Edit
                  </button>
                  <button 
                    @click="deleteBrand(brand)"
                    class="text-red-600 hover:text-red-700 transition-colors inline-flex items-center"
                    :title="brand.products_count > 0 ? `Delete brand and ${brand.products_count} products` : 'Delete brand'"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          </ClientOnly>
        </div>
      </div>
    </div>

    <!-- Create/Edit Brand Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-semibold text-gray-900">
                {{ isEditing ? 'Edit Brand' : 'Create New Brand' }}
              </h3>
              <p class="text-gray-600 mt-1">
                {{ isEditing ? 'Update brand information' : 'Add a new brand to your portfolio' }}
              </p>
            </div>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="saveBrand" class="px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Brand Name -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
              <input 
                v-model="brandForm.name"
                type="text" 
                required
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter brand name"
              >
            </div>

            <!-- Slug -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug (URL-friendly)</label>
              <input 
                v-model="brandForm.slug"
                type="text" 
                required
                readonly
                class="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
                placeholder="Auto-generated from brand name"
              >
              <p class="text-gray-500 text-xs mt-1">This field is automatically generated from the brand name</p>
            </div>

            <!-- Description -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                v-model="brandForm.description"
                rows="4"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter brand description"
              ></textarea>
            </div>

            <!-- Logo Upload -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
              <div class="flex items-center space-x-4">
                <!-- File Input -->
                <div class="flex-1">
                  <input 
                    ref="logoFileInput"
                    type="file" 
                    accept="image/*"
                    @change="handleLogoUpload"
                    class="hidden"
                  >     
                  <button
                    type="button"
                    @click="$refs.logoFileInput.click()"
                    class="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center justify-center"
                  >
                    <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <span class="text-sm font-medium">Click to upload logo</span>
                    <span class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</span>
                  </button>
                </div>
                
                <!-- Logo Preview -->
                <ClientOnly>
                  <div v-if="logoPreview || brandForm.logo" class="w-24 h-24 flex-shrink-0">
                    <div class="w-full h-full bg-gray-100 rounded-lg p-2 flex items-center justify-center overflow-hidden border border-gray-300">
                      <img 
                        :src="logoPreview || brandForm.logo" 
                        :alt="brandForm.name || 'Logo preview'" 
                        class="max-w-full max-h-full object-contain"
                        @error="handleLogoPreviewError"
                      />
                    </div>
                    <button
                      type="button"
                      @click="removeLogo"
                      class="mt-2 w-full text-xs text-red-600 hover:text-red-700 transition-colors"
                    >
                      Remove Logo
                    </button>
                  </div>
                </ClientOnly>
              </div>
            </div>

            <!-- Cover Image Upload -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              <div class="flex items-center space-x-4">
                <!-- File Input -->
                <div class="flex-1">
                  <input 
                    ref="coverFileInput"
                    type="file" 
                    accept="image/*"
                    @change="handleCoverUpload"
                    class="hidden"
                  >     
                  <button
                    type="button"
                    @click="$refs.coverFileInput.click()"
                    class="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center justify-center"
                  >
                    <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span class="text-sm font-medium">Click to upload cover image</span>
                    <span class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB. <span class="font-bold text-blue-500">Recommended size: 800x500px</span></span>
                  </button>
                </div>
                
                <!-- Cover Preview -->
                <ClientOnly>
                  <div v-if="coverPreview || brandForm.cover_image" class="w-32 h-20 flex-shrink-0">
                    <div class="w-full h-full bg-gray-100 rounded-lg p-2 flex items-center justify-center overflow-hidden border border-gray-300">
                      <img 
                        :src="coverPreview || brandForm.cover_image" 
                        :alt="brandForm.name || 'Cover preview'" 
                        class="w-full h-full object-cover rounded"
                        @error="handleCoverPreviewError"
                      >
                    </div>
                    <button 
                      type="button"
                      class="mt-2 w-full text-xs text-red-600 hover:text-red-700 flex items-center justify-center transition-colors"
                      @click="removeCover"
                    >
                      Remove Cover
                    </button>
                  </div>
                </ClientOnly>
              </div>
            </div>

            <!-- Established Year -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
              <input 
                v-model.number="brandForm.established_year"
                type="number" 
                min="1900"
                :max="new Date().getFullYear()"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter established year"
              >
            </div>

            <!-- Sort Order -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
              <input 
                v-model.number="brandForm.sort_order"
                type="number" 
                min="0"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter sort order"
              >
            </div>

            <!-- Active Status -->
            <div class="md:col-span-2">
              <div class="flex items-center p-4 rounded-lg bg-gray-50 border border-gray-200">
                <input 
                  v-model="brandForm.is_active"
                  type="checkbox" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <div class="ml-3">
                  <label class="text-gray-900 font-medium">Active Status</label>
                  <p class="text-gray-600 text-sm">Enable this brand for public visibility</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button 
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ saving ? 'Saving...' : (isEditing ? 'Update Brand' : 'Create Brand') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full">
        <div class="p-6">
          <!-- Warning Icon -->
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          
          <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">Delete Brand</h3>
          
          <!-- User Assignment Warning -->
          <div v-if="brandToDelete?.users_count > 0" class="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-center space-x-2 text-yellow-800 mb-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <span class="font-medium">Users Assigned Warning</span>
            </div>
            <p class="text-yellow-700 text-sm mb-2">
              This brand has <strong>{{ brandToDelete.users_count }} assigned user(s)</strong>. 
              Deleting the brand will not affect the users, but they will lose their brand assignment.
            </p>
          </div>
          
          <!-- Products Warning -->
          <div v-if="brandToDelete?.products_count > 0" class="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div class="flex items-center space-x-2 text-orange-800 mb-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <span class="font-medium">Cascade Deletion Warning</span>
            </div>
            <p class="text-orange-700 text-sm">
              Deleting this brand will <strong>permanently delete all {{ brandToDelete.products_count }} product(s)</strong> belonging to this brand.
            </p>
          </div>
          
          <p class="text-gray-600 mb-6 text-center">
            Are you sure you want to delete <span class="font-medium text-gray-900">"{{ brandToDelete?.name }}"</span>?
            <span v-if="brandToDelete?.products_count > 0 || brandToDelete?.users_count > 0">
              This action cannot be undone.
            </span>
          </p>
          
          <div class="flex justify-center space-x-3">
            <button 
              @click="closeDeleteModal"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <button 
              @click="confirmDelete"
              :disabled="deleting"
              class="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ deleting ? 'Deleting...' : getDeleteButtonText() }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Notification Component -->
  <div v-if="notification.show" class="fixed top-4 right-4 z-50 max-w-md">
    <div 
      class="rounded-xl shadow-2xl border overflow-hidden transform transition-all duration-300 animate-in slide-in-from-right"
      :class="{
        'bg-emerald-50 border-emerald-200': notification.type === 'success',
        'bg-red-50 border-red-200': notification.type === 'error',
        'bg-amber-50 border-amber-200': notification.type === 'warning',
        'bg-blue-50 border-blue-200': notification.type === 'info'
      }"
    >
      <div class="p-4">
        <div class="flex items-start">
          <!-- Icon -->
          <div class="flex-shrink-0">
            <!-- Success Icon -->
            <svg v-if="notification.type === 'success'" class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <!-- Error Icon -->
            <svg v-else-if="notification.type === 'error'" class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <!-- Warning Icon -->
            <svg v-else-if="notification.type === 'warning'" class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <!-- Info Icon -->
            <svg v-else class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          
          <!-- Content -->
          <div class="ml-3 flex-1">
            <p 
              class="text-sm font-medium leading-5"
              :class="{
                'text-emerald-800': notification.type === 'success',
                'text-red-800': notification.type === 'error',
                'text-amber-800': notification.type === 'warning',
                'text-blue-800': notification.type === 'info'
              }"
            >
              {{ notification.message }}
            </p>
          </div>
          
          <!-- Close Button -->
          <div class="ml-4 flex-shrink-0">
            <button
              @click="hideNotification"
              class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              :class="{
                'text-emerald-400 hover:text-emerald-500 focus:ring-emerald-500': notification.type === 'success',
                'text-red-400 hover:text-red-500 focus:ring-red-500': notification.type === 'error',
                'text-amber-400 hover:text-amber-500 focus:ring-amber-500': notification.type === 'warning',
                'text-blue-400 hover:text-blue-500 focus:ring-blue-500': notification.type === 'info'
              }"
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
// Check admin authentication
definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

useSeoMeta({
  title: 'Brand Management - Admin Dashboard',
  description: 'Manage brands for Aprati Food Company'
})

// Helper to get auth token
const getAuthToken = () => {
  if (process.server) return null
  return useCookie('auth-token').value
}

// Reactive data
const { brands: brandApi } = useApi()
const brands = ref([])
const loading = ref(true)
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const deleting = ref(false)
const brandToDelete = ref(null)

// Notification system
const notification = ref({
  show: false,
  type: 'success', // 'success', 'error', 'warning', 'info'
  message: '',
  timeout: null
})

const brandForm = ref({
  id: null,
  name: '',
  slug: '',
  description: '',
  logo: '',
  logoFile: null,
  cover_image: '',
  coverFile: null,
  is_active: true,
  sort_order: 0,
  established_year: 2024 // Use static year to avoid hydration mismatch
})

// Logo preview
const logoPreview = ref(null)
// Cover image preview
const coverPreview = ref(null)

// Methods
const openCreateModal = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const editBrand = (brand) => {
  isEditing.value = true
  brandForm.value = { ...brand }
  
  // Set logo preview if brand has existing logo - use logo_url for preview
  if (brand.logo_url) {
    logoPreview.value = brand.logo_url
  } else {
    logoPreview.value = null
  }
  
  // Set cover image preview if brand has existing cover image
  if (brand.cover_image_url) {
    coverPreview.value = brand.cover_image_url
  } else {
    coverPreview.value = null
  }
  
  showModal.value = true
}

const deleteBrand = (brand) => {
  brandToDelete.value = brand
  showDeleteModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  brandToDelete.value = null
}

const resetForm = () => {
  brandForm.value = {
    id: null,
    name: '',
    slug: '',
    description: '',
    logo: '',
    logoFile: null,
    cover_image: '',
    coverFile: null,
    is_active: true,
    sort_order: 0,
    established_year: new Date().getFullYear()
  }
  logoPreview.value = null
  coverPreview.value = null
}

// Handle logo file upload
const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification('error', 'Please select an image file (JPEG, PNG, GIF, etc.)')
      return
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('error', 'Logo file size must be less than 5MB')
      return
    }
    
    brandForm.value.logoFile = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      logoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Remove logo
const removeLogo = () => {
  brandForm.value.logo = ''
  brandForm.value.logoFile = null
  logoPreview.value = null
  
  // Clear file input
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) {
    fileInput.value = ''
  }
}

// Handle cover image upload
const handleCoverUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', 'Cover image file size must be less than 10MB')
      return
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification('error', 'Please select an image file (JPEG, PNG, GIF, etc.)')
      return
    }
    
    brandForm.value.coverFile = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      coverPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Remove cover image
const removeCover = () => {
  brandForm.value.cover_image = ''
  brandForm.value.coverFile = null
  coverPreview.value = null
  
  // Clear file input
  const coverFileInput = document.querySelector('input[ref="coverFileInput"]')
  if (coverFileInput) {
    coverFileInput.value = ''
  }
}

// Handle cover preview error
const handleCoverPreviewError = (event) => {
  // Only run on client side to avoid hydration issues
  if (process.server) return
  console.warn('Cover image failed to load')
  event.target.style.display = 'none'
}

const saveBrand = async () => {
  saving.value = true
  
  try {
    let result
    
    // Prepare form data for file upload
    const formData = new FormData()
    formData.append('name', brandForm.value.name)
    formData.append('slug', brandForm.value.slug)
    formData.append('description', brandForm.value.description || '')
    formData.append('is_active', brandForm.value.is_active ? '1' : '0')
    formData.append('sort_order', brandForm.value.sort_order || '0')
    formData.append('established_year', brandForm.value.established_year || '')
    
    // Add logo file if selected
    if (brandForm.value.logoFile) {
      formData.append('logo', brandForm.value.logoFile)
    }
    
    // Add cover image file if selected
    if (brandForm.value.coverFile) {
      formData.append('cover_image', brandForm.value.coverFile)
    }
    
    if (isEditing.value) {
      // Update existing brand
      formData.append('_method', 'PUT') // Laravel method spoofing for file uploads
      result = await brandApi.updateWithFile(brandForm.value.id, formData)
    } else {
      // Create new brand
      result = await brandApi.createWithFile(formData)
    }
    
    if (result.success) {
      console.log(isEditing.value ? 'Brand updated:' : 'Brand created:', result.data)
      
      // Show success notification
      const action = isEditing.value ? 'updated' : 'created'
      showNotification('success', `Brand "${brandForm.value.name}" has been ${action} successfully.`)
      
      await loadBrands() // Reload brands list
      closeModal()
    } else {
      console.error('Error saving brand:', result.error)
      console.error('Validation errors:', result.errors)
      
      // Show detailed error message
      let errorMessage = result.error || 'Unknown error occurred'
      if (result.errors && Object.keys(result.errors).length > 0) {
        const firstError = Object.values(result.errors)[0]
        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError
      }
      
      showNotification('error', `Error saving brand: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Error saving brand:', error)
    showNotification('error', `Error saving brand: ${error.message || 'Unknown error occurred'}`)
  } finally {
    saving.value = false
  }
}

const confirmDelete = async () => {
  deleting.value = true
  
  try {
    // Check authentication before making the request
    if (!checkAuth()) {
      return
    }
    
    const result = await brandApi.delete(brandToDelete.value.id)
    
    if (result.success) {
      console.log('Brand deleted:', brandToDelete.value)
      
      // Show success message with product count if applicable
      const productCount = brandToDelete.value?.products_count || 0
      if (productCount > 0) {
        showNotification('success', `Brand "${brandToDelete.value.name}" and all ${productCount} products have been deleted successfully.`)
      } else {
        showNotification('success', `Brand "${brandToDelete.value.name}" has been deleted successfully.`)
      }
      
      await loadBrands() // Reload brands list
      closeDeleteModal()
    } else {
      console.error('Error deleting brand:', result.error)
      
      // Handle specific error messages
      if (result.error && result.error.includes('Cannot delete brand with existing products')) {
        // This shouldn't happen anymore with cascade deletion, but keep for safety
        showNotification('error', `Cannot delete "${brandToDelete.value.name}" because it has ${brandToDelete.value.products_count || 'existing'} products. Please remove all products from this brand first, then try again.`)
      } else if (result.error && result.error.includes('assigned users')) {
        showNotification('error', `Cannot delete "${brandToDelete.value.name}" because it has assigned users. Please reassign users first, then try again.`)
      } else if (result.error && (result.error.includes('401') || result.error.includes('Unauthorized'))) {
        showNotification('error', 'Session expired. Please login again.')
        logout()
      } else {
        showNotification('error', `Error deleting brand: ${result.error || 'Unknown error occurred'}`)
      }
    }
  } catch (error) {
    console.error('Error deleting brand:', error)
    
    // Handle different types of errors
    if (error.message && error.message.includes('Cannot delete brand with existing products')) {
      showNotification('error', `Cannot delete "${brandToDelete.value.name}" because it has existing products. Please remove all products from this brand first, then try again.`)
    } else if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
      showNotification('error', 'Session expired. Please login again.')
      logout()
    } else {
      showNotification('error', `Error deleting brand: ${error.message || 'Unknown error occurred'}`)
    }
  } finally {
    deleting.value = false
  }
}

// Notification system function
const showNotification = (type, message) => {
  // Clear any existing timeout
  if (notification.value.timeout) {
    clearTimeout(notification.value.timeout)
  }
  
  // Set notification
  notification.value = {
    show: true,
    type: type,
    message: message,
    timeout: null
  }
  
  // Auto-hide after 5 seconds
  notification.value.timeout = setTimeout(() => {
    notification.value.show = false
  }, 5000)
}

const hideNotification = () => {
  if (notification.value.timeout) {
    clearTimeout(notification.value.timeout)
  }
  notification.value.show = false
}

const loadBrands = async () => {
  if (process.server) return
  const token = getAuthToken()
  if (!token) {
    console.warn('No auth token found')
    return
  }
  loading.value = true
  try {
    const result = await brandApi.getAll()
    console.log('Admin brands API result:', result)
    
    if (result.success) {
      // Check for different response structures
      if (result.data?.brands) {
        brands.value = result.data.brands
      } else if (Array.isArray(result.data)) {
        brands.value = result.data
      } else {
        brands.value = []
      }
      console.log('Admin loaded brands:', brands.value)
    } else {
      console.error('Error loading brands:', result.error)
      brands.value = []
    }
  } catch (error) {
    console.error('Error loading brands:', error)
    brands.value = []
  } finally {
    loading.value = false
  }
}

const logout = () => {
  const { utils } = useApi()
  utils.clearAuth()
  navigateTo('/login')
}

// Authentication check
const checkAuth = () => {
  const { utils } = useApi()
  
  // TEMPORARY: For testing, set real auth data
  if (!utils.isAuthenticated()) {
    console.log('Setting real auth data for testing...')
    const authToken = useCookie('auth-token')
    const authUser = useCookie('auth-user')
    authToken.value = '2|NnPgIJ7XU8SRSAAbXzSUJVJPFyHWT01680tvhpTba5551d26'
    authUser.value = { id: 1, name: 'Admin User', role: 'admin' }
  }
  
  if (!utils.isAuthenticated()) {
    console.log('User not authenticated, redirecting to login')
    navigateTo('/login')
    return false
  }
  
  if (!utils.isAdmin()) {
    console.log('User is not admin, redirecting to login')
    navigateTo('/login')
    return false
  }
  
  return true
}

// Handle logo preview errors in the admin form
const handleLogoPreviewError = (event) => {
  // Only run on client side to avoid hydration issues
  if (process.server) return
  console.warn('Logo preview failed to load')
  event.target.style.display = 'none'
}

// Handle brand image errors in the table
const handleImageError = (event, brand) => {
  // Only run on client side to avoid hydration issues
  if (process.server) return
  console.warn(`Brand image failed to load for ${brand.name}, will show fallback`)
  
  // Hide the broken image
  event.target.style.display = 'none'
  
  // Create and show fallback initial
  const container = event.target.parentElement
  if (container && !container.querySelector('.fallback-initial')) {
    const fallback = document.createElement('div')
    fallback.setAttribute('class', `fallback-initial w-full h-full flex items-center justify-center ${getBrandColor(brand.slug)}`)
    fallback.innerHTML = `<span class="text-white font-bold text-lg">${brand.name.charAt(0)}</span>`
    container.appendChild(fallback)
  }
}

const getBrandColor = (slug) => {
  const colors = {
    'aprati': 'bg-blue-500',
    'frutati': 'bg-green-500',
    'mocati': 'bg-orange-500'
  }
  return colors[slug] || 'bg-gray-500'
}

const getDeleteButtonText = () => {
  if (!brandToDelete.value) return 'Delete Brand'
  
  const userCount = brandToDelete.value.users_count || 0
  const productCount = brandToDelete.value.products_count || 0
  
  if (userCount > 0 && productCount > 0) {
    return `Delete Brand + ${userCount} User(s) + ${productCount} Product(s)`
  } else if (userCount > 0) {
    return `Delete Brand + ${userCount} User(s)`
  } else if (productCount > 0) {
    return `Delete Brand + ${productCount} Product(s)`
  } else {
    return 'Delete Brand'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Watch for name changes to auto-generate slug
watch(() => brandForm.value.name, (newName) => {
  if (!isEditing.value) {
    brandForm.value.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
})

// Load brands on component mount
onMounted(() => {
  if (process.server) return
  // Check authentication first
  if (checkAuth()) {
    loadBrands()
  }
})
</script>
