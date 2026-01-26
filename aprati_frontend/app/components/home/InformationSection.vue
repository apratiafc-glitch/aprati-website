<template>
  <section class="relative py-24 lg:py-32 bg-blue-600 overflow-hidden">
    <!-- Floating Fruit Characters -->
    <div class="absolute inset-0 pointer-events-none">
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-16 left-12 w-20 h-20 object-contain opacity-25 animate-float" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-16 right-16 w-20 h-20 object-contain opacity-25 animate-float-delayed" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/4 right-1/6 w-16 h-16 object-contain opacity-20 animate-float" style="animation-delay: 0.6s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute bottom-1/4 left-1/6 w-16 h-16 object-contain opacity-22 animate-float-delayed" style="animation-delay: 1.1s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute top-1/3 left-1/3 w-14 h-14 object-contain opacity-18 animate-float" style="animation-delay: 1.6s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-1/3 right-1/3 w-16 h-16 object-contain opacity-23 animate-float-delayed" style="animation-delay: 2.1s;" />
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="mb-20 text-center relative">
        <div class="inline-block relative mb-6">
          <span class="inline-block px-8 py-3 text-xs font-black tracking-[0.3em] uppercase bg-white text-blue-600 rounded-full shadow-2xl">🎉 OUR Information 🎉</span>
        </div>
        <h2 class="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tighter leading-none drop-shadow-xl text-white">
          LATEST NEWS
        </h2>
        <div class="w-32 h-2 bg-white mx-auto mb-8 rounded-full shadow-lg"></div>
        <p class="text-lg lg:text-xl text-white max-w-2xl mx-auto font-light">
          Discover the latest updates, news, and innovations from our dynamic ecosystem
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="relative mx-auto w-20 h-20 mb-6">
          <div class="absolute inset-0 rounded-full border-4 border-white/20"></div>
          <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
        </div>
        <p class="mt-8 text-white text-lg font-black">Loading content...</p>
      </div>

      <!-- Information Content -->
      <div v-else-if="sections.length > 0" class="space-y-6 max-w-6xl mx-auto">
        <div 
          v-for="section in sections" 
          :key="section.id"
          class="group relative"
        >
          <div class="block cursor-pointer" @click="$emit('open-modal', section)">
            <div class="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:translate-x-2">
              <div class="flex flex-col md:flex-row">
                <!-- Image Section -->
                <div class="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                  <div 
                    v-if="section.image_url"
                    class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    :style="`background-image: url('${getImageUrl(section.image_url)}');`"
                  ></div>
                  <div v-else class="absolute inset-0 bg-blue-500"></div>
                  <div class="absolute inset-0 bg-blue-600/20"></div>
                  
                  <!-- Badge -->
                  <div class="absolute top-4 left-4">
                    <div class="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase">
                      📰 News
                    </div>
                  </div>
                </div>
                
                <!-- Content Section -->
                <div class="md:w-2/3 p-8">
                  <div class="flex items-start justify-between mb-4">
                    <h3 class="text-3xl lg:text-4xl font-black text-orange-500 mb-3 group-hover:text-orange-600 transition-colors">
                      {{ section.title }}
                    </h3>
                    <div class="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full flex-shrink-0 ml-4">
                      <div class="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      <span class="text-xs font-bold text-green-700">Active</span>
                    </div>
                  </div>
                  
                  <div class="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
                    <div v-html="section.description"></div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-400">
                      <span class="font-semibold">Published recently</span>
                    </div>
                    
                    <button class="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition-all duration-300 group-hover:gap-3">
                      Read More
                      <ArrowRightIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Default Content -->
      <div v-else class="text-center py-20">
        <div class="max-w-3xl mx-auto">
          <div class="relative mb-12">
            <div class="w-32 h-32 mx-auto relative">
              <div class="absolute inset-0 rounded-full bg-white/20"></div>
              <div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg class="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <h2 class="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
            Coming Soon
          </h2>
          <p class="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
            We are preparing something special for you. Stay tuned for exciting updates.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  sections: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const runtimeConfig = useRuntimeConfig()

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/default-info.jpg'
  if (imagePath.startsWith('data:')) return imagePath
  if (imagePath.startsWith('http')) return `${imagePath}?t=${Date.now()}`
  if (imagePath.startsWith('/storage/')) {
    return `${runtimeConfig.public.apiBaseUrl}${imagePath}?t=${Date.now()}`
  }
  return `${imagePath}?t=${Date.now()}`
}

defineEmits(['open-modal'])
</script>
