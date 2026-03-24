<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Subtle Corporate Floating Orbs -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-96 h-96 bg-corporate-gold/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
    <!-- Subtle Corporate Background Patterns -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid-brand" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" stroke-width="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-brand)" />
      </svg>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen relative z-10">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="ml-4 text-gray-600">Loading brand details...</p>
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
            <span class="holo-text">BRAND ERROR</span>
            <span class="holo-code">404</span>
          </div>

          <!-- Main Message -->
          <div class="cyber-msg">
            <h1 class="glitch-title">BRAND NOT FOUND</h1>
            
            <div class="product-showcase">
              <div class="showcase-header">
                <div class="header-line"></div>
                <h3 class="showcase-title">DISCOVER OTHER PREMIUM BRANDS</h3>
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
                <span>{{ error || 'Brand not found or inactive' }} - But these delicious products are waiting for you!</span>
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

    <!-- Brand Details -->
    <div v-else-if="brand" class="relative z-10">
      <!-- Hero Section - Candy Theme Style -->
      <section class="relative overflow-hidden py-12 sm:py-16 lg:py-24 xl:py-32">
        <!-- Candy Stripes Top -->
        <div class="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 animate-pulse z-20"></div>
        
        <!-- Cover Image Background -->
        <div 
          v-if="brand.cover_image_url || brand.cover_image"
          class="absolute inset-0"
        >
          <img 
            :src="getImageUrl(brand.cover_image_url || brand.cover_image)"
            :alt="`${brand.name} cover`"
            class="w-full h-full object-cover scale-105 animate-slow-zoom"
            @error="handleCoverError"
          >
          <!-- Rainbow Candy Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-800/20 to-blue-950/40"></div>
        </div>
        
        <!-- Fallback gradient background if no cover image -->
        <div 
          v-else
          class="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200"
        >
          <!-- Floating Gummy Orbs - Hidden on mobile -->
          <div class="absolute inset-0 overflow-hidden opacity-20 hidden lg:block">
            <div class="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-3xl animate-float"></div>
            <div class="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-white to-blue-300 rounded-full blur-3xl animate-float-delayed"></div>
            <div class="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-300 to-blue-600 rounded-full blur-3xl animate-float-slow"></div>
          </div>
          <!-- Floating Candy Dots - Hidden on mobile -->
          <div class="absolute inset-0 opacity-30 hidden lg:block">
            <div class="absolute top-20 left-20 w-12 h-12 bg-white rounded-full animate-bounce shadow-2xl shadow-white/50"></div>
            <div class="absolute top-40 right-32 w-8 h-8 bg-blue-300 rounded-full animate-bounce animation-delay-500 shadow-2xl shadow-blue-300/50"></div>
            <div class="absolute top-60 left-1/3 w-10 h-10 bg-blue-400 rounded-full animate-bounce animation-delay-1000 shadow-2xl shadow-blue-400/50"></div>
            <div class="absolute bottom-40 left-1/4 w-14 h-14 bg-blue-500 rounded-full animate-bounce animation-delay-300 shadow-2xl shadow-blue-500/50"></div>
          </div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center">
            <!-- Enterprise Badge -->
            <div class="relative mb-8">
              <div class="inline-block relative">
                <div class="relative px-8 py-4 text-[10px] font-black tracking-[0.4em] uppercase bg-corporate-gold text-corporate-dark rounded-full shadow-xl">
                  <span class="relative z-10">Strategic Portfolio Insights</span>
                  <!-- Glossy shine -->
                  <div class="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full pointer-events-none"></div>
                </div>
              </div>
            </div>

            <!-- Brand Logo - Candy Badge Style -->
            <div v-if="brand.logo_url || brand.logo" class="mb-8">
              <div class="mx-auto w-40 h-40 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl">
                <img 
                  :src="getImageUrl(brand.logo_url || brand.logo)" 
                  :alt="brand.name" 
                  class="w-full h-full object-contain rounded-full"
                  @error="handleLogoError"
                >
              </div>
            </div>

            <!-- Hero Content -->
            <div class="text-center">
              <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-corporate-gold/10 border border-corporate-gold/20 text-corporate-gold mb-8 animate-fade-in">
                <span class="text-[10px] font-black tracking-[0.2em] uppercase">Private Label Selection</span>
              </div>

              <h1 class="text-6xl lg:text-9xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
                {{ brand.name }} 
              </h1>
              <div class="w-32 h-1.5 bg-corporate-gold mx-auto mb-10 rounded-full shadow-lg shadow-corporate-gold/20"></div>
              <p class="text-2xl lg:text-4xl text-white max-w-5xl mx-auto font-medium leading-relaxed mb-12 drop-shadow-2xl">
                A masterclass in {{ brand.name.toLowerCase() }} craftsmanship and nutritional innovation.
              </p>
            </div>

            <!-- Established Year and Website - Candy Style -->
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div v-if="brand.established_year" class="relative inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-black tracking-[0.1em] uppercase shadow-lg" style="text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Est. {{ brand.established_year }}
                <div class="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none"></div>
              </div>

              <div v-if="brand.website">
                <a 
                  :href="brand.website" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-white to-blue-100 text-blue-700 font-black text-sm tracking-wider uppercase transition-all duration-500 hover:scale-110 hover:shadow-xl rounded-full overflow-hidden"
                >
                  <span class="relative z-10">🌐 Visit Website</span>
                  <svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  <!-- Glossy shine -->
                  <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent rounded-full pointer-events-none"></div>
                  <!-- Jelly wobble -->
                  <div class="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full animate-pulse"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <li>
                <div class="flex items-center">
                  <svg class="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="ml-4 text-sm font-medium text-gray-500">{{ brand.name }}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Main Content - About Page Style -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <!-- Brand Information Card - Candy Theme -->
        <div class="group relative cursor-pointer mb-8">
          <!-- Card -->
          <div class="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-[1.01] overflow-hidden">
            <!-- Inner Card --> 
            <div class="rounded-2xl overflow-hidden">
              <div class="grid grid-cols-1 lg:grid-cols-7 gap-0 min-h-[400px]">
                <!-- Content Section -->
                <div class="flex flex-col justify-center p-8 lg:p-12 lg:col-span-4 lg:order-1">
                  <!-- Candy Badge -->
                  <div class="mb-6">
                    <span class="inline-flex items-center px-6 py-3 rounded-full bg-corporate-dark text-white text-[10px] font-black tracking-wider uppercase shadow-lg">
                      <div class="w-2 h-2 bg-corporate-gold rounded-full mr-3 animate-pulse"></div>
                      Brand Identity
                    </span>
                  </div>
                  
                  <!-- Title - Bold Candy Style -->
                  <div class="text-center mb-24 relative">
                    <div class="inline-block">
                      <div class="relative px-16 py-10 border-b-2 border-corporate-gold/30">
                        <h2 class="text-4xl lg:text-6xl font-black text-corporate-dark leading-tight">
                          The <span class="text-corporate-gold italic">Portfolio</span> Collection
                        </h2>
                        <div class="absolute -bottom-1 left-0 w-24 h-1 bg-corporate-gold"></div>
                      </div>
                    </div>
                    <p class="mt-8 text-xl text-corporate-slate max-w-2xl mx-auto font-medium uppercase tracking-widest">
                      Exploring global standards of excellence in every product.
                    </p>
                  </div>
                  
                  <!-- Description -->
                  <div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-8">
                    <p>
                      {{ brand.description || 'This brand represents our commitment to quality and innovation in the food industry. We strive to bring you the best products that meet the highest standards of excellence.' }}
                    </p>
                  </div>

                  <!-- Brand Details -->
                  <div v-if="brand.established_year || brand.website" class="space-y-3 mb-8">
                    <div v-if="brand.established_year" class="flex items-center">
                      <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span class="text-gray-600">Established in {{ brand.established_year }}</span>
                    </div>
                    
                    <div v-if="brand.website" class="flex items-center">
                      <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"/>
                      </svg>
                      <a :href="brand.website" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">
                        Visit Official Website
                      </a>
                    </div>
                  </div>
                  
                  
                </div>

                <!-- Visual Section -->
                <div class="relative overflow-hidden rounded-2xl lg:col-span-3 lg:order-2">
                  <div class="h-full min-h-[400px] relative transition-all duration-700 group-hover:scale-105">
                    <!-- Cover Image -->
                    <div v-if="brand.cover_image_url || brand.cover_image" class="absolute inset-0">
                      <img 
                        :src="getImageUrl(brand.cover_image_url || brand.cover_image)"
                        :alt="`${brand.name} cover`"
                        class="absolute inset-0 w-full h-full object-cover"
                        @error="handleCoverError"
                      />
                    </div>
                    
                    <!-- Fallback gradient background -->
                    <div 
                      v-else
                      :class="[
                        'absolute inset-0',
                        getBrandGradient(brand.slug)
                      ]"
                    ></div>
                    
                    <!-- Light overlay for better text readability -->
                    <div class="absolute inset-0 bg-black/20"></div>
                    
                    
                  </div>
                  
                  <!-- Floating Status -->
                  <div class="absolute top-6 right-6">
                    <div class="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/30">
                      <h3 class="text-xs text-white font-bold opacity-95">{{ brand.name }}</h3>
                      <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

            <!-- Products Section - Candy Theme -->
        <div id="products" class="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div class="p-8 lg:p-12">
            <div class="flex justify-between items-center mb-12">
              <div>
                <div class="inline-block mb-4">
                  <span class="inline-block px-6 py-3 text-[10px] font-black tracking-[0.3em] uppercase bg-corporate-dark text-white rounded-full shadow-lg">
                    Product Portfolio
                  </span>
                </div>
                <h2 class="text-4xl lg:text-5xl font-black mb-3 leading-none tracking-tighter">
                  <span class="text-corporate-dark">{{ brand.name }}</span> <span class="text-gray-900">Catalogue</span>
                </h2>
                <div class="w-32 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mb-3 rounded-full shadow-lg shadow-blue-500/50"></div>
                <p class="text-lg text-gray-600 font-medium">Discover our premium product collection</p>
              </div>
              <div class="flex items-center space-x-4">
                <!-- Admin Product Management Link -->
                <NuxtLink 
                  v-if="isAdmin"
                  :to="`/admin/brands/${brand.slug}/products`"
                  class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl text-sm font-semibold flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Manage Products
                </NuxtLink>
                
                <!-- Refresh Button for all users -->
                <button 
                  @click="refreshProducts"
                  :disabled="productsLoading"
                  class="flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 text-green-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
                >
                  <svg 
                    class="w-4 h-4 mr-2" 
                    :class="{ 'animate-spin': productsLoading }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  <span v-if="productsLoading">Refreshing...</span>
                  <span v-else>Refresh Prices</span>
                </button>
                
                <div class="bg-blue-100 px-4 py-2 rounded-full">
                  <span class="text-sm font-semibold text-blue-800">
                    {{ selectedCategoryFilter ? Object.values(productsByCategory).reduce((total, cat) => total + cat.products.length, 0) : products.length }} products
                  </span>
                </div>
              </div>
            </div>

             
            
            <!-- Products Loading -->
            <div v-if="productsLoading" class="text-center py-12">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p class="mt-4 text-gray-600 text-lg">Loading products...</p>
            </div>
            
            <!-- Products by Category -->
            <div v-else-if="products.length > 0" class="space-y-8">
              <div 
                v-for="categoryName in sortedCategories" 
                :key="categoryName" 
                :id="`category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`"
                class="category-section"
              >
                <!-- Category Bar/Header -->
                <div class="category-bar rounded-2xl p-6 mb-6 overflow-hidden relative"
                     :style="{ 
                       backgroundColor: productsByCategory[categoryName].color + '10'
                     }">
                  
                  <!-- Category Content -->
                  <div class="relative z-10 flex items-center justify-between">
                    <div class="flex items-center">
                      <!-- Category Icon/Color -->
                      <div class="flex items-center mr-6">
                        <div 
                          class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                          :style="{ backgroundColor: productsByCategory[categoryName].color }"
                        >
                          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                          </svg>
                        </div>
                      </div>
                      
                      <!-- Category Name and Description -->
                      <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-1">{{ categoryName }}</h3>
                        <p class="text-gray-600 text-sm">
                          Explore our {{ categoryName.toLowerCase() }} product collection
                        </p>
                      </div>
                    </div>

                    <!-- Category Stats -->
                    <div class="flex items-center space-x-4">
                      <!-- Product Count -->
                      <div class="text-center">
                        <div class="text-2xl font-bold" :style="{ color: productsByCategory[categoryName].color }">
                          {{ productsByCategory[categoryName].products.length }}
                        </div>
                        <div class="text-xs text-gray-500 font-medium">Products</div>
                      </div>
                      
                      <!-- Category Indicator -->
                      <div class="w-3 h-16 rounded-full shadow-inner"
                           :style="{ backgroundColor: productsByCategory[categoryName].color }">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Products Grid for this Category -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
                  <div 
                    v-for="product in productsByCategory[categoryName].products" 
                    :key="product.id" 
                    @click="openProductModal(product)"
                    class="group relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1"
                  >
                    <!-- Product Image -->
                    <div class="aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center p-4 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden">
                      <div v-if="product.images && product.images.length > 0" class="w-full h-full">
                        <img 
                          :src="getImageUrl(product.images[0])" 
                          :alt="product.name" 
                          class="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                          @error="handleProductImageError($event, product)"
                          @load="console.log('Product image loaded:', product.name)"
                        >
                      </div>
                      <div v-else class="text-gray-400 text-center">
                        <svg class="h-16 w-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                        </svg>
                        <p class="text-sm">No Image</p>
                      </div>
                    </div>

              
                    <!-- Product Info -->
                    <div class="space-y-3">
                      <h4 class="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                        {{ product.name }}
                      </h4>
                      
                      <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {{ product.short_description || product.description }}
                      </p>
                      
                      <!-- Product Meta -->
                      <div class="flex items-center justify-between pt-2">
                        <div class="flex flex-col">
                          <div v-if="product.sku" class="text-xs text-gray-500">
                            SKU: {{ product.sku }}
                          </div>
                        </div>
                          <div v-if="getProductPrice(product)" class="text-xl font-bold text-blue-600">
                            ${{ getProductPrice(product) }}
                          </div>
                        <div class="flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700">
                          <span class="mr-1">View</span>
                          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            
            <!-- No Products -->
            <div v-else class="text-center py-16">
              <div class="bg-gray-100 rounded-2xl p-12 max-w-md mx-auto">
                <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
                <p class="text-gray-600">Products for this brand will appear here when available.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Back to Brands - Candy Button -->
        <div class="mt-16 text-center">
          <NuxtLink 
            to="/brands" 
            class="group relative inline-flex items-center px-12 py-6 bg-corporate-dark text-white font-black text-xs tracking-widest uppercase transition-all duration-500 hover:scale-110 hover:shadow-xl rounded-full overflow-hidden"
          >
            <svg class="mr-3 h-5 w-5 transition-transform group-hover:-translate-x-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span class="relative z-10">Explore All Brands</span>
            <!-- Glossy shine -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full pointer-events-none"></div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Product Detail Modal -->
    <div v-if="showProductModal && selectedProduct" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Background Overlay -->
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="closeProductModal"></div>
      
      <!-- Modal Container -->
      <div class="flex min-h-screen items-center justify-center p-4 sm:p-6">
        <div class="relative w-full max-w-6xl mx-auto">
          <!-- Modal Card -->
          <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 scale-100">
            
            <!-- Modal Header Section -->
            <div class="relative bg-gradient-to-r from-blue-600 to-purple-600">
              <!-- Header Content -->
              <div class="relative z-10 p-8 lg:p-12">
                <!-- Close Button -->
                <button 
                  @click="closeProductModal"
                  class="absolute top-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group border border-white/20"
                >
                  <svg class="w-6 h-6 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>

                <!-- Status Badge -->
                <div class="inline-flex items-center px-5 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold mb-6">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                  <span class="uppercase tracking-wide">Product Details</span>
                </div>

                <!-- Title -->
                <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {{ selectedProduct.name }}
                </h2>

                <!-- Brand and SKU Info -->
                <div class="flex flex-wrap gap-4 items-center mb-4">
                  <div v-if="selectedProduct.sku" class="inline-flex items-center px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                    SKU: {{ selectedProduct.sku }}
                  </div>
                  
                  <div v-if="getProductPrice(selectedProduct)" class="inline-flex items-center px-4 py-2 rounded-xl bg-orange-500/20 backdrop-blur-sm border border-orange-300/30 text-orange-100 text-sm font-semibold">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                    ${{ getProductPrice(selectedProduct) }}
                  </div>
                </div>

                <!-- Subtitle -->
                <p class="text-lg text-white/90 font-medium max-w-2xl leading-relaxed">
                  {{ selectedProduct.short_description || 'Premium quality product with innovative design' }}
                </p>
              </div>
            </div>

            <!-- Modal Content Section -->
            <div class="relative bg-white">
              <!-- Content Area -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
                <!-- Product Images -->
                <div class="space-y-4">
                  <!-- Main Image -->
                  <div class="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                    <div v-if="selectedProduct.images && selectedProduct.images.length > 0">
                      <img 
                        :src="getImageUrl(currentProductImage)" 
                        :alt="selectedProduct.name" 
                        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        @error="handleModalImageError"
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
                  <div v-if="selectedProduct.images && selectedProduct.images.length > 1" class="grid grid-cols-4 gap-2">
                    <button
                      v-for="(image, index) in selectedProduct.images"
                      :key="index"
                      @click="currentProductImageIndex = index"
                      class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors"
                      :class="currentProductImageIndex === index ? 'border-blue-500' : 'border-transparent hover:border-gray-300'"
                    >
                      <img 
                        :src="getImageUrl(image)" 
                        :alt="`${selectedProduct.name} view ${index + 1}`" 
                        class="w-full h-full object-cover"
                        @error="handleThumbnailError($event, index)"
                      >
                    </button>
                  </div>
                </div>

                <!-- Product Information -->
                <div class="space-y-6">
                  <!-- Product Description -->
                  <div v-if="selectedProduct.description" class="bg-gray-50 rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Description</h3>
                    <div class="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                      <p class="whitespace-pre-line">{{ selectedProduct.description }}</p>
                    </div>
                  </div>

                  <!-- Product Details Grid -->
                  <div class="bg-gray-50 rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Product Information</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div v-if="selectedProduct.weight" class="flex flex-col">
                        <span class="text-sm font-medium text-gray-500 mb-1">Weight</span>
                        <span class="text-sm text-gray-900 bg-white px-3 py-2 rounded-lg">{{ selectedProduct.weight }} kg</span>
                      </div>

                      <div v-if="selectedProduct.category" class="flex flex-col">
                        <span class="text-sm font-medium text-gray-500 mb-1">Category</span>
                        <span class="text-sm text-gray-900 bg-white px-3 py-2 rounded-lg">
                        {{ selectedProduct.category.name }}
                        </span>
                      </div>

                      <div v-if="selectedProduct.variants && selectedProduct.variants.length > 0" class="flex flex-col sm:col-span-2">
                        <span class="text-sm font-medium text-gray-500 mb-1">Available Flavors</span>
                        <div class="flex flex-wrap gap-2">
                          <span v-for="variant in selectedProduct.variants" :key="variant.id" class="text-sm text-gray-900 bg-white border border-gray-100 px-3 py-2 rounded-lg">
                            {{ variant.name }}
                          </span>
                        </div>
                      </div>

                      <div class="flex flex-col">
                        <span class="text-sm font-medium text-gray-500 mb-1">Brand</span>
                        <span class="text-sm text-gray-900 bg-white px-3 py-2 rounded-lg">{{ brand.name }}</span>
                      </div>

                      <div class="flex flex-col">
                        <span class="text-sm text-green-700 bg-green-100 px-3 py-2 rounded-lg">Active Product</span>
                      </div>
                    </div>

                    <!-- Featured Badge -->
                    <div v-if="selectedProduct.is_featured" class="mt-4 pt-4 border-t border-gray-200">
                      <div class="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        Featured Product
                      </div>
                    </div>
                  </div>

                  <!-- Technical Specifications -->
                  <div v-if="selectedProduct.technical_specs && Object.keys(selectedProduct.technical_specs).length > 0" class="bg-gray-50 rounded-2xl p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
                    <div class="grid grid-cols-1 gap-3">
                      <div 
                        v-for="(value, key) in selectedProduct.technical_specs" 
                        :key="key"
                        class="flex justify-between py-2 px-3 bg-white rounded-lg"
                      >
                        <span class="font-medium text-gray-900">{{ formatSpecKey(key) }}:</span>
                        <span class="text-gray-600">{{ value }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Modal Footer -->
              <div class="border-t border-gray-100 p-8 lg:p-12">
                <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <!-- Action Buttons -->
                  <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <!-- Close Button -->
                    <button 
                      @click="closeProductModal"
                      class="group relative inline-flex items-center px-8 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-lg transition-all duration-300 hover:shadow-sm transform hover:scale-105 border border-gray-200"
                    >
                      <svg class="mr-3 w-5 h-5 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      <span>Close</span>
                    </button>
                  </div>

                  <!-- Product Info -->
                  <div class="flex items-center space-x-6 text-gray-500">
                    <div class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span class="text-sm font-medium">{{ brand.name }} Product</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-sm font-medium">Quality Assured</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bottom Border -->
              <div class="h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

// Get brand slug from route params safely - with SSR guard
// Get brand slug from route params safely - with SSR guard
const slug = computed(() => {
  const rawSlug = route?.params?.slug || ''
  // Sanitize slug (remove () if present)
  return typeof rawSlug === 'string' ? rawSlug.replace(/\(\)$/, '') : ''
})


// Check if user is admin - with SSR safety
const isAdmin = computed(() => {
  if (process.server) return false
  try {
    const token = useCookie('auth-token')
    const userRole = useCookie('user-role')
    return !!(token?.value && userRole?.value === 'admin')
  } catch (e) {
    return false
  }
})

// Reactive data
const brand = ref(null)
const products = ref([])
const loading = ref(true)
const productsLoading = ref(false)
const error = ref(null)
const selectedCategoryFilter = ref('')

// Error page particles - generated client-side
const errorParticles = ref([])

// Error page fruits
const errorFruits = ref([
  { name: 'Grape', src: '/images/Grape Character.png' },
  { name: 'Orange', src: '/images/Orange Charactor.png' },
  { name: 'Pineapple', src: '/images/Pineapple Character copy.png' },
  { name: 'Guava', src: '/images/Guava Charactor.png' },
  { name: 'Tamarin', src: '/images/Tamarin Character.png' },
  { name: 'Plum', src: '/images/Plum CHARACTER.png' }
])

// Featured products for error page
const featuredProducts = ref([
  { name: 'Grape Candy', brand: 'Aprati', image: '/images/Grape Character.png', link: '#' },
  { name: 'Orange Candy', brand: 'Frutati', image: '/images/Orange Charactor.png', link: '#' },
  { name: 'Milk Candy', brand: 'Mocati', image: '/images/Pineapple Character copy.png', link: '#' }
])


// Product modal data
const showProductModal = ref(false)
const selectedProduct = ref(null)
const currentProductImageIndex = ref(0)

// Computed property for current product image
const currentProductImage = computed(() => {
  if (!selectedProduct.value?.images || selectedProduct.value.images.length === 0) return null
  return selectedProduct.value.images[currentProductImageIndex.value]
})

// Computed property to group products by category
const productsByCategory = computed(() => {
  if (!products.value || products.value.length === 0) return {}
  
  // Filter products by selected category first
  let filteredProducts = products.value
  if (selectedCategoryFilter.value) {
    filteredProducts = products.value.filter(product => {
      const categoryName = product.category?.name || 'Uncategorized'
      return categoryName === selectedCategoryFilter.value
    })
  }
  
  const grouped = {}
  
  filteredProducts.forEach(product => {
    const categoryName = product.category?.name || 'Uncategorized'
    const categoryColor = product.category?.color || '#6B7280'
    
    if (!grouped[categoryName]) {
      grouped[categoryName] = {
        name: categoryName,
        color: categoryColor,
        products: []
      }
    }
    
    grouped[categoryName].products.push(product)
  })
  
  return grouped
})

// Computed property to get all available categories for filtering
const availableCategories = computed(() => {
  if (!products.value || products.value.length === 0) return []
  
  const categories = new Set()
  products.value.forEach(product => {
    const categoryName = product.category?.name || 'Uncategorized'
    categories.add(categoryName)
  })
  
  return Array.from(categories).sort((a, b) => {
    if (a === 'Uncategorized') return 1
    if (b === 'Uncategorized') return -1
    return a.localeCompare(b)
  })
})

// Computed property to get sorted category names
const sortedCategories = computed(() => {
  const categories = Object.keys(productsByCategory.value)
  
  // Sort categories, putting "Uncategorized" last
  return categories.sort((a, b) => {
    if (a === 'Uncategorized') return 1
    if (b === 'Uncategorized') return -1
    return a.localeCompare(b)
  })
})

// Load brand details using public API
const loadBrand = async () => {
  if (!slug.value) return

  try {
    loading.value = true
    error.value = null
    
    console.log(`Loading brand data for: ${slug.value}`)
    const api = useApi()
    
    // Load brand details and products in parallel
    const [brandRes, productsRes] = await Promise.all([
      api.request(`/brands/${slug.value}`).catch(err => ({ error: err })),
      api.request(`/brands/${slug.value}/products?active=1`).catch(err => ({ error: err }))
    ])

    // Process Brand Data
    if (!brandRes.error && (brandRes.success || brandRes.status === 'success') && brandRes.data) {
      brand.value = brandRes.data.brand || brandRes.data
    } else {
      error.value = 'Brand not found or inactive'
      return
    }

    // Process Products Data
    if (!productsRes.error && (productsRes.success || productsRes.status === 'success') && productsRes.data) {
      const productsData = productsRes.data.products || productsRes.data
      products.value = productsData.data || (Array.isArray(productsData) ? productsData : [])
    }

  } catch (err) {
    error.value = 'Failed to load brand details'
    console.error('Error loading brand:', err)
  } finally {
    loading.value = false
  }
}

// Handle logo image loading errors
const handleLogoError = (event) => {
  // Only run on client side to avoid hydration issues
  if (process.server) return
  
  // Prevent infinite loop by checking if we already set a fallback
  if (event.target.dataset.fallbackSet === 'true') {
    console.warn(`Fallback image also failed for brand, replacing with text`)
    // Create a simple text replacement
    const parent = event.target.parentElement
    if (parent) {
      parent.innerHTML = `
        <div class="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
          <span class="text-2xl font-bold text-gray-500">${brand.value?.name?.charAt(0) || 'B'}</span>
        </div>
      `
    }
    return
  }
  
  console.warn('Brand logo failed to load, using local fallback')
  
  // Mark that we're setting a fallback to prevent loops
  event.target.dataset.fallbackSet = 'true'
  
  // Create a simple local data URL for better compatibility
  const brandName = brand.value?.name || 'Brand'
  const firstLetter = brandName.charAt(0).toUpperCase()
  const color = getBrandColor(brandName)
  
  // Use canvas instead of btoa for better compatibility
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    
    // Draw circle background
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(64, 64, 64, 0, 2 * Math.PI)
    ctx.fill()
    
    // Draw text
    ctx.fillStyle = 'white'
    ctx.font = 'bold 36px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(firstLetter, 64, 64)
    
    event.target.src = canvas.toDataURL()
  } catch (e) {
    // Fallback if canvas fails
    event.target.style.display = 'none'
    if (event.target.parentElement) {
      event.target.parentElement.innerHTML = `
        <div class="w-full h-full bg-gray-500 rounded-full flex items-center justify-center">
          <span class="text-2xl font-bold text-white">${firstLetter}</span>
        </div>
      `
    }
  }
}

// Get brand color based on name  
const getBrandColor = (name) => {
  const colors = ['#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#EF4444']
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Handle cover image loading errors
const handleCoverError = (event) => {
  // Only run on client side to avoid hydration issues
  if (process.server) return
  
  console.warn('Brand cover image failed to load, hiding cover')
  // Hide the cover image and show gradient fallback
  if (event.target.parentElement) {
    event.target.parentElement.style.display = 'none'
  }
}

// Handle product image loading errors
const handleProductImageError = (event, product) => {
  // Only run on client side to avoid hydration issues
  if (process.server) return
  
  console.error('Product image failed to load:', {
    product: product.name,
    imagePath: product.images?.[0],
    finalUrl: getImageUrl(product.images?.[0])
  })
  
  // Hide the failed image and show placeholder
  event.target.style.display = 'none'
  if (event.target.parentElement) {
    event.target.parentElement.innerHTML = `
      <div class="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <svg class="h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <span class="text-xs">Image Failed</span>
      </div>
    `
  }
}

// Load products for this brand using public API
const loadProducts = async () => {
  if (!brand.value) return
  
  try {
    productsLoading.value = true
    console.log(`Loading products for brand: ${brand.value.slug}`)
    
    const api = useApi()
    const response = await api.request(`/brands/${brand.value.slug}/products?active=1`)
    
    if ((response.success || response.status === 'success') && response.data) {
      // Handle both paginated and direct array responses
      const productsData = response.data.products || response.data
      if (productsData && productsData.data) {
        // Laravel pagination format
        products.value = productsData.data
      } else if (Array.isArray(productsData)) {
        // Direct array format
        products.value = productsData
      } else {
        products.value = []
      }
      
      console.log(`Loaded ${products.value.length} products:`, products.value)
      
      // Debug category grouping
      console.log('Product categories:', products.value.map(p => ({ 
        name: p.name, 
        category: p.category?.name || 'No category',
        categoryColor: p.category?.color || 'No color'
      })))
      
      // Debug image data for each product
      products.value.forEach(product => {
        console.log(`Product: ${product.name}`, {
          hasImages: !!product.images,
          imageCount: product.images?.length || 0,
          firstImage: product.images?.[0],
          finalImageUrl: product.images?.[0] ? getImageUrl(product.images[0]) : null
        })
      })
    } else {
      products.value = []
      console.warn('No products found for brand:', brand.value.slug)
    }
  } catch (error) {
    console.error('Error loading products:', error)
    products.value = []
  } finally {
    productsLoading.value = false
  }
}

// Get brand gradient (same as in index page)
const getBrandGradient = (slug) => {
  const gradients = {
    'aprati': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'frutati': 'bg-gradient-to-br from-green-500 to-green-600',
    'mocati': 'bg-gradient-to-br from-orange-500 to-orange-600'
  }
  
  if (gradients[slug]) {
    return gradients[slug]
  }
  
  const colors = [
    'bg-gradient-to-br from-red-500 to-red-600',
    'bg-gradient-to-br from-orange-500 to-orange-600',
    'bg-gradient-to-br from-blue-600 to-blue-700',
    'bg-gradient-to-br from-green-600 to-green-700',
    'bg-gradient-to-br from-red-600 to-orange-600'
  ]
  
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i)
    hash = hash & hash
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
  
  const baseUrl = (runtimeConfig.public.apiBaseUrl || 'https://sdev.apratifoods.asia').replace(/\/$/, '')

  // Local frontend assets
  if (imagePath.startsWith('/images/')) {
    return imagePath
  }
  
  // If it starts with /storage/, it's already an absolute path, just add backend URL
  if (imagePath.startsWith('/storage/')) {
    return `${baseUrl}${imagePath}`
  } else if (imagePath.startsWith('storage/')) {
    return `${baseUrl}/${imagePath}`
  }
  
  // If it's a relative path, prepend the Laravel backend URL with storage prefix
  return `${baseUrl}/storage/${imagePath}`
}

// Product modal functions
const openProductModal = (product) => {
  // Parse category if it's a JSON string, and extract name safely
  let parsedCategory = product.category
  
  // If category is a string, parse it
  if (typeof product.category === 'string') {
    try {
      parsedCategory = JSON.parse(product.category)
    } catch (e) {
      console.error('Failed to parse category JSON:', e)
      parsedCategory = null
    }
  }
  
  // Create a clean category object with just the needed properties
  const categoryData = parsedCategory ? {
    name: parsedCategory.name || 'Uncategorized',
    color: parsedCategory.color || '#6B7280',
    id: parsedCategory.id
  } : null
  
  const parsedProduct = {
    ...product,
    category: categoryData
  }
  
  selectedProduct.value = parsedProduct
  currentProductImageIndex.value = 0
  showProductModal.value = true
  console.log('Opening product modal for:', parsedProduct.name, 'Category:', parsedProduct.category)
}

const closeProductModal = () => {
  showProductModal.value = false
  selectedProduct.value = null
  currentProductImageIndex.value = 0
}

// Handle modal image loading errors
const handleModalImageError = (event) => {
  if (process.server) return
  
  console.error('Modal product image failed to load:', {
    imagePath: currentProductImage.value,
    finalUrl: getImageUrl(currentProductImage.value)
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

// Handle thumbnail image loading errors in modal
const handleThumbnailError = (event, index) => {
  if (process.server) return
  
  console.error('Modal thumbnail image failed to load:', {
    index,
    imagePath: selectedProduct.value?.images[index],
    finalUrl: getImageUrl(selectedProduct.value?.images[index])
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

// Format technical specification keys
const formatSpecKey = (key) => {
  return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

// Get category array - split by comma, semicolon, or pipe
const getCategoryArray = (categoryInput) => {
  if (!categoryInput) return []
  
  // If it's already an array, return it
  if (Array.isArray(categoryInput)) return categoryInput
  
  // If it's an object with a name property (category object), use the name
  if (typeof categoryInput === 'object' && categoryInput.name) {
    return [categoryInput.name]
  }
  
  // If it's not a string, try to convert it or return empty array
  if (typeof categoryInput !== 'string') {
    console.warn('getCategoryArray received non-string input:', categoryInput)
    return []
  }
  
  // Split by common delimiters and filter out empty strings
  return categoryInput
    .split(/[,;|]/)
    .map(cat => cat.trim())
    .filter(cat => cat.length > 0)
}

// Get color for a specific category
const getColorForCategory = (categoryName) => {
  // First check if we have products with this category that have a color
  const categoryProducts = products.value.filter(p => (p.category?.name || 'Uncategorized') === categoryName)
  if (categoryProducts.length > 0 && categoryProducts[0].category?.color) {
    return categoryProducts[0].category.color
  }
  
  // Fallback to generated color
  const colors = ['#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#EF4444', '#06B6D4', '#84CC16', '#F59E0B']
  let hash = 0
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

// Get product price - prioritize "Original" variant price, then main price, then any variant
const getProductPrice = (product) => {
  let price = null

  // First, try to find "Original" variant price
  if (product.variants && product.variants.length > 0) {
    const originalVariant = product.variants.find(variant => 
      variant.name && variant.name.toLowerCase().includes('original')
    )
    if (originalVariant && originalVariant.price != null) {
      price = originalVariant.price
    }
  }
  
  // If no "Original" variant, use main product price
  if (price === null && product.price != null) {
    price = product.price
  }
  
  // If no main price, try to get from any variant
  if (price === null && product.variants && product.variants.length > 0) {
    const variantWithPrice = product.variants.find(variant => variant.price != null)
    if (variantWithPrice) {
      price = variantWithPrice.price
    }
  }
  
  if (price !== null) {
    const numPrice = parseFloat(price)
    return isNaN(numPrice) ? null : numPrice.toFixed(2)
  }
  
  return null
}

// Refresh products data
const refreshProducts = async () => {
  if (!brand.value) return
  
  try {
    productsLoading.value = true
    console.log(`Refreshing products for brand: ${brand.value.slug}`)
    
    const api = useApi()
    const response = await api.request(`/brands/${brand.value.slug}/products?active=1`)
    
    if (response.status === 'success' && response.data) {
      // Handle both paginated and direct array responses
      const productsData = response.data.products
      if (productsData && productsData.data) {
        // Laravel pagination format
        products.value = productsData.data
      } else if (Array.isArray(productsData)) {
        // Direct array format
        products.value = productsData
      } else {
        products.value = []
      }
      
      console.log(`Refreshed ${products.value.length} products with latest prices`)
      
      // Show success message
      if (process.client) {
        // Simple notification
        console.log('✅ Product prices refreshed successfully!')
      }
    } else {
      products.value = []
      console.warn('No products found during refresh:', brand.value.slug)
    }
  } catch (error) {
    console.error('Error refreshing products:', error)
  } finally {
    productsLoading.value = false
  }
}

// Load brand on component mount
onMounted(() => {
  // Generate particles on client side to avoid SSR hydration mismatch
  errorParticles.value = Array.from({ length: 20 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 3}s`
  }))
  
  loadBrand()
})

// SEO meta tags
useSeoMeta({
  title: () => brand.value ? `${brand.value.name} - Aprati Food Company` : 'Brand - Aprati Food Company',
  description: () => brand.value ? brand.value.description : 'Premium food brand details'
})
</script>

<style scoped>
.category-section {
  scroll-margin-top: 100px;
}

.category-section:not(:last-child) {
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

/* Category Bar Styling */
.category-bar {
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.category-bar:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Smooth animation for category sections */
.category-section {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animation for category bars */
.category-section:nth-child(1) { animation-delay: 0.1s; }
.category-section:nth-child(2) { animation-delay: 0.2s; }
.category-section:nth-child(3) { animation-delay: 0.3s; }
.category-section:nth-child(4) { animation-delay: 0.4s; }
.category-section:nth-child(5) { animation-delay: 0.5s; }

/* Stagger animation for product cards within each category */
.category-section .grid > div {
  animation: fadeInProduct 0.6s ease-out;
  animation-fill-mode: both;
}

.category-section .grid > div:nth-child(1) { animation-delay: 0.3s; }
.category-section .grid > div:nth-child(2) { animation-delay: 0.4s; }
.category-section .grid > div:nth-child(3) { animation-delay: 0.5s; }
.category-section .grid > div:nth-child(4) { animation-delay: 0.6s; }
.category-section .grid > div:nth-child(5) { animation-delay: 0.7s; }
.category-section .grid > div:nth-child(6) { animation-delay: 0.8s; }
.category-section .grid > div:nth-child(7) { animation-delay: 0.9s; }
.category-section .grid > div:nth-child(8) { animation-delay: 1.0s; }
.category-section .grid > div:nth-child(9) { animation-delay: 1.1s; }

@keyframes fadeInProduct {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Category header enhancements */
.category-section h3 {
  position: relative;
}

/* Product card hover effects */
.category-section .grid > div:hover {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(59, 130, 246, 0.1);
}

/* Text truncation for product descriptions */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Category bar gradient background animation */
.category-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent
  );
  transition: left 0.5s;
}

.category-bar:hover::before {
  left: 100%;
}

/* Enhanced product card styling */
.category-section .grid > div {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .category-bar {
    padding: 1rem;
  }
  
  .category-bar .flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .category-section .grid {
    padding-left: 0;
    gap: 1rem;
  }
}

/* Animation for hero image zoom */
@keyframes slow-zoom {
  0%, 100% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-slow-zoom {
  animation: slow-zoom 20s ease-in-out infinite;
}

/* Animation keyframes */
@keyframes float {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
  25% { transform: translateY(-20px) translateX(20px) rotate(5deg); }
  50% { transform: translateY(-10px) translateX(-10px) rotate(-3deg); }
  75% { transform: translateY(-25px) translateX(10px) rotate(3deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
  25% { transform: translateY(-30px) translateX(-15px) rotate(-5deg); }
  50% { transform: translateY(-15px) translateX(15px) rotate(3deg); }
  75% { transform: translateY(-35px) translateX(-10px) rotate(-3deg); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
  33% { transform: translateY(-15px) translateX(25px) rotate(4deg); }
  66% { transform: translateY(-25px) translateX(-20px) rotate(-4deg); }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg) translateY(0); }
  25% { transform: rotate(3deg) translateY(-10px); }
  50% { transform: rotate(-2deg) translateY(-5px); }
  75% { transform: rotate(2deg) translateY(-12px); }
}

.animate-float {
  animation: float 12s ease-in-out infinite;
  will-change: transform;
}

.animate-float-delayed {
  animation: float-delayed 14s ease-in-out infinite;
  will-change: transform;
}

.animate-float-slow {
  animation: float-slow 16s ease-in-out infinite;
  will-change: transform;
}

.animate-wiggle {
  animation: wiggle 3s ease-in-out infinite;
  will-change: transform;
}

/* Animation delay utilities */
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-500 { animation-delay: 500ms; }
.animation-delay-700 { animation-delay: 700ms; }
.animation-delay-900 { animation-delay: 900ms; }
.animation-delay-1000 { animation-delay: 1000ms; }
</style>
