<template>
  <div class="min-h-screen bg-white">
    <!-- Multi-Hero Carousel Section - Premium Modern Theme -->
    <section class="relative h-screen overflow-hidden bg-black group/hero">
      <!-- Hero Slides Container -->
      <div class="relative h-full">
        <div 
          v-for="(slide, index) in heroSlides" 
          :key="slide.id"
          class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
        >
          <!-- Immersive Background -->
          <div class="absolute inset-0">
            <img 
              :src="slide.image"
              :alt="slide.imageAlt"
              class="w-full h-full object-cover transition-transform duration-[10s] ease-out scale-100"
              :class="currentSlide === index ? 'scale-110' : 'scale-100'"
              @error="(e) => handleSlideImageError(e, index)"
            />
            <!-- Sophisticated Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent opacity-90"></div>
          </div>
          
          <!-- Asymmetric Content Layout -->
          <div class="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center h-full pt-20">
              <div class="w-full lg:w-3/5 xl:w-1/2">
                <!-- Staggered Content Animation -->
                <div class="space-y-8">
                  <!-- Premium Badge Section -->
                  <div 
                    v-if="slide.badge"
                    class="transition-all duration-700 transform"
                    :class="currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
                    style="transition-delay: 200ms"
                  >
                    <div class="inline-flex items-center space-x-3">
                      <div class="w-12 h-[1px] bg-corporate-gold"></div>
                      <span class="text-xs font-black tracking-[0.3em] uppercase text-corporate-gold">
                        {{ slide.badge }}
                      </span>
                    </div>
                  </div>

                  <!-- Ultra-Premium Typography Title -->
                  <h1 
                    v-if="slide.title"
                    class="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.1] transition-all duration-700 transform"
                    :class="currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
                    style="transition-delay: 400ms"
                    v-html="slide.title"
                  ></h1>

                  <!-- Sophisticated Subtitle -->
                  <p 
                    v-if="slide.subtitle"
                    class="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed font-medium transition-all duration-700 transform"
                    :class="currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
                    style="transition-delay: 600ms"
                  >
                    {{ slide.subtitle }}
                  </p>

                  <!-- Elite CTA Cluster -->
                  <div 
                    v-if="slide.primaryButtonText || slide.secondaryButtonText"
                    class="flex flex-col sm:flex-row gap-6 pt-4 transition-all duration-700 transform"
                    :class="currentSlide === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
                    style="transition-delay: 800ms"
                  >
                    <NuxtLink 
                      v-if="slide.primaryButtonText"
                      :to="slide.primaryButtonLink"
                      class="group relative inline-flex items-center px-10 py-5 bg-white text-corporate-dark font-black text-xs tracking-widest uppercase rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                    >
                      <span class="relative z-10">{{ slide.primaryButtonText }}</span>
                      <div class="absolute inset-0 bg-corporate-gold translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
                      <ArrowRightIcon class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover:translate-x-1 hover:text-white" />
                    </NuxtLink>
                    
                    <NuxtLink 
                      v-if="slide.secondaryButtonText"
                      :to="slide.secondaryButtonLink"
                      class="inline-flex items-center px-10 py-5 bg-white/5 backdrop-blur-xl text-white font-black text-xs tracking-widest uppercase rounded-2xl border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-corporate-gold group"
                    >
                      <span>{{ slide.secondaryButtonText }}</span>
                      <span class="ml-2 w-1.5 h-1.5 rounded-full bg-corporate-gold opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vertical Progress Indicator (The Elite Sidebar) -->
      <div class="absolute right-8 sm:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <div class="flex flex-col gap-12 items-center">
          <div class="text-white/20 font-black text-xs tracking-widest uppercase vertical-text">
            Scroll for Excellence
          </div>
          <div class="flex flex-col gap-6">
            <button
              v-for="(slide, index) in heroSlides"
              :key="`nav-${slide.id}`"
              @click="goToSlide(index)"
              class="group relative flex items-center justify-end"
            >
              <span 
                class="absolute right-10 text-[10px] font-black text-white/40 tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:right-8"
                :class="{ 'opacity-100 right-8 text-corporate-gold': currentSlide === index }"
              >
                0{{ index + 1 }}
              </span>
              <div 
                class="h-[1px] transition-all duration-500 origin-right"
                :class="currentSlide === index ? 'w-16 bg-corporate-gold' : 'w-8 bg-white/20 group-hover:w-12 group-hover:bg-white/40'"
              ></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Sophisticated Scroll Down Badge -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 animate-bounce opacity-40">
        <div class="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/40"></div>
        <span class="text-[9px] font-black text-white tracking-[0.4em] uppercase">Discovery</span>
      </div>
    </section>

    <!-- Professional Promotion Banner - Synced with Autoplay -->
    <PromotionBanner 
      v-if="promotionBanners.length > 0"
      :text="promotionBanners[currentPromoSlide].title"
      :button-text="promotionBanners[currentPromoSlide].button_text"
      :link="promotionBanners[currentPromoSlide].button_link"
      class="transition-all duration-1000"
    />

    <!-- Section Removed: New Product Promotion Banner Slider -->


    <!-- Featured Promotions Section -->
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


    <!-- Information Section (Corporate Insights) -->
    <section class="relative py-24 sm:py-32 bg-slate-50 overflow-hidden">
      <!-- Subtle Professional Background Pattern -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header - Professional Theme -->
        <div class="mb-20 text-center relative animate-fade-in">
          <div class="inline-block mb-6">
            <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black tracking-widest uppercase">
              Insights & Innovations
            </span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-display mb-6 tracking-tight text-corporate-dark">
            Latest <span class="text-corporate-gold italic">Corporate</span> News
          </h2>
          <div class="w-16 h-1 bg-corporate-gold mx-auto mb-8 rounded-full"></div>
          <p class="text-xl text-corporate-slate max-w-3xl mx-auto font-medium leading-relaxed">
            Stay updated with the latest advancements in food science, luxury snack trends, and Aprati's global milestones.
          </p>
        </div>

        <!-- Loading State - Professional -->
        <div v-if="informationLoading" class="text-center py-24">
          <div class="flex justify-center mb-8">
            <div class="relative w-16 h-16">
              <div class="absolute inset-0 rounded-full border-4 border-blue-100"></div>
              <div class="absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin"></div>
            </div>
          </div>
          <p class="text-slate-600 text-lg font-bold tracking-wide">Syncing Corporate Insights...</p>
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

    <!-- Our Portfolio Section - Professional Corporate Style -->
    <section id="brands" class="relative py-24 sm:py-32 bg-white overflow-hidden scroll-smooth">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-20 animate-fade-in text-corporate-dark">
          <div class="inline-block mb-6">
            <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-corporate-gold/10 text-corporate-gold text-xs font-black tracking-widest uppercase border border-corporate-gold/20">
              Brand Integrity
            </span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-display mb-6 tracking-tight leading-none text-corporate-dark">
            Our <span class="text-corporate-gold italic">Strategic</span> Portfolio
          </h2>
          <div class="w-16 h-1 bg-corporate-gold mx-auto mb-8 rounded-full"></div>
          <p class="text-xl text-corporate-slate max-w-3xl mx-auto font-medium leading-relaxed">
            Discover our diverse range of snacks and health products, developed with a commitment to scientific quality and global consumer wellbeing.
          </p>
        </div>

        <!-- Brands Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Loading State Component -->
          <div v-if="loading" class="col-span-full text-center py-20">
            <div class="flex justify-center mb-6">
              <div class="relative w-12 h-12">
                <div class="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
                <div class="absolute inset-0 rounded-full border-4 border-t-emerald-600 animate-spin"></div>
              </div>
            </div>
            <p class="text-slate-600 font-bold tracking-widest uppercase text-xs">Accessing Portfolio...</p>
          </div>
          <!-- Dynamic Brand Cards -->
          <div v-else-if="dynamicBrands.length > 0" v-for="(brand, index) in dynamicBrands" :key="brand.id" class="group relative">
            <NuxtLink :to="`/brands/${brand.slug}`" class="block">
              <div class="relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-sm sm:shadow-md lg:shadow-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-300 active:scale-95 sm:group-hover:scale-[1.02] lg:group-hover:scale-[1.05] border border-blue-200 sm:border-2 hover:border-blue-500">
                <!-- Brand Cover Image -->
                <div class="relative h-64 overflow-hidden">
                  <div 
                    v-if="brand.cover_image_url"
                    class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    :style="`background-image: url('${brand.cover_image_url}?v=1');`"
                  ></div>
                  <div v-else class="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200"></div>
                  
                  <!-- Professional Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-corporate-dark/80 via-corporate-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <!-- Logo Badge -->
                  <div v-if="brand.logo_url" class="absolute top-6 left-6 z-20">
                    <div class="bg-white rounded-2xl p-3 shadow-xl border border-white/50 transform transition-transform duration-500 group-hover:scale-105">
                      <img 
                        :src="`${brand.logo_url}?v=1`" 
                        :alt="brand.name"
                        class="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                      >
                    </div>
                  </div>

                  <!-- Brand Info Overlay -->
                  <div class="absolute bottom-6 left-6 right-6 z-10 text-white">
                    <div class="inline-block px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-lg text-[10px] font-black tracking-widest uppercase mb-3">
                      Partner Company
                    </div>
                    <h3 class="text-3xl font-black tracking-tight leading-none mb-2">
                      {{ brand.name }}
                    </h3>
                    <div class="h-1 w-12 bg-emerald-500 rounded-full transform origin-left transition-all duration-500 group-hover:w-20"></div>
                  </div>
                </div>
                
                <!-- Brand Info Section -->
                <div class="p-8 bg-white">
                  <p class="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                    {{ brand.description || 'Premium quality products developed with nutritional excellence and consumer wellbeing at the core.' }}
                  </p>
                  
                  <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Partner</span>
                    </div>
                    <div class="flex items-center gap-2 text-emerald-600 font-bold text-sm group/btn">
                      <span>Learn More</span>
                      <ArrowRightIcon class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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
        
      </div>

      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-12 sm:mb-16 lg:mb-20 relative z-10">
          <div class="inline-block relative mb-4 sm:mb-6">
            <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-corporate-gold text-corporate-dark text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase shadow-lg border border-white/20">
              Featured Innovations
            </span>
          </div>
          <h2 class="text-4xl sm:text-6xl lg:text-7xl font-display mb-6 tracking-tight leading-none text-corporate-dark">
            Discover Our <span class="text-corporate-gold italic">Premium</span> Selection
          </h2>
          <div class="w-20 sm:w-32 h-1 bg-corporate-gold mx-auto mb-8 rounded-full"></div>
          <p class="text-xl sm:text-2xl text-corporate-slate max-w-3xl mx-auto font-medium leading-relaxed">
            Explore our carefully curated selection of elite nutritional solutions and artisanal snacks.
          </p>
        </div>

        <!-- Products Grid - Clean Corporate Style -->
        <div v-if="featuredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <NuxtLink v-for="product in featuredProducts" :key="product.id" :to="`/products/${product.slug}`" class="group block">
            <div class="relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1">
              <!-- Product Image -->
              <div class="relative h-64 overflow-hidden bg-slate-50">
                <img 
                  v-if="product.images && product.images.length > 0"
                  :src="getImageUrl(product.images[0])" 
                  :alt="product.name"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  @error="handleProductImageError"
                />
                <div v-else class="absolute inset-0 flex items-center justify-center">
                  <BriefcaseIcon class="w-12 h-12 text-slate-200" />
                </div>
                
                <!-- Status Badge -->
                <div class="absolute top-4 right-4 z-10">
                  <div class="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                    Premium
                  </div>
                </div>
              </div>
              
              <!-- Product Info -->
              <div class="p-6">
                <div class="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">
                  {{ product.brand_name || 'Nutrition' }}
                </div>
                
                <h3 class="text-xl font-black text-slate-900 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {{ product.name }}
                </h3>
                
                <p class="text-slate-500 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
                  {{ product.description || 'Scientifically developed for optimal nutrition and superior taste quality.' }}
                </p>
                
                <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span class="text-blue-600 font-black text-sm uppercase tracking-widest">Enquire</span>
                  <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <ArrowRightIcon class="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
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

    <!-- Professional Call to Action Section -->
    <section class="relative py-32 lg:py-40 bg-white overflow-hidden scroll-smooth">
      <!-- Sophisticated Background Elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-full h-px bg-slate-100"></div>
        <div class="absolute bottom-0 left-0 w-full h-px bg-slate-100"></div>
        <div class="absolute -right-64 -top-64 w-128 h-128 bg-blue-50/50 rounded-full blur-3xl"></div>
        <div class="absolute -left-64 -bottom-64 w-128 h-128 bg-emerald-50/50 rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Corporate Badge -->
        <div class="inline-block mb-8">
          <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-black tracking-widest uppercase border border-slate-200">
            Strategic Growth
          </span>
        </div>
        
        <!-- Professional Title -->
        <h2 class="text-5xl lg:text-8xl font-display mb-10 leading-none tracking-tight text-corporate-dark">
          Experience <span class="text-corporate-gold italic">Excellence</span> In Every Detail
        </h2>
        
        <div class="w-24 h-1.5 bg-corporate-gold mx-auto mb-12 rounded-full"></div>
        
        <!-- Subtitle -->
        <p class="text-2xl lg:text-3xl text-corporate-slate mb-20 max-w-5xl mx-auto font-medium leading-relaxed">
          Partner with a global leader in the food and health segments. Explore our unwavering commitment to quality, nutritional integrity, and premium innovation.
        </p>
        
        <!-- CTA Buttons - Professional Style -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center mb-24">
          <NuxtLink 
            to="/brands" 
            class="group px-12 py-5 bg-blue-600 text-white font-black text-sm tracking-widest uppercase rounded-2xl transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center"
          >
            <span>Explore Portfolio</span>
            <ArrowRightIcon class="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </NuxtLink>
          
          <NuxtLink 
            to="/contact" 
            class="group px-12 py-5 bg-white text-corporate-dark font-black text-sm tracking-widest uppercase rounded-2xl border-2 border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center"
          >
            <span>Strategic Inquiry</span>
          </NuxtLink>
        </div>
        
        <!-- Corporate Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto pt-20 border-t border-slate-100">
          <div class="text-center">
            <div class="text-4xl lg:text-5xl font-black mb-3 text-corporate-dark">{{ dynamicBrands.length }}</div>
            <div class="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Premium Brands</div>
          </div>
          <div class="text-center">
            <div class="text-4xl lg:text-5xl font-black mb-3 text-blue-600">Global</div>
            <div class="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Standards</div>
          </div>
          <div class="text-center">
            <div class="text-4xl lg:text-5xl font-black mb-3 text-emerald-600">100%</div>
            <div class="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Integrity</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Information Detail Modal - Professional Corporate Style -->
    <div v-if="showInfoModal" class="fixed inset-0 z-[100] overflow-y-auto">
      <!-- Background Overlay -->
      <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" @click="closeInfoModal"></div>
      
      <!-- Modal Container -->
      <div class="flex min-h-screen items-center justify-center p-4 sm:p-6">
        <div class="relative w-full max-w-5xl mx-auto animate-modal-enter">
          <!-- Modal Card -->
          <div class="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-white/20">
            <!-- Modal Header Section -->
            <div class="relative bg-corporate-dark py-12 px-8 lg:px-16 overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-emerald-600/20"></div>
              
              <!-- Content -->
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-8">
                  <div class="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-white/80 text-[10px] font-black uppercase tracking-widest border border-white/10">
                    Corporate Briefing
                  </div>
                  <button 
                    @click="closeInfoModal"
                    class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                <h2 class="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-none">
                  {{ selectedInfo?.title }}
                </h2>
                <div class="w-16 h-1 bg-emerald-500 rounded-full mb-6"></div>
                <p class="text-xl text-blue-100/80 font-medium max-w-2xl leading-relaxed">
                  Strategic insights and development updates regarding our health and food sector initiatives.
                </p>
              </div>
            </div>

            <!-- Modal Body -->
            <div class="p-8 lg:p-16">
              <div v-if="selectedInfo?.image_url" class="mb-12 relative rounded-3xl overflow-hidden shadow-lg aspect-video bg-slate-50">
                <img 
                  :src="getImageUrl(selectedInfo.image_url)" 
                  :alt="selectedInfo.title"
                  class="w-full h-full object-cover"
                />
              </div>

              <div class="prose prose-slate prose-lg max-w-none">
                <div class="text-slate-600 leading-relaxed font-medium" v-html="selectedInfo?.description"></div>
              </div>

              <!-- Action Bar -->
              <div class="mt-16 pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <NuxtLink 
                    v-if="selectedInfo?.button_text && selectedInfo?.button_link"
                    :to="selectedInfo.button_link"
                    @click="closeInfoModal"
                    class="px-8 py-3 bg-blue-600 text-white font-black text-xs tracking-widest uppercase rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center"
                  >
                    {{ selectedInfo.button_text }}
                    <ArrowRightIcon class="ml-2 w-4 h-4" />
                  </NuxtLink>
                  <button 
                    @click="closeInfoModal"
                    class="px-8 py-3 bg-slate-100 text-slate-600 font-black text-xs tracking-widest uppercase rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Return to Home
                  </button>
                </div>

                <div class="flex items-center gap-6">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Content</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aprati Foods</span>
                  </div>
                </div>
              </div>
            </div>
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
import PromotionBanner from '@/components/home/PromotionBanner.vue'
import NutritionWellness from '@/components/home/NutritionWellness.vue'
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
// Hero slides configuration (loaded from backend API with professional defaults)
const heroSlides = useState('hero-slides', () => [])
const newProducts = useState('home-new-products', () => [])
const newProductsLoading = ref(true)

// Load hero slides from backend API
const loadHeroSlides = async () => {
  // Always attempt to fetch fresh admin data, but keep elite fallbacks if API fails
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
          
          const cleanText = (text, type = 'title') => {
            if (!text) return ''
            const placeholders = [
              'Welcome to Aprati', 
              'កាន់តែពិសេសជាមួយរូបរាងថ្មី', 
              'Premium quality products', 
              'Taste the difference',
              'Explore',
              'Join Us',
              'The Art of Snacking',
              'Corporate Excellence'
            ]
            if (placeholders.some(p => text.includes(p))) return ''
            return text
          }

          return {
            id: slide.id,
            image: imageUrl || 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1920&h=1080&fit=crop',
            imageAlt: slide.image_alt || slide.title || 'Aprati Foods',
            overlayClass: slide.overlay_class || 'bg-corporate-dark/40',
            badge: cleanText(slide.badge_text),
            badgeColor: slide.badge_color || 'bg-corporate-gold text-corporate-dark',
            title: cleanText(slide.title),
            subtitle: cleanText(slide.subtitle),
            primaryButtonText: cleanText(slide.primary_button_text),
            primaryButtonLink: slide.primary_button_link || '/brands',
            primaryButtonClass: slide.primary_button_class || 'group relative px-10 py-5 bg-white text-corporate-dark font-black text-xs tracking-widest uppercase rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden',
            secondaryButtonText: cleanText(slide.secondary_button_text),
            secondaryButtonLink: slide.secondary_button_link || '/about',
            secondaryButtonClass: slide.secondary_button_class || 'inline-flex items-center px-10 py-5 bg-white/5 backdrop-blur-xl text-white font-black text-xs tracking-widest uppercase rounded-2xl border border-white/20 transition-all duration-300 hover:bg-white/10'
          }
        })
        
        console.log(`✅ Loaded ${heroSlides.value.length} active hero slides`)
      } else {
        console.warn('⚠️ No active hero slides found')
        heroSlides.value = []
      }
    } else {
      console.warn('⚠️ Invalid hero slides response format')
      heroSlides.value = []
    }
  } catch (error) {
    console.error('❌ Failed to load hero slides:', error)
    heroSlides.value = []
  } finally {
    heroSlidesLoading.value = false
  }
}

// Carousel navigation

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

// Hero state

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
  
  // Data URIs (base64 encoded images)
  if (imagePath.startsWith('data:')) return imagePath 
  
  // Add cache buster to break lingering 404 cross-origin cache
  const appendCacheBuster = (url) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}bust=2`;
  }

  // If it's already a full URL, return as is with buster
  if (imagePath.startsWith('http')) return appendCacheBuster(imagePath)
  
  // Handle relative storage paths
  if (imagePath.startsWith('/storage/')) {
    return appendCacheBuster(`${runtimeConfig.public.apiBaseUrl}${imagePath}`)
  }
  
  // If it's just a filename, assume it's in storage/information-sections/
  return appendCacheBuster(`${runtimeConfig.public.apiBaseUrl}/storage/information-sections/${imagePath}`)
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
    // Always attempt to fetch fresh admin data, but keep elite fallbacks if API fails
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
    heroImageAlt.value = 'Aprati Foods (Cambodia) Ltd'
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

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
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



