<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Animated Fruit Characters -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute top-1/4 right-1/6 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="animation-delay: 0.5s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute bottom-1/3 left-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 1s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-1/2 right-1/4 w-20 h-20 object-contain opacity-20 animate-float-delayed" style="animation-delay: 1.5s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-1/6 right-1/3 w-16 h-16 object-contain opacity-16 animate-float" style="animation-delay: 2s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute top-2/3 left-1/6 w-14 h-14 object-contain opacity-14 animate-float-delayed" style="animation-delay: 0.8s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute bottom-1/4 right-1/6 w-16 h-16 object-contain opacity-15 animate-float" style="animation-delay: 1.2s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute top-3/4 left-1/3 w-14 h-14 object-contain opacity-18 animate-float-delayed" style="animation-delay: 1.8s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/5 right-1/5 w-20 h-20 object-contain opacity-13 animate-float" style="animation-delay: 2.3s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 0.3s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-2/5 left-2/5 w-14 h-14 object-contain opacity-10 animate-float" style="animation-delay: 1.4s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-3/5 right-2/5 w-20 h-20 object-contain opacity-16 animate-float-delayed" style="animation-delay: 0.7s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-4/5 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="animation-delay: 1.9s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-4/5 right-1/4 w-14 h-14 object-contain opacity-15 animate-float-delayed" style="animation-delay: 0.4s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/3 left-2/3 w-16 h-16 object-contain opacity-18 animate-float" style="animation-delay: 2.1s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-1/5 right-2/3 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="animation-delay: 1.6s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-3/5 right-1/5 w-14 h-14 object-contain opacity-11 animate-float" style="animation-delay: 0.9s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-2/3 left-3/5 w-16 h-16 object-contain opacity-19 animate-float-delayed" style="animation-delay: 2.2s;" />
    </div>
    <!-- Hero Section -->
    <section class="bg-blue-200 relative overflow-hidden py-24">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <!-- Hero Content Bar -->
          <div class="relative mb-8">  
            <div class="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-blue-800 mb-6">
              <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"> </div>
              <span class="text-sm font-semibold tracking-wide uppercase">About Our Company</span>
            </div>
          </div>

          <h1 class="text-4xl lg:text-6xl font-black text-blue-500 mb-6 leading-tight">
            About <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Aprati</span>
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-blue-500 max-w-4xl mx-auto">
            Discover our story, mission, and unwavering commitment to delivering exceptional food products.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="relative">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        </div>
        <p class="mt-8 text-gray-600 text-lg font-medium">Loading company information...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center">
        <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {{ error }}
      </div>

      <!-- Content Sections - Home Page Style -->
      <div v-if="!loading && !error && posts.length > 0" class="space-y-8">
        <div 
          v-for="(post, index) in posts" 
          :key="post.id"
          class="group relative cursor-pointer"
          @click="openModal(post)"
        >
          <!-- Card -->
          <div class="bg-white rounded-3xl shadow-lg border border-blue-500 p-1 hover:shadow-xl transition-all duration-500 group-hover:scale-[1.01] overflow-hidden">
            <!-- Inner Card --> 
            <div class="rounded-2xl overflow-hidden">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[300px]">
                <!-- Visual Section -->
                <div class="relative overflow-hidden rounded-2xl" :class="index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'">
                  <div class="h-full min-h-[300px] relative transition-all duration-700 group-hover:scale-105" :data-index="index">
                    <!-- Background Image -->
                    <img 
                      :src="getImageForIndex(index)" 
                      :alt="`${post.name || post.title} image`"
                      class="absolute inset-0 w-full h-full object-cover"
                      @error="handleImageError"
                    />
                    
                    <!-- Gradient Overlay - only for placeholder images, none for uploaded images -->
                    <div 
                      v-if="!post.image_url"
                      :class="[
                        'absolute inset-0 opacity-80',
                        (post.sort_order - 1) % 4 === 0 ? 'bg-gradient-to-br from-blue-600/80 to-blue-800/80' :
                        (post.sort_order - 1) % 4 === 1 ? 'bg-gradient-to-br from-red-600/80 to-red-800/80' :
                        (post.sort_order - 1) % 4 === 2 ? 'bg-gradient-to-br from-emerald-600/80 to-emerald-800/80' :
                        'bg-gradient-to-br from-orange-600/80 to-orange-800/80'
                      ]"
                    ></div>
                    
                    <!-- Light overlay for uploaded images to ensure text readability -->
                    <div 
                      v-if="post.image_url"
                      class="absolute inset-0 bg-black/20"
                    ></div>
                    
                    <!-- Content over image -->
                    <div class="relative z-10 h-full flex items-center justify-center text-white p-8">
                      
                    </div>
                  </div>
                  
                  <!-- Floating Status -->
                  <div class="absolute top-6 right-6">
                    <div class="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/30">
                       
                        <h3 class="text-xs text-white font-bold opacity-95 mb-4">{{ post.name || post.title }}</h3>
                     
                      <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <!-- Click to View Overlay -->
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                      <div class="bg-white/90 backdrop-blur-sm rounded-full p-4 border border-white/50 shadow-lg">
                        <svg class="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Content Section -->
                <div class="flex flex-col justify-center p-8 lg:p-12" :class="index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'">
                  <!-- Category Badge -->
                  <div class="mb-4">
                    <span class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-sm font-semibold">
                      <div class="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                      About Us
                    </span>
                  </div>
                  
                  <!-- Title -->
                  <h3 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {{ post.name || post.title }}
                  </h3>
                  
                  <!-- Description -->
                  <div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-8">
                    <p class="line-clamp-4">{{ post.description.length > 150 ? post.description.substring(0, 150) + '...' : post.description }}</p>
                  </div>
                  
                  <!-- Action Button -->
                  <div class="flex items-center">
                    <button 
                      @click.stop="openModal(post)"
                      class="group/btn relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1"
                    >
                      <span class="relative z-10">View Details</span>
                      <svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="max-w-3xl mx-auto">
          <!-- Icon -->
          <div class="relative mb-12">
            <div class="w-32 h-32 mx-auto relative">
              <div class="absolute inset-0 rounded-full bg-gray-200"></div>
              <div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
            </div>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
          <p class="text-gray-600">Our story is being crafted. Check back soon to learn more about us.</p>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="bg-gray-100 py-16" v-if="!loading && posts.length > 0">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Ready to Experience Our Products?</h2>
        <p class="text-xl text-gray-600 mb-8">
          Discover our premium food brands and bring quality to your table.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/brands" 
            class="group relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-900 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-700/25 transform hover:scale-105"
          >
            <span class="relative z-10">Explore Our Brands</span>
            <svg class="relative z-10 ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
          
          <NuxtLink 
            to="/contact" 
            class="group inline-flex items-center px-8 py-4 rounded-2xl border-2 border-gray-500 text-gray-700 font-bold text-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
          >
            Contact Us
            <svg class="ml-3 w-6 h-6 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedPost" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" @click="closeModal">
      <div class="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-slideUp" @click.stop>
        <!-- Header -->
        <div class="relative bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
          <button 
            @click="closeModal" 
            class="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <h3 class="text-2xl lg:text-3xl font-bold text-white pr-12">{{ selectedPost.name || selectedPost.title }}</h3>
          <div class="flex items-center mt-3 text-white/80">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-sm">Company Information</span>
          </div>
        </div>

        <!-- Content -->
        <div class="px-8 py-6 overflow-y-auto max-h-[calc(85vh-140px)]">
          <!-- Image Section -->
          <div v-if="selectedPost.image_url" class="mb-8">
            <div class="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                :src="fixImageUrl(selectedPost.image_url)" 
                :alt="selectedPost.name || selectedPost.title"
                class="w-full h-auto max-h-[400px] object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
              
          <!-- Description Section -->
          <div class="prose prose-lg max-w-none">
            <p class="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{{ selectedPost.description }}</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-8 py-4 bg-gray-50 border-t border-gray-100">
          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-500">
              <span>Last updated: {{ formatDate(selectedPost.updated_at) }}</span>
            </div>
            <button 
              @click="closeModal"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// State
const posts = ref([])
const loading = ref(true)
const error = ref(null)
const selectedPost = ref(null)

// Get API instance
const api = useApi()
const runtimeConfig = useRuntimeConfig()

// Methods
const loadPosts = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await api.aboutContent.getAll()
    
    if (response.success && response.data) {
      // Convert the keyed object to an array for the frontend
      posts.value = Object.values(response.data).map(item => ({
        id: item.id,
        name: item.title,        // Map title to name for frontend compatibility
        title: item.title,
        description: item.content, // Map content to description for frontend compatibility
        image_url: item.image_url, // Include the uploaded image URL
        sort_order: item.sort_order || 1, // Include sort order
        created_at: item.created_at,
        updated_at: item.updated_at
      })).sort((a, b) => a.sort_order - b.sort_order) // Sort by sort_order (ascending)
      console.log('Loaded posts with images:', posts.value.map(p => ({ title: p.title, has_image: !!p.image_url, image_url: p.image_url, sort_order: p.sort_order })))
    } else {
      posts.value = []
    }
  } catch (err) {
    console.error('Error loading about content:', err)
    error.value = 'Failed to load content. Please try again later.'
    posts.value = []
  } finally {
    loading.value = false
  }
}

const openModal = (post) => {
  selectedPost.value = post
}

const closeModal = () => {
  selectedPost.value = null
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (e) {
    return 'N/A'
  }
}

// Helper to fix image URLs
const fixImageUrl = (url) => {
  if (!url) return ''
  
  // If it's a full URL already, just handle localhost overrides
  if (url.startsWith('http')) {
    let fixedUrl = url
    if (fixedUrl.includes('127.0.0.1:8000') || fixedUrl.includes('localhost')) {
      fixedUrl = fixedUrl.replace(/http:\/\/127\.0\.0\.1:8000/g, runtimeConfig.public.apiBaseUrl)
      fixedUrl = fixedUrl.replace(/http:\/\/localhost:8000/g, runtimeConfig.public.apiBaseUrl)
      fixedUrl = fixedUrl.replace(/http:\/\/localhost/g, runtimeConfig.public.apiBaseUrl)
    }
    return fixedUrl
  }
  
  // If it starts with /storage
  if (url.startsWith('/storage/')) {
    return `${runtimeConfig.public.apiBaseUrl}${url}`
  }
  
  // If it's just a filename, assume it's in storage/about-content/ (or just storage/)
  // Based on the user's example: storage/about-content/filename
  return `${runtimeConfig.public.apiBaseUrl}/storage/about-content/${url}`
}

// Get image for index - use uploaded images from API
const getImageForIndex = (index) => {
  const post = posts.value[index]
  
  // Use uploaded image from API if available
  if (post && post.image_url) {
    return fixImageUrl(post.image_url)
  }
  
  // Return invalid data URL to trigger gradient fallback
  return 'data:image/svg+xml;base64,invalid'
}

// Handle image loading errors - fallback to gradient
const handleImageError = (event) => {
  const img = event.target
  const container = img.parentElement
  
  console.log('Image failed to load:', img.src)
  
  // Hide the broken image
  img.style.display = 'none'
  
  // Get the index from the container's data attribute
  const index = parseInt(container.dataset.index) || 0
  
  // Get the post data to check if this was an uploaded image
  const post = posts.value[index]
  
  // Only add gradient fallback if this wasn't an uploaded image
  if (!post || !post.image_url) {
    // Add gradient background as fallback for placeholder images
    const gradients = [
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-red-500 to-red-600', 
      'bg-gradient-to-br from-emerald-400 to-emerald-600',
      'bg-gradient-to-br from-orange-400 to-orange-600'
    ]
    
    // Use the post's sort_order for consistent theming
    const themeIndex = (post?.sort_order - 1) || index
    const gradientClasses = gradients[themeIndex % 4].split(' ')
    container.classList.add(...gradientClasses)
  }
}

// Lifecycle
onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

/* Custom scrollbar for modal content */
.prose::-webkit-scrollbar {
  width: 6px;
}

.prose::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.prose::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.prose::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
