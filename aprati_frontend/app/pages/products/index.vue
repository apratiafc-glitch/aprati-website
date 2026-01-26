<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Animated Fruit Characters -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute top-1/4 right-1/6 w-20 h-20 object-contain opacity-18 animate-float-delayed" style="animation-delay: 0.5s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/3 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="animation-delay: 0.8s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-2/5 right-1/4 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="animation-delay: 1.2s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-1/2 left-1/3 w-14 h-14 object-contain opacity-10 animate-float" style="animation-delay: 0.3s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute top-3/5 right-1/3 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="animation-delay: 1.5s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute bottom-1/4 left-1/5 w-16 h-16 object-contain opacity-13 animate-float" style="animation-delay: 0.7s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/3 right-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 1.8s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/5 right-2/5 w-20 h-20 object-contain opacity-11 animate-float" style="animation-delay: 1s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-2/5 left-2/5 w-20 h-20 object-contain opacity-15 animate-float-delayed" style="animation-delay: 1.4s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-3/4 left-1/6 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 0.4s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/5 right-1/6 w-20 h-20 object-contain opacity-18 animate-float-delayed" style="animation-delay: 2s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-2/3 right-3/5 w-16 h-16 object-contain opacity-14 animate-float" style="animation-delay: 1.6s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/6 left-3/5 w-14 h-14 object-contain opacity-16 animate-float-delayed" style="animation-delay: 2.2s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/2 right-1/5 w-16 h-16 object-contain opacity-13 animate-float" style="animation-delay: 0.9s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-2/6 left-1/4 w-16 h-16 object-contain opacity-15 animate-float-delayed" style="animation-delay: 1.1s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-4/5 right-2/5 w-14 h-14 object-contain opacity-11 animate-float" style="animation-delay: 1.9s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-3/5 right-1/4 w-20 h-20 object-contain opacity-17 animate-float-delayed" style="animation-delay: 1.3s;" />
    </div>

    <!-- Page Header -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">All Products</h1>
            <p class="mt-2 text-gray-600">Discover our complete range of premium food products</p>
          </div>
          <div class="text-sm text-gray-500">
            {{ pagination.total || products.length }} products
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Breadcrumb -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-4">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-gray-500">
                <svg class="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                <span class="sr-only">Home</span>
              </NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="ml-4 text-sm font-medium text-gray-500">Products</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <input
              v-model="filters.search"
              @input="debouncedSearch"
              type="text"
              placeholder="Search by name, SKU, or description..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>

          <!-- Brand Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <select
              v-model="filters.brand_id"
              @change="loadProducts"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Brands</option>
              <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </option>
            </select>
          </div>

          <!-- Category Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              v-model="filters.category"
              @change="loadProducts"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>

          <!-- Featured Toggle -->
        
      </div>
    </div>

    <!-- Products Loading -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Loading products...</p>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-else-if="products.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NuxtLink 
          v-for="product in products" 
          :key="product.id" 
          :to="`/products/${product.slug}`"
          class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <!-- Product Image -->
          <div class="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <div v-if="product.images && product.images.length > 0">
              <img 
                :src="getImageUrl(product.images[0])" 
                :alt="product.name" 
                class="max-w-full max-h-full object-cover group-hover:scale-105 transition-transform"
                @error="handleProductImageError($event, product)"
              >
            </div>
            <div v-else class="text-gray-400">
              <svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
          </div>

          <!-- Brand -->
          <div v-if="product.brand" class="flex items-center mb-2">
            <img 
              v-if="product.brand.logo_url || product.brand.logo"
              :src="getImageUrl(product.brand.logo_url || product.brand.logo)" 
              :alt="product.brand.name" 
              class="w-5 h-5 object-contain mr-2"
              @error="handleBrandLogoError"
            >
            <span class="text-xs text-blue-600 font-medium">{{ product.brand.name }}</span>
          </div>

          <!-- Product Name -->
          <h3 class="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{{ product.name }}</h3>
          
          <!-- Short Description -->
          <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ product.short_description || product.description }}</p>
          
          <!-- Price -->
          <div class="mb-3">
            <div v-if="getProductPrice(product)" class="text-lg font-bold text-green-600">
              ${{ Number(getProductPrice(product)).toFixed(2) }}
            </div>
            <div v-else class="text-sm text-gray-500">
              Price not available
            </div>
          </div>
          <div class="space-y-1">
            <div v-if="product.sku" class="text-xs text-gray-500">
              SKU: {{ product.sku }}
            </div>
            
            <div class="flex items-center justify-between">
              <div class="text-xs text-gray-500">
                {{ product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock' }}
              </div>
              
              <div v-if="product.is_featured" class="flex items-center text-xs text-orange-600">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Featured
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.last_page > 1" class="mt-12 flex justify-center">
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <!-- Previous Page -->
          <button
            @click="changePage(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Page Numbers -->
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="changePage(page)"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="page === pagination.current_page
              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
          >
            {{ page }}
          </button>

          <!-- Next Page -->
          <button
            @click="changePage(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
          </button>
        </nav>
      </div>
    </div>

    <!-- No Products -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
        <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        <div class="mt-6">
          <NuxtLink 
            to="/brands" 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse by Brand
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Access runtime config for API URL
const runtimeConfig = useRuntimeConfig()

// Reactive data
const products = ref([])
const brands = ref([])
const categories = ref([])
const loading = ref(true)
const pagination = ref({})

// Filters
const filters = ref({
  search: '',
  brand_id: '',
  category: '',
  featured: false,
  page: 1
})

// Debounced search
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    filters.value.page = 1
    loadProducts()
  }, 500)
}

// Computed properties
const visiblePages = computed(() => {
  const current = pagination.value.current_page || 1
  const total = pagination.value.last_page || 1
  const delta = 2
  const range = []
  
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }
  
  return range
})

// Load products from API
const loadProducts = async () => {
  try {
    loading.value = true
    
    // Build query parameters
    const params = new URLSearchParams()
    if (filters.value.search) params.append('search', filters.value.search)
    if (filters.value.brand_id) params.append('brand_id', filters.value.brand_id)
    if (filters.value.category) params.append('category', filters.value.category)
    if (filters.value.featured) params.append('featured', '1')
    params.append('page', filters.value.page.toString())
    params.append('per_page', '12')
    
    const api = useApi()
    const response = await api.request(`/products?${params.toString()}`)
    
    if ((response.success || response.status === 'success') && response.data) {
      products.value = response.data.products || []
      pagination.value = response.data.pagination || {}
      
      console.log(`Loaded ${products.value.length} products`)
    } else {
      products.value = []
      pagination.value = {}
    }
  } catch (error) {
    console.error('Error loading products:', error)
    products.value = []
    pagination.value = {}
  } finally {
    loading.value = false
  }
}

// Load brands for filter
const loadBrands = async () => {
  try {
    const api = useApi()
    const response = await api.request('/brands')
    if ((response.success || response.status === 'success') && response.data) {
      const brandsList = response.data.brands || response.data
      brands.value = Array.isArray(brandsList) ? brandsList : []
    }
  } catch (error) {
    console.error('Error loading brands:', error)
  }
}

// Load categories for filter
const loadCategories = async () => {
  try {
    const api = useApi()
    const response = await api.request('/products/categories')
    if ((response.success || response.status === 'success') && response.data) {
      const categoriesList = response.data.categories || response.data
      categories.value = Array.isArray(categoriesList) ? categoriesList : []
    }
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

// Change page
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    filters.value.page = page
    loadProducts()
  }
}

// Get image URL helper function
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  
  // Data URIs (base64 encoded images)
  if (imagePath.startsWith('data:')) return imagePath
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath
  
  // If it starts with /storage/, it's already an absolute path, just add backend URL
  if (imagePath.startsWith('/storage/')) {
    return `${runtimeConfig.public.apiBaseUrl}${imagePath}`
  }
  
  // If it's a relative path, prepend the Laravel backend URL with storage prefix
  return `${runtimeConfig.public.apiBaseUrl}/storage/${imagePath}`
}

// Handle product image loading errors
const handleProductImageError = (event, product) => {
  if (process.server) return
  
  console.error('Product image failed to load:', {
    product: product.name,
    imagePath: product.images?.[0],
    finalUrl: getImageUrl(product.images?.[0])
  })
  
  // Hide the failed image and show placeholder
  event.target.style.display = 'none'
  if (event.target.parentElement) {
    event.target.parentElement.innerHTML = `
      <div class="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <svg class="h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <span class="text-xs">No Image</span>
      </div>
    `
  }
}

// Get product price - prioritize "Original" variant price, then main price, then any variant
const getProductPrice = (product) => {
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
  if (product.price) return product.price
  
  // If no main price, try to get from any variant
  if (product.variants && product.variants.length > 0) {
    const variantWithPrice = product.variants.find(variant => variant.price)
    return variantWithPrice ? variantWithPrice.price : null
  }
  
  return null
}

// Refresh products data
const refreshProducts = async () => {
  console.log('🔄 Refreshing all products with latest prices...')
  await loadProducts()
  console.log('✅ Product prices refreshed successfully!')
}

// Load data on component mount
onMounted(async () => {
  await Promise.all([
    loadProducts(),
    loadBrands(),
    loadCategories()
  ])
  

})

// SEO meta tags
useSeoMeta({
  title: 'All Products - Aprati Food Company',
  description: 'Browse our complete collection of premium food products from all brands including Aprati, Frutati, and Mocati.'
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
