<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Modern Header with Glass Effect -->
    <div class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-6 py-6">
        <div class="flex justify-between items-center">
          <div class="space-y-1">
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Leadership Team Management
            </h1>
            <p class="text-slate-600">Manage executive profiles and team information</p>
          </div>
          <div class="flex items-center space-x-3">
            <NuxtLink 
              to="/admin/dashboard"
              class="inline-flex items-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Dashboard
            </NuxtLink>
            <button 
              @click="showCreateModal = true"
              class="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Add Post
            </button>
            <button 
              @click="loadPosts"
              class="inline-flex items-center px-4 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">

      <!-- Modern Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:bg-white/80">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-3 mb-2">
                <div class="p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-600">Total Posts</p>
                  <p class="text-2xl font-bold text-slate-900">{{ posts.length }}</p>
                </div>
              </div>
            </div>
            <div class="text-blue-500 opacity-20 group-hover:opacity-40 transition-opacity">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:bg-white/80">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-3 mb-2">
                <div class="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-600">Active</p>
                  <p class="text-2xl font-bold text-slate-900">{{ activePosts }}</p>
                </div>
              </div>
            </div>
            <div class="text-emerald-500 opacity-20 group-hover:opacity-40 transition-opacity">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:bg-white/80">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-3 mb-2">
                <div class="p-2.5 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-600">Inactive</p>
                  <p class="text-2xl font-bold text-slate-900">{{ inactivePosts }}</p>
                </div>
              </div>
            </div>
            <div class="text-slate-500 opacity-20 group-hover:opacity-40 transition-opacity">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:bg-white/80">
          <div class="flex items-center justify-between">
            <div>
              <div class="flex items-center space-x-3 mb-2">
                <div class="p-2.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-600">This Month</p>
                  <p class="text-2xl font-bold text-slate-900">{{ thisMonthPosts }}</p>
                </div>
              </div>
            </div>
            <div class="text-purple-500 opacity-20 group-hover:opacity-40 transition-opacity">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Modern Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-16">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
        </div>
        <p class="mt-4 text-slate-600 font-medium">Loading posts...</p>
      </div>

      <!-- Modern Error State -->
      <div v-if="error" class="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 shadow-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ error }}
        </div>
      </div>

      <!-- Modern Team Members Grid/Table -->
      <div v-if="!loading && !error" class="bg-white/70 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden border border-white/20">
        <div class="px-8 py-6 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold text-slate-900 flex items-center">
              <svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
              </svg>
              Management Posts
            </h3>
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {{ posts.length }} posts
            </span>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="posts.length === 0" class="text-center py-16">
          <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-slate-900 mb-3">No posts yet</h3>
          <p class="text-slate-600 mb-6 max-w-md mx-auto">Start by creating your first management post.</p>
          <button 
            @click="showCreateModal = true"
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add First Post
          </button>
        </div>

        <!-- Modern Team Members List -->
        <div v-else class="divide-y divide-slate-200/50">
          <div v-for="post in posts" :key="post.id" class="group px-8 py-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200">
            <div class="flex items-center justify-between">
              <!-- Member Info -->
              <div class="flex items-center space-x-4 flex-1">
                <!-- Avatar -->
                <div class="relative">
                  <div 
                    v-if="post.image_url"
                    class="w-16 h-16 rounded-2xl bg-cover bg-center border-2 border-white shadow-lg"
                    :style="{ backgroundImage: `url(${post.image_url})` }"
                  ></div>
                  <div 
                    v-else
                    class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-white shadow-lg"
                  >
                    <span class="text-white text-xl font-bold">{{ getInitials(post.name) }}</span>
                  </div>
                  <!-- Status Indicator -->
                  <div class="absolute -bottom-1 -right-1">
                    <div :class="post.is_active ? 'bg-emerald-500' : 'bg-slate-400'" 
                         class="w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                      <div class="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <!-- Post Details -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-3 mb-1">
                    <h4 class="text-lg font-semibold text-slate-900 truncate">{{ post.name }}</h4>
                    <span :class="post.is_active ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-800 border-slate-200'" 
                          class="px-2.5 py-1 text-xs font-medium rounded-full border">
                      {{ post.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                  <p class="text-slate-600 text-sm line-clamp-2 max-w-2xl">{{ post.description }}</p>
                  <div class="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    <span class="flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Created {{ formatDate(post.created_at) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  @click="viewPost(post)"
                  class="p-2.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  title="View Details"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
                <button 
                  @click="editPost(post)"
                  class="p-2.5 text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200"
                  title="Edit"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="toggleStatus(post)"
                  :class="post.is_active ? 'text-slate-600 hover:text-slate-700 hover:bg-slate-50' : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'"
                  class="p-2.5 rounded-xl transition-all duration-200"
                  :title="post.is_active ? 'Deactivate' : 'Activate'"
                >
                  <svg v-if="post.is_active" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button 
                  @click="deletePost(post)"
                  class="p-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                  title="Delete"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1V4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modern Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-white/20">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-bold text-white">
                {{ isEditing ? 'Edit Post' : 'Add New Post' }}
              </h2>
              <p class="text-blue-100 mt-1">
                {{ isEditing ? 'Update post information' : 'Add a new management post' }}
              </p>
            </div>
            <button @click="closeModal" class="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl p-2 transition-all duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="p-8 max-h-[70vh] overflow-y-auto">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-3">Title *</label>
              <input 
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white"
                placeholder="Enter title"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-3">Description *</label>
              <textarea 
                v-model="form.description"
                rows="6"
                required
                class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 hover:bg-white resize-none"
                placeholder="Enter description..."
              ></textarea>
            </div>

            <div class="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
              <input 
                v-model="form.is_active"
                type="checkbox"
                class="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded transition-all duration-200"
              />
              <div>
                <label class="text-sm font-medium text-slate-900">
                  Active
                </label>
                <p class="text-xs text-slate-600">This item will be visible on the public website</p>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end space-x-4 pt-6 border-t border-slate-200">
              <button 
                type="button"
                @click="closeModal"
                class="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="submitting || uploadingImage"
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl disabled:opacity-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <span v-if="uploadingImage" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading image...
                </span>
                <span v-else-if="submitting" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isEditing ? 'Updating...' : 'Creating...' }}
                </span>
                <span v-else>
                  {{ isEditing ? 'Update Post' : 'Add Post' }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal && viewingPost" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Post Details</h2>
            <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Image and Basic Info -->
            <div class="lg:col-span-1">
              <div class="text-center mb-6">
                <div 
                  v-if="viewingPost.image_url"
                  class="w-32 h-32 mx-auto rounded-full bg-cover bg-center border-4 border-white shadow-lg"
                  :style="{ backgroundImage: `url(${viewingPost.image_url})` }"
                ></div>
                <div 
                  v-else
                  class="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg"
                >
                  <span class="text-white text-3xl font-bold">{{ getInitials(viewingPost.name) }}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mt-4">{{ viewingPost.name }}</h3>
                <p class="text-blue-600 font-semibold">{{ viewingPost.position }}</p>
                <span :class="viewingPost.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" 
                      class="inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-2">
                  {{ viewingPost.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg space-y-3">
                <div v-if="viewingPost.department">
                  <p class="text-sm text-gray-600">Department</p>
                  <p class="font-medium">{{ viewingPost.department }}</p>
                </div>
                <div v-if="viewingPost.email">
                  <p class="text-sm text-gray-600">Email</p>
                  <p class="font-medium">
                    <a :href="`mailto:${viewingPost.email}`" class="text-blue-600 hover:text-blue-800">
                      {{ viewingPost.email }}
                    </a>
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Created</p>
                  <p class="font-medium">{{ formatDetailedDate(viewingPost.created_at) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Last Updated</p>
                  <p class="font-medium">{{ formatDetailedDate(viewingPost.updated_at) }}</p>
                </div>
              </div>
            </div>

            <!-- Right Column: Description and Bio -->
            <div class="lg:col-span-2 space-y-6">
              <div>
                <h4 class="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <p class="text-gray-700 whitespace-pre-line">{{ viewingPost.description }}</p>
                </div>
              </div>

              <div v-if="viewingPost.bio">
                <h4 class="text-lg font-semibold text-gray-900 mb-3">Biography & Experience</h4>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="prose max-w-none">
                    <p class="text-gray-700 whitespace-pre-line leading-relaxed">{{ viewingPost.bio }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-4 pt-6 border-t mt-8">
            <button 
              @click="showViewModal = false"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button 
              @click="editPost(viewingPost)"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Check admin auth
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { managementPosts: postsApi } = useApi()

// Reactive data
const posts = ref([])
const loading = ref(true)
const error = ref('')
const submitting = ref(false)

// Modals
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const viewingPost = ref(null)
const editingPost = ref(null)

// Form
const form = ref({
  name: '', // This will be the title
  description: '',
  is_active: true
})

// File upload
const fileInput = ref(null)
const selectedFile = ref(null)
const selectedFileName = ref('')
const selectedFileSize = ref(0)
const imagePreview = ref('')
const uploadingImage = ref(false)

// Computed
const isEditing = computed(() => !!editingPost.value)
const activePosts = computed(() => posts.value.filter(p => p.is_active).length)
const inactivePosts = computed(() => posts.value.filter(p => !p.is_active).length)
const thisMonthPosts = computed(() => {
  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  return posts.value.filter(p => {
    const postDate = new Date(p.created_at)
    return postDate.getMonth() === thisMonth && postDate.getFullYear() === thisYear
  }).length
})

// Load data on mount
onMounted(() => {
  if (process.server) return
  loadPosts()
})

// Methods
const loadPosts = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    loading.value = true
    error.value = ''
    
    const response = await postsApi.adminGetAll()
    if (response.success) {
      posts.value = response.data || []
    } else {
      error.value = response.error || 'Failed to load posts'
    }
  } catch (err) {
    console.error('Error loading posts:', err)
    error.value = 'Failed to load posts'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    name: '', // title
    description: '',
    is_active: true
  }
  editingPost.value = null
  
  // Reset file upload
  selectedFile.value = null
  selectedFileName.value = ''
  selectedFileSize.value = 0
  imagePreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  resetForm()
}

const editPost = (post) => {
  editingPost.value = post
  form.value = {
    name: post.name,
    description: post.description,
    is_active: post.is_active === 1
  }
  showViewModal.value = false
  showEditModal.value = true
  
  // Reset file upload when editing
  selectedFile.value = null
  selectedFileName.value = ''
  selectedFileSize.value = 0
  imagePreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// File upload methods
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file (PNG, JPG, or JPEG)')
    return
  }
  
  // Validate file size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('File size must be less than 2MB')
    return
  }
  
  selectedFile.value = file
  selectedFileName.value = file.name
  selectedFileSize.value = file.size
  
  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  selectedFile.value = null
  selectedFileName.value = ''
  selectedFileSize.value = 0
  imagePreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const uploadImage = async () => {
  if (!selectedFile.value) return null
  
  try {
    uploadingImage.value = true
    
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    
    const response = await postsApi.uploadImage(formData)
    if (response.success) {
      return response.data.image_url
    } else {
      throw new Error(response.error || 'Upload failed')
    }
  } catch (err) {
    console.error('Error uploading image:', err)
    throw err
  } finally {
    uploadingImage.value = false
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const viewPost = (post) => {
  viewingPost.value = post
  showViewModal.value = true
}

const submitForm = async () => {
  try {
    submitting.value = true
    
    // Handle image upload if new file selected
    if (selectedFile.value) {
      try {
        const imageUrl = await uploadImage()
        form.value.image_url = imageUrl
      } catch (err) {
        alert('Failed to upload image: ' + err.message)
        return
      }
    }
    
    let response
    if (isEditing.value) {
      response = await postsApi.update(editingPost.value.id, form.value)
    } else {
      response = await postsApi.create(form.value)
    }
    
    if (response.success) {
      closeModal()
      await loadPosts()
    } else {
      alert(`Failed to ${isEditing.value ? 'update' : 'create'} post: ` + (response.error || 'Unknown error'))
    }
  } catch (err) {
    console.error(`Error ${isEditing.value ? 'updating' : 'creating'} post:`, err)
    alert(`Failed to ${isEditing.value ? 'update' : 'create'} post`)
  } finally {
    submitting.value = false
  }
}

const toggleStatus = async (post) => {
  try {
    const response = await postsApi.toggleStatus(post.id)
    if (response.success) {
      await loadPosts()
    } else {
      alert('Failed to update status: ' + (response.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error toggling status:', err)
    alert('Failed to update status')
  }
}

const deletePost = async (post) => {
  if (!confirm(`Are you sure you want to delete "${post.name}"? This action cannot be undone.`)) {
    return
  }
  
  try {
    const response = await postsApi.delete(post.id)
    if (response.success) {
      await loadPosts()
    } else {
      alert('Failed to delete post: ' + (response.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error deleting post:', err)
    alert('Failed to delete post')
  }
}

// Utility functions
const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDetailedDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Load data on mount
onMounted(() => {
  if (process.server) return
  loadPosts()
})

// SEO
useSeoMeta({
  title: 'Management Posts - Admin - Aprati Food Company',
  description: 'Admin panel for managing top management posts and announcements.'
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
 