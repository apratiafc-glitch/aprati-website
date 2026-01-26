<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn more about Aprati Food Company and our commitment to quality.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading content...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
        {{ error }}
      </div>

      <!-- Content Sections -->
      <div v-if="!loading && !error && posts.length > 0" class="space-y-8">
        <div 
          v-for="post in posts" 
          :key="post.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            {{ post.name || post.title }}
          </h2>
          <p class="text-gray-700 leading-relaxed mb-6">
            {{ post.description }}
          </p>
          <button 
            @click="openModal(post)"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
          >
            Read More
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && posts.length === 0" class="text-center py-16">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No content available</h3>
        <p class="text-gray-500">Check back later for updates about our company.</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedPost" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" @click="closeModal">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto" @click.stop>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-900">{{ selectedPost.name || selectedPost.title }}</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <p class="text-gray-700 leading-relaxed">{{ selectedPost.description }}</p>
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

// Methods
const loadPosts = async () => {
  try {
    loading.value = true
    error.value = null
    const { aboutContent } = useApi()
    const response = await aboutContent.getAll()
    posts.value = response.data || []
  } catch (err) {
    console.error('Error loading about content:', err)
    error.value = 'Failed to load content. Please try again later.'
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

// Lifecycle
onMounted(() => {
  loadPosts()
})
</script>
