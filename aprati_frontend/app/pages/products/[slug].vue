<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Animated Fruit Characters -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute top-1/4 right-1/6 w-20 h-20 object-contain opacity-18 animate-float-delayed" style="animation-delay: 0.5s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="animation-delay: 1s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-1/2 right-1/4 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="animation-delay: 1.5s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-1/6 right-1/3 w-14 h-14 object-contain opacity-16 animate-float" style="animation-delay: 2s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute top-2/3 left-1/6 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="animation-delay: 0.8s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute bottom-1/4 right-1/6 w-14 h-14 object-contain opacity-15 animate-float" style="animation-delay: 1.2s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute top-3/4 left-1/3 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="animation-delay: 1.8s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/5 right-1/5 w-20 h-20 object-contain opacity-13 animate-float" style="animation-delay: 2.3s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 0.3s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-2/5 left-2/5 w-14 h-14 object-contain opacity-10 animate-float" style="animation-delay: 1.4s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-3/5 right-2/5 w-20 h-20 object-contain opacity-16 animate-float-delayed" style="animation-delay: 0.7s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-4/5 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="animation-delay: 1.9s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-4/5 right-1/4 w-14 h-14 object-contain opacity-15 animate-float-delayed" style="animation-delay: 0.4s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/3 left-2/3 w-16 h-16 object-contain opacity-18 animate-float" style="animation-delay: 2.1s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-1/5 right-2/3 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="animation-delay: 1.6s;" />
    </div>
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="ml-4 text-gray-600">Loading product details...</p>
    </div>

    <!-- Error State - Cyberpunk Style -->
    <div v-else-if="error" class="cyberpunk-error">
      <!-- Scan Lines Effect -->
      <div class="scan-lines"></div>
      
      <!-- Grid Background -->
      <div class="grid-bg"></div>

      <!-- Neon Particles -->
      <div class="particles">
        <div v-for="(particle, i) in errorParticles" :key="i" class="particle"
          :style="{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }">
        </div>
      </div>

      <!-- Main Content -->
      <div class="cyber-content">
        <!-- Hero Section -->
        <div class="hero-box">
          <div class="neon-border"></div>
          
          <!-- Floating Fruits -->
          <div class="fruit-orbit">
            <div v-for="(fruit, i) in errorFruits" :key="i" 
              class="orbit-fruit"
              :style="{ 
                '--angle': `${i * 60}deg`,
                animationDelay: `${i * -0.5}s`
              }">
              <div class="fruit-glow">
                <img :src="fruit.src" :alt="fruit.name" />
              </div>
            </div>
          </div>

          <!-- Error Code -->
          <div class="holo-badge">
            <span class="holo-text">PRODUCT ERROR</span>
            <span class="holo-code">404</span>
          </div>

          <!-- Main Message -->
          <div class="cyber-msg">
            <h1 class="glitch-title">PRODUCT NOT FOUND</h1>
            
            <div class="product-showcase">
              <div class="showcase-header">
                <div class="header-line"></div>
                <h3 class="showcase-title">DISCOVER OTHER PREMIUM PRODUCTS</h3>
                <div class="header-line"></div>
              </div>
              
              <div class="products-grid">
                <NuxtLink v-for="(product, index) in featuredProducts" :key="index" :to="product.link" class="product-card">
                  <div class="card-shine"></div>
                  <div class="product-image-wrapper">
                    <div class="image-glow"></div>
                    <img :src="product.image" :alt="product.name" class="product-img" />
                    <div class="scan-effect"></div>
                  </div>
                  <div class="product-info">
                    <div class="product-brand">{{ product.brand }}</div>
                    <div class="product-name">{{ product.name }}</div>
                    <div class="product-status">
                      <span class="status-dot"></span>
                      <span class="status-text">AVAILABLE</span>
                    </div>
                  </div>
                  <div class="card-corners-glow">
                    <span class="glow-corner top-left"></span>
                    <span class="glow-corner top-right"></span>
                    <span class="glow-corner bottom-left"></span>
                    <span class="glow-corner bottom-right"></span>
                  </div>
                </NuxtLink>
              </div>
              
              <p class="showcase-message">
                <span class="message-icon">⚡</span>
                <span>Product not found or inactive - But these delicious products are waiting for you!</span>
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="cyber-actions">
            <NuxtLink to="/" class="neon-btn cyan">
              <span class="btn-glow"></span>
              <span class="btn-content">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                HOME
              </span>
            </NuxtLink>

            <NuxtLink to="/brands" class="neon-btn magenta">
              <span class="btn-glow"></span>
              <span class="btn-content">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                ALL BRANDS
              </span>
            </NuxtLink>

            <button @click="$router.back()" class="neon-btn yellow">
              <span class="btn-glow"></span>
              <span class="btn-content">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                BACK
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else-if="product">
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
                  <NuxtLink to="/brands" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Brands
                  </NuxtLink>
                </div>
              </li>
              <li v-if="product.brand">
                <div class="flex items-center">
                  <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <NuxtLink 
                    :to="`/brands/${product.brand.slug}`" 
                    class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {{ product.brand.name }}
                  </NuxtLink>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="ml-4 text-sm font-medium text-gray-500">{{ product.name }}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Product Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Product Images -->
          <div class="space-y-4">
            <!-- Main Image -->
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div v-if="(product.images && product.images.length > 0) || product.image_url">
                <img 
                  :src="getImageUrl(currentImage)" 
                  :alt="product.name" 
                  class="w-full h-full object-cover"
                  @error="handleMainImageError"
                >
              </div>
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <div class="text-center">
                  <svg class="h-24 w-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                  <p class="text-lg">No Image Available</p>
                </div>
              </div>
            </div>

            <!-- Image Thumbnails -->
            <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-2">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="currentImageIndex = index"
                class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors"
                :class="currentImageIndex === index ? 'border-blue-500' : 'border-transparent hover:border-gray-300'"
              >
                <img 
                  :src="getImageUrl(image)" 
                  :alt="`${product.name} view ${index + 1}`" 
                  class="w-full h-full object-cover"
                  @error="handleThumbnailError($event, index)"
                >
              </button>
            </div>
          </div>

          <!-- Product Information -->
          <div class="space-y-6">
            <!-- Brand -->
            <div v-if="product.brand" class="flex flex-col items-center space-y-3">
              <img 
                v-if="product.brand.logo_url || product.brand.logo"
                :src="getImageUrl(product.brand.logo_url || product.brand.logo)" 
                :alt="product.brand.name" 
                class="w-20 h-20 object-contain"
                @error="handleBrandLogoError"
              >
              <NuxtLink 
                :to="`/brands/${product.brand.slug}`"
                class="text-blue-600 hover:text-blue-800 font-medium text-lg text-center"
              >
                {{ product.brand.name }}
              </NuxtLink>
            </div>

            <!-- Product Details -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <div v-if="product.name" class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Product Name</span>
                  <span class="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">{{ product.name }}</span>
                </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-if="product.sku" class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">SKU</span>
                  <span class="text-sm text-gray-900 font-mono bg-grasy-50 px-2 py-1 rounded">{{ product.sku }}</span>
                </div>

                <div v-if="selectedVariant.price || product.price" class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Price</span>
                  <span class="text-sm font-mono bg-blue-50 px-2 py-1 rounded text-blue-700 font-semibold">${{ getCurrentPrice() }}</span>
                </div>

                <div v-if="product.weight" class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Weight</span>
                  <span class="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded">{{ product.weight }} kg</span>
                </div>

                <div v-if="product.brand" class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Brand</span>
                  <span class="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded">{{ product.brand.name }}</span>
                </div>

                <div v-if="product.category" class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Category</span>
                  <span class="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded">{{ product.category.name || product.category }}</span>
                </div>

                <div v-if="productVariants.length > 0" class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Available Flavors</span>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="variant in productVariants" :key="variant.id" class="text-sm text-gray-900 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      {{ variant.name }}
                    </span>
                  </div>
                </div>

                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Product Status</span>
                  <span class="text-sm text-green-700 bg-green-50 px-2 py-1 rounded">Active Product</span>
                </div>
              </div>

              <!-- Featured Badge -->
              <div v-if="product.is_featured" class="mt-4 pt-4 border-t border-gray-200">
                <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Featured Product
                </div>
              </div>
            </div>
        
          </div>
        </div>

        <!-- Product Description -->
        <div v-if="product.description" class="mt-12">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
            <div class="prose max-w-none text-gray-600">
              <p class="whitespace-pre-line">{{ product.description }}</p>
            </div>
          </div>
        </div>

        <!-- Technical Specifications -->
        <div v-if="product.technical_specs && Object.keys(product.technical_specs).length > 0" class="mt-8">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="(value, key) in product.technical_specs" 
                :key="key"
                class="flex justify-between py-2 border-b border-gray-200"
              >
                <span class="font-medium text-gray-900">{{ formatSpecKey(key) }}:</span>
                <span class="text-gray-600">{{ value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Brand Products -->
        <div class="mt-8 text-center">
          <div class="flex justify-center items-center space-x-4">
            <!-- Order Now Button - Telegram Bot -->
            <a 
              href="https://t.me/aprati_order_bot"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-8 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <svg class="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Order Now via Telegram
            </a>
            
            <button 
              @click="refreshProduct"
              :disabled="loading"
              class="flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 text-green-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
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
              <span v-if="loading">Refreshing...</span>
              <span v-else>Refresh Price</span>
            </button>
            
            <NuxtLink 
              v-if="product.brand"
              :to="`/brands/${product.brand.slug}`" 
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <svg class="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to {{ product.brand.name }} Products
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define layout
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

// Reactive data
const product = ref(null)
const loading = ref(true)
const error = ref(false)
const currentImageIndex = ref(0)

// Error page particles - generated client-side
const errorParticles = ref([])

// Simplified reactive data for flavor selection
const selectedVariant = ref({})
const productVariants = ref([])

// Error page data
const errorFruits = [
  { name: 'Grape', src: '/images/Grape Character.png' },
  { name: 'Orange', src: '/images/Orange Charactor.png' },
  { name: 'Pineapple', src: '/images/Pineapple Character copy.png' },
  { name: 'Guava', src: '/images/Guava Charactor.png' },
  { name: 'Tamarin', src: '/images/Tamarin Character.png' },
  { name: 'Plum', src: '/images/Plum CHARACTER.png' }
]

const featuredProducts = [
  { name: 'Grape Juice', brand: 'APRATI', image: '/images/Grape Character.png', link: '/brands' },
  { name: 'Orange Juice', brand: 'FRUTATI', image: '/images/Orange Charactor.png', link: '/brands' },
  { name: 'Pineapple Juice', brand: 'MOCATI', image: '/images/Pineapple Character copy.png', link: '/brands' },
  { name: 'Guava Nectar', brand: 'APRATI', image: '/images/Guava Charactor.png', link: '/brands' }
]

// Get product slug from route params
const slug = route.params.slug

// Computed properties
const currentImage = computed(() => {
  // If product has an images array, use that
  if (product.value?.images && product.value.images.length > 0) {
    return product.value.images[currentImageIndex.value]
  }
  // Otherwise, try to use single image_url field
  if (product.value?.image_url) {
    return product.value.image_url
  }
  return null
})

// Load product details using public API
const loadProduct = async () => {
  try {
    loading.value = true
    error.value = false
    
    console.log(`Loading product with slug: ${slug}`)
    
    const api = useApi()
    const response = await api.request(`/products/${slug}`)
    
    // Handle both response formats: {status: 'success'} and {success: true}
    const isSuccess = response.status === 'success' || response.success === true
    const productData = response.data?.product || response.data
    
    if (isSuccess && productData) {
      product.value = productData
      console.log('Product loaded successfully:', productData.name)
    } else {
      error.value = true
      console.warn('Product not found or inactive:', slug)
      console.warn('Response:', response)
    }
  } catch (err) {
    error.value = true
    console.error('Error loading product:', err)
  } finally {
    loading.value = false
  }
}

// Open Telegram Bot
const openTelegramBot = () => {
  window.open('https://t.me/aprati_order_bot', '_blank', 'noopener,noreferrer')
}

// Get image URL helper function
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/default-info.jpg'
  if (imagePath.startsWith('data:')) return imagePath
  if (imagePath.startsWith('http')) return imagePath
  if (imagePath.startsWith('/storage/')) return `${runtimeConfig.public.apiBaseUrl}${imagePath}`
  return imagePath
}

// Handle main image loading errors
const handleMainImageError = (event) => {
  if (process.server) return
  
  console.error('Main product image failed to load:', {
    imagePath: currentImage.value,
    finalUrl: getImageUrl(currentImage.value)
  })
  
  // Hide the failed image and show placeholder
  event.target.style.display = 'none'
  if (event.target.parentElement) {
    event.target.parentElement.innerHTML = `
      <div class="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <svg class="h-24 w-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <span class="text-lg">Image Not Available</span>
      </div>
    `
  }
}

// Handle thumbnail image loading errors
const handleThumbnailError = (event, index) => {
  if (process.server) return
  
  console.error('Thumbnail image failed to load:', {
    index,
    imagePath: product.value.images[index],
    finalUrl: getImageUrl(product.value.images[index])
  })
  
  // Hide the failed thumbnail
  event.target.style.display = 'none'
  if (event.target.parentElement) {
    event.target.parentElement.innerHTML = `
      <div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">
        No Image
      </div>
    `
  }
}

// Handle brand logo loading errors
const handleBrandLogoError = (event) => {
  if (process.server) return
  
  console.warn('Brand logo failed to load, hiding logo')
  event.target.style.display = 'none'
}

// Format technical specification keys
const formatSpecKey = (key) => {
  return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// Initialize product variants from API data
const initializeProductVariants = () => {
  if (!product.value) return
  
  // Use real variants from API if available
  // API returns 'variants' relationship, filter for active ones
  const variants = product.value.variants || []
  const activeVariants = variants.filter(v => v.is_active !== false && v.is_active !== 0 && v.is_active !== '0')
  
  if (activeVariants.length > 0) {
    productVariants.value = activeVariants
    
    // Set default selected variant (either the one marked as default or the first one)
    const defaultVariant = productVariants.value.find(v => v.is_default) || productVariants.value[0]
    selectedVariant.value = defaultVariant
  } else {
    // Fallback: create a single default variant if no variants exist
    productVariants.value = [
      {
        id: 1,
        name: 'Original',
        price: product.value.price || 25.99,
        is_default: true
      }
    ]
    selectedVariant.value = productVariants.value[0]
  }
}

// Simple price display - prioritize "Original" variant price
const getCurrentPrice = () => {
  // First, try to find "Original" variant price
  if (productVariants.value && productVariants.value.length > 0) {
    const originalVariant = productVariants.value.find(variant => 
      variant.name && variant.name.toLowerCase().includes('original')
    )
    if (originalVariant && originalVariant.price) {
      return originalVariant.price
    }
  }
  
  // If no "Original" variant, use selected variant price
  return selectedVariant.value.price || product.value?.price || 0
}

// Variant selection
const selectVariant = (variant) => {
  selectedVariant.value = variant
}

// Refresh product data
const refreshProduct = async () => {
  console.log('🔄 Refreshing product with latest price...')
  await loadProduct()
  if (product.value) {
    initializeProductVariants()
  }
  console.log('✅ Product price refreshed successfully!')
}

// Load product on component mount
onMounted(async () => {
  // Generate particles on client side to avoid SSR hydration mismatch
  errorParticles.value = Array.from({ length: 20 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 3}s`
  }))
  
  await loadProduct()
  if (product.value) {
    initializeProductVariants()
  }
})

// SEO meta tags
useSeoMeta({
  title: () => product.value ? `${product.value.name} - ${product.value.brand?.name || 'Aprati'} - Aprati Food Company` : 'Product - Aprati Food Company',
  description: () => product.value ? (product.value.short_description || product.value.description) : 'Premium food product details'
})
</script>

<style scoped>
/* Cyberpunk Error Page Styles */
.cyberpunk-error {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
}

/* Scan Lines Effect */
.scan-lines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 128, 255, 0.03) 0px,
    transparent 1px,
    transparent 2px,
    rgba(0, 128, 255, 0.03) 3px
  );
  pointer-events: none;
  animation: scanMove 8s linear infinite;
  z-index: 10;
}

@keyframes scanMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(100px); }
}

/* Grid Background */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 128, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 128, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
  perspective: 1000px;
}

@keyframes gridMove {
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(50px) translateX(50px); }
}

/* Neon Particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: radial-gradient(circle, #0080ff, transparent);
  box-shadow: 0 0 10px #0080ff, 0 0 20px #0080ff;
  animation: particleFloat 3s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
}

/* Main Content */
.cyber-content {
  position: relative;
  z-index: 20;
  width: 100%;
  max-width: 1400px;
  padding: 2rem;
  animation: contentEntry 1s ease-out;
}

@keyframes contentEntry {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hero Box */
.hero-box {
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 128, 255, 0.3);
  border-radius: 20px;
  padding: 4rem 3rem;
  box-shadow: 
    0 0 50px rgba(0, 128, 255, 0.2),
    inset 0 0 50px rgba(0, 128, 255, 0.05);
}

.neon-border {
  position: absolute;
  inset: -2px;
  border-radius: 20px;
  background: linear-gradient(45deg, #0080ff, #ff6600, #ff0033, #00aa44);
  opacity: 0.3;
  filter: blur(10px);
  animation: borderPulse 3s ease-in-out infinite;
  z-index: -1;
}

@keyframes borderPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

/* Fruit Orbit */
.fruit-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  pointer-events: none;
}

.orbit-fruit {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform-origin: 0 0;
  animation: orbitRotate 20s linear infinite;
}

@keyframes orbitRotate {
  from { transform: rotate(var(--angle)) translateX(300px) rotate(calc(-1 * var(--angle))); }
  to { transform: rotate(calc(var(--angle) + 360deg)) translateX(300px) rotate(calc(-1 * (var(--angle) + 360deg))); }
}

.fruit-glow {
  width: 100%;
  height: 100%;
  position: relative;
  animation: fruitFloat 3s ease-in-out infinite;
}

.fruit-glow::before {
  content: '';
  position: absolute;
  inset: -10px;
  background: radial-gradient(circle, rgba(0, 128, 255, 0.3), transparent 70%);
  border-radius: 50%;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes fruitFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.fruit-glow img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(0, 128, 255, 0.5));
}

/* Holographic Badge */
.holo-badge {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
}

.holo-text {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  background: linear-gradient(90deg, #0080ff, #ff6600, #ff0033, #00aa44, #0080ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: holoShift 3s linear infinite;
  text-shadow: 0 0 20px rgba(0, 128, 255, 0.5);
}

.holo-code {
  display: block;
  font-size: 6rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-top: 0.5rem;
  background: linear-gradient(90deg, #0080ff, #ff6600);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: holoShift 2s linear infinite, glitch 5s steps(2) infinite;
  filter: drop-shadow(0 0 30px rgba(0, 128, 255, 0.8));
}

@keyframes holoShift {
  to { background-position: 200% center; }
}

@keyframes glitch {
  0%, 90%, 100% { transform: translate(0); }
  92% { transform: translate(-2px, 2px); }
  94% { transform: translate(2px, -2px); }
  96% { transform: translate(-2px, -2px); }
  98% { transform: translate(2px, 2px); }
}

/* Message */
.cyber-msg {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 10;
}

.glitch-title {
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #0080ff;
  text-shadow: 
    0 0 10px rgba(0, 128, 255, 0.5),
    0 0 20px rgba(0, 128, 255, 0.3),
    0 0 30px rgba(0, 128, 255, 0.2);
  margin-bottom: 3rem;
  animation: titlePulse 2s ease-in-out infinite;
}

@keyframes titlePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Product Showcase */
.product-showcase {
  margin: 3rem 0;
  padding: 2rem;
  background: rgba(0, 128, 255, 0.02);
  border-radius: 15px;
  border: 1px solid rgba(0, 128, 255, 0.2);
}

.showcase-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  justify-content: center;
}

.header-line {
  flex: 1;
  max-width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #0080ff, transparent);
  box-shadow: 0 0 10px rgba(0, 128, 255, 0.5);
}

.showcase-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #0080ff;
  text-shadow: 0 0 20px rgba(0, 128, 255, 0.6);
  white-space: nowrap;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}

.product-card {
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 128, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  display: block;
}

.product-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 128, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover {
  transform: translateY(-10px) scale(1.05);
  border-color: #0080ff;
  box-shadow: 
    0 20px 60px rgba(0, 128, 255, 0.4),
    inset 0 0 30px rgba(0, 128, 255, 0.1);
}

.product-card:hover::before {
  opacity: 1;
}

.card-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: rotate(45deg);
  animation: cardShine 3s ease-in-out infinite;
}

@keyframes cardShine {
  0%, 100% { transform: translateX(-100%) rotate(45deg); }
  50% { transform: translateX(100%) rotate(45deg); }
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 10px;
}

.image-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(0, 128, 255, 0.3), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover .image-glow {
  opacity: 1;
  animation: imageGlowPulse 2s ease-in-out infinite;
}

@keyframes imageGlowPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(0, 128, 255, 0.3));
  transition: all 0.4s ease;
}

.product-card:hover .product-img {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 0 30px rgba(0, 128, 255, 0.6));
}

.scan-effect {
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(0, 128, 255, 0.3),
    transparent
  );
  animation: scanDown 3s ease-in-out infinite;
}

@keyframes scanDown {
  0%, 100% { top: -100%; }
  50% { top: 100%; }
}

.product-info {
  position: relative;
  z-index: 5;
}

.product-brand {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #ff6600;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.5);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0080ff;
  text-shadow: 0 0 15px rgba(0, 128, 255, 0.5);
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.product-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #00aa44;
  text-shadow: 0 0 10px rgba(0, 170, 68, 0.5);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00aa44;
  box-shadow: 0 0 10px #00aa44;
  animation: statusBlink 2s ease-in-out infinite;
}

@keyframes statusBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.card-corners-glow {
  pointer-events: none;
}

.glow-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover .glow-corner {
  opacity: 1;
}

.glow-corner.top-left {
  top: -1px;
  left: -1px;
  border-top: 2px solid #0080ff;
  border-left: 2px solid #0080ff;
  box-shadow: 0 0 10px #0080ff;
}

.glow-corner.top-right {
  top: -1px;
  right: -1px;
  border-top: 2px solid #ff6600;
  border-right: 2px solid #ff6600;
  box-shadow: 0 0 10px #ff6600;
}

.glow-corner.bottom-left {
  bottom: -1px;
  left: -1px;
  border-bottom: 2px solid #ff0033;
  border-left: 2px solid #ff0033;
  box-shadow: 0 0 10px #ff0033;
}

.glow-corner.bottom-right {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid #00aa44;
  border-right: 2px solid #00aa44;
  box-shadow: 0 0 10px #00aa44;
}

.showcase-message {
  text-align: center;
  font-size: 1.1rem;
  color: #0080ff;
  text-shadow: 0 0 15px rgba(0, 128, 255, 0.5);
  padding: 1.5rem;
  background: rgba(0, 128, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(0, 128, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  letter-spacing: 0.05em;
}

.message-icon {
  font-size: 1.5rem;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Action Buttons */
.cyber-actions {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;
}

.neon-btn {
  position: relative;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  border: 2px solid;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.neon-btn.cyan {
  color: #0080ff;
  border-color: #0080ff;
  box-shadow: 0 0 20px rgba(0, 128, 255, 0.3);
}

.neon-btn.magenta {
  color: #ff6600;
  border-color: #ff6600;
  box-shadow: 0 0 20px rgba(255, 102, 0, 0.3);
}

.neon-btn.yellow {
  color: #ff0033;
  border-color: #ff0033;
  box-shadow: 0 0 20px rgba(255, 0, 51, 0.3);
}

.btn-glow {
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle, currentColor, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.neon-btn:hover .btn-glow {
  opacity: 0.3;
  animation: btnGlowPulse 1.5s ease-in-out infinite;
}

@keyframes btnGlowPulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 0.15; }
}

.btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2.5;
}

.neon-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 40px currentColor;
}

.neon-btn.cyan:hover {
  background: rgba(0, 128, 255, 0.1);
  box-shadow: 0 10px 40px rgba(0, 128, 255, 0.6);
}

.neon-btn.magenta:hover {
  background: rgba(255, 102, 0, 0.1);
  box-shadow: 0 10px 40px rgba(255, 102, 0, 0.6);
}

.neon-btn.yellow:hover {
  background: rgba(255, 0, 51, 0.1);
  box-shadow: 0 10px 40px rgba(255, 0, 51, 0.6);
}

.neon-btn:active {
  transform: translateY(-1px) scale(1);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .cyber-content {
    padding: 1rem;
  }

  .hero-box {
    padding: 2rem 1.5rem;
  }

  .fruit-orbit {
    width: 300px;
    height: 300px;
  }

  .orbit-fruit {
    width: 50px;
    height: 50px;
  }

  @keyframes orbitRotate {
    from { transform: rotate(var(--angle)) translateX(150px) rotate(calc(-1 * var(--angle))); }
    to { transform: rotate(calc(var(--angle) + 360deg)) translateX(150px) rotate(calc(-1 * (var(--angle) + 360deg))); }
  }

  .holo-code {
    font-size: 4rem;
  }

  .glitch-title {
    font-size: 1.5rem;
  }

  .showcase-title {
    font-size: 1rem;
  }

  .cyber-actions {
    flex-direction: column;
    gap: 1rem;
  }

  .neon-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
