<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-72 bg-white shadow-xl border-r border-gray-200 flex flex-col">
      <!-- Logo & Brand -->
      <div class="px-6 py-6 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800">
        <NuxtLink to="/admin/dashboard" class="flex items-center group">
          <div class="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <span class="block text-xl font-bold text-white">Aprati Admin</span>
            <span class="block text-xs text-blue-100">Management System</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-6 px-3">
        <div class="space-y-1">
          <!-- Main Menu Label -->
          <div class="px-3 mb-2">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Main Menu</p>
          </div>

          <!-- Dashboard -->
          <NuxtLink 
            to="/admin/dashboard" 
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
            :class="$route.path === '/admin/dashboard' 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:scale-105'"
          >
            <div class="w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"
              :class="$route.path === '/admin/dashboard' 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-blue-100'">
              <HomeIcon class="w-5 h-5" />
            </div>
            <span>Dashboard</span>
          </NuxtLink>

          <!-- Content Section -->
          <div class="px-3 mt-6 mb-2">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Content</p>
          </div>

          <!-- Brands -->
          <NuxtLink 
            to="/admin/brands" 
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
            :class="$route.path.startsWith('/admin/brands') 
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 scale-105' 
              : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:scale-105'"
          >
            <div class="w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"
              :class="$route.path.startsWith('/admin/brands') 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-purple-100'">
              <TagIcon class="w-5 h-5" />
            </div>
            <span>Brands</span>
          </NuxtLink>

          <!-- Products -->
          <NuxtLink 
            to="/admin/products" 
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
            :class="$route.path.startsWith('/admin/products') 
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/30 scale-105' 
              : 'text-gray-700 hover:bg-green-50 hover:text-green-700 hover:scale-105'"
          >
            <div class="w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"
              :class="$route.path.startsWith('/admin/products') 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-green-100'">
              <CubeIcon class="w-5 h-5" />
            </div>
            <span>Products</span>
          </NuxtLink>


          <!-- Information Sections -->
          <NuxtLink 
            to="/admin/information-sections" 
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
            :class="$route.path.startsWith('/admin/information-sections') 
              ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg shadow-cyan-500/30 scale-105' 
              : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 hover:scale-105'"
          >
            <div class="w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"
              :class="$route.path.startsWith('/admin/information-sections') 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-cyan-100'">
              <InformationCircleIcon class="w-5 h-5" />
            </div>
            <span>Info Sections</span>
          </NuxtLink>


          <!-- Careers Section -->
          <div class="px-3 mt-6 mb-2">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Careers</p>
          </div>

          <!-- Careers -->
          <NuxtLink 
            to="/admin/careers" 
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
            :class="$route.path.startsWith('/admin/careers') 
              ? 'bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-lg shadow-pink-500/30 scale-105' 
              : 'text-gray-700 hover:bg-pink-50 hover:text-pink-700 hover:scale-105'"
          >
            <div class="w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"
              :class="$route.path.startsWith('/admin/careers') 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-pink-100'">
              <BriefcaseIcon class="w-5 h-5" />
            </div>
            <span>Job Positions</span>
          </NuxtLink>

          <!-- Job Applications -->
          <NuxtLink 
            to="/admin/job-applications" 
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
            :class="$route.path.startsWith('/admin/job-applications') 
              ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-500/30 scale-105' 
              : 'text-gray-700 hover:bg-rose-50 hover:text-rose-700 hover:scale-105'"
          >
            <div class="w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"
              :class="$route.path.startsWith('/admin/job-applications') 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-rose-100'">
              <DocumentTextIcon class="w-5 h-5" />
            </div>
            <span>Applications</span>
          </NuxtLink>

          <!-- System Section -->
          <div class="px-3 mt-6 mb-2">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">System</p>
          </div>

          <!-- Users -->
          <NuxtLink 
            to="/admin/users" 
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
            :class="$route.path.startsWith('/admin/users') 
              ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/30 scale-105' 
              : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700 hover:scale-105'"
          >
            <div class="w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"
              :class="$route.path.startsWith('/admin/users') 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-teal-100'">
              <UsersIcon class="w-5 h-5" />
            </div>
            <span>Users</span>
          </NuxtLink>

          <!-- Privacy Policy -->
          <NuxtLink 
            to="/admin/privacy" 
            class="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
            :class="$route.path.startsWith('/admin/privacy') 
              ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/30 scale-105' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-105'"
          >
            <div class="w-9 h-9 flex items-center justify-center rounded-lg mr-3 transition-all"
              :class="$route.path.startsWith('/admin/privacy') 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-gray-200'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <span>Privacy Policy</span>
          </NuxtLink>
        </div>

        <!-- Quick Actions Section -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="px-3 mb-2">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Quick Actions</p>
          </div>
          <div class="space-y-1.5">
            <!-- Management Team -->
            <NuxtLink 
              to="/admin/management-posts" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-emerald-50 transition-all duration-200 text-gray-700 hover:text-emerald-700"
            >
              <div class="w-7 h-7 flex items-center justify-center bg-emerald-100 rounded-lg mr-2.5 group-hover:bg-emerald-200 transition-colors">
                <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <span>Management Team</span>
            </NuxtLink>

            <!-- Hero Content - Removed as requested -->
            <!-- <NuxtLink 
              to="/admin/hero-content" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-yellow-50 transition-all duration-200 text-gray-700 hover:text-yellow-700"
            >
              <div class="w-7 h-7 flex items-center justify-center bg-yellow-100 rounded-lg mr-2.5 group-hover:bg-yellow-200 transition-colors">
                <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <span>Hero Content</span>
            </NuxtLink> -->
            <!-- Hero Slides -->
            <NuxtLink 
              to="/admin/hero-slides" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 text-gray-700 hover:text-blue-700"
              :class="{ 'bg-blue-50 text-blue-700': route.path.startsWith('/admin/hero-slides') }"
            >
              <div class="w-7 h-7 flex items-center justify-center bg-blue-100 rounded-lg mr-2.5 group-hover:bg-blue-200 transition-colors">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span>Hero Slides</span>
            </NuxtLink>

            <!-- Promotion Banners -->
            <NuxtLink 
              to="/admin/promotion-banners" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-red-50 transition-all duration-200 text-gray-700 hover:text-red-700"
              :class="{ 'bg-red-50 text-red-700': route.path.startsWith('/admin/promotion-banners') }"
            >
              <div class="w-7 h-7 flex items-center justify-center bg-red-100 rounded-lg mr-2.5 group-hover:bg-red-200 transition-colors">
                 <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                 </svg>
              </div>
              <span>Promotions</span>
            </NuxtLink>

            <!-- Legacy Hero Managers (kept for reference, can be removed later) -->
            <!-- 
            <NuxtLink 
              to="/admin/hero-content" 
              class="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span>Hero Text (Legacy)</span>
            </NuxtLink>
             -->
            <!-- Website Analytics -->
            <NuxtLink 
              to="/admin/visitors" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-cyan-50 transition-all duration-200 text-gray-700 hover:text-cyan-700"
            >
              <div class="w-7 h-7 flex items-center justify-center bg-cyan-100 rounded-lg mr-2.5 group-hover:bg-cyan-200 transition-colors">
                <svg class="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <span>Analytics</span>
            </NuxtLink>

            <!-- About Management -->
            <NuxtLink 
              to="/admin/about" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg hover:bg-purple-50 transition-all duration-200 text-gray-700 hover:text-purple-700"
            >
              <div class="w-7 h-7 flex items-center justify-center bg-purple-100 rounded-lg mr-2.5 group-hover:bg-purple-200 transition-colors">
                <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span>About Page</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="px-3 mb-2">
            <p class="text-xs font-bold text-gray-500 uppercase tracking-wider">Settings</p>
          </div>
          <div class="space-y-1">
            <NuxtLink 
              to="/admin/header-settings" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200"
              :class="$route.path.startsWith('/admin/header-settings') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
            >
              <div class="w-7 h-7 flex items-center justify-center rounded-lg mr-2.5"
                :class="$route.path.startsWith('/admin/header-settings') 
                  ? 'bg-white/20' 
                  : 'bg-gray-100'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4h.01M13 13h.01"/>
                </svg>
              </div>
              Header Settings
            </NuxtLink>
            
            <NuxtLink 
              to="/admin/footer-settings" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200"
              :class="$route.path.startsWith('/admin/footer-settings') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
            >
              <div class="w-7 h-7 flex items-center justify-center rounded-lg mr-2.5"
                :class="$route.path.startsWith('/admin/footer-settings') 
                  ? 'bg-white/20' 
                  : 'bg-gray-100'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </div>
              Footer Settings
            </NuxtLink>
            
            <NuxtLink 
              to="/admin/profile" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200"
              :class="$route.path === '/admin/profile' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
            >
              <div class="w-7 h-7 flex items-center justify-center rounded-lg mr-2.5"
                :class="$route.path === '/admin/profile' 
                  ? 'bg-white/20' 
                  : 'bg-gray-100'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              My Profile
            </NuxtLink>
            
            <NuxtLink 
              to="/admin/settings" 
              class="group flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200"
              :class="$route.path === '/admin/settings' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'"
            >
              <div class="w-7 h-7 flex items-center justify-center rounded-lg mr-2.5"
                :class="$route.path === '/admin/settings' 
                  ? 'bg-white/20' 
                  : 'bg-gray-100'">
                <CogIcon class="w-4 h-4" />
              </div>
              General Settings
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- User Info -->
      <div class="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl mx-3 border border-gray-200">
        <div class="flex items-center mb-3">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-sm font-bold text-white">A</span>
            </div>
            <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-semibold text-gray-900">Admin User</p>
            <p class="text-xs text-gray-600">admin@aprati.com</p>
          </div>
        </div>
        <button 
          @click="logout"
          class="w-full flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:border-red-200 transition-all duration-200 shadow-sm"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Sign Out
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navigation -->
      <header class="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-4">
              <h1 class="text-2xl font-bold text-gray-900">{{ getPageTitle() }}</h1>
              <span class="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ getCurrentDate() }}
              </span>
            </div>
            <div class="flex items-center space-x-3">
              <!-- Job Applications Notifications -->
              <AdminNotifications />
              
              <!-- Quick Stats -->
              <div class="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-sm font-medium text-gray-700">{{ getCurrentTime() }}</span>
              </div>
              
              <!-- View Site Link -->
              <NuxtLink 
                to="/" 
                target="_blank"
                class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                View Site
              </NuxtLink>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>

    <!-- Toast Notifications -->
    <AppToast />
  </div>
</template>

<script setup>
import { 
  HomeIcon, 
  TagIcon, 
  CubeIcon,
  PhotoIcon,
  BriefcaseIcon, 
  DocumentTextIcon,
  UsersIcon, 
  CogIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()

// Current date and time
const currentDate = ref('')
const currentTime = ref('')

// Update date and time
const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Get page title based on current route
const getPageTitle = () => {
  const path = route.path
  if (path.includes('/brands')) return 'Brand Management'
  if (path.includes('/products')) return 'Product Management'
  if (path.includes('/hero-content')) return 'Hero Content'
  if (path.includes('/information-sections')) return 'Information Sections'
  if (path.includes('/about')) return 'About Page'
  if (path.includes('/careers')) return 'Career Positions'
  if (path.includes('/job-applications')) return 'Job Applications'
  if (path.includes('/management-posts')) return 'Management Team'
  if (path.includes('/visitors')) return 'Website Analytics'
  if (path.includes('/users')) return 'User Management'
  if (path.includes('/privacy')) return 'Privacy Policy'
  if (path.includes('/header-settings')) return 'Header Settings'
  if (path.includes('/footer-settings')) return 'Footer Settings'
  if (path.includes('/profile')) return 'My Profile'
  if (path.includes('/settings')) return 'General Settings'
  return 'Dashboard'
}

// Get current date for display
const getCurrentDate = () => {
  return currentDate.value
}

// Get current time for display
const getCurrentTime = () => {
  return currentTime.value
}

// Initialize and update time
onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 60000) // Update every minute
})

// Logout function
const logout = () => {
  const adminToken = useCookie('admin_token')
  adminToken.value = null
  navigateTo('/admin-access')
}
</script>

<style scoped>
/* Smooth scrollbar for sidebar */
nav::-webkit-scrollbar {
  width: 6px;
}

nav::-webkit-scrollbar-track {
  background: transparent;
}

nav::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
