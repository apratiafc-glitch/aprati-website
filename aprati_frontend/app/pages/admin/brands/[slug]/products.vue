<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Navigation -->
    <nav class="bg-white shadow-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800">
              ← Back to Dashboard
            </NuxtLink>
            <div class="h-6 w-px bg-gray-300"></div>
            <NuxtLink to="/admin/brands" class="text-blue-600 hover:text-blue-800">
              All Brands
            </NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">
              {{ brand?.name }} Products
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              @click="loadProducts" 
              :disabled="loading || productsLoading"
              class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
            >
              <svg 
                class="w-4 h-4 mr-2" 
                :class="{ 'animate-spin': productsLoading }"
                fill="none" 
                stroke="currentColor"    
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span v-if="productsLoading">Refreshing...</span>
              <span v-else>Refresh</span>
            </button>
            <span class="text-gray-600">Welcome, Admin</span>
            <button @click="logout" class="text-red-600 hover:text-red-800">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="ml-4 text-gray-600">Loading brand and products...</p>
    </div>

    <!-- Content -->
    <div v-else-if="brand" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Brand Info Card -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div v-if="brand.logo_url" class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
              <img :src="brand.logo_url" :alt="brand.name" class="max-w-full max-h-full object-contain">
            </div>
            <div v-else class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ brand.name }}</h2>
              <p class="text-gray-600 mt-1">{{ brand.description || 'No description available' }}</p>
              <div class="flex items-center mt-2">
                <span 
                  :class="brand.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ brand.is_active ? 'Active' : 'Inactive' }}
                </span>
                <span v-if="brand.established_year" class="ml-3 text-sm text-gray-500">
                  Est. {{ brand.established_year }}
                </span>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-gray-900">{{ products.length }}</div>
            <div class="text-sm text-gray-600">Total Products</div>
          </div>
        </div>
      </div>

      <!-- Page Header -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Products Management</h3>
            <p class="text-gray-600">Manage products for {{ brand.name }}</p>
          </div>
          <button 
            @click="openCreateModal"
            class="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add New Product
          </button>
        </div>
      </div>

      <!-- Products List -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold text-gray-900">All Products</h4>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">{{ products.length }} products</span>
              <div v-if="productsLoading" class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span class="ml-2 text-sm text-gray-600">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <div v-if="productsLoading" class="p-12 text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p class="text-gray-600">Loading products...</p>
          </div>
          
          <table v-else class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="products.length === 0">
                <td colspan="6" class="px-6 py-12 text-center">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p class="text-gray-600 mb-4">Create your first product for {{ brand.name }}</p>
                    <button 
                      @click="openCreateModal"
                      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                      </svg>
                      Add First Product
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg mr-4 flex-shrink-0">
                      <img 
                        v-if="product.images && product.images.length > 0" 
                        :src="getImageUrl(product.images[0])" 
                        :alt="product.name" 
                        class="w-full h-full object-cover rounded-lg"
                      >
                      <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-500">{{ product.sku || 'No SKU' }}</div>
                      <div class="text-xs text-gray-400 mt-1">{{ product.category || 'Uncategorized' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    ${{ getDisplayPrice(product) }}
                  </div>
                  <div v-if="product.cost_price" class="text-xs text-gray-500">Cost: ${{ product.cost_price }}</div>
                  <div v-if="getOriginalVariantPrice(product)" class="text-xs text-blue-600">
                    Original: ${{ getOriginalVariantPrice(product) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product.stock_quantity || 0 }}</div>
                  <div v-if="product.min_stock_level" class="text-xs text-gray-500">Min: {{ product.min_stock_level }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ product.is_active ? 'Active' : 'Inactive' }}
                  </span>
                  <div v-if="product.is_featured" class="mt-1">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(product.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-3">
                    <button 
                      @click="editProduct(product)"
                      class="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      Edit
                    </button>
                    <button 
                      @click="deleteProduct(product)"
                      class="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Product Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto shadow-xl">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ isEditing ? 'Edit Product' : 'Add New Product' }}
            </h3>
            <button 
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="saveProduct" class="px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input 
                  v-model="productForm.name"
                  type="text" 
                  required
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product name"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                <input 
                  v-model="productForm.sku"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Product SKU"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Part Number</label>
                <input 
                  v-model="productForm.part_number"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Part number"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input 
                  v-model="productForm.category"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Product category"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                <textarea 
                  v-model="productForm.short_description"
                  rows="2"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief product description"
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  v-model="productForm.description"
                  rows="4"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed product description"
                ></textarea>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                  <input 
                    v-model.number="productForm.price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Cost Price</label>
                  <input 
                    v-model.number="productForm.cost_price"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  >
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                  <input 
                    v-model.number="productForm.stock_quantity"
                    type="number"
                    min="0"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Min Stock</label>
                  <input 
                    v-model.number="productForm.min_stock_level"
                    type="number"
                    min="0"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Max Stock</label>
                  <input 
                    v-model.number="productForm.max_stock_level"
                    type="number"
                    min="0"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input 
                  v-model.number="productForm.weight"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Product Images (URLs)</label>
                <div class="space-y-2">
                  <div v-for="(image, index) in productForm.images" :key="`image-${index}-${image || ''}`" class="flex gap-2">
                    <input 
                      v-model="productForm.images[index]"
                      type="url"
                      class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    >
                    <button 
                      type="button"
                      @click="removeImage(index)"
                      class="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  <button 
                    type="button"
                    @click="addImageField"
                    class="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Image URL
                  </button>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-center">
                  <input 
                    v-model="productForm.is_active"
                    type="checkbox" 
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label class="ml-2 block text-sm text-gray-900">Active</label>
                </div>
                
                <div class="flex items-center">
                  <input 
                    v-model="productForm.is_featured"
                    type="checkbox" 
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  >
                  <label class="ml-2 block text-sm text-gray-900">Featured Product</label>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button 
              type="button"
              @click="closeModal"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
            >
              <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ saving ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-md w-full mx-4 shadow-xl">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Delete Product</h3>
        </div>
        <div class="px-6 py-4">
          <div class="flex items-center mb-4">
            <div class="flex-shrink-0">
              <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5C3.312 17.333 4.271 19 5.81 19z"/>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-gray-600">
                Are you sure you want to delete "<strong>{{ productToDelete?.name }}</strong>"? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
          <button 
            @click="closeDeleteModal"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="confirmDelete"
            :disabled="deleting"
            class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
          >
            <svg v-if="deleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ deleting ? 'Deleting...' : 'Delete Product' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Check admin authentication
definePageMeta({
  middleware: 'admin-auth'
})

const route = useRoute()
const { brands: brandApi, products: productApi } = useApi()

// Get brand slug from route
const brandSlug = route.params.slug

// Reactive data
const brand = ref(null)
const products = ref([])
const loading = ref(true)
const productsLoading = ref(false)
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const saving = ref(false)
const deleting = ref(false)
const productToDelete = ref(null)

const productForm = ref({
  id: null,
  brand_id: null,
  name: '',
  slug: '',
  sku: '',
  part_number: '',
  description: '',
  short_description: '',
  price: null,
  cost_price: null,
  stock_quantity: 0,
  min_stock_level: 0,
  max_stock_level: 0,
  weight: null,
  category: '',
  images: [''],
  is_active: true,
  is_featured: false
})

// Load brand and products
const loadBrandAndProducts = async () => {
  try {
    loading.value = true
    
    // Load brand
    const brandResult = await brandApi.getAll()
    if (brandResult.success) {
      const brands = brandResult.data?.brands || []
      brand.value = brands.find(b => b.slug === brandSlug)
      
      if (brand.value) {
        await loadProducts()
      }
    }
  } catch (error) {
    console.error('Error loading brand:', error)
  } finally {
    loading.value = false
  }
}

const loadProducts = async () => {
  try {
    productsLoading.value = true
    
    const result = await productApi.getAll({ brand_id: brand.value.id })
    if (result.success) {
      products.value = result.data?.products || result.data?.data?.products || []
    }
  } catch (error) {
    console.error('Error loading products:', error)
    products.value = []
  } finally {
    productsLoading.value = false
  }
}

// Modal functions
const openCreateModal = () => {
  isEditing.value = false
  resetForm()
  productForm.value.brand_id = brand.value.id
  showModal.value = true
}

const editProduct = (product) => {
  isEditing.value = true
  productForm.value = { 
    ...product,
    images: product.images || ['']
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const deleteProduct = (product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  productToDelete.value = null
}

const resetForm = () => {
  productForm.value = {
    id: null,
    brand_id: null,
    name: '',
    slug: '',
    sku: '',
    part_number: '',
    description: '',
    short_description: '',
    price: null,
    cost_price: null,
    stock_quantity: 0,
    min_stock_level: 0,
    max_stock_level: 0,
    weight: null,
    category: '',
    images: [''],
    is_active: true,
    is_featured: false
  }
}

// Image management
const addImageField = () => {
  productForm.value.images.push('')
}

const removeImage = (index) => {
  productForm.value.images.splice(index, 1)
  if (productForm.value.images.length === 0) {
    productForm.value.images.push('')
  }
}

// Save product
const saveProduct = async () => {
  saving.value = true
  
  try {
    // Clean up images array
    const cleanedForm = {
      ...productForm.value,
      images: productForm.value.images.filter(img => img.trim() !== '')
    }
    
    let result
    if (isEditing.value) {
      result = await productApi.update(cleanedForm.id, cleanedForm)
    } else {
      result = await productApi.create(cleanedForm)
    }
    
    if (result.success) {
      await loadProducts()
      closeModal()
    } else {
      console.error('Error saving product:', result.error)
      alert('Error saving product: ' + result.error)
    }
  } catch (error) {
    console.error('Error saving product:', error)
    alert('Error saving product: ' + error.message)
  } finally {
    saving.value = false
  }
}

// Delete product
const confirmDelete = async () => {
  deleting.value = true
  
  try {
    const result = await productApi.delete(productToDelete.value.id)
    
    if (result.success) {
      await loadProducts()
      closeDeleteModal()
    } else {
      console.error('Error deleting product:', result.error)
      alert('Error deleting product: ' + result.error)
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    alert('Error deleting product: ' + error.message)
  } finally {
    deleting.value = false
  }
}

// Get display price - prioritize "Original" variant price
const getDisplayPrice = (product) => {
  // First, try to find "Original" variant price
  if (product.variants && product.variants.length > 0) {
    const originalVariant = product.variants.find(variant => 
      variant.name && variant.name.toLowerCase().includes('original')
    )
    if (originalVariant && originalVariant.price) {
      return originalVariant.price
    }
  }
  
  // If no "Original" variant, use main product price
  return product.price || '0.00'
}

// Get original variant price for display
const getOriginalVariantPrice = (product) => {
  if (product.variants && product.variants.length > 0) {
    const originalVariant = product.variants.find(variant => 
      variant.name && variant.name.toLowerCase().includes('original')
    )
    return originalVariant ? originalVariant.price : null
  }
  return null
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath
  // If it starts with /storage/, prepend the Laravel backend URL
  if (imagePath.startsWith('/storage/')) return `https://sdev.apratifoods.asia${imagePath}`
  // If it's a relative path, prepend the Laravel backend URL
  return `https://sdev.apratifoods.asia/${imagePath}`
}

const logout = () => {
  navigateTo('/admin-access')
}

// Watch for name changes to auto-generate slug
watch(() => productForm.value.name, (newName) => {
  if (!isEditing.value) {
    productForm.value.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }
})

// Load data on component mount
onMounted(() => {
  loadBrandAndProducts()
})

// SEO
useSeoMeta({
  title: () => brand.value ? `${brand.value.name} Products - Admin` : 'Brand Products - Admin',
  description: 'Manage products for brand'
})
</script>
