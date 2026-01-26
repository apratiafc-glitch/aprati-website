<template>
  <section class="relative h-screen overflow-hidden bg-blue-600">
    <!-- Top Stripe -->
    <div class="absolute top-0 left-0 w-full h-3 bg-blue-800 z-10"></div>
    
    <!-- Full Screen Hero Image Background -->
    <div class="absolute inset-0">
      <img 
        :src="heroImage || defaultImage"
        :alt="heroImageAlt || 'Aprati Foods'"
        loading="eager"
        fetchpriority="high"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <!-- Blue Overlay -->
      <div class="absolute inset-0 bg-blue-600/40"></div>
      <!-- Floating Fruit Characters -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <img src="/images/Grape Character.png" alt="" class="absolute top-1/4 left-1/6 w-20 h-20 object-contain opacity-20 animate-float" />
        <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/4 right-1/6 w-20 h-20 object-contain opacity-20 animate-float-delayed" />
        <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/3 right-1/4 w-16 h-16 object-contain opacity-15 animate-float" style="animation-delay: 0.5s;" />
        <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="animation-delay: 1s;" />
        <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-1/6 right-1/6 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 1.5s;" />
        <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/6 left-1/3 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="animation-delay: 2s;" />
      </div>
    </div>
    
    <div class="relative z-10 h-full flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="text-center max-w-5xl mx-auto">
          <!-- Badge -->
          <div class="inline-block mb-8 animate-fade-in relative">
            <div class="relative px-8 py-4 text-xs font-black tracking-[0.3em] uppercase bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-500/50 ring-4 ring-white/50">
              <span class="relative z-10">🍬 Welcome to Aprati Foods (Cambodia) Ltd 🍬</span>
              <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none"></div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          
          <!-- Hero Title -->
          <h1 class="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-none tracking-tighter animate-slide-up drop-shadow-2xl text-white">
            Welcome to <span class="font-black text-orange-500">Aprati</span> Food Company
          </h1>
          
          <!-- Subtitle -->
          <p class="text-lg sm:text-xl lg:text-2xl text-white mb-12 max-w-3xl mx-auto font-medium animate-fade-in animation-delay-500 drop-shadow-lg">
            🌈 Enhanced introduction website with advanced product search, career management, and comprehensive inventory system 🌈
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animation-delay-1000">
            <NuxtLink 
              :to="heroContent.primary_button_link || '/brands'" 
              class="group relative px-12 py-6 bg-red-600 hover:bg-red-700 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/60 rounded-full overflow-hidden"
            >
              <span class="relative z-10">🍭 Explore Our Brands</span>
              <ArrowRightIcon class="inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" />
            </NuxtLink>
            
            <NuxtLink 
              :to="heroContent.secondary_button_link || '/careers'" 
              class="group relative px-12 py-6 bg-red-600 hover:bg-red-700 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/60 rounded-full overflow-hidden"
            >
              <span class="relative z-10">💼 Join Our Team</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  heroImage: String,
  heroImageAlt: String,
  heroContent: {
    type: Object,
    default: () => ({
      primary_button_link: '/brands',
      secondary_button_link: '/careers'
    })
  }
})

const defaultImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjM2NmYxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFwcmF0aSBGb29kIENvbXBhbnk8L3RleHQ+Cjwvc3ZnPgo='

const handleImageError = (event) => {
  event.target.src = defaultImage
}
</script>
