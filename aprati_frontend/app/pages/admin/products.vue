<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Modern Page Header -->
      <div class="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-500 shadow-2xl">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative px-6 sm:px-8 lg:px-10 py-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Product Catalog</h2>
              </div>
              <p class="text-base sm:text-lg text-white/90 font-medium">Manage and organize your products</p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
            <!-- Categories Dropdown -->
            <div class="relative group">
              <button class="flex items-center px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors duration-200">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
                Categories
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="p-4">
                  <div class="flex justify-between items-center mb-3">
                    <h3 class="text-lg font-semibold text-gray-900">Categories</h3>
                    <button
                      @click="openCreateCategoryModal"
                      class="text-sm bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      + Add New
                    </button>
                  </div>
                  
                  <div class="max-h-64 overflow-y-auto space-y-2">
                    <div v-if="managedCategories.length === 0" class="text-gray-500 text-sm text-center py-4">
                      No categories yet. Create your first category.
                    </div>
                    
                    <div v-for="category in managedCategories" :key="category.id" class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                      <div class="flex items-center flex-1">
                        <div 
                          class="w-3 h-3 rounded-full mr-3"
                          :style="{ backgroundColor: category.color || '#6B7280' }"
                        ></div>
                        <div class="flex-1">
                          <div class="text-sm font-medium text-gray-900">
                            {{ category.parent ? `${category.parent.name} → ` : '' }}{{ category.name }}
                          </div>
                          <div v-if="category.description" class="text-xs text-gray-500">
                            {{ truncateText(category.description, 40) }}
                          </div>
                        </div>
                      </div>
                      
                      <div class="flex items-center space-x-1">
                        <button
                          @click="editCategory(category)"
                          class="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Edit Category"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                          </svg>
                        </button>
                        <button
                          @click="confirmDeleteCategory(category)"
                          class="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete Category"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <button 
                @click="loadProducts" 
                :disabled="loading"
                class="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 backdrop-blur-sm text-white disabled:text-white/50 rounded-xl transition-all duration-200 border border-white/30 shadow-lg font-semibold"
              >
                <svg 
                  class="w-5 h-5" 
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
              <button 
                @click="openCreateModal"
                class="flex items-center gap-2 px-6 py-3 bg-white text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-200 shadow-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>
        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Modern Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full">Total</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Products</p>
          <p class="text-3xl font-bold text-gray-900">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-16 h-9"></span>
            <span v-else>{{ stats.total_products || 0 }}</span>
          </p>
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
          <p class="text-sm font-medium text-gray-500 mb-1">Active Products</p>
          <p class="text-3xl font-bold text-gray-900">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-16 h-9"></span>
            <span v-else>{{ stats.active_products || 0 }}</span>
          </p>
        </div>

        

      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Search Products</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by name, SKU, part number..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @input="debouncedSearch"
            />
          </div>
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Brand</label>
            <select
              v-model="filters.brand_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="loadProducts"
            >
              <option value="">All Brands</option>
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
            </select>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-gray-700 text-sm font-medium">Category</label>
              <div class="flex items-center space-x-2">
                <button
                  @click="openCreateCategoryModal"
                  class="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                  title="Create New Category"
                >
                  + Add
                </button>
                <button
                  @click="showCategoryManagement = !showCategoryManagement"
                  class="text-xs text-purple-600 hover:text-purple-800 font-medium px-2 py-1 bg-purple-50 hover:bg-purple-100 rounded transition-colors"
                  title="Manage Categories"
                >
                  <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Manage
                </button>
              </div>
            </div>
            <select
              v-model="filters.category_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="loadProducts"
            >
              <option value="">All Categories</option>
              <option v-for="category in managedCategories" :key="category.id" :value="category.id">
                {{ category.parent ? `${category.parent.name} → ` : '' }}{{ category.name }}
              </option>
            </select>
            
            <!-- Quick Category Management Panel -->
            <div v-if="showCategoryManagement" class="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div class="flex justify-between items-center mb-3">
                <h4 class="text-sm font-semibold text-gray-900">Quick Category Management</h4>
                <button
                  @click="showCategoryManagement = false"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              <div class="max-h-48 overflow-y-auto space-y-2">
                <div v-if="managedCategories.length === 0" class="text-gray-500 text-xs text-center py-4">
                  No categories yet. Create your first category.
                </div>
                
                <div 
                  v-for="category in managedCategories" 
                  :key="category.id" 
                  class="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center flex-1 min-w-0">
                    <div 
                      class="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                      :style="{ backgroundColor: category.color || '#6B7280' }"
                    ></div>
                    <div class="flex-1 min-w-0">
                      <div class="text-xs font-medium text-gray-900 truncate">
                        {{ category.parent ? `${category.parent.name} → ` : '' }}{{ category.name }}
                      </div>
                      <div v-if="category.description" class="text-xs text-gray-500 truncate">
                        {{ truncateText(category.description, 30) }}
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-1 ml-2">
                    <button
                      @click="editCategory(category)"
                      class="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      title="Edit Category"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="confirmDeleteCategory(category)"
                      class="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      title="Delete Category"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="mt-3 pt-2 border-t border-gray-200">
                <button
                  @click="openCreateCategoryModal"
                  class="w-full text-xs text-blue-600 hover:text-blue-800 font-medium py-2 border border-blue-200 hover:bg-blue-50 rounded transition-colors"
                >
                  + Create New Category
                </button>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Status</label>
            <select
              v-model="filters.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="loadProducts"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="featured">Featured</option>
              <option value="low_stock">Low Stock</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800 flex items-center">
            Products
            <span class="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{{ pagination.total || 0 }}</span>
            <!-- Debug button for Mocati issue -->
            <button 
              @click="forceRefreshProducts"
              class="ml-4 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded hover:bg-orange-200 transition-colors"
              title="Force refresh products (for debugging Mocati issue)"
            >
              🔄 Refresh
            </button>
          </h3>
        </div>
        
        <div class="overflow-x-auto">
          <div v-if="loading" class="p-8 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Loading products...</p>
          </div>
          
          <ClientOnly>
            <table v-if="!loading" class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-if="products.length === 0">
                  <td colspan="7" class="px-6 py-8 text-center">
                    <div class="text-gray-500 mb-4">
                      <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                      No products found. Create your first product to get started.
                    </div>
                  </td>
                </tr>
                <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-12 h-12 rounded-lg mr-4 flex items-center justify-center bg-gray-100 overflow-hidden">
                        <img 
                          v-if="product.images && product.images.length > 0" 
                          :src="getImageUrl(product.images[0])" 
                          :alt="product.name"
                          class="w-full h-full object-cover"
                          @error="handleImageError"
                        />
                        <span v-else class="text-gray-600 font-semibold text-sm">
                          {{ product.name.charAt(0) }}
                        </span>
                      </div>
                      <div>
                        <div class="text-sm font-semibold text-gray-900">{{ product.name }}</div>
                        <div class="text-xs text-gray-500">{{ truncateText(product.short_description || product.description, 50) }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-900">{{ product.brand?.name || 'N/A' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="product.category" class="flex items-center">
                      <div 
                        class="w-3 h-3 rounded-full mr-2"
                        :style="{ backgroundColor: product.category.color || '#6B7280' }"
                      ></div>
                      <span class="text-sm text-gray-900">
                        {{ product.category.parent ? `${product.category.parent.name} → ` : '' }}{{ product.category.name }}
                      </span>
                    </div>
                    <span v-else class="text-sm text-gray-400">No Category</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-900">{{ product.sku || 'N/A' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm font-semibold text-green-600">${{ getProductPrice(product) }}</span>
                   
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                      <span 
                        :class="product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                        class="px-2 py-1 text-xs rounded-full font-medium"
                      >
                        {{ product.is_active ? 'Active' : 'Inactive' }}
                      </span>
                      <span 
                        v-if="product.is_featured"
                        class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium"
                      >
                        Featured
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="editProduct(product)"
                        class="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Edit Product"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>
                      <button
                        @click="confirmDelete(product)"
                        class="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete Product"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </ClientOnly>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.total > pagination.per_page" class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">
              Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
            </div>
            <div class="flex space-x-2">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="changePage(page)"
                :class="[
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  page === pagination.current_page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                {{ page }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg border w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-2xl font-semibold text-gray-900">
            {{ isEditing ? 'Edit Product' : 'Create New Product' }}
          </h3>
        </div>
        
        <form @submit.prevent="saveProduct" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
              
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Product Name *</label>
                <input
                  v-model="productForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Brand *</label>
                <select
                  v-model="productForm.brand_id"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Brand</option>
                  <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
                </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">SKU</label>
                  <input
                    v-model="productForm.sku"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Product SKU"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 text-sm font-medium mb-2">Part Number</label>
                  <input
                    v-model="productForm.part_number"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Part number"
                  />
                </div>
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Short Description</label>
                <textarea
                  v-model="productForm.short_description"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief product description"
                ></textarea>
              </div>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Full Description</label>
                <textarea
                  v-model="productForm.description"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed product description"
                ></textarea>
              </div>
            </div>

            <!-- Product Details -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Product Details</h4>

              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Weight (kg)</label>
                <input
                  v-model.number="productForm.weight"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-gray-700 text-sm font-medium">Category</label>
                  <button
                    type="button"
                    @click="openCreateCategoryModal"
                    class="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    + Create New
                  </button>
                </div>
                <select
                  v-model="productForm.category_id"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option v-for="category in managedCategories" :key="category.id" :value="category.id">
                    {{ category.parent ? `${category.parent.name} → ` : '' }}{{ category.name }}
                  </option>
                </select>
              </div>

              <!-- Product Variants/Flavors -->
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <h5 class="text-lg font-semibold text-gray-900">Product Variants (Flavors)</h5>
                  <button
                    type="button"
                    @click="addVariant"
                    class="px-3 py-1 bg-green-100 border border-green-300 rounded-lg text-green-700 hover:bg-green-200 transition-colors text-sm"
                  >
                    + Add Variant
                  </button>
                </div>
                
                <div v-if="productForm.variants && productForm.variants.length === 0" class="text-gray-500 text-sm italic">
                  No variants yet. Add your first variant (e.g., Original, Mild, Hot, etc.)
                </div>
                
                <div v-for="(variant, index) in productForm.variants" :key="`variant-${index}-${variant.name || ''}`" class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                  <div class="flex justify-between items-center">
                    <h6 class="text-gray-900 font-medium">Flavor {{ index + 1 }}</h6>
                    <button
                      type="button"
                      @click="removeVariant(index)"
                      v-if="productForm.variants.length > 1"
                      class="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-gray-700 text-sm font-medium mb-2">Flavor Name *</label>
                      <input
                        v-model="variant.name"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Original, Mild, Hot, Spicy"
                      />
                    </div>
                    <div>
                      <label class="block text-gray-700 text-sm font-medium mb-2">Price ($) *</label>
                      <input
                        v-model="variant.price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <!-- Auto-set as default for first variant -->
                  <div v-if="index === 0" class="text-xs text-green-700 italic">
                    ✓ This is the default flavor
                  </div>
                </div>
              </div>

              <!-- Product Images -->
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">Product Images</label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    ref="imageInput"
                    type="file"
                    multiple
                    accept="image/*"
                    @change="handleImageUpload"
                    class="hidden"
                  />
                  <button
                    type="button"
                    @click="$refs.imageInput.click()"
                    class="w-full flex flex-col items-center justify-center py-4 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <span class="text-sm font-medium">Click to upload images</span>
                    <span class="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB each. <span class="font-bold text-blue-500">Recommended size: 800x800px</span></span>
                  </button>
                </div>
                
                <!-- Image Previews -->
                <ClientOnly>
                  <div v-if="imagePreview.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div v-for="(image, index) in imagePreview" :key="`preview-${index}-${image.substring(0, 20)}`" class="relative">
                      <img 
                        :src="image" 
                        :alt="`Preview ${index + 1}`"
                        class="w-full h-24 object-cover rounded-lg"
                        @error="handleImagePreviewError"
                      />
                      <button
                        type="button"
                        @click="removeImage(index)"
                        class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </ClientOnly>
              </div>

              <!-- Status Toggles -->
              <div class="space-y-3">
                <div class="flex items-center">
                  <input
                    v-model="productForm.is_active"
                    type="checkbox"
                    id="is_active"
                    class="w-4 h-4 text-green-400 bg-white/10 border-white/20 rounded focus:ring-green-400 focus:ring-2"
                  />
                  <label for="is_active" class="ml-2 text-sm text-gray-700">Active Product</label>
                </div>
                <div class="flex items-center">
                  <input
                    v-model="productForm.is_featured"
                    type="checkbox"
                    id="is_featured"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label for="is_featured" class="ml-2 text-sm text-gray-700">Featured Product</label>
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
              <span v-else>{{ isEditing ? 'Update Product' : 'Create Product' }}</span>
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
              <h3 class="text-lg font-semibold text-gray-900">Delete Product</h3>
              <p class="text-gray-600">This action cannot be undone</p>
            </div>
          </div>
          
          <p class="text-gray-800 mb-6">
            Are you sure you want to delete "<strong>{{ productToDelete?.name }}</strong>"? 
            This will permanently remove the product and all its associated data.
          </p>
          
          <div class="flex justify-end space-x-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteProduct"
              :disabled="deleting"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="deleting">Deleting...</span>
              <span v-else>Delete Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Create Modal -->
    <div v-if="showCategoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg border w-full max-w-md shadow-xl">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ isEditingCategory ? 'Edit Category' : 'Create New Category' }}
          </h3>
        </div>
        
        <form @submit.prevent="saveCategory" class="p-6 space-y-4">
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
            <label class="block text-gray-700 text-sm font-medium mb-2">Parent Category</label>
            <select
              v-model="categoryForm.parent_id"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">None (Top Level)</option>
              <option 
                v-for="category in managedCategories.filter(c => !c.parent_id && (!isEditingCategory || c.id !== categoryForm.id))" 
                :key="category.id" 
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea
              v-model="categoryForm.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Optional category description"
            ></textarea>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-2">Color</label>
            <div class="flex items-center space-x-3">
              <input
                v-model="categoryForm.color"
                type="color"
                class="w-16 h-10 border border-gray-300 rounded-md cursor-pointer"
              />
              <input
                v-model="categoryForm.color"
                type="text"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#6B7280"
              />
            </div>
            <p class="text-xs text-gray-500 mt-1">Choose a color to help identify this category</p>
          </div>

          <div class="flex items-center">
            <input
              v-model="categoryForm.is_active"
              type="checkbox"
              id="category_is_active"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label for="category_is_active" class="ml-2 text-sm text-gray-700">Active Category</label>
          </div>
          
          <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              @click="closeCategoryModal"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="savingCategory"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="savingCategory">{{ isEditingCategory ? 'Updating...' : 'Creating...' }}</span>
              <span v-else>{{ isEditingCategory ? 'Update Category' : 'Create Category' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Category Confirmation Modal -->
    <div v-if="showDeleteCategoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
          
          <p class="text-gray-800 mb-4">
            Are you sure you want to delete "<strong>{{ categoryToDelete?.name }}</strong>"?
          </p>
          
          <div v-if="categoryToDelete" class="bg-gray-50 rounded-lg p-3 mb-4">
            <div class="flex items-center mb-2">
              <div 
                class="w-4 h-4 rounded-full mr-2"
                :style="{ backgroundColor: categoryToDelete.color || '#6B7280' }"
              ></div>
              <span class="text-sm font-medium text-gray-900">{{ categoryToDelete.name }}</span>
            </div>
            <div v-if="categoryToDelete.description" class="text-xs text-gray-600 mb-2">
              {{ categoryToDelete.description }}
            </div>
            <div class="text-xs text-gray-500">
              Products in this category: {{ getProductCountForCategory(categoryToDelete.id) }}
            </div>
          </div>
          
          <div v-if="getProductCountForCategory(categoryToDelete?.id) > 0" class="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <div class="flex">
              <svg class="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <div class="text-sm text-yellow-700">
                <p class="font-medium">Warning: This category has {{ getProductCountForCategory(categoryToDelete.id) }} product(s)</p>
                <p>Products will be moved to "Uncategorized" when this category is deleted.</p>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-4">
            <button
              @click="showDeleteCategoryModal = false"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteCategory"
              :disabled="deletingCategory"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="deletingCategory">Deleting...</span>
              <span v-else>Delete Category</span>
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
const showCategoryModal = ref(false)
const showDeleteCategoryModal = ref(false)
const showCategoryManagement = ref(false)
const isEditing = ref(false)
const isEditingCategory = ref(false)
const saving = ref(false)
const deleting = ref(false)
const savingCategory = ref(false)
const deletingCategory = ref(false)
const productToDelete = ref(null)
const categoryToDelete = ref(null)

// Notification system
const notification = ref({
  show: false,
  type: 'success', // success, error, warning, info
  message: '',
  timeout: null
})

const products = ref([])
const brands = ref([])
const categories = ref([])
const managedCategories = ref([])
const stats = ref({})
const pagination = ref({})
const imagePreview = ref([])

const filters = ref({
  search: '',
  brand_id: '',
  category_id: '',
  status: '',
  page: 1,
  per_page: 15
})

const productForm = ref({
  id: null,
  brand_id: '',
  name: '',
  slug: '',
  sku: '',
  part_number: '',
  description: '',
  short_description: '',
  weight: null,
  category_id: '',
  is_active: true,
  is_featured: false,
  images: [],
  newImages: [],
  removedImages: [],
  variants: [
    {
      name: 'Original',
      price: 0, // Start with 0 for new products
      is_default: true,
      is_active: true
    }
  ]
})

const categoryForm = ref({
  name: '',
  description: '',
  parent_id: '',
  color: '#6B7280',
  is_active: true
})

// Computed property for dynamic placeholder
const lastUpdatedPrice = computed(() => {
  // When creating a new product, return empty string (no placeholder)
  if (!isEditing.value) {
    return ''
  }

  // When editing, use the current variant's price as placeholder
  // This will be handled by the input's placeholder attribute
  return ''
})

// Computed property for pagination
const visiblePages = computed(() => {
  const current = pagination.value.current_page || 1
  const last = pagination.value.last_page || 1
  const delta = 2
  const range = []
  const rangeWithDots = []

  for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (current + delta < last - 1) {
    rangeWithDots.push('...', last)
  } else if (last > 1) {
    rangeWithDots.push(last)
  }

  return rangeWithDots.filter(item => item !== '...' || rangeWithDots.indexOf(item) === rangeWithDots.lastIndexOf(item))
})

// Helper function to count products for a category
const getProductCountForCategory = (categoryId) => {
  if (!categoryId || !products.value) return 0
  return products.value.filter(product => product.category_id === categoryId).length
}

// Notification methods
const showNotification = (type, message) => {
  // Clear any existing timeout
  if (notification.value.timeout) {
    clearTimeout(notification.value.timeout)
  }
  
  notification.value = {
    show: true,
    type: type,
    message: message,
    timeout: null
  }
  
  // Auto-dismiss after 5 seconds
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

// Methods
const openCreateModal = () => {
  console.log('🆕 Opening create modal - setting isEditing to false')
  isEditing.value = false
  resetForm()

  console.log('📝 Product form after reset:', {
    sku: productForm.value.sku,
    name: productForm.value.name,
    brand_id: productForm.value.brand_id,
    isEditing: isEditing.value
  })
  showModal.value = true
}

const editProduct = (product) => {
  isEditing.value = true

  console.log('📝 Editing product - original data:', {
    id: product.id,
    name: product.name,
    variants: product.variants,
    hasVariants: product.variants && product.variants.length > 0
  })

  // Ensure variant prices are numbers
  const processedVariants = product.variants && product.variants.length > 0
    ? product.variants.map(variant => ({
        ...variant,
        price: parseFloat(variant.price) || 0,
        id: variant.id || null
      }))
    : [
        {
          name: 'Original',
          price: 0,
          is_default: true,
          is_active: true
        }
      ]

  console.log('📝 Processed variants:', processedVariants)

  // Only copy the fields that are in our simplified form
  productForm.value = {
    id: product.id,
    brand_id: product.brand_id || '',
    name: product.name || '',
    slug: product.slug || '',
    sku: product.sku || '',
    part_number: product.part_number || '',
    description: product.description || '',
    short_description: product.short_description || '',
    weight: product.weight || null,
    category_id: product.category_id || '',
    is_active: product.is_active || false,
    is_featured: product.is_featured || false,
    images: product.images || [],
    newImages: [],
    removedImages: [],
    variants: processedVariants
  }

  // Debug: Log the loaded product data
  console.log('📝 Editing product:', {
    id: product.id,
    name: product.name,
    slug: product.slug,
    originalVariants: product.variants,
    processedVariants: processedVariants,
    formVariants: productForm.value.variants
  })

  // Set image preview from existing images
  imagePreview.value = (product.images || []).map(img => getImageUrl(img))

  showModal.value = true
}

const resetForm = () => {
  console.log('🔄 Resetting form for new product creation')
  productForm.value = {
    id: null,
    brand_id: '',
    name: '',
    slug: '',
    sku: '',
    part_number: '',
    description: '',
    short_description: '',
    weight: null,
    category_id: '',
    is_active: true,
    is_featured: false,
    images: [],
    newImages: [],
    removedImages: [],
    variants: [
      {
        name: 'Original',
        price: 0,
        is_default: true,
        is_active: true
      }
    ]
  }
  imagePreview.value = []

  // Clear any localStorage data that might be interfering
  if (process.client) {
    try {
      localStorage.removeItem('lastProductPrice')
      localStorage.removeItem('lastProductSKU')
      localStorage.removeItem('lastProductData')
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }

  console.log('✅ Form reset complete')
}

  // Clear any localStorage data that might be interfering
  if (process.client) {
    try {
      localStorage.removeItem('lastProductPrice')
      localStorage.removeItem('lastProductSKU')
      localStorage.removeItem('lastProductData')
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }

  console.log('✅ Form reset complete')


const closeModal = () => {
  console.log('❌ Closing modal - resetting form')
  showModal.value = false
  resetForm()
  console.log('✅ Modal closed and form reset')
}

const openCreateCategoryModal = () => {
  isEditingCategory.value = false
  categoryForm.value = {
    name: '',
    description: '',
    parent_id: '',
    color: '#6B7280',
    is_active: true
  }
  showCategoryModal.value = true
}

const editCategory = (category) => {
  isEditingCategory.value = true
  categoryForm.value = {
    id: category.id,
    name: category.name,
    description: category.description || '',
    parent_id: category.parent_id || '',
    color: category.color || '#6B7280',
    is_active: category.is_active
  }
  showCategoryModal.value = true
}

const confirmDeleteCategory = (category) => {
  categoryToDelete.value = category
  showDeleteCategoryModal.value = true
}

const deleteCategory = async () => {
  if (!categoryToDelete.value) return
  
  deletingCategory.value = true
  
  try {
    const api = useApi()
    const response = await api.request(`/admin/categories/${categoryToDelete.value.id}`, {
      method: 'DELETE'
    })
    
    if (response.success) {
      await loadManagedCategories()
      await loadProducts() // Reload products to update category info
      showDeleteCategoryModal.value = false
      categoryToDelete.value = null
      
      showNotification('success', `Category "${categoryToDelete.value?.name}" has been deleted successfully.`)
    } else {
      console.error('Failed to delete category:', response.error)
      
      if (response.error && response.error.includes('constraint')) {
        showNotification('error', `Cannot delete "${categoryToDelete.value?.name}" because it has products. Please move or delete the products first.`)
      } else if (response.error && (response.error.includes('401') || response.error.includes('Unauthorized'))) {
        showNotification('error', 'You are not authorized to delete this category. Please log in again.')
        setTimeout(() => {
          navigateTo('/admin-access')
        }, 2000)
      } else {
        showNotification('error', `Failed to delete category: ${response.error || 'Unknown error occurred'}`)
      }
    }
  } catch (error) {
    console.error('Failed to delete category:', error)
    showNotification('error', `Failed to delete category: ${error.message || 'Network error occurred'}`)
  } finally {
    deletingCategory.value = false
  }
}

const closeCategoryModal = () => {
  showCategoryModal.value = false
  categoryForm.value = {
    name: '',
    description: '',
    parent_id: '',
    color: '#6B7280',
    is_active: true
  }
}

const saveCategory = async () => {
  savingCategory.value = true
  
  try {
    const api = useApi()
    
    // Debug authentication status
    const authStatus = api.utils.debugAuth()
    console.log('🔐 Current auth status:', authStatus)
    
    if (!authStatus.authenticated) {
      showNotification('error', 'You are not authenticated. Please log in again.')
      setTimeout(() => {
        navigateTo('/admin-access')
      }, 2000)
      return
    }
    
    if (!authStatus.isAdmin) {
      showNotification('error', 'You do not have admin privileges.')
      return
    }
    
    console.log(`📝 ${isEditingCategory.value ? 'Updating' : 'Creating'} category with data:`, categoryForm.value)
    
    const url = isEditingCategory.value 
      ? `/admin/categories/${categoryForm.value.id}`
      : '/admin/categories'
    
    const method = isEditingCategory.value ? 'PUT' : 'POST'
    
    const response = await api.request(url, {
      method: method,
      body: categoryForm.value
    })
    
    console.log(`📝 Category ${isEditingCategory.value ? 'update' : 'creation'} response:`, response)
    
    if (response.success) {
      await loadManagedCategories()
      await loadProducts() // Reload products to update category info
      closeCategoryModal()
      
      // Auto-select the newly created category if creating
      if (!isEditingCategory.value && response.data && response.data.category) {
        productForm.value.category_id = response.data.category.id 
      }
      
      showNotification('success', `Category "${categoryForm.value.name}" has been ${isEditingCategory.value ? 'updated' : 'created'} successfully.`)
    } else {
      console.error('API Error:', response.error)
      
      if (response.error && (response.error.includes('401') || response.error.includes('Unauthorized') || response.error.includes('Unauthenticated'))) {
        showNotification('error', 'Your session has expired. Please log in again.')
        setTimeout(() => {
          navigateTo('/admin-access')
        }, 2000)
      } else if (response.errors) {
        const errorMessages = Object.values(response.errors).flat()
        showNotification('error', `Validation failed: ${errorMessages.join(', ')}`)
      } else {
        showNotification('error', `Failed to ${isEditingCategory.value ? 'update' : 'create'} category: ${response.error || 'Unknown error occurred'}`)
      }
    }
  } catch (error) {
    console.error(`Failed to ${isEditingCategory.value ? 'update' : 'create'} category:`, error)
    
    if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized') || error.message.includes('Unauthenticated'))) {
      showNotification('error', 'Your session has expired. Please log in again.')
      setTimeout(() => {
        navigateTo('/admin-access')
      }, 2000)
    } else {
      showNotification('error', `Failed to ${isEditingCategory.value ? 'update' : 'create'} category: ${error.message || 'Network error occurred'}`)
    }
  } finally {
    savingCategory.value = false
  }
}

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  
  files.forEach(file => {
    if (file && file.type.startsWith('image/')) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        showNotification('warning', `Image "${file.name}" is too large. Maximum size is 10MB.`)
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value.push(e.target.result)
      }
      reader.readAsDataURL(file)
      
      productForm.value.newImages.push(file)
    } else {
      showNotification('error', `"${file.name}" is not a valid image file. Please select JPG, PNG, GIF, or WebP files.`)
    }
  })
  
  // Show success message if files were added
  const validFiles = files.filter(file => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024)
  if (validFiles.length > 0) {
    showNotification('success', `${validFiles.length} image(s) added successfully.`)
  }
}

const removeImage = (index) => {
  // Calculate how many existing images we have
  const existingImageCount = productForm.value.images.length
  
  if (index < existingImageCount) {
    // Removing an existing image - track it for deletion
    const removedImage = productForm.value.images[index]
    productForm.value.removedImages.push(removedImage)
    productForm.value.images.splice(index, 1)
  } else {
    // Removing a new image
    const newImageIndex = index - existingImageCount
    productForm.value.newImages.splice(newImageIndex, 1)
  }
  
  // Always remove from preview
  imagePreview.value.splice(index, 1)
  
  console.log('🗑️ Image removed:', { index, existingCount: existingImageCount, remainingImages: productForm.value.images.length, newImages: productForm.value.newImages.length, removedImages: productForm.value.removedImages.length })
}

// Variant management methods
const addVariant = () => {
  productForm.value.variants.push({
    name: '',
    price: 0,
    is_default: false,
    is_active: true
  })
}

const removeVariant = (index) => {
  if (productForm.value.variants.length > 1) {
    productForm.value.variants.splice(index, 1)
    
    // Always make the first variant default
    if (productForm.value.variants.length > 0) {
      productForm.value.variants[0].is_default = true
    }
  }
}

const setDefaultVariant = (index) => {
  // The first variant is always the default, so we don't need complex logic
  productForm.value.variants.forEach((variant, i) => {
    variant.is_default = i === 0
  })
}

const handleImagePreviewError = (event) => {
  // Only run on client side to avoid hydration issues
  if (process.server) return
  console.warn('Product image preview failed to load')
  event.target.style.display = 'none'
}

const saveProduct = async () => {
  saving.value = true

  try {
    const formData = new FormData()    // Only add the fields that are actually in the form
    const fieldsToSend = [
      'brand_id', 'name', 'slug', 'sku', 'part_number', 
      'description', 'short_description', 'weight', 'category_id',
      'is_active', 'is_featured'
    ]
    
    fieldsToSend.forEach(key => {
      const value = productForm.value[key]
      // Only send non-empty values, except for boolean fields
      if (key === 'is_active' || key === 'is_featured') {
        formData.append(key, value ? '1' : '0')
      } else if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value)
      }
    })
    
    // Ensure required fields are present
    if (!productForm.value.brand_id) {
      showNotification('error', 'Please select a brand')
      return
    }
    
    if (!productForm.value.name || productForm.value.name.trim() === '') {
      showNotification('error', 'Please enter a product name')
      return
    }
    
    // Add variants data
    if (productForm.value.variants && productForm.value.variants.length > 0) {
      productForm.value.variants.forEach((variant, index) => {
        const price = parseFloat(variant.price) || 0
        formData.append(`variants[${index}][name]`, variant.name || '')
        formData.append(`variants[${index}][price]`, price.toString())
        formData.append(`variants[${index}][is_default]`, index === 0 ? '1' : '0') // First variant is always default
        formData.append(`variants[${index}][is_active]`, '1') // Always active
        if (variant.id) {
          formData.append(`variants[${index}][id]`, variant.id)
        }
        
        console.log(`Variant ${index} data:`, {
          name: variant.name,
          price: price,
          id: variant.id
        })
      })
    }
    
    // Add existing images if editing
    if (isEditing.value && productForm.value.images && Array.isArray(productForm.value.images)) {
      productForm.value.images.forEach((image, index) => {
        formData.append(`existing_images[${index}]`, image)
      })
    }
    
    // Add removed images list if editing
    if (isEditing.value && productForm.value.removedImages && productForm.value.removedImages.length > 0) {
      productForm.value.removedImages.forEach((image, index) => {
        formData.append(`remove_images[${index}]`, image)
      })
      console.log('🗑️ Sending removed images:', productForm.value.removedImages)
    }
    
    // Add new image files
    if (productForm.value.newImages && productForm.value.newImages.length > 0) {
      productForm.value.newImages.forEach((file, index) => {
        formData.append(`new_images[${index}]`, file)
      })
    }
    
    // Add method override for updates when using FormData
    if (isEditing.value) {
      formData.append('_method', 'PUT')
    }
    
    // Debug: Log what we're sending
    console.log('📤 Sending product data:')
    console.log('  isEditing:', isEditing.value)
    console.log('  productForm.sku:', productForm.value.sku)
    console.log('  productForm.name:', productForm.value.name)
    console.log('  productForm.variants:', productForm.value.variants)
    
    const api = useApi()
    const url = isEditing.value 
      ? `/admin/products/${productForm.value.slug}`  // Use slug as per Laravel route model binding
      : '/admin/products'
    
    // Always use POST method - Laravel has dedicated POST route for FormData updates
    const response = await api.request(url, {
      method: 'POST',
      body: formData
    })
    
    if (response.success) {
      // Save the last updated price to localStorage
      if (productForm.value.variants && productForm.value.variants.length > 0) {
        const firstVariant = productForm.value.variants[0]
        if (firstVariant.price) {
          localStorage.setItem('lastProductPrice', firstVariant.price.toString())
        }
      }

      console.log('✅ Product saved successfully, reloading products...')
      console.log('📤 Save response data:', response.data)

      // Force reload products with cache bust to show updated images
      await loadProducts()
      await loadStats()
      
      // Force image refresh by updating the products array with cache-busted URLs
      if (response.data.product && response.data.product.images) {
        const updatedProductIndex = products.value.findIndex(p => p.id === response.data.product.id)
        if (updatedProductIndex !== -1) {
          products.value[updatedProductIndex] = response.data.product
        }
      }
      
      closeModal()

      // Show success notification
      showNotification('success', `Product "${productForm.value.name}" has been ${isEditing.value ? 'updated' : 'created'} successfully.`)
    } else {
      console.error('API Error:', response.error)
      console.error('API Response:', response)
      
      // Handle specific validation errors
      if (response.errors) {
        console.error('Validation errors:', response.errors)
        console.error('Validation errors JSON:', JSON.stringify(response.errors, null, 2))
        const errorMessages = Object.values(response.errors).flat()
        console.error('Error messages array:', errorMessages)
        showNotification('error', `Validation failed: ${errorMessages.join(', ')}`)
      } else if (response.error && (response.error.includes('401') || response.error.includes('Unauthorized'))) {
        showNotification('error', 'You are not authorized to perform this action. Please log in again.')
        setTimeout(() => {
          navigateTo('/admin-access')
        }, 2000)
      } else {
        showNotification('error', `Failed to ${isEditing.value ? 'update' : 'create'} product: ${response.error || 'Unknown error occurred'}`)
      }
    }
  } catch (error) {
    console.error('Failed to save product:', error)
    showNotification('error', `Failed to ${isEditing.value ? 'update' : 'create'} product: ${error.message || 'Network error occurred'}`)
  } finally {
    saving.value = false
  }
}

const confirmDelete = (product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const deleteProduct = async () => {
  if (!productToDelete.value) return
  
  deleting.value = true
  
  try {
    const api = useApi()
    
    // Use slug, but fallback to ID if slug is empty or invalid
    const identifier = productToDelete.value.slug && productToDelete.value.slug.trim() !== '' 
      ? productToDelete.value.slug 
      : productToDelete.value.id
      
    const deleteUrl = `/admin/products/${identifier}`
    console.log('🗑️ Attempting to delete product:', {
      productId: productToDelete.value.id,
      productSlug: productToDelete.value.slug,
      productName: productToDelete.value.name,
      identifier: identifier,
      deleteUrl: deleteUrl
    })
    
    const response = await api.request(deleteUrl, {
      method: 'DELETE'
    })
    
    if (response.success) {
      await loadProducts()
      await loadStats()
      showDeleteModal.value = false
      productToDelete.value = null
      
      // Show success notification
      showNotification('success', `Product "${productToDelete.value?.name}" has been deleted successfully.`)
    } else {
      console.error('Failed to delete product:', response.error)
      
      // Handle specific error messages
      if (response.error && response.error.includes('constraint')) {
        showNotification('error', `Cannot delete "${productToDelete.value?.name}" because it has dependencies. Please remove related records first.`)
      } else if (response.error && (response.error.includes('401') || response.error.includes('Unauthorized'))) {
        showNotification('error', 'You are not authorized to delete this product. Please log in again.')
        setTimeout(() => {
          navigateTo('/admin-access')
        }, 2000)
      } else {
        showNotification('error', `Failed to delete product: ${response.error || 'Unknown error occurred'}`)
      }
    }
  } catch (error) {
    console.error('Failed to delete product:', error)
    showNotification('error', `Failed to delete product: ${error.message || 'Network error occurred'}`)
  } finally {
    deleting.value = false
  }
}

const loadProducts = async () => {
  loading.value = true

  try {
    const api = useApi()
    const params = new URLSearchParams()
    Object.keys(filters.value).forEach(key => {
      if (filters.value[key] !== '' && filters.value[key] !== null) {
        params.append(key, filters.value[key])
      }
    })

    console.log('🔄 Loading products with params:', params.toString())
    const response = await api.request(`/admin/products?${params.toString()}`)

    if (response.success && response.data) {
      console.log('📦 Products loaded:', response.data.products?.data?.length || 0, 'products')

      const newProducts = response.data.products?.data || []
      console.log('📦 New products data:', newProducts)

      // Update products array
      products.value = newProducts

      pagination.value = {
        current_page: response.data.products?.current_page || 1,
        last_page: response.data.products?.last_page || 1,
        per_page: response.data.products?.per_page || 10,
        total: response.data.products?.total || 0,
        from: response.data.products?.from || 0,
        to: response.data.products?.to || 0
      }

      console.log('✅ Products loaded successfully, total products:', products.value.length)
    } else {
      console.error('❌ API Error:', response.error)
      products.value = []
    }
  } catch (error) {
    console.error('❌ Failed to load products:', error)
    products.value = []
  } finally {
    loading.value = false
  }
}

const loadBrands = async () => {
  try {
    const api = useApi()
    const response = await api.brands.getAll()
    
    if (response.success && response.data) {
      brands.value = response.data.brands || []
    } else {
      console.error('Failed to load brands:', response.error)
      brands.value = []
    }
  } catch (error) {
    console.error('Failed to load brands:', error)
    brands.value = []
  }
}

const loadManagedCategories = async () => {
  try {
    const api = useApi()
    const response = await api.request('/admin/categories?status=active')
    
    if (response.success && response.data) {
      managedCategories.value = response.data.categories || []
    } else {
      console.error('Failed to load managed categories:', response.error)
      managedCategories.value = []
    }
  } catch (error) {
    console.error('Failed to load managed categories:', error)
    managedCategories.value = []
  }
}

const loadStats = async () => {
  try {
    const api = useApi()
    const response = await api.request('/admin/products-stats')
    
    if (response.success && response.data) {
      stats.value = response.data || {}
      categories.value = response.data.categories || []
    } else {
      console.error('Failed to load stats:', response.error)
      stats.value = {}
      categories.value = []
    }
  } catch (error) {
    console.error('Failed to load stats:', error)
    stats.value = {}
    categories.value = []
  }
}

const changePage = (page) => {
  filters.value.page = page
  loadProducts()
}

const debouncedSearch = debounce(() => {
  filters.value.page = 1 // Reset to first page when searching
  loadProducts()
}, 500)

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount || 0)
}

const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const getImageUrl = (imagePath, bustCache = false) => {
  if (!imagePath) return ''
  
  let url = ''
  
  // If it's already a full URL, use as is
  if (imagePath.startsWith('http')) {
    url = imagePath
  }
  // If it starts with /storage/, it's already an absolute path, just add backend URL
  else if (imagePath.startsWith('/storage/')) {
    url = `https://sdev.apratifoods.asia${imagePath}`
  }
  // If it's a relative path, prepend the Laravel backend URL with storage prefix
  else {
    url = `https://sdev.apratifoods.asia/storage/${imagePath}`
  }
  
  // Add cache buster if requested (for thumbnails/previews after update)
  if (bustCache) {
    const separator = url.includes('?') ? '&' : '?'
    url += `${separator}t=${Date.now()}`
  }
  
  return url
}

const getProductPrice = (product) => {
  console.log('🔍 Calculating price for product:', {
    id: product.id,
    name: product.name,
    variants: product.variants,
    mainPrice: product.price,
    brand: product.brand?.slug
  })

  // Priority 1: Look for "Original" variant first
  if (product.variants && product.variants.length > 0) {
    const originalVariant = product.variants.find(variant =>
      variant.name && variant.name.toLowerCase() === 'original'
    )
    if (originalVariant && originalVariant.price && parseFloat(originalVariant.price) > 0) {
      console.log('✅ Found Original variant price:', originalVariant.price)
      return formatCurrency(originalVariant.price)
    }
  }

  // Priority 2: Use main product price if no Original variant found
  if (product.price && parseFloat(product.price) > 0) {
    console.log('⚠️ Using main product price:', product.price)
    return formatCurrency(product.price)
  }

  // Priority 3: Use any variant price as fallback
  if (product.variants && product.variants.length > 0) {
    const firstVariant = product.variants.find(variant => variant.price && parseFloat(variant.price) > 0)
    if (firstVariant) {
      console.log('⚠️ Using first variant price:', firstVariant.price)
      return formatCurrency(firstVariant.price)
    }
  }

  // Fallback: No price available
  console.log('❌ No price found for product')
  return 'N/A'
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

// Force refresh products (for debugging)
const forceRefreshProducts = async () => {
  console.log('🔄 Force refreshing products...')
  await loadProducts()
  console.log('✅ Force refresh complete')
}

// Watch for filter changes to automatically reload products
watch(() => filters.value.category_id, async (newCategoryId, oldCategoryId) => {
  if (newCategoryId !== oldCategoryId) {
    console.log('🔄 Category filter changed:', newCategoryId)
    filters.value.page = 1 // Reset to first page
    await loadProducts()
  }
})

// Also watch for other filter changes
watch(() => filters.value.brand_id, async (newBrandId, oldBrandId) => {
  if (newBrandId !== oldBrandId) {
    filters.value.page = 1 // Reset to first page
    await loadProducts()
  }
})

watch(() => filters.value.status, async (newStatus, oldStatus) => {
  if (newStatus !== oldStatus) {
    filters.value.page = 1 // Reset to first page
    await loadProducts()
  }
})

// Load data on component mount
onMounted(async () => {
  if (process.server) return
  // Check authentication first
  const api = useApi()
  const authStatus = api.utils.debugAuth()
  
  if (!authStatus.authenticated) {
    console.error('❌ Not authenticated')
    showNotification('error', 'Please log in to access this page.')
    setTimeout(() => {
      navigateTo('/admin-access')
    }, 2000)
    return
  }
  
  if (!authStatus.isAdmin) {
    console.error('❌ Not an admin')
    showNotification('error', 'You need admin privileges to access this page.')
    setTimeout(() => {
      navigateTo('/admin-access')
    }, 2000)
    return
  }
  
  console.log('✅ Authentication successful')
  
  await Promise.all([
    loadProducts(),
    loadBrands(),
    loadManagedCategories(),
    loadStats()
  ])
})
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
