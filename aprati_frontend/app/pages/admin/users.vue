<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Modern Page Header -->
      <div class="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-500 shadow-2xl">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative px-6 sm:px-8 lg:px-10 py-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Admin Management</h2>
              </div>
              <p class="text-base sm:text-lg text-white/90 font-medium">Manage administrator accounts and permissions</p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <NuxtLink 
                to="/admin"
                class="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl transition-all duration-200 border border-white/30 shadow-lg font-semibold"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                <span>Back</span>
              </NuxtLink>
              <button
                @click="showCreateModal = true"
                class="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 shadow-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Add New Admin</span>
              </button>
            </div>
          </div>
        </div>
        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Modern Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">Total</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Admins</p>
          <p class="text-3xl font-bold text-gray-900">{{ stats.totalAdmins || 0 }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full">Active</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Active Admins</p>
          <p class="text-3xl font-bold text-gray-900">{{ stats.activeAdmins || 0 }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full">Brands</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Brand Admins</p>
          <p class="text-3xl font-bold text-gray-900">{{ stats.brandAdmins || 0 }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full">Recent</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Recent Users</p>
          <p class="text-3xl font-bold text-gray-900">{{ stats.recentUsers || 0 }}</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by name or email..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              @input="debouncedSearch"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              v-model="filters.role"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              @change="loadUsers"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="brand_admin">Brand Admin</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="filters.is_active"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              @change="loadUsers"
            >
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="loadUsers"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Users List -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- Loading State -->
              <tr v-if="loading" v-for="n in 5" :key="n">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="animate-pulse flex items-center">
                    <div class="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div class="ml-4">
                      <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div class="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="animate-pulse h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="animate-pulse h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="animate-pulse h-6 bg-gray-200 rounded w-16"></div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="animate-pulse h-4 bg-gray-200 rounded w-20"></div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="animate-pulse flex space-x-2">
                    <div class="h-8 w-8 bg-gray-200 rounded"></div>
                    <div class="h-8 w-8 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-else-if="users.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <p class="mt-4 text-lg font-medium">No users found</p>
                  <p class="text-gray-400">Get started by adding a new admin user.</p>
                </td>
              </tr>

              <!-- User Rows -->
              <tr v-else v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img
                      v-if="user.profile_image"
                      :src="getProfileImageUrl(user.profile_image)"
                      :alt="user.name"
                      class="h-10 w-10 rounded-full object-cover"
                      @error="handleImageError"
                    >
                    <div
                      v-else
                      class="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7-7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                      <div class="text-sm text-gray-500">{{ user.phone || 'No phone' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-red-100 text-red-800': user.role === 'admin',
                      'bg-blue-100 text-blue-800': user.role === 'brand_admin',
                      'bg-gray-100 text-gray-800': user.role === 'user'
                    }"
                  >
                    {{ user.role === 'brand_admin' ? 'Brand Admin' : user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ user.brand?.name || (user.role === 'brand_admin' ? 'No Brand Assigned' : 'N/A') }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': user.is_active,
                      'bg-red-100 text-red-800': !user.is_active
                    }"
                  >
                    {{ user.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="editUser(user)"
                      class="text-blue-600 hover:text-blue-900"
                      title="Edit user"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="toggleUserStatus(user)"
                      :class="user.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                      :title="user.is_active ? 'Deactivate user' : 'Activate user'"
                    >
                      <svg v-if="user.is_active" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                      </svg>
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                    <button
                      v-if="user.id !== currentUser?.id"
                      @click="deleteUser(user)"
                      class="text-red-600 hover:text-red-900"
                      title="Delete user"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.total > pagination.per_page" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="changePage(pagination.current_page - 1)"
              :disabled="pagination.current_page <= 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              @click="changePage(pagination.current_page + 1)"
              :disabled="pagination.current_page >= pagination.last_page"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="changePage(pagination.current_page - 1)"
                  :disabled="pagination.current_page <= 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="changePage(page)"
                  :class="{
                    'bg-blue-50 border-blue-500 text-blue-600': page === pagination.current_page,
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== pagination.current_page
                  }"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
                <button
                  @click="changePage(pagination.current_page + 1)"
                  :disabled="pagination.current_page >= pagination.last_page"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showCreateModal ? 'Create New Admin User' : 'Edit User' }}
          </h3>
          
          <form @submit.prevent="showCreateModal ? createUser() : updateUser()">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="userForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="userForm.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                >
              </div>
              
              <div v-if="showCreateModal">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Password <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="userForm.password"
                  type="password"
                  required
                  minlength="8"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter password (min 8 characters)"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Role <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="userForm.role"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="brand_admin">Brand Admin</option>
                </select>
              </div>
              
              <!-- Brand Selection (only show for brand_admin role) -->
              <div v-if="userForm.role === 'brand_admin'">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Brand <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="userForm.brand_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select brand</option>
                  <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                    {{ brand.name }}
                  </option>
                </select>
                <p class="text-sm text-gray-500 mt-1">Brand admins can only manage content for their assigned brand.</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                <input
                  v-model="userForm.phone"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address (Optional)</label>
                <textarea
                  v-model="userForm.address"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter address"
                ></textarea>
              </div>
              
              <div class="flex items-center">
                <input
                  v-model="userForm.is_active"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                >
                <label class="ml-2 block text-sm text-gray-900">Active user</label>
              </div>
            </div>

            <div v-if="formError" class="mt-4 text-red-600 text-sm">
              {{ formError }}
            </div>

            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="formLoading"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
              >
                {{ formLoading ? 'Saving...' : (showCreateModal ? 'Create User' : 'Update User') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mt-4">Delete User</h3>
          <p class="text-sm text-gray-500 mt-2">
            Are you sure you want to delete <strong>{{ userToDelete?.name }}</strong>?
          </p>
          <p class="text-xs text-gray-400 mt-1">
            <strong>Note:</strong> If the user has associated data, they will be deactivated instead of deleted.
          </p>
          <div class="flex justify-center space-x-3 mt-6">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              @click="confirmDeleteUser"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { debounce } from 'lodash-es'

// Check admin authentication
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

// Head
useHead({
  title: 'Admin Users - Aprati Food Company',
  description: 'Manage administrator accounts and permissions'
})

// Reactive data
const loading = ref(false)
const formLoading = ref(false)
const users = ref([])
const brands = ref([])
const stats = ref({
  totalAdmins: 0,
  activeAdmins: 0,
  brandAdmins: 0,
  recentUsers: 0
})

const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0,
  from: 0,
  to: 0
})

const filters = reactive({
  search: '',
  role: '',
  is_active: ''
})

// Modal states
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const userToDelete = ref(null)
const editingUser = ref(null)
const formError = ref('')

// Form data
const userForm = reactive({
  name: '',
  email: '',
  password: '',
  role: 'admin',
  phone: '',
  address: '',
  is_active: true,
  brand_id: null
})

// Current user
const currentUser = ref(null)

// API instance
const api = useApi()

// Load current user
const loadCurrentUser = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    const response = await api.request('/me')
    if (response.success || response.status === 'success') {
      currentUser.value = response.data.user || response.data
    }
  } catch (error) {
    console.error('Failed to load current user:', error)
  }
}

// Load brands
const loadBrands = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    const response = await api.brands.getAll()
    if (response.success && response.data) {
      brands.value = response.data.brands || response.data || []
    }
  } catch (error) {
    console.error('Failed to load brands:', error)
  }
}

// Load users
const loadUsers = async (page = 1) => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  loading.value = true
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: pagination.value.per_page.toString()
    })

    // Add filters
    if (filters.search) params.append('search', filters.search)
    if (filters.role) params.append('role', filters.role)
    if (filters.is_active !== '') params.append('is_active', filters.is_active)

    const response = await api.request(`/users?${params.toString()}`)
    
    if (response.success || response.status === 'success') {
      const data = response.data
      users.value = data.users.data || data.users || []
      
      // Update pagination
      if (data.users && data.users.current_page !== undefined) {
        pagination.value = {
          current_page: data.users.current_page,
          last_page: data.users.last_page,
          per_page: data.users.per_page,
          total: data.users.total,
          from: data.users.from,
          to: data.users.to
        }
      }
      
      // Update stats
      loadStats()
    }
  } catch (error) {
    console.error('Failed to load users:', error)
    showNotification('Failed to load users', 'error')
  } finally {
    loading.value = false
  }
}

// Load stats
const loadStats = async () => {
  try {
    const adminUsers = users.value.filter(user => user.role === 'admin' || user.role === 'brand_admin')
    stats.value = {
      totalAdmins: adminUsers.length,
      activeAdmins: adminUsers.filter(user => user.is_active).length,
      brandAdmins: adminUsers.filter(user => user.role === 'brand_admin').length,
      recentUsers: adminUsers.filter(user => {
        const created = new Date(user.created_at)
        const now = new Date()
        const diffTime = Math.abs(now - created)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7
      }).length
    }
  } catch (error) {
    console.error('Failed to load stats:', error)
  }
}

// Debounced search
const debouncedSearch = debounce(() => {
  loadUsers(1)
}, 500)

// Create user
const createUser = async () => {
  formLoading.value = true
  formError.value = ''
  
  // Basic client-side validation
  if (!userForm.name || !userForm.email || !userForm.password || !userForm.role) {
    formError.value = 'Please fill in all required fields'
    formLoading.value = false
    return
  }
  
  // Brand admin validation
  if (userForm.role === 'brand_admin' && !userForm.brand_id) {
    formError.value = 'Please select a brand for brand admin role'
    formLoading.value = false
    return
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userForm.email)) {
    formError.value = 'Please enter a valid email address'
    formLoading.value = false
    return
  }
  
  // Password length validation
  if (userForm.password.length < 8) {
    formError.value = 'Password must be at least 8 characters long'
    formLoading.value = false
    return
  }
  
  const requestData = {
    name: userForm.name.trim(),
    email: userForm.email.trim().toLowerCase(),
    password: userForm.password,
    role: userForm.role,
    phone: userForm.phone ? userForm.phone.trim() : null,
    address: userForm.address ? userForm.address.trim() : null,
    is_active: Boolean(userForm.is_active)
  }
  
  // Add brand_id only for brand_admin role
  if (userForm.role === 'brand_admin' && userForm.brand_id) {
    requestData.brand_id = userForm.brand_id
  }
  
  console.log('Creating user with data:', requestData)
  
  try {
    const response = await api.users.create(requestData)
    
    console.log('Create user response:', response)
    
    if (response.success) {
      showNotification('User created successfully', 'success')
      closeModal()
      loadUsers()
    } else {
      // Handle validation errors
      if (response.errors) {
        const errorMessages = Object.values(response.errors).flat().join(', ')
        formError.value = errorMessages
      } else {
        formError.value = response.error || 'Failed to create user'
      }
    }
  } catch (error) {
    console.error('Failed to create user:', error)
    formError.value = error.message || 'Failed to create user'
  } finally {
    formLoading.value = false
  }
}

// Edit user
const editUser = (user) => {
  editingUser.value = user
  userForm.name = user.name
  userForm.email = user.email
  userForm.role = user.role
  userForm.phone = user.phone || ''
  userForm.address = user.address || ''
  userForm.is_active = user.is_active
  userForm.brand_id = user.brand_id || null
  userForm.password = '' // Don't pre-fill password
  showEditModal.value = true
}

// Update user
const updateUser = async () => {
  formLoading.value = true
  formError.value = ''
  
  // Brand admin validation
  if (userForm.role === 'brand_admin' && !userForm.brand_id) {
    formError.value = 'Please select a brand for brand admin role'
    formLoading.value = false
    return
  }
  
  try {
    const updateData = {
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      phone: userForm.phone || null,
      address: userForm.address || null,
      is_active: userForm.is_active
    }
    
    // Add brand_id for brand_admin role
    if (userForm.role === 'brand_admin' && userForm.brand_id) {
      updateData.brand_id = userForm.brand_id
    }
    
    // Only include password if provided
    if (userForm.password) {
      updateData.password = userForm.password
    }
    
    const response = await api.users.update(editingUser.value.id, updateData)
    
    if (response.success) {
      showNotification('User updated successfully', 'success')
      closeModal()
      loadUsers()
    } else {
      formError.value = response.error || 'Failed to update user'
    }
  } catch (error) {
    console.error('Failed to update user:', error)
    formError.value = error.message || 'Failed to update user'
  } finally {
    formLoading.value = false
  }
}

// Toggle user status
const toggleUserStatus = async (user) => {
  try {
    const response = await api.users.toggleStatus(user.id)
    
    if (response.success) {
      user.is_active = !user.is_active
      showNotification(`User ${user.is_active ? 'activated' : 'deactivated'} successfully`, 'success')
      loadStats()
    }
  } catch (error) {
    console.error('Failed to toggle user status:', error)
    showNotification('Failed to update user status', 'error')
  }
}

// Delete user
const deleteUser = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

// Confirm delete user
const confirmDeleteUser = async () => {
  try {
    const response = await api.users.delete(userToDelete.value.id)
    
    if (response.success) {
      showNotification('User deleted successfully', 'success')
      showDeleteModal.value = false
      userToDelete.value = null
      loadUsers()
    } else {
      // Handle specific error cases
      const errorMessage = response.error || 'Failed to delete user'
      showNotification(errorMessage, 'error')
      showDeleteModal.value = false
    }
  } catch (error) {
    console.error('Failed to delete user:', error)
    
    // Handle common deletion errors
    if (error.message && error.message.includes('500')) {
      showNotification('Cannot delete this user due to data constraints. User has been deactivated instead.', 'warning')
      // Try to deactivate instead of delete
      try {
        await toggleUserStatus(userToDelete.value.id)
        showDeleteModal.value = false
        userToDelete.value = null
        loadUsers()
      } catch (toggleError) {
        showNotification('Failed to deactivate user', 'error')
      }
    } else {
      showNotification('Failed to delete user: ' + (error.message || 'Unknown error'), 'error')
    }
    showDeleteModal.value = false
  }
}

// Close modal
const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingUser.value = null
  formError.value = ''
  
  // Reset form
  Object.assign(userForm, {
    name: '',
    email: '',
    password: '',
    role: 'admin',
    phone: '',
    address: '',
    is_active: true,
    brand_id: null
  })
}

// Pagination
const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    loadUsers(page)
  }
}

const visiblePages = computed(() => {
  const current = pagination.value.current_page
  const last = pagination.value.last_page
  const pages = []
  
  for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
    pages.push(i)
  }
  
  return pages
})

// Helper functions
const getProfileImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.apiBaseUrl?.replace('/api', '') || 'https://sdev.apratifoods.asia'
  return imagePath.startsWith('/storage/') ? `${baseUrl}${imagePath}` : `${baseUrl}/storage/${imagePath}`
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const showNotification = (message, type = 'info') => {
  // You can implement a toast notification system here
  console.log(`${type.toUpperCase()}: ${message}`)
}

const logout = () => {
  navigateTo('/admin/login')
}

// Load data on mount
onMounted(() => {
  if (process.server) return
  loadCurrentUser()
  loadUsers()
  loadBrands()
})
</script>


