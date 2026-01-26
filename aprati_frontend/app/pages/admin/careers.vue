<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Modern Page Header -->
      <div class="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 shadow-2xl">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative px-6 sm:px-8 lg:px-10 py-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                  </svg>
                </div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Career Management</h1>
              </div>
              <p class="text-base sm:text-lg text-white/90 font-medium">Manage job postings and career opportunities</p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <NuxtLink 
                to="/admin/job-applications"
                class="relative flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl transition-all duration-200 border border-white/30 shadow-lg font-semibold"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>Applications</span>
                <span v-if="totalPendingApplications > 0" 
                      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce shadow-lg">
                  {{ totalPendingApplications > 99 ? '99+' : totalPendingApplications }}
                </span>
              </NuxtLink>
              <NuxtLink 
                to="/careers"
                class="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl transition-all duration-200 border border-white/30 shadow-lg font-semibold"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <span>View Public</span>
              </NuxtLink>
              <button 
                @click="showCreateModal = true"
                class="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 shadow-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Add Career</span>
              </button>
            </div>
          </div>
        </div>
        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Modern Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full">Active</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Active Jobs</p>
          <p class="text-3xl font-bold text-gray-900">{{ activeCareers }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-50 rounded-full">Inactive</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Inactive Jobs</p>
          <p class="text-3xl font-bold text-gray-900">{{ inactiveCareers }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-red-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full">Closed</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Closed Jobs</p>
          <p class="text-3xl font-bold text-gray-900">{{ closedCareers }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">Applications</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Applications</p>
          <p class="text-3xl font-bold text-gray-900">{{ totalApplications }}</p>
          <div v-if="totalPendingApplications > 0" class="flex items-center mt-2">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              <span class="animate-pulse mr-1">●</span>
              {{ totalPendingApplications }} Pending
            </span>
          </div>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-slate-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-slate-600 bg-slate-50 rounded-full">Total</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Jobs</p>
          <p class="text-3xl font-bold text-gray-900">{{ totalCareers }}</p>
        </div>
      </div>

      <!-- Application Alerts -->
      <div v-if="totalPendingApplications > 0" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              <strong>{{ totalPendingApplications }}</strong> new job {{ totalPendingApplications === 1 ? 'application' : 'applications' }} waiting for review.
              <NuxtLink to="/admin/job-applications" class="font-medium underline hover:text-yellow-900">
                Review now →
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select v-model="filterStatus" class="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Department</label>
            <select v-model="filterDepartment" class="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Departments</option>
              <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Job Type</label>
            <select v-model="filterJobType" class="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="clearFilters"
              class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading careers...</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Careers Table -->
      <div v-if="!loading && !error" class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            Career Listings ({{ filteredCareers.length }} of {{ careers.length }})
          </h3>
        </div>
        
        <div v-if="filteredCareers.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.586l1.293-1.293a1 1 0 111.414 1.414L19 16.414V18a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.586l-1.293 1.293a1 1 0 11-1.414-1.414L11 14.414V8a2 2 0 012-2h4a2 2 0 012 2z"/>
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No careers found</h3>
          <p class="text-gray-600 mb-4">
            {{ careers.length === 0 ? 'No careers have been created yet.' : 'No careers match your current filters.' }}
          </p>
          <button 
            @click="showCreateModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Add First Career
          </button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Details</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department & Location</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expired</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="career in filteredCareers" :key="career.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ career.title_job }}</div>
                    <div class="text-sm text-gray-500">{{ career.position }}</div>
                    <div class="text-xs text-gray-400 mt-1">{{ career.job_type }}</div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="space-y-1">
                    <!-- Total Applications -->
                    <div class="flex items-center space-x-2">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        {{ career.applications_count || 0 }} Total
                      </span>
                    </div>
                    
                    <!-- Pending Applications (if any) -->
                    <div v-if="career.pending_applications_count > 0" class="flex items-center space-x-2">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 animate-pulse">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {{ career.pending_applications_count }} Pending
                      </span>
                    </div>

                    <!-- Application Status Summary -->
                    <div v-if="career.applications_count > 0" class="flex flex-wrap gap-1 mt-1">
                      <span v-if="career.reviewed_applications_count > 0" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                        {{ career.reviewed_applications_count }} Reviewed
                      </span>
                      <span v-if="career.accepted_applications_count > 0" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700">
                        {{ career.accepted_applications_count }} Accepted
                      </span>
                      <span v-if="career.rejected_applications_count > 0" class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700">
                        {{ career.rejected_applications_count }} Rejected
                      </span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ career.department || 'N/A' }}</div>
                  <div class="text-sm text-gray-500">{{ career.location || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ career.salary_range }}</div>
                </td>
                <td class="px-6 py-4">
                  <span :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    career.status === 'active' ? 'bg-green-100 text-green-800' : 
                    career.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  ]">
                    {{ career.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ formatDate(career.created_at) }}
                </td>
                <td class="px-6 py-4 text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button 
                      @click="viewCareer(career)"
                      class="text-indigo-600 hover:text-indigo-900"
                      title="View Details"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                    <button 
                      @click="editCareer(career)"
                      class="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="toggleStatus(career)"
                      :class="[
                        'hover:opacity-75',
                        career.status === 'active' ? 'text-yellow-600' : 'text-green-600'
                      ]"
                      :title="career.status === 'active' ? 'Deactivate' : 'Activate'"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="career.status === 'active'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                    <button 
                      @click="deleteCareer(career)"
                      class="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1V4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Career Modal -->
    <!-- (Same modal as in careers.vue) -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ showEditModal ? 'Edit Job Position' : 'Create New Job Position' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="formError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {{ formError }}
          </div>

          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Form fields same as careers.vue -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input 
                  v-model="form.title_job"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Food Technologist"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                <input 
                  v-model="form.position"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Senior, Junior, Manager"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Career Information *</label>
              <textarea 
                v-model="form.career_information"
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief overview of the career opportunity..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
              <textarea 
                v-model="form.job_description"
                required
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed job description and responsibilities..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Job Requirements *</label>
              <textarea 
                v-model="form.job_requirements"
                required
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Required qualifications, skills, and experience..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Expired *</label>
                <input 
                  v-model="form.salary_range"
                  type="text" 
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. $3000-5000"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select 
                  v-model="form.job_type"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input 
                  v-model="form.department"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. R&D, Marketing, Quality Control"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  v-model="form.location"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Phnom Penh, Siem Reap"
                />
              </div>
            </div>

            <div class="flex justify-end space-x-4 pt-6">
              <button 
                type="button"
                @click="closeModal"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="submitting"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {{ submitting ? 'Saving...' : (showEditModal ? 'Update Position' : 'Create Position') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Career Modal -->
    <div v-if="showViewModal && viewingCareer" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">{{ viewingCareer.title_job }}</h2>
            <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Position Information</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-600">Position</p>
                    <p class="font-medium">{{ viewingCareer.position }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Department</p>
                    <p class="font-medium">{{ viewingCareer.department || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Location</p>
                    <p class="font-medium">{{ viewingCareer.location || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Salary Range</p>
                    <p class="font-medium">{{ viewingCareer.salary_range }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Job Type</p>
                    <p class="font-medium">{{ viewingCareer.job_type }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Status</p>
                    <span :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      viewingCareer.status === 'active' ? 'bg-green-100 text-green-800' : 
                      viewingCareer.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    ]">
                      {{ viewingCareer.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Career Information</h3>
              <p class="text-gray-700">{{ viewingCareer.career_information }}</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Job Description</h3>
              <p class="text-gray-700 whitespace-pre-line">{{ viewingCareer.job_description }}</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Job Requirements</h3>
              <p class="text-gray-700 whitespace-pre-line">{{ viewingCareer.job_requirements }}</p>
            </div>

            <div class="flex justify-end space-x-4 pt-6">
              <button 
                @click="showViewModal = false"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                @click="editCareer(viewingCareer)"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Career
              </button>
            </div>
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

const { careers: careerApi } = useApi()

// Reactive data
const careers = ref([])
const loading = ref(true)
const error = ref('')
const submitting = ref(false)
const formError = ref('')

// Application statistics
const totalApplications = ref(0)
const totalPendingApplications = ref(0)

// Modal states
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const editingCareer = ref(null)
const viewingCareer = ref(null)

// Filters
const filterStatus = ref('')
const filterDepartment = ref('')
const filterJobType = ref('')

// Form data
const form = ref({
  title_job: '',
  career_information: '',
  job_description: '',
  job_requirements: '',
  salary_range: '',
  position: '',
  location: '',
  job_type: 'Full-time',
  department: '',
  status: 'active'
})

// Computed properties
const activeCareers = computed(() => careers.value.filter(c => c.status === 'active').length)
const inactiveCareers = computed(() => careers.value.filter(c => c.status === 'inactive').length)
const closedCareers = computed(() => careers.value.filter(c => c.status === 'closed').length)
const totalCareers = computed(() => careers.value.length)

const departments = computed(() => {
  const depts = [...new Set(careers.value.map(c => c.department).filter(Boolean))]
  return depts.sort()
})

const filteredCareers = computed(() => {
  let filtered = careers.value

  if (filterStatus.value) {
    filtered = filtered.filter(c => c.status === filterStatus.value)
  }
  
  if (filterDepartment.value) {
    filtered = filtered.filter(c => c.department === filterDepartment.value)
  }
  
  if (filterJobType.value) {
    filtered = filtered.filter(c => c.job_type === filterJobType.value)
  }

  return filtered
})

// Methods
const loadCareers = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    loading.value = true
    error.value = ''
    
    const response = await careerApi.adminGetAll()
    if (response.success) {
      careers.value = response.data || []
      
      // Calculate application statistics
      totalApplications.value = careers.value.reduce((total, career) => 
        total + (career.applications_count || 0), 0)
      
      totalPendingApplications.value = careers.value.reduce((total, career) => 
        total + (career.pending_applications_count || 0), 0)
        
    } else {
      error.value = response.error || 'Failed to load careers'
    }
  } catch (err) {
    console.error('Error loading careers:', err)
    error.value = 'Failed to load careers'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    title_job: '',
    career_information: '',
    job_description: '',
    job_requirements: '',
    salary_range: '',
    position: '',
    location: '',
    job_type: 'Full-time',
    department: '',
    status: 'active'
  }
  formError.value = ''
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  editingCareer.value = null
  viewingCareer.value = null
  resetForm()
}

const viewCareer = (career) => {
  viewingCareer.value = career
  showViewModal.value = true
}

const editCareer = (career) => {
  editingCareer.value = career
  form.value = { ...career }
  showViewModal.value = false
  showEditModal.value = true
}

const submitForm = async () => {
  try {
    submitting.value = true
    formError.value = ''
    
    let response
    if (showEditModal.value && editingCareer.value) {
      response = await careerApi.update(editingCareer.value.id, form.value)
    } else {
      response = await careerApi.create(form.value)
    }
    
    if (response.success) {
      closeModal()
      await loadCareers()
    } else {
      formError.value = response.error || 'Failed to save career'
      if (response.errors) {
        formError.value += ': ' + Object.values(response.errors).flat().join(', ')
      }
    }
  } catch (err) {
    console.error('Error saving career:', err)
    formError.value = 'Failed to save career'
  } finally {
    submitting.value = false
  }
}

const toggleStatus = async (career) => {
  const newStatus = career.status === 'active' ? 'inactive' : 'active'
  
  try {
    const response = await careerApi.update(career.id, { status: newStatus })
    if (response.success) {
      await loadCareers()
    } else {
      alert('Failed to update status: ' + (response.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error updating status:', err)
    alert('Failed to update status')
  }
}

const deleteCareer = async (career) => {
  if (!confirm(`Are you sure you want to delete the position "${career.title_job}"?`)) {
    return
  }
  
  try {
    const response = await careerApi.delete(career.id)
    if (response.success) {
      await loadCareers()
    } else {
      alert('Failed to delete career: ' + (response.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error deleting career:', err)
    alert('Failed to delete career')
  }
}

const clearFilters = () => {
  filterStatus.value = ''
  filterDepartment.value = ''
  filterJobType.value = ''
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Load careers on mount
onMounted(() => {
  if (process.server) return
  loadCareers()
})

// SEO
useSeoMeta({
  title: 'Career Management - Admin - Aprati Food Company',
  description: 'Admin panel for managing career opportunities and job postings.'
})
</script>
