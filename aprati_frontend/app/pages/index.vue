<template>
  <div class="min-h-screen bg-white">
    <!-- Multi-Hero Carousel Section - Premium Modern Theme -->
    <section class="relative h-screen overflow-hidden bg-gray-900">
      
      <!-- Hero Slides Container -->
      <div class="relative h-full">
        <!-- Individual Hero Slides -->
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="slide.id"
          class="absolute inset-0 transition-all duration-1000 ease-in-out"
          :class="currentSlide === index ? 'opacity-100 z-[2]' : 'opacity-0 z-[1]'"
        >
          <!-- Full Screen Hero Image Background -->
          <div class="absolute inset-0">
            <img 
              :src="slide.image"
              :alt="slide.imageAlt"
              loading="eager"
              :fetchpriority="index === 0 ? 'high' : 'low'"
              class="w-full h-full object-cover animate-slow-zoom origin-center"
              @error="(e) => handleSlideImageError(e, index)"
            />
            <!-- Dark Overlay - Removed -->
            <!-- <div class="absolute inset-0 bg-black/40"></div> -->
            
            <!-- Dynamic Color Tint - Removed -->
            <!-- <div 
              class="absolute inset-0 mix-blend-overlay opacity-60" 
              :class="slide.overlayClass"
            ></div> -->
            
            <!-- Gradient Base - Removed -->
            <!-- <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30"></div> -->
          </div>
          
          <!-- Slide Content -->
          <div class="relative z-10 h-full flex items-center justify-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div class="text-center max-w-5xl mx-auto">
                <!-- Premium Badge -->
                <div 
                  class="inline-block mb-6 animate-fade-in-up"
                  :style="`animation-delay: 200ms;`"
                >
                  <span 
                    class="inline-flex items-center px-5 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-white backdrop-blur-md border border-white/20 shadow-lg"
                    :class="slide.badgeColor"
                  >
                    {{ slide.badge }}
                  </span>
                </div>
                
                <!-- Modern Hero Title -->
                <h1 
                  class="text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight text-black"
                  :class="currentSlide === index ? 'animate-slide-up' : ''"
                  v-html="slide.title"
                ></h1>
                
                <!-- Elegant Subtitle -->
                <p 
                  class="text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-10 max-w-4xl mx-auto font-light leading-relaxed"
                  :class="currentSlide === index ? 'animate-fade-in animation-delay-500' : ''"
                >
                  {{ slide.subtitle }}
                </p>
                
                <!-- CTA Buttons - Glassmorphism -->
                <div 
                  class="flex flex-col sm:flex-row gap-5 justify-center items-center"
                  :class="currentSlide === index ? 'animate-fade-in animation-delay-700' : ''"
                >
                  <NuxtLink 
                    :to="slide.primaryButtonLink" 
                    :class="slide.primaryButtonClass"
                  >
                    <span>{{ slide.primaryButtonText }}</span>
                    <ArrowRightIcon class="inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </NuxtLink>
                  
                  <NuxtLink 
                    :to="slide.secondaryButtonLink" 
                    :class="slide.secondaryButtonClass"
                  >
                    <span>{{ slide.secondaryButtonText }}</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows - Minimalist -->
      <button 
        @click="previousSlide"
        class="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-4 border border-white/20 bg-black/20 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 focus:outline-none group hidden md:block"
        aria-label="Previous slide"
      >
        <svg class="w-6 h-6 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        @click="nextSlide"
        class="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-4 border border-white/20 bg-black/20 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 focus:outline-none group hidden md:block"
        aria-label="Next slide"
      >
        <svg class="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Navigation Dots - Sleek Lines -->
      <div class="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        <button
          v-for="(slide, index) in heroSlides"
          :key="`dot-${slide.id}`"
          @click="goToSlide(index)"
          class="group relative h-1 transition-all duration-300 ease-out"
          :class="currentSlide === index ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/60 hover:w-8'"
          :aria-label="`Go to slide ${index + 1}`"
        >
          <span class="sr-only">Slide {{ index + 1 }}</span>
        </button>
      </div>
    </section>

    <!-- Scroll Indicator - Candy Style -->
    <section class="relative py-8 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
      <!-- Floating Fruit Characters - Optimized -->
      <div class="absolute inset-0 pointer-events-none hidden md:block">
        <img src="/images/Guava Charactor.png" alt="" loading="lazy" class="absolute top-1/4 left-1/6 w-16 h-16 object-contain opacity-20 animate-float" />
        <img src="/images/Pineapple Character copy.png" alt="" loading="lazy" class="absolute bottom-1/4 right-1/6 w-16 h-16 object-contain opacity-20 animate-float-delayed" />
      </div>
      
      <div class="flex justify-center animate-bounce">
        <div class="group relative cursor-pointer">
          <!-- Gummy Button with Jelly Effect -->
          <div class="flex flex-col items-center bg-blue-600 px-8 py-4 rounded-full ring-4 ring-white shadow-2xl shadow-blue-500/50 transform transition-all duration-500 hover:scale-110 hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] overflow-hidden">
            <span class="relative z-10 text-white text-xs tracking-widest uppercase mb-2 font-black">🍬 Scroll Down 🍬</span>
            <svg class="relative z-10 w-6 h-6 text-white transition-transform group-hover:translate-y-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            
            <!-- Glossy Shine -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none"></div>
            
            <!-- Sparkle on Hover -->
            <div class="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Removed: New Product Promotion Banner Slider -->

    <!-- Dynamic Promotion Banners Section -->
    <!-- Dynamic Promotion Banners Section - Full Width Hero Style -->
    <!-- Dynamic Promotion Banners Section - Candy Glass Theme -->
    <!-- Dynamic Promotion Banners Section - Premium Editorial Card -->
    <!-- Dynamic Promotion Banners Section - Cinematic Glass Overlay -->
    <section v-if="promotionBanners.length > 0" class="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Cinematic Card -->
        <div 
          class="relative w-full h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/20 ring-1 ring-black/5 group transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.01]"
          @mouseenter="stopPromoAutoplay"
          @mouseleave="startPromoAutoplay"
        >
          <!-- Slides Container -->
          <div class="relative w-full h-full">
            <div 
              v-for="(banner, index) in promotionBanners" 
              :key="banner.id"
              class="absolute inset-0 transition-all duration-1000 ease-in-out"
              :class="currentPromoSlide === index ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'"
            >
              <!-- Full Background Image -->
              <div class="absolute inset-0">
                <div class="absolute inset-0 bg-gray-900 animate-pulse" v-if="!banner.imageLoaded && banner.image_url"></div>
                <img 
                   v-if="banner.image_url"
                   :src="banner.image_url.startsWith('http') ? banner.image_url : `${runtimeConfig.public.apiBaseUrl}${banner.image_url}`" 
                   class="w-full h-full object-cover transition-transform duration-[8000ms] ease-linear"
                   :class="currentPromoSlide === index ? 'scale-110' : 'scale-100'"
                   alt=""
                   @load="banner.imageLoaded = true"
                />
                
                <!-- Modern Gradient Overlay - Removed as requested -->
                <!-- <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div> -->
                <!-- <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div> -->
              </div>

              <!-- Content Overlay -->
              <div class="absolute inset-0 flex items-center p-8 sm:p-12 lg:p-20">
                <div class="w-full sm:max-w-xl lg:max-w-2xl relative z-20">
                  <!-- Transparent Content Box (Glass effect removed) -->
                  <div class="p-0 sm:p-2 relative">
                    
                    <!-- Badge -->
                    <div 
                      class="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-lg"
                      :class="currentPromoSlide === index ? 'animate-fade-in-up' : 'opacity-0'"
                    >
                      <span class="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
                      Featured
                    </div>

                    <!-- Title -->
                    <h2 
                      class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight drop-shadow-xl"
                      :class="currentPromoSlide === index ? 'animate-slide-up' : 'opacity-0 translate-y-4'"
                    >
                       {{ banner.title }}
                    </h2>

                    <!-- Subtitle -->
                    <p 
                      v-if="banner.subtitle" 
                      class="text-base sm:text-lg text-gray-100 mb-8 leading-relaxed font-light drop-shadow-lg"
                      :class="currentPromoSlide === index ? 'animate-fade-in animation-delay-300' : 'opacity-0'"
                    >
                       {{ banner.subtitle }}
                    </p>

                    <!-- CTA Button -->
                    <div 
                      v-if="banner.button_text && banner.button_link"
                      :class="currentPromoSlide === index ? 'animate-fade-in animation-delay-500' : 'opacity-0'"
                    >
                      <NuxtLink 
                         v-if="banner.button_link && banner.button_link.trim() !== ''"
                         :to="banner.button_link"
                         class="group relative inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-base transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 shadow-xl hover:shadow-blue-600/30"
                      >
                         <span class="relative z-10">{{ banner.button_text }}</span>
                         <ArrowRightIcon class="ml-2 w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                      </NuxtLink>
                      <a 
                         v-else
                         href="#"
                         class="group relative inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-base transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 shadow-xl hover:shadow-blue-600/30"
                      >
                         <span class="relative z-10">{{ banner.button_text }}</span>
                         <ArrowRightIcon class="ml-2 w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Navigation Controls -->
          <div class="absolute bottom-8 right-8 z-30 flex gap-3">
             <button 
              @click="prevPromoSlide"
              class="group p-4 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
              aria-label="Previous slide"
            >
              <ArrowLeftIcon class="w-6 h-6 transition-transform group-hover:-translate-x-1" />
            </button>
            <button 
              @click="nextPromoSlide"
              class="group p-4 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
              aria-label="Next slide"
            >
              <ArrowRightIcon class="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <!-- Progress Indicators -->
          <div class="absolute bottom-8 left-8 sm:left-12 z-30 flex gap-2">
            <button
               v-for="(banner, index) in promotionBanners"
               :key="`dot-${banner.id}`"
               @click="currentPromoSlide = index"
               class="h-1.5 rounded-full transition-all duration-300"
               :class="currentPromoSlide === index ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/50'"
               :aria-label="`Go to slide ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Information Section (Admin Manageable) -->
    <section class="relative py-12 sm:py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-white via-blue-500 to-white overflow-hidden">
      <!-- Floating Fruit Characters - Optimized -->
      <div class="absolute inset-0 pointer-events-none hidden lg:block">
        <img src="/images/Plum CHARACTER.png" alt="" loading="lazy" class="absolute top-16 left-12 w-16 h-16 object-contain opacity-15 animate-float" />
        <img src="/images/Tamarin Character.png" alt="" loading="lazy" class="absolute bottom-16 right-16 w-16 h-16 object-contain opacity-15 animate-float-delayed" />
        <img src="/images/Orange Charactor.png" alt="" loading="lazy" class="absolute top-1/3 right-1/3 w-14 h-14 object-contain opacity-12 will-change-transform" style="animation-delay: 1.5s;" />
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header - Candy Theme -->
        <div class="mb-20 text-center relative">
          <div class="inline-block relative mb-6">
            <span class="inline-block px-8 py-3 text-xs font-black tracking-[0.3em] uppercase bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-500/50 ring-4 ring-white/50">🎉 OUR Information 🎉</span>
          </div>
          <h2 class="text-5xl lg:text-7xl xl:text-8xl font-black mb-6 tracking-tighter leading-none drop-shadow-xl">
            <span class="text-blue-600">LATEST</span> <span class="text-blue-700">NEWS</span>
          </h2>
          <div class="w-32 h-2 bg-blue-600 mx-auto mb-8 rounded-full shadow-lg shadow-blue-500/50"></div>
          <p class="text-3xl lg:text-5xl text-gray-600 max-w-5xl mx-auto font-light leading-snug">
            Discover the latest updates, news, and innovations from our dynamic ecosystem
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="informationLoading" class="text-center py-20">
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
          
          <p class="text-gray-700 text-xl font-semibold animate-pulse">Loading sweet content...</p>
          <p class="mt-2 text-gray-500 text-sm">Preparing something delicious for you</p>
        </div>

        <!-- Information Content - Side by Side Layout -->
        <div v-else-if="informationSections.length > 0" class="space-y-6">
          <div 
            v-for="(section, index) in informationSections" 
            :key="section.id"
            class="group relative cursor-pointer"
            @click="openInfoModal(section)"
          >
            <!-- Side by Side Container -->
            <div :class="[
              'bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col',
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            ]">
              <!-- Image Side (40%) -->
              <div :class="[
                'relative lg:w-2/5 h-72 lg:h-auto overflow-hidden flex items-center justify-center',
                index % 2 === 0 ? 'rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none' : 'rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none'
              ]">
                <img 
                  v-if="section.image_url"
                  :src="getImageUrl(section.image_url)"
                  :alt="section.title"
                  class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div v-else :class="[
                  'absolute inset-0',
                  index % 3 === 0 ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700' :
                  index % 3 === 1 ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-700' :
                  'bg-gradient-to-br from-orange-500 via-red-500 to-pink-700'
                ]"></div>
                
                <!-- Dark Overlay for Text Readability -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                <!-- Floating Badge on Image -->
                <div class="absolute top-6 left-6">
                  <div :class="[
                    'px-4 py-2 rounded-xl backdrop-blur-lg border text-white font-bold text-sm',
                    index % 3 === 0 ? 'bg-blue-600/80 border-blue-400/30' :
                    index % 3 === 1 ? 'bg-purple-600/80 border-purple-400/30' :
                    'bg-orange-600/80 border-orange-400/30'
                  ]">
                    ℹ️ Information
                  </div>
                </div>
              </div>
              
              <!-- Information Side (60%) -->
              <div class="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <!-- Meta Info -->
                <div class="flex items-center gap-3 mb-4">
                  <span :class="[
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold',
                    index % 3 === 0 ? 'bg-blue-100 text-blue-700' :
                    index % 3 === 1 ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  ]">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                    Updated recently
                  </span>
                  <span class="text-sm text-gray-500">• 3 min read</span>
                </div>
                
                <!-- Title -->
                <h3 :class="[
                  'text-3xl lg:text-4xl font-extrabold mb-4 leading-tight transition-colors duration-300',
                  index % 3 === 0 ? 'text-gray-900 group-hover:text-blue-600' :
                  index % 3 === 1 ? 'text-gray-900 group-hover:text-purple-600' :
                  'text-gray-900 group-hover:text-orange-600'
                ]">
                  {{ section.title }}
                </h3>
                
                <!-- Divider -->
                <div class="mb-5">
                  <div :class="[
                    'h-1 w-20 rounded-full',
                    index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                    index % 3 === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    'bg-gradient-to-r from-orange-500 to-red-500'
                  ]"></div>
                </div>
                
                <!-- Description -->
                <div class="text-gray-600 text-base lg:text-lg leading-relaxed mb-6 line-clamp-3">
                  <div v-html="section.description"></div>
                </div>
                
                <!-- Action Button -->
                <div class="flex items-center gap-4">
                  <button :class="[
                    'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl',
                    index % 3 === 0 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' :
                    index % 3 === 1 ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                    'bg-gradient-to-r from-orange-600 to-red-600'
                  ]">
                    <span>Learn More</span>
                    <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>
                  
                  <button class="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Default Content -->
        <div v-else class="text-center py-20">
          <div class="max-w-3xl mx-auto">
            <!-- Icon -->
            <div class="relative mb-12">
              <div class="w-32 h-32 mx-auto relative">
                <div class="absolute inset-0 rounded-full bg-gray-200"></div>
                <div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <h2 class="text-4xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Coming
              <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Soon</span>
            </h2>
            <p class="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              We are preparing something special for you. Stay tuned for exciting updates, innovations, and announcements.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <NuxtLink 
                to="/contact" 
                class="group relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105"
              >
                <span class="relative z-10">Get Notified</span>
                <ArrowRightIcon class="relative z-10 ml-3 w-6 h-6" />
              </NuxtLink>
              
              <NuxtLink 
                to="/about" 
                class="group inline-flex items-center px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-bold text-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
              >
                Learn More
                <svg class="ml-3 w-6 h-6 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Brands Section -->
    <section class="relative py-8 sm:py-12 lg:py-24 xl:py-32 bg-gradient-to-b from-blue-100 via-white to-blue-50 overflow-hidden scroll-smooth">
      <!-- Floating Fruit Characters - Hidden on mobile -->
      <div class="absolute inset-0 pointer-events-none hidden lg:block">
        <img src="/images/Grape Character.png" alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" />
        <img src="/images/Guava Charactor.png" alt="" class="absolute bottom-1/6 right-1/6 w-20 h-20 object-contain opacity-15 animate-float-delayed" />
        <img src="/images/Orange Charactor.png" alt="" class="absolute top-16 left-1/3 w-16 h-16 object-contain opacity-20 animate-float" style="animation-delay: 1s;" />
        <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-16 right-1/3 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="animation-delay: 1.5s;" />
        <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-1/4 right-1/5 w-16 h-16 object-contain opacity-18 animate-float" style="animation-delay: 0.5s;" />
        <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/4 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 2s;" />
        <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/3 left-1/2 w-14 h-14 object-contain opacity-14 animate-float" style="animation-delay: 0.8s;" />
        <img src="/images/Grape Character.png" alt="" class="absolute bottom-1/3 right-1/2 w-14 h-14 object-contain opacity-16 animate-float-delayed" style="animation-delay: 1.3s;" />
        <img src="/images/Orange Charactor.png" alt="" class="absolute top-1/2 left-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 1.8s;" />
        <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-1/2 right-1/4 w-14 h-14 object-contain opacity-13 animate-float-delayed" style="animation-delay: 2.3s;" />
      </div>
      
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header - Candy Theme -->
        <div class="text-center mb-8 sm:mb-16 lg:mb-20 relative z-10">
          <div class="inline-block relative mb-4 sm:mb-6">
            <span class="inline-block px-4 py-2 sm:px-8 sm:py-3 text-[10px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase bg-gradient-to-r from-blue-600 via-green-700 to-green-800 text-white rounded-full shadow-xl sm:shadow-2xl shadow-green-700/50 ring-2 sm:ring-4 ring-white/50">🏆 OUR BRANDS 🏆</span>
            <!-- Glossy shine -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none"></div>
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 tracking-tighter leading-none drop-shadow-xl px-4">
            <span class="bg-gradient-to-r from-blue-600 via-green-700 to-green-800 bg-clip-text text-transparent">OUR <span class="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent">PREMIUM</span> BRANDS</span>
          </h2>
          <div class="w-20 sm:w-32 h-1.5 sm:h-2 bg-gradient-to-r from-blue-600 via-green-700 to-green-800 mx-auto mb-4 sm:mb-8 rounded-full shadow-lg shadow-green-700/50"></div>
          <p class="text-3xl lg:text-5xl text-gray-600 max-w-5xl mx-auto font-light leading-snug px-4">
            Discover our collection of premium quality food brand products
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <!-- Loading State -->
          <div v-if="loading" class="col-span-full text-center py-12">
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
            
            <p class="text-gray-700 text-xl font-semibold animate-pulse">Loading awesome brands...</p>
            <p class="mt-2 text-gray-500 text-sm">Preparing something delicious for you</p>
          </div>

          <!-- Dynamic Brand Cards - Modern Magazine Style -->
          <div v-else-if="dynamicBrands.length > 0" v-for="(brand, index) in dynamicBrands" :key="brand.id" class="group relative">
            <NuxtLink :to="`/brands/${brand.slug}`" class="block">
              <div class="relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-sm sm:shadow-md lg:shadow-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-300 active:scale-95 sm:group-hover:scale-[1.02] lg:group-hover:scale-[1.05] border border-blue-200 sm:border-2 hover:border-blue-500">
                <!-- Brand Cover Image with Parallax Effect -->
                <div class="relative h-32 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                  <div 
                    v-if="brand.cover_image_url"
                    class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-125"
                    :style="`background-image: url('${brand.cover_image_url}');`"
                  ></div>
                  <div v-else class="absolute inset-0" :class="getBrandGradient(brand.slug)"></div>
                  
                  <!-- Candy Gradient Overlays -->
                  <div class="absolute inset-0 bg-gradient-to-t from-blue-700/90 via-green-600/50 to-transparent"></div>
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-green-600/30 to-blue-600/30 mix-blend-overlay opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>
                  
                  <!-- Floating Logo Badge - Candy Wrapper -->
                  <div v-if="brand.logo_url" class="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-20">
                    <div class="relative bg-white rounded-lg sm:rounded-xl p-1.5 sm:p-2 md:p-3 shadow-md sm:shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 border border-white sm:border-2">
                      <img 
                        :src="brand.logo_url" 
                        :alt="brand.name"
                        class="h-7 w-7 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
                        @error="handleBrandLogoError"
                        @load="handleBrandLogoLoad"
                      >
                      <!-- Glossy shine -->
                      <div class="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent rounded-lg sm:rounded-xl pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <!-- Candy Badge -->
                  <div class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-20">
                    <div class="relative bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full font-black text-[8px] sm:text-[10px] md:text-xs uppercase tracking-wide shadow-md sm:shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <span class="relative z-10">🎯 {{ brandProducts[brand.id]?.length || 0 }}</span>
                      <!-- Glossy shine -->
                      <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <!-- Brand Title Overlay -->
                  <div class="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 lg:p-6 z-10">
                    <div class="transform transition-all duration-300 group-hover:translate-y-[-4px]">
                      <h3 class="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black mb-1 sm:mb-2 tracking-tighter leading-none">
                        <span class="bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent drop-shadow-xl">
                          {{ brand.name }}
                        </span>
                      </h3>
                      
                      <!-- Animated Underline -->
                      <div class="h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 via-green-600 to-green-700 rounded-full w-0 group-hover:w-12 sm:group-hover:w-20 transition-all duration-500 shadow-lg shadow-green-600/50"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Brand Info Card - Candy Wrapper -->
                <div class="relative bg-blue-50 p-2.5 sm:p-4 md:p-5 lg:p-6">
                  <!-- Description - Hidden on mobile, shown on tablet+ -->
                  <p class="hidden sm:block text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 md:mb-5 line-clamp-2 font-medium">
                    {{ brand.description || 'Premium quality products with innovative solutions crafted with excellence.' }}
                  </p>
                  
                  <!-- Action Bar -->
                  <div class="flex flex-col items-center gap-2 sm:gap-3 pt-2 sm:pt-3 md:pt-4 border-t border-green-200 sm:border-t-2">
                    <!-- Stats - Stacked on mobile -->
                    <div class="flex items-center gap-1.5 sm:gap-2 w-full justify-center">
                      <div class="flex items-center gap-1 sm:gap-1.5 bg-white/70 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full">
                        <div class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-600 rounded-full animate-pulse shadow-md shadow-green-600/50"></div>
                        <span class="text-[8px] sm:text-[10px] font-black text-green-700 uppercase tracking-wide">Active</span>
                      </div>
                      <div class="h-3 w-px bg-green-300"></div>
                      <span class="text-[8px] sm:text-[10px] font-black text-gray-600 uppercase tracking-wide bg-white/70 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full">
                        🏭 Est. {{ brand.established_year || '2024' }}
                      </span>
                    </div>
                    
                    <!-- CTA Button - Gummy Style -->
                    <div class="relative w-full">
                      <div class="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-gradient-to-r from-blue-600 via-green-700 to-green-800 rounded-full font-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wide text-white shadow-md sm:shadow-lg transform transition-all duration-200 active:scale-95 sm:group-hover:scale-105 overflow-hidden">
                        <span class="relative z-10">🚀 Explore</span>
                        <ArrowRightIcon class="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-2 relative z-10" />
                        <!-- Glossy shine -->
                        <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Decorative Corner Accent -->
                <div class="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-600/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            </NuxtLink>
          </div>

          <!-- No Brands Available Message - Red Bull Style -->
          <div v-else class="col-span-full text-center py-20">
            <div class="max-w-2xl mx-auto">
              <h3 class="text-4xl lg:text-5xl font-black text-white mb-4">No Brands Available</h3>
              <p class="text-lg text-gray-400 mb-12 font-light">
                There are currently no active brands to display. Please check back later or contact the administrator.
              </p>
              
              <NuxtLink 
                to="/contact" 
                class="group px-10 py-5 bg-white text-black font-black text-sm tracking-wider uppercase transition-all duration-300 hover:bg-red-600 hover:text-white inline-block"
              >
                Contact Administrator
                <ArrowRightIcon class="inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="relative py-8 sm:py-12 lg:py-24 xl:py-32 bg-gradient-to-b from-white via-blue-100 to-white overflow-hidden scroll-smooth">
      <!-- Floating Fruit Characters - Hidden on mobile -->
      <div class="absolute inset-0 pointer-events-none hidden lg:block">
        <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-12 animate-float" />
        <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/6 right-1/6 w-20 h-20 object-contain opacity-12 animate-float-delayed" />
        <img src="/images/Grape Character.png" alt="" class="absolute top-16 left-12 w-16 h-16 object-contain opacity-15 animate-float" style="animation-delay: 0.5s;" />
        <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-16 right-12 w-16 h-16 object-contain opacity-15 animate-float-delayed" style="animation-delay: 1s;" />
        <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/4 right-1/5 w-16 h-16 object-contain opacity-13 animate-float" style="animation-delay: 1.5s;" />
        <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-1/4 left-1/5 w-16 h-16 object-contain opacity-14 animate-float-delayed" style="animation-delay: 2s;" />
        <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-1/3 left-1/3 w-14 h-14 object-contain opacity-11 animate-float" style="animation-delay: 0.7s;" />
        <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/3 right-1/3 w-14 h-14 object-contain opacity-12 animate-float-delayed" style="animation-delay: 1.2s;" />
        <img src="/images/Grape Character.png" alt="" class="absolute top-1/2 right-1/4 w-14 h-14 object-contain opacity-10 animate-float" style="animation-delay: 1.7s;" />
        <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/2 left-1/4 w-14 h-14 object-contain opacity-11 animate-float-delayed" style="animation-delay: 2.2s;" />
      </div>

      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-8 sm:mb-16 lg:mb-20 relative z-10">
          <div class="inline-block relative mb-4 sm:mb-6">
            <span class="inline-block px-4 py-2 sm:px-8 sm:py-3 text-[10px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-full shadow-xl sm:shadow-2xl shadow-black/50 ring-2 sm:ring-4 ring-white/50">🌟 FEATURED PRODUCTS 🌟</span>
            <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none"></div>
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 tracking-tighter leading-none px-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 3px 3px 6px rgba(0,0,0,0.2);">
            <span class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">DISCOVER OUR</span> <span class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">PRODUCTS</span>
          </h2>
          <div class="w-20 sm:w-32 h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 mx-auto mb-4 sm:mb-8 rounded-full shadow-lg shadow-black/50"></div>
          <p class="text-3xl lg:text-5xl text-gray-600 max-w-5xl mx-auto font-light leading-snug px-4">
            Explore our carefully curated selection of premium products
          </p>
        </div>

        <!-- Products Grid -->
        <div v-if="featuredProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <NuxtLink v-for="product in featuredProducts" :key="product.id" :to="`/products/${product.slug}`" class="group relative">
            <div class="relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-sm sm:shadow-md lg:shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-all duration-300 active:scale-95 sm:group-hover:scale-[1.02] lg:group-hover:scale-[1.05] border border-blue-100 hover:border-blue-300 cursor-pointer">
              <!-- Product Image -->
              <div class="relative h-36 sm:h-48 md:h-52 lg:h-56 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
                <img 
                  v-if="product.images && product.images.length > 0"
                  :src="getImageUrl(product.images[0])" 
                  :alt="product.name"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  @error="handleProductImageError"
                />
                <div v-else class="absolute inset-0 flex items-center justify-center">
                  <div class="text-6xl opacity-20">📦</div>
                </div>
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                
                <!-- Badge -->
                <div class="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                  <div class="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-black text-[8px] sm:text-[10px] uppercase tracking-wide shadow-md">
                    <span class="relative z-10">New</span>
                    <div class="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none"></div>
                  </div>
                </div>
              </div>
              
              <!-- Product Info -->
              <div class="p-2.5 sm:p-4 lg:p-5">
                <!-- Brand Name -->
                <div class="text-[8px] sm:text-[10px] md:text-xs font-black text-blue-600 uppercase tracking-wide mb-1">
                  {{ product.brand_name || 'Premium' }}
                </div>
                
                <!-- Product Name -->
                <h3 class="text-xs sm:text-sm md:text-base lg:text-lg font-black text-gray-900 mb-1 sm:mb-1.5 line-clamp-2 leading-tight">
                  {{ product.name }}
                </h3>
                
                <!-- Description - Hidden on mobile, shown on larger screens -->
                <p class="hidden sm:block text-xs md:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                  {{ product.description || 'High quality product crafted with excellence.' }}
                </p>
                
                <!-- Action Buttons -->
                <div class="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5">
                  <!-- Order Now Button (Primary) - Telegram Bot -->
                  <a 
                    href="https://t.me/aprati_order_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    @click.stop
                    class="group/btn relative inline-flex items-center justify-center w-full px-2 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-[9px] sm:text-xs md:text-sm uppercase tracking-wide rounded-full transition-all duration-200 active:scale-95 sm:hover:shadow-lg sm:hover:shadow-orange-500/50 overflow-hidden"
                  >
                    <svg class="mr-1 sm:mr-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span class="relative z-10">Order Now</span>
                    <div class="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none"></div>
                  </a>
                  
                  <!-- View Details Button (Secondary) -->
                  <NuxtLink 
                    :to="`/products/${product.slug}`"
                    class="group/btn relative inline-flex items-center justify-center w-full px-2 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-white border border-blue-500 sm:border-2 text-blue-600 font-bold text-[9px] sm:text-xs md:text-sm uppercase tracking-wide rounded-full transition-all duration-200 active:scale-95 sm:hover:bg-blue-50 sm:hover:shadow-md"
                  >
                    <span class="relative z-10">Details</span>
                    <ArrowRightIcon class="ml-1 sm:ml-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover/btn:translate-x-1 relative z-10" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- View All Button -->
        <div v-if="featuredProducts.length > 0" class="text-center mt-8 sm:mt-12 lg:mt-16">
          <NuxtLink 
            to="/brands"
            class="group relative inline-flex items-center px-6 py-3 sm:px-10 sm:py-5 lg:px-12 lg:py-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-blue-500/60 rounded-full ring-2 sm:ring-4 ring-white/50 overflow-hidden"
          >
            <span class="relative z-10">🔍 View All Products</span>
            <ArrowRightIcon class="inline-block ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2 relative z-10" />
            <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none"></div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Call to Action - Candy Theme -->
    <section class="relative py-32 lg:py-40 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden">
      <!-- Candy Stripes -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-orange-500 via-red-500 to-green-700 animate-pulse"></div>
        <div class="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-green-700 via-blue-600 to-orange-500"></div>
      </div>
      
      <!-- Floating Fruit Characters -->
      <div class="absolute inset-0 pointer-events-none">
        <img src="/images/Grape Character.png" alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" />
        <img src="/images/Guava Charactor.png" alt="" class="absolute bottom-1/6 right-1/6 w-20 h-20 object-contain opacity-15 animate-float-delayed" />
        <img src="/images/Orange Charactor.png" alt="" class="absolute top-1/4 right-1/5 w-16 h-16 object-contain opacity-18 animate-float" style="animation-delay: 0.5s;" />
        <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-1/4 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 1s;" />
        <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-1/3 left-1/3 w-14 h-14 object-contain opacity-14 animate-float" style="animation-delay: 1.5s;" />
        <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/3 right-1/3 w-14 h-14 object-contain opacity-16 animate-float-delayed" style="animation-delay: 2s;" />
        <img src="/images/Grape Character.png" alt="" class="absolute top-1/2 right-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 0.8s;" />
        <img src="/images/Guava Charactor.png" alt="" class="absolute bottom-1/2 left-1/4 w-14 h-14 object-contain opacity-13 animate-float-delayed" style="animation-delay: 1.3s;" />
      </div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Candy Badge -->
        <div class="inline-block relative mb-8">
          <span class="inline-block px-8 py-3 text-xs font-black tracking-[0.3em] uppercase bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white rounded-full shadow-2xl shadow-red-500/50 ring-4 ring-white/50">🚀 READY TO GET STARTED 🚀</span>
          <!-- Glossy shine -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none"></div>
        </div>
        
        <!-- Title with Candy Gradients -->
        <h2 class="text-5xl lg:text-7xl xl:text-8xl font-black mb-8 leading-none tracking-tighter drop-shadow-xl">
          <span class="bg-gradient-to-r from-blue-600 via-green-700 to-green-800 bg-clip-text text-transparent">Ready to Discover <span class="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent">Our Advanced Platform?</span></span>
        </h2>
        
        <div class="w-32 h-2 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 mx-auto mb-12 rounded-full shadow-lg shadow-red-500/50"></div>
        
        <!-- Subtitle -->
        <p class="text-3xl lg:text-5xl text-gray-600 mb-16 max-w-5xl mx-auto font-light leading-snug">
          Explore premium features and high-quality food products for the modern world
        </p>
        
        <!-- CTA Buttons - Gummy Style -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center mb-20">
          <NuxtLink 
            to="/brands" 
            class="group relative px-12 py-6 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/60 rounded-full ring-4 ring-white/50 overflow-hidden"
          >
            <span class="relative z-10">🍭 Explore Our Brands</span>
            <ArrowRightIcon class="inline-block ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" />
            <!-- Glossy shine -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none"></div>
            <!-- Jelly wobble -->
            <div class="absolute inset-0 bg-gradient-to-br from-orange-300/30 to-red-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse"></div>
          </NuxtLink>
          
          <NuxtLink 
            to="/contact" 
            class="group relative px-12 py-6 bg-gradient-to-r from-green-700 to-green-900 text-white font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-green-700/60 rounded-full ring-4 ring-white/50 overflow-hidden"
          >
            <span class="relative z-10">📧 Contact Us</span>
            <!-- Glossy shine -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none"></div>
            <!-- Jelly wobble -->
            <div class="absolute inset-0 bg-gradient-to-br from-green-600/30 to-green-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse"></div>
          </NuxtLink>
        </div>
        
        <!-- Stats Row - Red Bull Style -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{{ dynamicBrands.length }}</div>
            <div class="text-xs font-bold tracking-widest text-gray-400 uppercase">Premium Brands</div>
          </div>
          <div class="text-center">
            <div class="text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">24/7</div>
            <div class="text-xs font-bold tracking-widest text-gray-400 uppercase">Support</div>
          </div>
          <div class="text-center">
            <div class="text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent">100%</div>
            <div class="text-xs font-bold tracking-widest text-gray-400 uppercase">Quality</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Information Detail Modal - Clean Modern Style -->
    <div v-if="showInfoModal" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Background Overlay -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="closeInfoModal"></div>
      
      <!-- Modal Container -->
      <div class="flex min-h-screen items-center justify-center p-4 sm:p-6">
        <div class="relative w-full max-w-5xl mx-auto">
          <!-- Modal Card -->
          
            
            <!-- Modal Header Section - Candy Theme -->
            <div class="relative bg-gradient-to-r from-orange-500 via-red-500 to-blue-600">
              <!-- Header Content -->
              <div class="relative z-10 p-8 lg:p-12">
                <!-- Close Button - Gummy Style -->
                <button 
                  @click="closeInfoModal"
                  class="absolute top-8 right-8 w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all duration-500 group border-4 border-white/40 hover:scale-110 hover:rotate-90 ring-4 ring-white/30"
                >
                  <svg class="w-7 h-7 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>

                <!-- Status Badge - Candy Wrapper -->
                <div class="inline-flex items-center px-6 py-3 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/50 text-white text-sm font-black mb-6 ring-4 ring-white/20">
                  <div class="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span class="uppercase tracking-wide">📰 Information Details</span>
                </div>

                <!-- Title -->
                <h2 class="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {{ selectedInfo?.title }}
                </h2>

                <!-- Decorative Line -->
                <div class="w-20 h-1 bg-white/30 rounded-full mb-4"></div>

                <!-- Subtitle -->
                <p class="text-lg text-white/90 font-medium max-w-2xl leading-relaxed">
                  Detailed information and insights
                </p>
              </div>
            </div>

            <!-- Modal Content Section -->
            <div class="relative bg-white">
              <!-- Content Area -->
              <div class="p-8 lg:p-12">
                <!-- Image Section -->
                <div v-if="selectedInfo?.image_url" class="mb-10">
                  <div class="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    <img 
                      :src="getImageUrl(selectedInfo.image_url)" 
                      :alt="selectedInfo.title"
                      class="w-full h-100 object-cover"
                      @error="handleImageError"
                    />
                    
                    <!-- Floating Badge -->
                    <div class="absolute top-4 left-4">
                      <div class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/95 backdrop-blur-sm border border-gray-200 shadow-sm">
                        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span class="text-sm font-medium text-gray-700">Featured Image</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Content Typography -->
                <div class="prose prose-gray prose-lg max-w-none">
                  <div class="space-y-4">
                    <div class="text-gray-700 leading-relaxed text-lg" v-html="selectedInfo?.description"></div>
                  </div>
                </div>

                <!-- Action Section -->
                <div class="mt-10 pt-8 border-t border-gray-100">
                  <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <!-- Action Buttons - Gummy Candy Style -->
                    <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                      <!-- Primary Action -->
                      <NuxtLink 
                        v-if="selectedInfo?.button_text && selectedInfo?.button_link"
                        :to="selectedInfo.button_link"
                        @click="closeInfoModal"
                        class="group relative inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 text-white font-black text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-110 ring-4 ring-white/50 overflow-hidden"
                      >
                        <span class="relative z-10">{{ selectedInfo.button_text }}</span>
                        <ArrowRightIcon class="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2 relative z-10" />
                        <!-- Glossy shine -->
                        <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none"></div>
                      </NuxtLink>
                      
                      <!-- Close Button - Gummy Style -->
                      <button 
                        @click="closeInfoModal"
                        class="group relative inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 font-black text-lg transition-all duration-500 hover:shadow-xl transform hover:scale-110 border-4 border-gray-300 ring-4 ring-gray-200/50 overflow-hidden"
                      >
                        <svg class="mr-3 w-5 h-5 transition-transform group-hover:rotate-180 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span class="relative z-10">Close</span>
                        <!-- Glossy shine -->
                        <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none"></div>
                      </button>
                    </div>

                    <!-- Info Stats -->
                    <div class="flex items-center space-x-6 text-gray-500">
                      <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span class="text-sm font-medium">OUR Information</span>
                      </div>
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <span class="text-sm font-medium">Detail View</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bottom Candy Stripe -->
              <div class="h-3 bg-gradient-to-r from-orange-500 via-red-500 to-green-700 animate-pulse"></div>
            </div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ArrowRightIcon, 
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'
// Access runtime config for API URL
const runtimeConfig = useRuntimeConfig()

// Page meta
useSeoMeta({
  title: 'Home - Welcome to Aprati Foods Cambodia',
  description: 'Enhanced introduction website with advanced product search, career management, and comprehensive inventory system.'
})

// Search reactive data - REMOVED (replaced with information sections)
// const searchForm = ref({
//   query: '',
//   brand_id: '',
//   category: '',
//   min_price: null,
//   max_price: null,
//   in_stock: ''
// })

// const searchLoading = ref(false)
const brands = ref([])
const categories = ref([])

// Dynamic brands and products data
const dynamicBrands = useState('home-brands', () => [])
const brandProducts = useState('home-brand-products', () => ({}))
const loading = ref(true) // Loading state is local UI state

// Information sections data (admin manageable)
const informationSections = useState('home-info-sections', () => [])
const informationLoading = ref(false)

// Information modal data
const showInfoModal = ref(false)
const selectedInfo = ref(null)

// Featured products data
const featuredProducts = ref([])

// Hero image data (admin manageable)
const heroImage = useState('home-hero-image', () => '/images/default-hero.svg')
const heroImageAlt = ref('Aprati Food Company')
const heroImageTitle = ref('')
const heroImageDescription = ref('')

// Hero carousel data
const currentSlide = ref(0)
const slideProgress = ref(0)
const autoPlayInterval = ref(null)
const progressInterval = ref(null)
const isPaused = ref(false)
const heroSlidesLoading = ref(true)

// Hero slides configuration (loaded from backend API)
const heroSlides = useState('hero-slides', () => [])
const newProducts = useState('home-new-products', () => [])
const newProductsLoading = ref(true)

// Load hero slides from backend API
const loadHeroSlides = async () => {
  if (heroSlides.value.length > 0) {
    heroSlidesLoading.value = false
    return
  }
  heroSlidesLoading.value = true
  try {
    // Use configured API base URL
    const apiUrl = `${runtimeConfig.public.apiBase}/hero-slides`
    console.log('🔍 Loading hero slides from:', apiUrl)
    
    const response = await $fetch(apiUrl, {
      timeout: 10000 // Increased timeout
    })
    
    console.log('✅ Hero Slides API Response:', response)
    
    if (response.success && response.data && Array.isArray(response.data)) {
      // Filter active slides and sort by display_order
      const activeSlides = response.data
        .filter(slide => slide.is_active)
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      
      if (activeSlides.length > 0) {
        // Transform backend data to frontend format
        heroSlides.value = activeSlides.map(slide => {
          // Construct full image URL if it's from storage
          let imageUrl = slide.image_url
          if (imageUrl && imageUrl.startsWith('/storage/')) {
            imageUrl = `${runtimeConfig.public.apiBaseUrl}${imageUrl}`
          }
          
          return {
            id: slide.id,
            image: imageUrl || 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1920&h=1080&fit=crop',
            imageAlt: slide.image_alt || slide.title || 'Aprati Foods',
            overlayClass: slide.overlay_class || 'bg-blue-600/20',
            badge: slide.badge_text || 'Welcome to Aprati Foods',
            badgeColor: slide.badge_color || 'bg-blue-600/80',
            title: slide.title || 'Welcome to Aprati',
            subtitle: slide.subtitle || 'Premium quality products',
            primaryButtonText: slide.primary_button_text || 'Explore',
            primaryButtonLink: slide.primary_button_link || '/brands',
            primaryButtonClass: slide.primary_button_class || 'group relative px-8 py-4 bg-white text-gray-900 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-blue-500 hover:text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1',
            secondaryButtonText: slide.secondary_button_text || 'Join Us',
            secondaryButtonLink: slide.secondary_button_link || '/careers',
            secondaryButtonClass: slide.secondary_button_class || 'group relative px-8 py-4 border border-white text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 rounded-lg backdrop-blur-sm'
          }
        })
        
        console.log(`✅ Loaded ${heroSlides.value.length} active hero slides`)
      } else {
        console.warn('⚠️ No active hero slides found, using defaults')
        useDefaultHeroSlides()
      }
    } else {
      console.warn('⚠️ Invalid hero slides response format, using defaults')
      useDefaultHeroSlides()
    }
  } catch (error) {
    console.error('❌ Failed to load hero slides:', error)
    console.log('📦 Using default hero slides as fallback')
    // Use default slides on error
    useDefaultHeroSlides()
  } finally {
    heroSlidesLoading.value = false
  }
}

// Default/fallback slides if API fails
const useDefaultHeroSlides = () => {
  heroSlides.value = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1920&h=1080&fit=crop',
      imageAlt: 'Aprati Food Company',
      overlayClass: 'bg-blue-600/20',
      badge: 'Welcome to Aprati Foods',
      badgeColor: 'bg-blue-600/80',
      title: 'Welcome to <span class="text-blue-600">Aprati</span> Food Company',
      subtitle: 'Leading Cambodia\'s food industry with premium quality products and innovation.',
      primaryButtonText: 'Explore Brands',
      primaryButtonLink: '/brands',
      primaryButtonClass: 'group relative px-8 py-4 bg-white text-gray-900 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-blue-500 hover:text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1',
      secondaryButtonText: 'Join Our Team',
      secondaryButtonLink: '/careers',
      secondaryButtonClass: 'group relative px-8 py-4 border border-white text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 rounded-lg backdrop-blur-sm'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&h=1080&fit=crop',
      imageAlt: 'Frutati Fruit Candies',
      overlayClass: 'bg-green-600/20',
      badge: 'Discover Frutati',
      badgeColor: 'bg-green-600/80',
      title: 'Delicious <span class="text-green-600">Frutati</span> Candies',
      subtitle: 'Natural fruit flavors in every bite - Perfect sweetness for everyone.',
      primaryButtonText: 'Shop Now',
      primaryButtonLink: '/brands/frutati',
      primaryButtonClass: 'group relative px-8 py-4 bg-white text-gray-900 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-green-500 hover:text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1',
      secondaryButtonText: 'Learn More',
      secondaryButtonLink: '/brands',
      secondaryButtonClass: 'group relative px-8 py-4 border border-white text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 rounded-lg backdrop-blur-sm'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=1920&h=1080&fit=crop',
      imageAlt: 'Mocati Premium Chocolate',
      overlayClass: 'bg-orange-600/20',
      badge: 'Indulge in Mocati',
      badgeColor: 'bg-orange-600/80',
      title: 'Premium <span class="text-orange-600">Mocati</span> Chocolate',
      subtitle: 'Rich chocolate experience with every piece - Pure indulgence awaits.',
      primaryButtonText: 'View Collection',
      primaryButtonLink: '/brands/mocati',
      primaryButtonClass: 'group relative px-8 py-4 bg-white text-gray-900 font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-orange-500 hover:text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1',
      secondaryButtonText: 'Contact Us',
      secondaryButtonLink: '/contact',
      secondaryButtonClass: 'group relative px-8 py-4 border border-white text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 rounded-lg backdrop-blur-sm'
    }
  ]
}

// Carousel functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.value.length
  resetProgress()
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? heroSlides.value.length - 1 : currentSlide.value - 1
  resetProgress()
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetProgress()
}

const resetProgress = () => {
  slideProgress.value = 0
}

const startAutoPlay = () => {
  // Auto-rotate every 6 seconds
  autoPlayInterval.value = setInterval(() => {
    if (!isPaused.value) {
      nextSlide()
    }
  }, 6000)
  
  // Update progress bar every 50ms
  progressInterval.value = setInterval(() => {
    if (!isPaused.value) {
      slideProgress.value += (50 / 6000)
      if (slideProgress.value >= 1) {
        slideProgress.value = 0
      }
    }
  }, 50)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
  if (progressInterval.value) {
    clearInterval(progressInterval.value)
    progressInterval.value = null
  }
}

const handleSlideImageError = (event, index) => {
  console.warn(`Hero slide ${index + 1} image failed to load:`, event.target.src)
  // Keep the gradient background
}

// Hero content data (admin manageable) - DEPRECATED, kept for backward compatibility
const heroContent = useState('home-hero-content', () => ({
  title: 'Welcome to <span class="text-orange-400">Aprati</span> Food Company',
  subtitle: 'Enhanced introduction website with advanced product search, career management, and comprehensive inventory system.',
  primary_button_text: 'Explore Our Brands',
  primary_button_link: '/brands',
  secondary_button_text: 'Join Our Team',
  secondary_button_link: '/careers'
}))

// Duplicate functions removed - using loadBrands() and loadBrandProducts() instead

// Get brand gradient based on slug
const getBrandGradient = (slug) => {
  const gradients = {
    'aprati': 'bg-gradient-to-br from-blue-600 to-blue-800',
    'frutati': 'bg-gradient-to-br from-green-600 to-green-800',
    'mocati': 'bg-gradient-to-br from-orange-600 to-orange-800'
  }
  return gradients[slug] || 'bg-gradient-to-br from-red-600 to-red-800'
}

// Get brand text color based on slug
const getBrandTextColor = (slug) => {
  const colors = {
    'aprati': 'text-blue-400 group-hover:text-blue-300',
    'frutati': 'text-green-400 group-hover:text-green-300',
    'mocati': 'text-orange-400 group-hover:text-orange-300'
  }
  return colors[slug] || 'text-red-400 group-hover:text-red-300'
}

// Handle brand logo loading errors
const handleBrandLogoError = (event) => {
  console.warn('Brand logo failed to load:', event.target.src)
  // Hide the logo container instead of just the image
  const logoContainer = event.target.closest('.relative')
  if (logoContainer) {
    logoContainer.style.display = 'none'
  }
}

// Handle cover image loading errors
const handleCoverImageError = (event) => {
  console.warn('Cover image failed to load:', event.target.src)
  // Fall back to gradient background
  const container = event.target.closest('[class*="h-48"]')
  if (container) {
    event.target.style.display = 'none'
  }
}

// Handle successful logo loading
const handleBrandLogoLoad = (event) => {
  // Logo loaded successfully
}

// Load initial data
const loadInitialData = () => {
  // Static data for now - will be replaced with API calls later
  brands.value = [
    { id: 1, name: 'Aprati', slug: 'aprati' },
    { id: 2, name: 'Frutati', slug: 'frutati' },
    { id: 3, name: 'Mocati', slug: 'mocati' }
  ]
  
  categories.value = [
    'Beverages',
    'Snacks', 
    'Dairy Products',
    'Fruits & Vegetables',
    'Grains & Cereals',
    'Meat & Poultry',
    'Seafood',
    'Condiments & Sauces'
  ]
}

// Load information sections from API (admin manageable) with cache-busting
const loadInformationSections = async () => {
  if (informationSections.value.length > 0) {
    informationLoading.value = false
    return
  }
  informationLoading.value = true
  try {
    const apiUrl = `${runtimeConfig.public.apiBase}/information-sections`
    // console.log('🔍 Loading information from:', apiUrl)
    // console.log('📡 API Base URL:', runtimeConfig.public.apiBase)
    
    const response = await $fetch(`${runtimeConfig.public.apiBase}/information-sections`, {
      timeout: 5000
    })
    
    // console.log('✅ Information API Response:', response)
    // console.log('📊 Response data:', response.data)
    
    if (response.success && response.data) {
      // Only show active sections
      informationSections.value = response.data.filter(section => section.is_active)
      // console.log(`✅ Loaded ${informationSections.value.length} active information sections`)
    } else {
      console.warn('⚠️ No information data in response')
      informationSections.value = []
    }
  } catch (error) {
    console.error('❌ Failed to load information sections:', error)
    console.error('❌ Error details:', error.response || error.message || error)
    // Use empty array on error - will show default content
    informationSections.value = []
  } finally {
    informationLoading.value = false
  }
}

// Helper function to construct image URLs
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/default-info.jpg'
  if (imagePath.startsWith('data:')) return imagePath // Data URIs (base64 encoded images)
  
  // Handle full URLs
  if (imagePath.startsWith('http')) {
    let fixedUrl = imagePath
    // Fix localhost URLs to use production URL
    if (fixedUrl.includes('127.0.0.1:8000') || fixedUrl.includes('localhost')) {
      fixedUrl = fixedUrl.replace(/http:\/\/127\.0\.0\.1:8000/g, runtimeConfig.public.apiBaseUrl)
      fixedUrl = fixedUrl.replace(/http:\/\/localhost:8000/g, runtimeConfig.public.apiBaseUrl)
      fixedUrl = fixedUrl.replace(/http:\/\/localhost/g, runtimeConfig.public.apiBaseUrl)
    }
    return fixedUrl
  }
  
  // Handle relative storage paths
  if (imagePath.startsWith('/storage/')) {
    return `${runtimeConfig.public.apiBaseUrl}${imagePath}`
  }
  
  // If it's just a filename, assume it's in storage/information-sections/
  return `${runtimeConfig.public.apiBaseUrl}/storage/information-sections/${imagePath}`
}

// Load brands data from API
const loadBrands = async () => {
  if (dynamicBrands.value.length > 0) {
    loading.value = false
    return
  }
  try {
    loading.value = true
    const apiUrl = `${runtimeConfig.public.apiBase}/brands`
    // console.log('🔍 Loading brands from:', apiUrl)
    // console.log('📡 API Base URL:', runtimeConfig.public.apiBase)
    
    const response = await $fetch(`${runtimeConfig.public.apiBase}/brands`, {
      timeout: 5000
    })
    
    // console.log('✅ Brands API Response:', response)
    // console.log('📊 Response data:', response.data)
    
    if (response.status === 'success' && response.data && response.data.brands) {
      dynamicBrands.value = response.data.brands.filter(brand => brand.is_active)
    } else {
      dynamicBrands.value = []
    }
  } catch (error) {
    console.error('Error loading brands:', error)
    dynamicBrands.value = []
  } finally {
    loading.value = false
  }
}



// Load products for each brand in PARALLEL (much faster)
const loadBrandProducts = async () => {
  if (!dynamicBrands.value.length) return
  
  // Load all brand products in parallel - limit to 6 products per brand for homepage
  const productPromises = dynamicBrands.value.map(async (brand) => {
    // Check cache first
    if (brandProducts.value[brand.id] && brandProducts.value[brand.id].length > 0) {
        return
    }
    try {
      const productsResponse = await $fetch(`${runtimeConfig.public.apiBase}/brands/${brand.slug}/products?active=1&limit=6`, {
        timeout: 10000
      })
      
      if (productsResponse.status === 'success' && productsResponse.data) {
        // Handle paginated response
        const products = productsResponse.data.products
        if (products.data) {
          brandProducts.value[brand.id] = products.data
        } else if (Array.isArray(products)) {
          brandProducts.value[brand.id] = products
        } else {
          brandProducts.value[brand.id] = []
        }
      }
    } catch (error) {
      console.error(`Failed to load products for brand ${brand.name}:`, error)
      brandProducts.value[brand.id] = []
    }
  })
  
  // Wait for all products to load in parallel
  await Promise.all(productPromises)
}

// Helper function to get brand style colors
const getBrandColors = (index) => {
  const colorPairs = [
    { from: 'from-blue-500', to: 'to-blue-700', text: 'text-blue-400' },
    { from: 'from-red-500', to: 'to-orange-500', text: 'text-red-400' },
    { from: 'from-emerald-500', to: 'to-teal-500', text: 'text-emerald-300' },
    { from: 'from-orange-500', to: 'to-red-500', text: 'text-orange-300' },
    { from: 'from-indigo-500', to: 'to-purple-500', text: 'text-indigo-300' },
    { from: 'from-green-500', to: 'to-emerald-500', text: 'text-green-300' }
  ]
  return colorPairs[index % colorPairs.length]
}

// Get product count for a brand
const getProductCount = (brandId) => {
  return brandProducts.value[brandId]?.length || 0
}

// Get first few products for a brand
const getFeaturedProducts = (brandId, limit = 3) => {
  const products = brandProducts.value[brandId] || []
  return products.slice(0, limit)
}

// Load featured products for homepage display
const loadFeaturedProducts = async () => {
  try {
    // Collect products from all brands
    const allProducts = []
    for (const [brandId, products] of Object.entries(brandProducts.value)) {
      if (Array.isArray(products) && products.length > 0) {
        // Add brand info to each product
        const brand = dynamicBrands.value.find(b => b.id === parseInt(brandId))
        products.forEach(product => {
          allProducts.push({
            ...product,
            brand_name: brand?.name || '',
            brand_slug: brand?.slug || ''
          })
        })
      }
    }
    
    // Shuffle using Fisher-Yates algorithm (deterministic on server, random on client)
    const shuffled = [...allProducts]
    if (process.client) {
      // Client-side: true random shuffle
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
    }
    // Server-side: keep original order to avoid hydration mismatch
    featuredProducts.value = shuffled.slice(0, 8)
  } catch (error) {
    console.error('Failed to load featured products:', error)
    featuredProducts.value = []
  }
}

// Handle product image loading errors
const handleProductImageError = (event) => {
  // Show the placeholder box instead
  const imageContainer = event.target.closest('.relative')
  if (imageContainer) {
    event.target.style.display = 'none'
    // Add placeholder
    const placeholder = document.createElement('div')
    placeholder.className = 'absolute inset-0 flex items-center justify-center'
    placeholder.innerHTML = '<div class="text-6xl opacity-20">📦</div>'
    imageContainer.appendChild(placeholder)
  }
}

// New Products Slider State
const newProductsSlideIndex = ref(0)
const newProductsPerSlide = ref(4) // Default for desktop
const maxNewProductsDisplay = ref(12)

// Load NEW products for "New Arrivals" section
const loadNewProducts = async () => {
  if (newProducts.value.length > 0) {
    newProductsLoading.value = false
    return
  }
  newProductsLoading.value = true
  try {
    const response = await $fetch(`${runtimeConfig.public.apiBase}/products?sort_by=created_at&sort_direction=desc&per_page=${maxNewProductsDisplay.value}`, {
      timeout: 5000
    })
    
    if (response.status === 'success' && response.data && response.data.products) {
       newProducts.value = response.data.products
    } else {
       newProducts.value = []
    }
  } catch (error) {
    console.error('Failed to load new products:', error)
    newProducts.value = []
  } finally {
    newProductsLoading.value = false
  }
}

// Promotion Banners State
const promotionBanners = useState('home-promo-banners', () => [])
const bannerLoading = ref(true)
const currentPromoSlide = ref(0)
let promoAutoplayInterval = null

// Load promotion banners
// Load promotion banners
const loadPromotionBanners = async () => {
    if (promotionBanners.value.length > 0) {
        bannerLoading.value = false
        if (promotionBanners.value.length > 1) {
            startPromoAutoplay()
        }
        return
    }
    bannerLoading.value = true
    try {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/promotion-banners`)
        if (response.status === 'success') {
            promotionBanners.value = response.data
            // Start autoplay if banners exist
            if (promotionBanners.value.length > 1) {
                startPromoAutoplay()
            }
        }
    } catch (e) {
        console.error('Failed to load display banners', e)
    } finally {
        bannerLoading.value = false
    }
}

// Promotion Banner Navigation
const nextPromoSlide = () => {
  currentPromoSlide.value = (currentPromoSlide.value + 1) % promotionBanners.value.length
}

const prevPromoSlide = () => {
  currentPromoSlide.value = (currentPromoSlide.value - 1 + promotionBanners.value.length) % promotionBanners.value.length
}

const goToPromoSlide = (index) => {
  currentPromoSlide.value = index
  resetPromoAutoplay()
}

const startPromoAutoplay = () => {
  stopPromoAutoplay()
  promoAutoplayInterval = setInterval(() => {
    nextPromoSlide()
  }, 5000)
}

const stopPromoAutoplay = () => {
  if (promoAutoplayInterval) clearInterval(promoAutoplayInterval)
}

const resetPromoAutoplay = () => {
  stopPromoAutoplay()
  startPromoAutoplay()
}

// Swiper Configuration
const swiperPaginationConfig = {
  clickable: true,
  dynamicBullets: true,
  renderBullet: function (index, className) {
    return `<span class="${className} shadow-lg border-2 border-white"></span>`
  }
}

// Carousel Navigation Methods
const nextNewProductsSlide = () => {
  const maxIndex = Math.ceil(newProducts.value.length / newProductsPerSlide.value) - 1
  if (newProductsSlideIndex.value < maxIndex) {
    newProductsSlideIndex.value++
  } else {
    newProductsSlideIndex.value = 0 // Loop back
  }
}

const prevNewProductsSlide = () => {
  if (newProductsSlideIndex.value > 0) {
    newProductsSlideIndex.value--
  } else {
    const maxIndex = Math.ceil(newProducts.value.length / newProductsPerSlide.value) - 1
    newProductsSlideIndex.value = maxIndex // Loop to end
  }
}

// Update items per slide on resize
const updateItemsPerSlide = () => {
  if (window.innerWidth < 640) {
    newProductsPerSlide.value = 1
  } else if (window.innerWidth < 1024) {
    newProductsPerSlide.value = 2
  } else {
    newProductsPerSlide.value = 4
  }
}

// Initialize resize listener
onMounted(() => {
  updateItemsPerSlide()
  window.addEventListener('resize', updateItemsPerSlide)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerSlide)
})

// Load hero image data from API
// Load hero image data from API
const loadHeroImage = async () => {
  if (heroImage.value && !heroImage.value.includes('default-hero') && !heroImage.value.startsWith('data:')) {
     return
  }
  try {
    const response = await $fetch(`${runtimeConfig.public.apiBase}/hero-image`, {
      timeout: 5000 // 5 second timeout
    })
    if (response.success && response.data) {
      // Construct full URL for API images
      const imageUrl = response.data.image_url
      if (imageUrl && imageUrl.startsWith('/storage/')) {
        heroImage.value = `${runtimeConfig.public.apiBaseUrl}${imageUrl}`
      } else {
        heroImage.value = imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjM2NmYxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFwcmF0aSBGb29kIENvbXBhbnk8L3RleHQ+Cjwvc3ZnPgo='
      }
      heroImageAlt.value = response.data.alt_text || 'Aprati Food Company'
      heroImageTitle.value = response.data.title || ''
      heroImageDescription.value = response.data.description || ''
    }
  } catch (error) {
    console.error('Failed to load hero image:', error)
    // Use defaults on error
    heroImage.value = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjM2NmYxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFwcmF0aSBGb29kIENvbXBhbnk8L3RleHQ+Cjwvc3ZnPgo='
    heroImageAlt.value = 'Aprati Food Company'
    heroImageTitle.value = 'Premium Quality'
    heroImageDescription.value = 'Fresh Food Products'
  }
}

// Handle image loading errors
const handleImageError = (event) => {
  console.warn('Hero image failed to load, using fallback')
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjM2NmYxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkFwcmF0aSBGb29kIENvbXBhbnk8L3RleHQ+Cjwvc3ZnPgo='
}

// Load hero content data from API
const loadHeroContent = async () => {
  if (heroContent.value.title && !heroContent.value.title.includes('Aprati')) { 
      // Weak check, but better than nothing. Or check if it's the default object reference?
      // useState preserves the object.
      // Let's rely on checking a property that changes from default
  }
  // Actually, for hero content, let's just use a separate loaded flag or simple check
  // The default title has "Aprati" in it.
  try {
    const response = await $fetch(`${runtimeConfig.public.apiBase}/hero-content`, {
      timeout: 5000 // 5 second timeout
    })
    if (response.success && response.data) {
      heroContent.value = {
        title: response.data.title || 'Welcome to <span class="text-orange-400">Aprati</span> Food Company',
        subtitle: response.data.subtitle || 'Enhanced introduction website with advanced product search, career management, and comprehensive inventory system.',
        primary_button_text: response.data.primary_button_text || 'Explore Our Brands',
        primary_button_link: response.data.primary_button_link || '/brands',
        secondary_button_text: response.data.secondary_button_text || 'Join Our Team',
        secondary_button_link: response.data.secondary_button_link || '/careers'
      }
    }
  } catch (error) {
    console.error('Failed to load hero content:', error)
    // Use defaults on error - already set in the ref
  }
}

// Keyboard event handler for modal and carousel
const handleKeydown = (event) => {
  if (event.key === 'Escape' && showInfoModal.value) {
    closeInfoModal()
  }
  if (event.key === 'ArrowLeft') {
    previousSlide()
  }
  if (event.key === 'ArrowRight') {
    nextSlide()
  }
}

// Load all data on component mount
onMounted(async () => {
  // Load initial static data
  loadInitialData()
  
  // Load hero slides from backend (with fallback if API fails)
  await loadHeroSlides()
  
  // Start hero carousel auto-play after slides are loaded
  startAutoPlay()
  
  // Load all data in parallel
  await Promise.all([
    loadInformationSections(),
    loadBrands()
  ])
  
  // Load brand products after brands are loaded
  await loadBrandProducts()
  
  // Load promotion banners
  loadPromotionBanners()
  
  // Load new products
  loadNewProducts()
  
  // Load featured products for homepage display
  await loadFeaturedProducts()
  
  // Load new products
  await loadNewProducts()

  // Setup keyboard listener
  document.addEventListener('keydown', handleKeydown)
})

// Cleanup on unmount
onUnmounted(() => {
  stopAutoPlay()
  stopPromoAutoplay()
  document.removeEventListener('keydown', handleKeydown)
  // Ensure body scroll is restored on component unmount
  document.body.style.overflow = 'auto'
})

// Information modal functions
const openInfoModal = (section) => {
  selectedInfo.value = section
  showInfoModal.value = true
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeInfoModal = () => {
  showInfoModal.value = false
  selectedInfo.value = null
  // Restore body scroll
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
/* Red Bull Style Animations */
@keyframes slow-zoom {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

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

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-slow-zoom {
  animation: slow-zoom 20s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 1s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animation-delay-500 {
  animation-delay: 0.5s;
  opacity: 0;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-1000 {
  animation-delay: 1s;
  opacity: 0;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-30px) translateX(20px);
  }
  66% {
    transform: translateY(-15px) translateX(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-20px) translateX(-30px);
  }
  66% {
    transform: translateY(-35px) translateX(15px);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-25px) translateX(25px);
  }
}

.animate-float {
  animation: float 15s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 18s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 20s ease-in-out infinite;
}

@keyframes wiggle {
  0%, 100% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(-15deg) scale(1.1);
  }
  50% {
    transform: rotate(15deg) scale(0.9);
  }
  75% {
    transform: rotate(-10deg) scale(1.05);
  }
}

.animate-wiggle {
  animation: wiggle 3s ease-in-out infinite;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-700 {
  animation-delay: 0.7s;
}

.animation-delay-900 {
  animation-delay: 0.9s;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

@keyframes shine {
  100% {
    left: 125%;
  }
}

.animate-shine {
  animation: shine 1s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>



