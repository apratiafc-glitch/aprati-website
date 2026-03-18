<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <!-- Welcome Banner -->
      <div class="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg overflow-hidden">
        <div class="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-white">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Welcome Back! 👋</h1>
              <p class="text-sm sm:text-base text-blue-100">Here's what's happening with your site today</p>
            </div>
            <div class="block">
              <div class="text-left sm:text-right">
                <div class="text-xs sm:text-sm text-blue-200 mb-1">Current Date</div>
                <div class="text-base sm:text-lg font-semibold">{{ currentDate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <!-- Information Sections Stats -->
        <div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <InformationCircleIcon class="h-7 w-7 text-white" />
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-900">{{ stats.informationSections?.total || 0 }}</p>
              </div>
            </div>
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Information Sections</h3>
            <div class="flex items-center justify-between text-xs">
              <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">{{ stats.informationSections?.active || 0 }} active</span>
              <span class="px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">{{ stats.informationSections?.inactive || 0 }} inactive</span>
            </div>
          </div>
        </div>

        <!-- Careers Stats -->
        <div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <BriefcaseIcon class="h-7 w-7 text-white" />
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-900">{{ stats.careers?.total || 0 }}</p>
              </div>
            </div>
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Career Positions</h3>
            <div class="flex items-center justify-between text-xs">
              <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">{{ stats.careers?.active || 0 }} active</span>
              <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">{{ stats.careers?.inactive || 0 }} inactive</span>
            </div>
          </div>
        </div>

        <!-- Hero Content Stats -->
        <div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <PhotoIcon class="h-7 w-7 text-white" />
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-900">{{ stats.heroContent?.total || 0 }}</p>
              </div>
            </div>
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Hero Slides</h3>
            <div class="flex items-center text-xs">
              <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">{{ stats.heroContent?.active || 0 }} active</span>
            </div>
          </div>
        </div>

        <!-- Brands Stats -->
        <div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <TagIcon class="h-7 w-7 text-white" />
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-900">{{ stats.brands?.total || 0 }}</p>
              </div>
            </div>
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Brands</h3>
            <div class="flex items-center text-xs">
              <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">{{ stats.brands?.active || 0 }} active</span>
            </div>
          </div>
        </div>

        <!-- Users Stats -->
        <div class="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <UsersIcon class="h-7 w-7 text-white" />
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-900">{{ stats.users?.total || 0 }}</p>
              </div>
            </div>
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Users</h3>
            <div class="flex items-center text-xs">
              <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">{{ stats.users?.active || 0 }} active</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Content Management -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Content Management</h3>
            <p class="mt-1 text-sm text-gray-500">Manage your website content</p>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 gap-4">
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

          <NuxtLink 
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
            to="/admin/about" 
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="p-2 bg-purple-100 rounded-lg mr-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">Manage About Content</h3>
              <p class="text-sm text-gray-600">Manage about page content and sections</p>
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
        </div>

        <!-- Recent Careers -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Recent Career Postings</h3>
              <NuxtLink
                to="/admin/careers"
                class="text-sm text-blue-600 hover:text-blue-700"
              >
                View all
              </NuxtLink>
            </div>
          </div>
          <div class="p-6">
            <!-- Loading State -->
            <div v-if="loadingCareers" class="flex justify-center py-4">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>

            <!-- Careers List -->
            <div v-else-if="recentCareers.length > 0" class="space-y-4">
              <div
                v-for="career in recentCareers"
                :key="career.id"
                class="flex items-center space-x-3"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <BriefcaseIcon class="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ career.title_job }}</p>
                  <p class="text-sm text-gray-500 truncate">{{ career.position }} • {{ career.department || 'N/A' }}</p>
                </div>
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    career.status === 'active' ? 'bg-green-100 text-green-800' : 
                    career.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  ]"
                >
                  {{ career.status }}
                </span>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-4">
              <BriefcaseIcon class="mx-auto h-8 w-8 text-gray-400" />
              <p class="mt-2 text-sm text-gray-500">No career postings yet</p>
              <NuxtLink
                to="/admin/careers"
                class="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                Create your first career posting
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
          <p class="mt-1 text-sm text-gray-500">Common administrative tasks</p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button
              @click="navigateTo('/admin/information-sections')"
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <PlusIcon class="h-8 w-8 text-blue-500 mb-2" />
              <span class="text-sm font-medium text-gray-900">Add Info Section</span>
            </button>

            <button
              @click="navigateTo('/admin/careers')"
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
            >
              <BriefcaseIcon class="h-8 w-8 text-indigo-500 mb-2" />
              <span class="text-sm font-medium text-gray-900">Manage Careers</span>
            </button>

            <button
              @click="navigateTo('/admin/hero-slides')"
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <PhotoIcon class="h-8 w-8 text-blue-500 mb-2" />
              <span class="text-sm font-medium text-gray-900">Manage Slides</span>
            </button>

            <button
              @click="navigateTo('/admin/brands')"
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
            >
              <TagIcon class="h-8 w-8 text-purple-500 mb-2" />
              <span class="text-sm font-medium text-gray-900">Manage Brands</span>
            </button>

            <button
              @click="navigateTo('/admin/users')"
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-colors"
            >
              <UsersIcon class="h-8 w-8 text-orange-500 mb-2" />
              <span class="text-sm font-medium text-gray-900">Manage Users</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  InformationCircleIcon,
  PhotoIcon,
  TagIcon,
  UsersIcon,
  ChevronRightIcon,
  PlusIcon,
  BriefcaseIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

// Reactive data
const stats = ref({
  informationSections: { total: 0, active: 0, inactive: 0 },
  careers: { total: 0, active: 0, inactive: 0, closed: 0 },
  heroContent: { total: 0, active: 0 },
  brands: { total: 0, active: 0 },
  users: { total: 0, active: 0 }
})

const recentInformationSections = ref([])
const recentCareers = ref([])
const loadingInformationSections = ref(true)
const loadingCareers = ref(true)

// Computed
const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Methods
const loadDashboardData = async () => {
  try {
    const { informationSections } = useApi()
    
    // Load information sections
    loadingInformationSections.value = true
    const response = await informationSections.adminGetAll()
    
    if (response.success) {
      const allSections = response.data || []
      
      // Calculate stats
      stats.value.informationSections = {
        total: allSections.length,
        active: allSections.filter(s => s.is_active).length,
        inactive: allSections.filter(s => !s.is_active).length
      }
      
      // Get recent sections (last 5)
      recentInformationSections.value = allSections.slice(0, 5)
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loadingInformationSections.value = false
  }
}

const loadCareerData = async () => {
  try {
    const { careers } = useApi()
    
    loadingCareers.value = true
    const careerResponse = await careers.adminGetAll()
    
    if (careerResponse.success) {
      const allCareers = careerResponse.data || []
      
      // Calculate career stats
      stats.value.careers = {
        total: allCareers.length,
        active: allCareers.filter(c => c.status === 'active').length,
        inactive: allCareers.filter(c => c.status === 'inactive').length,
        closed: allCareers.filter(c => c.status === 'closed').length
      }
      
      // Get recent careers (last 5)
      recentCareers.value = allCareers.slice(0, 5)
    }
  } catch (error) {
    console.error('Error loading career data:', error)
  } finally {
    loadingCareers.value = false
  }
}

const loadOtherStats = async () => {
  try {
    const api = useApi()
    
    // Load hero content stats
    try {
      // Hero slides
      const heroResponse = await api.request('/hero-slides')
      if (heroResponse.success) {
        const slides = heroResponse.data || []
        stats.value.heroContent = {
          total: slides.length,
          active: slides.filter(h => h.is_active).length
        }
      }
    } catch (error) {
      console.warn('Hero content not available:', error)
    }
    
    // Load brands stats
    try {
      const brandsResponse = await api.brands.getAll()
      if (brandsResponse.success) {
        const brands = brandsResponse.data || []
        stats.value.brands = {
          total: brands.length,
          active: brands.filter(b => b.is_active).length
        }
      }
    } catch (error) {
      console.warn('Brands not available:', error)
    }
    
    // Load users stats
    try {
      const usersResponse = await api.users.getAll()
      if (usersResponse.success) {
        const users = usersResponse.data || []
        stats.value.users = {
          total: users.length,
          active: users.filter(u => u.is_active).length
        }
      }
    } catch (error) {
      console.warn('Users not available:', error)
    }
    
  } catch (error) {
    console.error('Error loading other stats:', error)
  }
}

const handleImageError = (event) => {
  event.target.src = '/images/default-info.svg'
}

// Load data on mount (client-side only)
onMounted(() => {
  if (process.client) {
    loadDashboardData()
    loadCareerData()
    loadOtherStats()
  }
})
</script>
