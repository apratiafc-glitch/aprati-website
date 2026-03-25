<template>
  <div class="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search Header -->
      <div class="mb-12">
        <h1 class="text-3xl sm:text-4xl font-black text-blue-900 mb-4 uppercase tracking-tighter">
          Search Results
        </h1>
        <p v-if="query" class="text-gray-500 text-lg">
          Showing results for <span class="text-blue-600 font-bold italic">"{{ query }}"</span>
        </p>
        <p v-else class="text-gray-500 text-lg">
          Search for products, brands, or descriptions.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-6">
        <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-500 font-medium animate-pulse uppercase tracking-widest text-xs">Excellence takes time...</p>
      </div>

      <!-- Results Grid -->
      <div v-else-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="product in products" :key="product.id" class="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
          <!-- Image Container -->
          <div class="relative aspect-square overflow-hidden bg-gray-50">
            <img 
              :src="getImageUrl(product.image)" 
              :alt="product.name"
              class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-[2s] ease-out"
              @error="(e) => e.target.src = '/images/placeholder-product.png'"
            />
            <!-- Brand Badge -->
            <div 
              v-if="product.brand"
              class="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-blue-900 shadow-sm border border-white/50"
            >
              {{ product.brand.name }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-8 flex flex-col flex-grow">
            <h3 class="text-xl font-black text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">
              {{ product.name }}
            </h3>
            <p class="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">
              {{ product.description || 'Premium quality food products from Aprati Foods.' }}
            </p>
            
            <div class="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
              <span v-if="product.price" class="text-lg font-black text-blue-900">
                ${{ product.price }}
              </span>
              <NuxtLink 
                :to="`/products/${product.slug || product.id}`"
                class="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors group/link"
              >
                View Details
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results State -->
      <div v-else class="text-center py-32 bg-white rounded-[3rem] shadow-xl shadow-blue-900/5 border border-gray-100 px-6">
        <div class="mb-8 relative inline-block">
          <div class="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div class="relative bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-black text-blue-900 mb-3 uppercase tracking-tight">No results found</h2>
        <p class="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed font-medium">
          We couldn't find any products matching "{{ query }}". Try searching for something else or browse our brands.
        </p>
        <NuxtLink to="/" class="inline-flex items-center px-10 py-4 bg-blue-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-blue-800 transition-all hover:scale-105 hover:shadow-xl shadow-blue-900/20 active:scale-95">
          Return to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const query = computed(() => route.query.q || '')
const products = ref([])
const loading = ref(true)
const api = useApi()
const runtimeConfig = useRuntimeConfig()

// Use standard API URL resolution
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder-product.png'
  if (imagePath.startsWith('http')) return imagePath
  const baseUrl = (runtimeConfig.public.apiBaseUrl || 'https://sdev.apratifoods.asia').replace(/\/$/, '')
  return imagePath.startsWith('/') ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`
}

const performSearch = async () => {
  if (!query.value) {
    products.value = []
    loading.value = false
    return
  }

  try {
    loading.value = true
    const response = await api.products.getAll({ search: query.value })
    if (response.success && response.data?.products) {
      products.value = response.data.products
    } else {
      products.value = []
    }
  } catch (error) {
    console.error('Search failed:', error)
    products.value = []
  } finally {
    loading.value = false
  }
}

// Watch for query changes
watch(() => route.query.q, () => {
  performSearch()
}, { immediate: true })

useHead({
  title: query.value ? `Search: ${query.value}` : 'Search'
})
</script>
