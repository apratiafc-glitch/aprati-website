<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Modern Welcome Banner -->
      <div class="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-2xl">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative px-6 sm:px-8 lg:px-10 py-8 sm:py-10">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Admin Dashboard</h1>
              </div>
              <p class="text-base sm:text-lg text-white/90 font-medium">Welcome back! Manage your content with ease</p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <button 
                @click="refreshDashboard" 
                :disabled="loading"
                class="group flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 backdrop-blur-sm text-white disabled:text-white/50 rounded-xl transition-all duration-200 border border-white/30 shadow-lg text-sm font-semibold"
              >
                <svg 
                  class="w-5 h-5" 
                  :class="{ 'animate-spin': loading }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span v-if="loading">Loading...</span>
                <span v-else>Refresh</span>
              </button>
              <NuxtLink 
                to="/admin/profile"
                class="flex items-center gap-2 px-5 py-3 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 shadow-lg text-sm font-semibold hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span>Profile</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <!-- Decorative elements -->
        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    
      <!-- Modern Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">Active</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Information Sections</p>
          <p class="text-3xl font-bold text-gray-900">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-16 h-9"></span>
            <span v-else>{{ stats.informationSections }}</span>
          </p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-pink-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-pink-600 bg-pink-50 rounded-full">Active</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Promotion Banners</p>
          <p class="text-3xl font-bold text-gray-900">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-16 h-9"></span>
            <span v-else>{{ stats.promotionBanners }}</span>
          </p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full">Brands</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Brands</p>
          <p class="text-3xl font-bold text-gray-900">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-16 h-9"></span>
            <span v-else>{{ stats.totalBrands }}</span>
          </p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full">Products</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Products</p>
          <p class="text-3xl font-bold text-gray-900">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-16 h-9"></span>
            <span v-else>{{ stats.totalProducts }}</span>
          </p>
        </div>

      
        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full">Users</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Users</p>
          <p class="text-3xl font-bold text-gray-900">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-16 h-9"></span>
            <span v-else>{{ stats.totalUsers }}</span>
          </p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full">Jobs</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Job Applications</p>
          <p class="text-3xl font-bold text-gray-900">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-16 h-9"></span>
            <span v-else>{{ stats.jobApplications }}</span>
          </p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-cyan-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-cyan-600 bg-cyan-50 rounded-full">Analytics</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Website Visitors</p>
          <p class="text-3xl font-bold text-gray-900">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-16 h-9"></span>
            <span v-else>{{ stats.totalVisitors }}</span>
          </p>
          <p class="text-xs text-gray-500 mt-2">
            <span v-if="loading" class="inline-block animate-pulse bg-gray-200 rounded w-20 h-4"></span>
            <span v-else>Today: {{ stats.todayVisitors }}</span>
          </p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink 
            to="/admin/information-sections" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-blue-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Information Sections</h3>
              <p class="text-sm text-gray-600">Manage homepage information posts</p>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/admin/users" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-purple-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Manage Users</h3>
              <p class="text-sm text-gray-600">Add and manage admin users</p>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/admin/brands" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-green-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Manage Brands</h3>
              <p class="text-sm text-gray-600">Add, edit, or delete brands</p>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/admin/products" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-green-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Manage Products</h3>
              <p class="text-sm text-gray-600">Add, edit, or delete products</p>
            </div>
          </NuxtLink>

          <!-- Hero Slides -->
          <NuxtLink 
            to="/admin/hero-slides" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-blue-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Hero Slides</h3>
              <p class="text-sm text-gray-600">Manage homepage slider images</p>
            </div>
          </NuxtLink>

          <!-- Hero Content - Removed as requested -->
          <!-- <NuxtLink 
            to="/admin/hero-content" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-yellow-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6H2a1 1 0 110-2h4zM8 3v1h8V3H8zm2 4a1 1 0 100 2h4a1 1 0 100-2h-4z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Hero Content</h3>
              <p class="text-sm text-gray-600">Manage homepage hero text and buttons</p>
            </div>
          </NuxtLink> -->


          <NuxtLink 
            to="/admin/promotion-banners" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-pink-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Promotion Banners</h3>
              <p class="text-sm text-gray-600">Manage homepage top banners</p>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/admin/careers" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-indigo-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Manage Careers</h3>
              <p class="text-sm text-gray-600">Post jobs and manage applications</p>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/admin/management-posts" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-emerald-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Management Team</h3>
              <p class="text-sm text-gray-600">Manage top management posts</p>
            </div>
          </NuxtLink>

         

          <NuxtLink 
            to="/admin/visitors" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-cyan-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Website Analytics</h3>
              <p class="text-sm text-gray-600">Track visitor statistics and behavior</p>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/admin/footer-settings" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-slate-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Footer Settings</h3>
              <p class="text-sm text-gray-600">Manage contact info and social links</p>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/admin/profile" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-purple-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">My Profile</h3>
              <p class="text-sm text-gray-600">Update profile picture and information</p>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/admin/favicon" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-blue-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6H2a1 1 0 110-2h4z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Favicon Settings</h3>
              <p class="text-sm text-gray-600">Manage website favicon and branding</p>
            </div>
          </NuxtLink>


          <NuxtLink 
            to="/admin/privacy" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-red-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Privacy Policy</h3>
              <p class="text-sm text-gray-600">Manage privacy policy sections (EN/KH)</p>
            </div>
          </NuxtLink>

        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center p-4 border border-gray-200 rounded-lg">
            <div class="p-2 bg-gray-100 rounded-lg mr-4">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.action }}</p>
              <p class="text-sm text-gray-600">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Check admin authentication
definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

useSeoMeta({
  title: 'Admin Dashboard - Aprati Food Company',
  description: 'Admin dashboard for managing brands, products, and users'
})

const router = useRouter()
const currentUser = ref(null)

// Reactive data
const stats = ref({
  informationSections: 0,
  promotionBanners: 0,
  totalBrands: 0,
  totalBrands: 0,
  totalProducts: 0,
  totalUsers: 0,
  managementPosts: 0,
  jobApplications: 0,
  totalVisitors: 0,
  todayVisitors: 0
})

const loading = ref(true)

const recentActivity = ref([])

// Add function to load recent activity
const loadRecentActivity = async () => {
  const { request } = useApi()
  
  try {
    // Try to load recent activity from API
    // request() automatically handles base URL and auth tokens
    const response = await request('/admin/recent-activity')
    
    // Check if response was successful
    if (response.success && response.data) {
      if (response.data.length > 0) {
        recentActivity.value = response.data
      } else {
         // Fallback to sample data for display if empty
         recentActivity.value = [
            { id: 1, action: 'System initialized', time: new Date().toLocaleString(), type: 'system' }
         ]
      }
    } else {
      // Fallback to sample data if API fails or returns error
      throw new Error('API request failed')
    }
  } catch (error) {
    console.warn('Error loading recent activity (using fallback):', error.message)
    // Use sample data on error
    recentActivity.value = [
      { 
        id: 1, 
        action: 'Dashboard loaded successfully', 
        time: new Date().toLocaleString(),
        type: 'system'
      }
    ]
  }
}

// Methods
const logout = () => {
  // Clear auth cookies
  const authTokenCookie = useCookie('auth-token')
  const authUserCookie = useCookie('auth-user')
  
  authTokenCookie.value = null
  authUserCookie.value = null
  
  router.push('/login')
}

const refreshDashboard = async () => {
  try {
    loading.value = true
    await loadDashboardData()
    await loadRecentActivity()
  } catch (error) {
    console.error('Error refreshing dashboard:', error)
  } finally {
    loading.value = false
  }
}

// Load dashboard data
onMounted(async () => {
  // Only run on client side
  if (process.server) return
  
  try {
    // Get current user info
    const userCookie = useCookie('auth-user')
    if (userCookie.value) {
      // In Nuxt, cookies are automatically parsed, no need for JSON.parse
      currentUser.value = typeof userCookie.value === 'string' ? JSON.parse(userCookie.value) : userCookie.value
    }
    
    loading.value = true
    await loadDashboardData()
    await loadRecentActivity()
  } catch (error) {
    console.error('Error loading dashboard:', error)
  } finally {
    loading.value = false
  }
})

const loadDashboardData = async () => {
  // Only run on client side
  if (process.server) return
  
  console.log('Loading dashboard data...')
  
  // Use useApi composable
  const { request } = useApi()

  try {
    // Load all data in parallel
    const [
      informationResponse,
      promotionResponse,
      managementResponse,
      brandsResponse,
      productsResponse,
      usersResponse,
      applicationsResponse,
      visitorsResponse
    ] = await Promise.allSettled([
      // Information sections count
      request('/admin/information-sections'),
      // Promotion banners count
      request('/admin/promotion-banners'),
      // Management posts count
      request('/admin/management-posts'),
      // Brands count
      request('/brands'),
      // Products count (public endpoint)
      request('/products'),
      // Users count
      request('/users'),
      // Job applications count
      request('/admin/job-applications'),
      // Visitors count
      request('/admin/visitors/stats')
    ])

    // Process Information Sections
    if (informationResponse.status === 'fulfilled' && informationResponse.value.success) {
      const data = informationResponse.value.data
      stats.value.informationSections = Array.isArray(data) ? data.length : 0
    }

    // Process Promotion Banners
    if (promotionResponse.status === 'fulfilled' && promotionResponse.value.success) {
      const data = promotionResponse.value.data
      stats.value.promotionBanners = Array.isArray(data) ? data.length : 0
    }

    // Process Management Posts
    if (managementResponse.status === 'fulfilled' && managementResponse.value.success) {
      const data = managementResponse.value.data
      stats.value.managementPosts = Array.isArray(data) ? data.length : 0
    }

    // Process Brands
    if (brandsResponse.status === 'fulfilled' && brandsResponse.value.success) {
      const data = brandsResponse.value.data
      if (data && data.brands) {
        stats.value.totalBrands = data.brands.length
      } else if (Array.isArray(data)) {
         stats.value.totalBrands = data.length
      }
    }

    // Process Products
    if (productsResponse.status === 'fulfilled' && productsResponse.value.success) {
      const data = productsResponse.value.data
      // Pagination response has .data property for items
      if (data && data.data && Array.isArray(data.data)) {
        stats.value.totalProducts = data.total || data.data.length
      } else if (Array.isArray(data)) {
        stats.value.totalProducts = data.length
      }
    }

    // Process Users
    if (usersResponse.status === 'fulfilled' && usersResponse.value.success) {
      const data = usersResponse.value.data
      if (Array.isArray(data)) {
         stats.value.totalUsers = data.length
      } else if (data && data.data && Array.isArray(data.data)) {
         stats.value.totalUsers = data.total || data.data.length
      }
    }

    // Process Job Applications
    if (applicationsResponse.status === 'fulfilled' && applicationsResponse.value.success) {
      const data = applicationsResponse.value.data
      if (Array.isArray(data)) {
        stats.value.jobApplications = data.length
      } else if (data && data.data) {
        stats.value.jobApplications = data.total || data.data.length
      }
    }

    // Process Visitors
    if (visitorsResponse.status === 'fulfilled' && visitorsResponse.value.success) {
      const data = visitorsResponse.value.data
      stats.value.totalVisitors = data.total_visitors || 0
      stats.value.todayVisitors = data.today_visitors || 0
    }

    console.log('Dashboard stats updated:', stats.value)

  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}
</script>
