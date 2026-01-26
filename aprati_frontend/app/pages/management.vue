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
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/5 right-1/5 w-14 h-14 object-contain opacity-13 animate-float" style="animation-delay: 2.3s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 0.3s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-2/5 left-2/5 w-20 h-20 object-contain opacity-10 animate-float" style="animation-delay: 1.4s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-3/5 right-2/5 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="animation-delay: 0.7s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-4/5 left-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 1.9s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-4/5 right-1/4 w-20 h-20 object-contain opacity-15 animate-float-delayed" style="animation-delay: 0.4s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/3 left-2/3 w-16 h-16 object-contain opacity-18 animate-float" style="animation-delay: 2.1s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-1/5 right-2/3 w-14 h-14 object-contain opacity-14 animate-float-delayed" style="animation-delay: 1.6s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-3/5 right-1/5 w-20 h-20 object-contain opacity-11 animate-float" style="animation-delay: 0.9s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-2/3 left-3/5 w-16 h-16 object-contain opacity-19 animate-float-delayed" style="animation-delay: 2.2s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/8 right-3/4 w-14 h-14 object-contain opacity-13 animate-float" style="animation-delay: 1.1s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/8 left-3/4 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 0.2s;" />
    </div>
    <!-- Hero Section -->
    <section class="bg-blue-200 relative overflow-hidden py-24">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-blue-700/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <!-- Hero Content Bar -->
          <div class="relative mb-8">  
            <div class="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-blue-800 mb-6">
              <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
              <span class="text-sm font-semibold tracking-wide uppercase">Leadership Team</span>
            </div>
          </div>

          <h1 class="text-4xl lg:text-6xl font-black text-blue-600 mb-6 leading-tight">
            Top <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Management</span>
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-blue-500 max-w-4xl mx-auto">
            Meet the visionary leaders driving innovation and excellence at Aprati Food Company.
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
        <p class="mt-8 text-gray-600 text-lg font-medium">Loading leadership team...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center">
        <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {{ error }}
      </div>

      <!-- Management Team Grid - Home Page Style -->
      <div v-if="!loading && !error && posts.length > 0" class="space-y-8">
        <div 
          v-for="(post, index) in posts" 
          :key="post.id"
          class="group relative cursor-pointer"
          @click="openModal(post)"
        >
          <!-- Card -->
          <div class="bg-white rounded-2xl shadow-md border border-blue-100 p-0.5 hover:shadow-lg transition-all duration-500 group-hover:scale-[1.005] flex justify-center items-center min-h-[250px] overflow-hidden">
            <!-- Inner Card --> 
            <div class="rounded-2xl w-full flex items-center justify-center overflow-hidden text-center">
              <div class="w-full flex flex-col items-center justify-center text-center p-6 lg:p-8 max-w-2xl">
                <!-- Profile Avatar -->
                <div class="w-32 h-32 mx-auto mb-6 relative">
                  <div class="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"></div>
                  <div class="absolute inset-2 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <span class="text-4xl font-bold text-gray-800">{{ getInitials(post.name) }}</span>
                  </div>
                </div>
                
               
                <!-- Name -->
                <h3 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {{ post.name }}
                </h3>
                <!-- Description -->
                <div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-6">
                  <p class="line-clamp-4">{{ post.description.length > 150 ? post.description.substring(0, 150) + '...' : post.description }}</p>
                </div>
                <!-- Action Button -->
                <div class="flex items-center justify-center">
                  <button 
                    @click.stop="openModal(post)"
                    class="group/btn relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <span class="relative z-10">View Detail</span>
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

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="max-w-3xl mx-auto">
          <!-- Icon -->
          <div class="relative mb-12">
            <div class="w-32 h-32 mx-auto relative">
              <div class="absolute inset-0 rounded-full bg-gray-200"></div>
              <div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">Leadership Team Coming Soon</h3>
          <p class="text-gray-600">Meet our leadership team information will be available soon.</p>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="bg-gray-100 py-16" v-if="!loading && posts.length > 0">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Join Our Growing Team</h2>
        <p class="text-xl text-gray-600 mb-8">
          Discover exciting career opportunities and become part of our success story.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/careers" 
            class="group relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-900 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-700/25 transform hover:scale-105"
          >
            <span class="relative z-10">View Careers</span>
            <svg class="relative z-10 ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
          
          <NuxtLink 
            to="/about" 
            class="group inline-flex items-center px-8 py-4 rounded-2xl border-2 border-gray-500 text-gray-700 font-bold text-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
          >
            About Us
            <svg class="ml-3 w-6 h-6 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Enhanced Modal -->
    <div v-if="showModal && selectedPost" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" @click="closeModal">
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
          
          <div class="flex items-center pr-12">
            <!-- Profile Avatar -->
            <div class="w-16 h-16 mr-6">
              <div class="w-full h-full rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <span class="text-2xl font-bold text-white">{{ getInitials(selectedPost.name) }}</span>
              </div>
            </div>
            
            <div>
              <h3 class="text-2xl lg:text-3xl font-bold text-white">{{ selectedPost.name }}</h3>
              <div class="flex items-center mt-2 text-white/70">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span class="text-sm">Leadership Team</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="px-8 py-6 overflow-y-auto max-h-[calc(85vh-180px)]">
          <div class="space-y-6">
            <!-- Description Section -->
            <div v-if="selectedPost.description">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900">Overview</h4>
              </div>
              <div class="prose prose-lg max-w-none">
                <p class="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{{ selectedPost.description }}</p>
              </div>
            </div>
            
            <!-- Biography Section -->
            <div v-if="selectedPost.bio" class="border-t border-gray-100 pt-6">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900">Biography</h4>
              </div>
              <div class="prose prose-lg max-w-none">
                <p class="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{{ selectedPost.bio }}</p>
              </div>
            </div>

            <!-- Contact Info Section -->
            <div v-if="selectedPost.email || selectedPost.department" class="border-t border-gray-100 pt-6">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900">Contact Information</h4>
              </div>
              <div class="space-y-2">
                <p v-if="selectedPost.email" class="text-gray-700">
                  <span class="font-medium">Email:</span> 
                  <a :href="`mailto:${selectedPost.email}`" class="text-blue-600 hover:text-blue-800 ml-2">{{ selectedPost.email }}</a>
                </p>
                <p v-if="selectedPost.department" class="text-gray-700">
                  <span class="font-medium">Department:</span> 
                  <span class="ml-2">{{ selectedPost.department }}</span>
                </p>
              </div>
            </div>
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
import { ref, onMounted, onUnmounted } from 'vue'

// Get API instance
const api = useApi()

// Reactive data
const posts = ref([])
const loading = ref(true)
const error = ref('')
const showModal = ref(false)
const selectedPost = ref(null)

// Keyboard event handler
const handleKeydown = (event) => {
  if (event.key === 'Escape' && showModal.value) {
    closeModal()
  }
}

// Load data on mount
onMounted(() => {
  loadPosts()
  
  // Add keyboard event listener for ESC key
  document.addEventListener('keydown', handleKeydown)
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto' // Reset body scroll
})

// Methods
const loadPosts = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await api.managementPosts.getAll()
    if (response.success && response.data && Array.isArray(response.data)) {
      // Only show active posts for public view
      posts.value = response.data.filter(post => post.is_active)
    } else {
      error.value = response.error || 'Failed to load management team'
      posts.value = []
    }
  } catch (err) {
    console.error('Error loading posts:', err)
    error.value = 'Failed to load management team'
    posts.value = []
  } finally {
    loading.value = false
  }
}

const openModal = (post) => {
  selectedPost.value = post
  showModal.value = true
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  console.log('Closing modal...') // Debug log
  showModal.value = false
  selectedPost.value = null
  // Prevent body scroll when modal is closed
  document.body.style.overflow = 'auto'
}

// Utility functions
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// SEO
useSeoMeta({
  title: 'Top Management - Aprati Food Company',
  description: 'Meet the leadership team behind Aprati Food Company'
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
 