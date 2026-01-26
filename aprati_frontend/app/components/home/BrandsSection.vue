<template>
  <section class="relative py-24 lg:py-32 bg-white overflow-hidden">
    <!-- Floating Fruit Characters -->
    <div class="absolute inset-0 pointer-events-none">
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute bottom-1/6 right-1/6 w-20 h-20 object-contain opacity-15 animate-float-delayed" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute top-16 left-1/3 w-16 h-16 object-contain opacity-20 animate-float" style="animation-delay: 1s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-16 right-1/3 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="animation-delay: 1.5s;" />
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20 relative z-10">
        <div class="inline-block relative mb-6">
          <span class="inline-block px-8 py-3 text-xs font-black tracking-[0.3em] uppercase bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-500/50">🏆 OUR BRANDS 🏆</span>
        </div>
        <h2 class="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tighter leading-none drop-shadow-xl text-orange-500">
          OUR PREMIUM BRANDS
        </h2>
        <div class="w-32 h-2 bg-blue-600 mx-auto mb-8 rounded-full shadow-lg shadow-blue-500/50"></div>
        <p class="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-light">
          Discover our collection of premium quality food brand products
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Loading State -->
        <div v-if="loading" class="col-span-3 text-center py-12">
          <div class="relative mx-auto w-20 h-20 mb-6">
            <div class="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
          </div>
          <p class="text-gray-700 text-lg font-black">Loading brands...</p>
        </div>

        <!-- Dynamic Brand Cards -->
        <div v-else-if="brands.length > 0" v-for="brand in brands" :key="brand.id" class="group relative">
          <NuxtLink :to="`/brands/${brand.slug}`" class="block">
            <div class="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all duration-700 group-hover:scale-[1.05]">
              <!-- Brand Cover Image -->
              <div class="relative h-80 overflow-hidden">
                <div 
                  v-if="brand.cover_image_url"
                  class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-125"
                  :style="`background-image: url('${brand.cover_image_url}');`"
                ></div>
                <div v-else class="absolute inset-0 bg-blue-500"></div>
                
                <div class="absolute inset-0 bg-blue-600/20"></div>
                
                <!-- Floating Logo Badge -->
                <div v-if="brand.logo_url" class="absolute top-6 left-6 z-20">
                  <div class="relative bg-white rounded-2xl p-4 shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <img 
                      :src="brand.logo_url" 
                      :alt="brand.name"
                      class="h-14 w-14 object-contain"
                    >
                  </div>
                </div>
                
                <!-- Badge -->
                <div class="absolute top-6 right-6 z-20">
                  <div class="relative bg-red-600 text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <span class="relative z-10">🎯 {{ brandProducts[brand.id]?.length || 0 }} Products</span>
                  </div>
                </div>
                
                <!-- Brand Title Overlay -->
                <div class="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <div class="transform transition-all duration-500 group-hover:translate-y-[-8px]">
                    <h3 class="text-5xl lg:text-6xl font-black mb-3 tracking-tighter leading-none text-orange-500 drop-shadow-2xl">
                      {{ brand.name }}
                    </h3>
                    
                    <div class="h-1.5 bg-blue-600 rounded-full w-0 group-hover:w-32 transition-all duration-700 shadow-lg shadow-blue-500/50"></div>
                  </div>
                </div>
              </div>
              
              <!-- Brand Info Card -->
              <div class="relative bg-white p-8">
                <p class="text-gray-700 text-base leading-relaxed mb-6 line-clamp-2 font-medium">
                  {{ brand.description || 'Premium quality products with innovative solutions crafted with excellence.' }}
                </p>
                
                <!-- Action Bar -->
                <div class="flex items-center justify-between pt-6">
                  <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full">
                      <div class="w-3 h-3 bg-green-600 rounded-full animate-pulse shadow-lg shadow-green-600/50"></div>
                      <span class="text-xs font-black text-green-700 uppercase tracking-wider">Active</span>
                    </div>
                    <div class="h-4 w-px bg-blue-300"></div>
                    <span class="text-xs font-black text-gray-600 uppercase tracking-wider bg-blue-50 px-3 py-2 rounded-full">
                      🏭 Est. {{ brand.established_year || '2024' }}
                    </span>
                  </div>
                  
                  <!-- CTA Button -->
                  <div class="relative">
                    <div class="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-2xl transform transition-all duration-500 group-hover:scale-110">
                      <span class="relative z-10">🚀 Explore</span>
                      <ArrowRightIcon class="w-4 h-4 transition-transform group-hover:translate-x-2 relative z-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- No Brands Available -->
        <div v-else class="col-span-3 text-center py-20">
          <div class="max-w-2xl mx-auto">
            <h3 class="text-4xl lg:text-5xl font-black text-gray-900 mb-4">No Brands Available</h3>
            <p class="text-lg text-gray-600 mb-12 font-light">
              There are currently no active brands to display.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'

defineProps({
  brands: {
    type: Array,
    default: () => []
  },
  brandProducts: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>
