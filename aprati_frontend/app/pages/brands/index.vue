<template>
  <div class="min-h-screen bg-gray-50 relative">
    <!-- Subtle Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgb(0 0 0 / 0.15) 1px, transparent 0); background-size: 32px 32px;"></div>
    </div>

    <!-- Modern Hero Section -->
    <section class="relative py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <!-- Animated Background Shapes -->
      <div class="absolute inset-0 overflow-hidden opacity-20">
        <div class="absolute -top-1/2 -left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-indigo-300 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <div class="inline-flex items-center px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span class="text-sm font-semibold text-white tracking-wide">Premium Collection</span>
          </div>

          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight text-white px-4">
            Our Premium Brands
          </h1>
          <div class="w-16 sm:w-20 md:w-24 h-1 bg-white/50 mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"></div>
          <p class="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto px-4">
            Discover our premium food brand collection crafted with excellence and innovation.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <!-- Circular Orbit Animation -->
        <div class="relative mx-auto w-72 h-72 mb-12">
          <!-- Orbit path circle -->
          <div class="absolute inset-0 rounded-full border-2 border-dashed border-blue-300 opacity-30"></div>
          
          <!-- Center logo -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl animate-pulse">
              <span class="text-white text-3xl font-bold">A</span>
            </div>
          </div>
          
          <!-- Spinning characters container -->
          <div class="absolute inset-0 animate-spin" style="animation-duration: 8s;">
            <!-- Character 1 - Top -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src="/images/Grape Character.png" alt="" class="w-16 h-16 object-contain drop-shadow-xl" />
            </div>
            
            <!-- Character 2 - Top Right -->
            <div class="absolute top-[14.6%] right-[14.6%] -translate-x-1/2 -translate-y-1/2">
              <img src="/images/Orange Charactor.png" alt="" class="w-16 h-16 object-contain drop-shadow-xl" />
            </div>
            
            <!-- Character 3 - Right -->
            <div class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
              <img src="/images/Pineapple Character copy.png" alt="" class="w-16 h-16 object-contain drop-shadow-xl" />
            </div>
            
            <!-- Character 4 - Bottom Right -->
            <div class="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2">
              <img src="/images/Guava Charactor.png" alt="" class="w-16 h-16 object-contain drop-shadow-xl" />
            </div>
            
            <!-- Character 5 - Bottom -->
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <img src="/images/Tamarin Character.png" alt="" class="w-16 h-16 object-contain drop-shadow-xl" />
            </div>
            
            <!-- Character 6 - Bottom Left -->
            <div class="absolute bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2">
              <img src="/images/Plum CHARACTER.png" alt="" class="w-16 h-16 object-contain drop-shadow-xl" />
            </div>
          </div>
        </div>
        
        <p class="text-gray-700 text-xl font-semibold animate-pulse">Loading our premium brands...</p>
        <p class="mt-2 text-gray-500 text-sm">Preparing something delicious for you</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center">
        <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {{ error || 'Failed to load brands' }}
      </div>

      <!-- Brands Grid -->
      <div v-if="!loading && !error && brands.length > 0" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        <div 
          v-for="(brand, index) in brands" 
          :key="brand.id"
          class="group relative"
        >
          <NuxtLink :to="`/brands/${brand.slug}`" class="block">
          <!-- Modern Card -->
          <div class="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm sm:shadow-md lg:shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-500">
            <div class="overflow-hidden">
              <div class="flex flex-col">
                <!-- Visual Section -->
                <div class="relative overflow-hidden">
                  <div class="h-36 sm:h-48 md:h-56 lg:h-64 relative transition-all duration-200 active:scale-95 sm:group-hover:scale-105">
                    <!-- Background Image -->
                    <img 
                      v-if="brand.cover_image_url || brand.cover_image"
                      :src="getImageUrl(brand.cover_image_url || brand.cover_image)" 
                      :alt="`${brand.name} cover`"
                      class="absolute inset-0 w-full h-full object-cover"
                      @error="handleCoverError($event, brand)"
                    />
                    
                    <!-- Fallback gradient background -->
                    <div 
                      v-else
                      :class="[
                        'absolute inset-0',
                        getBrandGradient(brand.slug, index)
                      ]"
                    ></div>
                    
                    <!-- Subtle overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    <!-- Logo overlay -->
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div v-if="brand.logo_url || brand.logo" class="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center p-2 sm:p-3 md:p-4 shadow-md sm:shadow-lg group-hover:scale-110 transition-all duration-300">
                        <img 
                          :src="getImageUrl(brand.logo_url || brand.logo)" 
                          :alt="brand.name" 
                          class="max-w-full max-h-full object-contain"
                          @error="handleLogoError($event, brand)"
                        >
                      </div>
                      <div v-else class="text-lg sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                        {{ brand.name }}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Status Badge -->
                  <div class="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <div class="flex items-center space-x-1 sm:space-x-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-white/90 backdrop-blur-sm shadow-sm">
                      <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                      <span class="text-[8px] sm:text-[10px] md:text-xs font-semibold text-gray-700 hidden sm:inline">{{ brand.name }}</span>
                    </div>
                  </div>

                  <!-- Hover Overlay - Hidden on mobile -->
                  <div class="hidden sm:flex absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 items-center justify-center">
                    <div class="opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div class="bg-white rounded-full p-2 shadow-lg">
                        <svg class="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Content Section -->
                <div class="flex flex-col justify-center p-2.5 sm:p-4 md:p-5 lg:p-6 bg-gray-50">
                  <!-- Category Badge - Hidden on mobile -->
                  <div class="mb-2 sm:mb-3 hidden sm:block">
                    <span class="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-blue-50 text-blue-700 text-[10px] sm:text-xs font-semibold">
                      <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full mr-1 sm:mr-1.5"></div>
                      Premium
                    </span>
                  </div>
                  
                  <!-- Title -->
                  <h3 class="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3 leading-tight">
                    {{ brand.name }}
                  </h3>
                  
                  <!-- Description - Hidden on mobile, shown on tablet+ -->
                  <div class="hidden sm:block text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
                    <p class="line-clamp-3">
                      {{ brand.description && brand.description.length > 100 ? brand.description.substring(0, 100) + '...' : (brand.description || 'Premium quality products with innovative solutions.') }}
                    </p>
                  </div>
                  
                  <!-- Action Button -->
                  <div class="flex items-center">
                    <div class="group/btn inline-flex items-center justify-center w-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl bg-blue-600 text-white font-semibold text-[10px] sm:text-xs md:text-sm transition-all duration-200 active:scale-95 sm:hover:bg-blue-700 sm:hover:shadow-lg">
                      <span>View</span>
                      <svg class="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="text-center py-20">
        <div class="max-w-3xl mx-auto">
          <!-- Icon -->
          <div class="relative mb-12">
            <div class="w-32 h-32 mx-auto relative">
              <div class="absolute inset-0 rounded-full bg-gray-200"></div>
              <div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
            </div>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
          <p class="text-gray-600">Our brand collection is being curated. Check back soon to discover our premium offerings.</p>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <section class="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden" v-if="!loading && brands.length > 0">
      <!-- Subtle Background Shapes -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-300 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span class="text-sm font-semibold text-white tracking-wide">Ready to Explore</span>
        </div>
        
        <h2 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white px-4">
          Discover Our Premium Products
        </h2>
        <p class="text-sm sm:text-base lg:text-lg text-blue-100 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto px-4">
          Bring quality and excellence to your table with our carefully crafted food brands.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <NuxtLink 
            to="/contact" 
            class="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-white text-blue-700 font-semibold text-sm sm:text-base hover:bg-blue-50 transition-all duration-300 hover:shadow-xl"
          >
            Contact Us
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
          
          <NuxtLink 
            to="/" 
            class="inline-flex items-center px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
          >
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </section>


  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()

const brands = ref([])
const loading = ref(true)
const error = ref(null)

// Handle logo image loading errors
const handleLogoError = (event, brand) => {
  // Prevent infinite loop by checking if we already set a fallback
  if (event.target.dataset.fallbackSet === 'true') {
    console.warn(`Fallback image also failed for ${brand.name}, hiding image`)
    event.target.style.display = 'none'
    return
  }
  
  console.warn(`Brand logo failed to load for ${brand.name}, using fallback`)
  
  // Mark that we're setting a fallback to prevent loops
  event.target.dataset.fallbackSet = 'true'
  
  // Create a local SVG placeholder
  const svg = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#6366f1"/>
      <text x="100" y="100" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
            text-anchor="middle" dominant-baseline="middle" fill="white">
        ${brand.name}
      </text>
    </svg>
  `)}`
  event.target.src = svg
}

// Handle cover image loading errors
const handleCoverError = (event, brand) => {
  console.warn(`Brand cover image failed to load for ${brand.name}, hiding image`)
  // Hide the entire cover image container and show gradient fallback
  const coverContainer = event.target.closest('.h-48')
  if (coverContainer) {
    coverContainer.style.display = 'none'
  }
}

// Load brands from API using public endpoint
const loadBrands = async () => {
  try {
    loading.value = true
    error.value = null
    console.log('Loading brands from public API...')
    const api = useApi()
    const response = await api.request('/brands')
    
    console.log('Brands API result:', response)
    
    if ((response.success || response.status === 'success') && response.data) {
      const brandsList = response.data.brands || response.data
      brands.value = (Array.isArray(brandsList) ? brandsList : []).filter(brand => brand.is_active)
      console.log('Loaded brands:', brands.value)
    } else {
      console.warn('Invalid API response structure:', response)
      brands.value = []
    }
  } catch (err) {
    console.error('Error loading brands:', err)
    error.value = 'Failed to load brands. Please try again later.'
    brands.value = []
  } finally {
    loading.value = false
  }
}

// Get brand gradient based on slug or use default colors
const getBrandGradient = (slug) => {
  const gradients = {
    'aprati': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'frutati': 'bg-gradient-to-br from-green-500 to-green-600',
    'mocati': 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
  
  // If brand has a specific gradient, use it
  if (gradients[slug]) {
    return gradients[slug]
  }
  
  // Otherwise, generate a gradient based on the brand name
  const colors = [
    'bg-gradient-to-br from-red-500 to-red-600',
    'bg-gradient-to-br from-orange-500 to-orange-600',
    'bg-gradient-to-br from-blue-600 to-blue-700',
    'bg-gradient-to-br from-green-600 to-green-700',
    'bg-gradient-to-br from-red-600 to-orange-600'
  ]
  
  // Simple hash function to consistently pick a color
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i)
    hash = hash & hash // Convert to 32bit integer
  }
  
  return colors[Math.abs(hash) % colors.length]
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

// Load brands on component mount
onMounted(() => {
  loadBrands()
})

useSeoMeta({
  title: 'Our Brands - Aprati Foods (Cambodia) Ltd',
  description: 'Discover our premium food brand collection including innovative food solutions'
})
</script>

<style scoped>
/* Magnetic Field Loading Animations */
@keyframes magneticRing {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.1); opacity: 0.4; }
}

@keyframes magneticPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
  50% { transform: scale(1.15); box-shadow: 0 0 40px rgba(147, 51, 234, 0.8); }
}

@keyframes floatOrbit1 {
  0%, 100% { transform: translate(40px, -100px) scale(1); }
  25% { transform: translate(100px, -60px) scale(1.1); }
  50% { transform: translate(80px, 20px) scale(0.9); }
  75% { transform: translate(20px, -40px) scale(1.05); }
}

@keyframes floatOrbit2 {
  0%, 100% { transform: translate(120px, -40px) scale(1); }
  25% { transform: translate(100px, 40px) scale(0.95); }
  50% { transform: translate(60px, 80px) scale(1.1); }
  75% { transform: translate(100px, 0px) scale(1.05); }
}

@keyframes floatOrbit3 {
  0%, 100% { transform: translate(140px, 40px) scale(1.05); }
  25% { transform: translate(80px, 100px) scale(0.9); }
  50% { transform: translate(20px, 60px) scale(1.15); }
  75% { transform: translate(100px, 60px) scale(1); }
}

@keyframes floatOrbit4 {
  0%, 100% { transform: translate(100px, 120px) scale(1); }
  25% { transform: translate(20px, 100px) scale(1.1); }
  50% { transform: translate(-40px, 40px) scale(0.95); }
  75% { transform: translate(40px, 100px) scale(1.05); }
}

@keyframes floatOrbit5 {
  0%, 100% { transform: translate(-60px, 100px) scale(0.95); }
  25% { transform: translate(-100px, 40px) scale(1.1); }
  50% { transform: translate(-80px, -20px) scale(1); }
  75% { transform: translate(-60px, 60px) scale(1.05); }
}

@keyframes floatOrbit6 {
  0%, 100% { transform: translate(-120px, 0px) scale(1); }
  25% { transform: translate(-100px, -60px) scale(1.05); }
  50% { transform: translate(-40px, -80px) scale(0.9); }
  75% { transform: translate(-100px, -20px) scale(1.1); }
}

@keyframes rotateChar {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes energyBar {
  0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
  50% { transform: scaleY(1); opacity: 1; }
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.8), transparent);
  border-radius: 50%;
  animation: particleFloat 3s ease-in-out infinite;
}

.particle-1 {
  top: 20%;
  left: 30%;
  animation-delay: 0s;
}

.particle-2 {
  top: 40%;
  left: 70%;
  animation-delay: 0.5s;
}

.particle-3 {
  top: 60%;
  left: 20%;
  animation-delay: 1s;
}

.particle-4 {
  top: 80%;
  left: 60%;
  animation-delay: 1.5s;
}

.particle-5 {
  top: 50%;
  left: 50%;
  animation-delay: 2s;
}

@keyframes particleFloat {
  0%, 100% { transform: translate(0, 0) scale(0.5); opacity: 0; }
  25% { transform: translate(20px, -30px) scale(1); opacity: 1; }
  50% { transform: translate(0, -50px) scale(0.8); opacity: 0.5; }
  75% { transform: translate(-20px, -30px) scale(1); opacity: 1; }
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
