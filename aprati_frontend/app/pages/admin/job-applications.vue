<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Modern Page Header -->
      <div class="mb-12 relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#0a0e27] to-[#1e293b] shadow-2xl border border-white/5">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative px-6 sm:px-8 lg:px-10 py-8">
          <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-lg">Job Applications</h1>
              </div>
              <p class="text-base sm:text-lg text-white/90 font-medium">Manage job applications and candidates</p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <NuxtLink 
                to="/admin/careers"
                class="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl transition-all duration-200 border border-white/30 shadow-lg font-semibold"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                <span>Back to Careers</span>
              </NuxtLink>
              <button 
                v-if="statistics.pending > 0"
                @click="markAllPendingAsReviewed"
                class="flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-xl transition-all duration-200 border border-white/30 shadow-lg font-semibold"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Mark {{ statistics.pending }} Reviewed</span>
              </button>
              <button 
                @click="loadApplications"
                class="flex items-center gap-2 px-6 py-3 bg-white text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all duration-200 shadow-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
        <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <!-- Modern Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">Total</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total</p>
          <p class="text-4xl lg:text-5xl font-black text-gray-900 drop-shadow-sm tracking-tighter">{{ statistics.total || 0 }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-yellow-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-50 rounded-full">Pending</span>
          </div>
          <p class="text-sm font-medium text-gray-500 mb-1">Pending</p>
          <p class="text-4xl lg:text-5xl font-black text-gray-900 drop-shadow-sm tracking-tighter">{{ statistics.pending || 0 }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full">Reviewed</span>
          </div>
          <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Reviewed</p>
          <p class="text-4xl lg:text-5xl font-black text-gray-900 drop-shadow-sm tracking-tighter">{{ statistics.reviewed || 0 }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-emerald-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full">Shortlisted</span>
          </div>
          <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Shortlisted</p>
          <p class="text-4xl lg:text-5xl font-black text-gray-900 drop-shadow-sm tracking-tighter">{{ statistics.shortlisted || 0 }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-teal-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.586l1.293-1.293a1 1 0 111.414 1.414L19 16.414V18a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.586l-1.293 1.293a1 1 0 11-1.414-1.414L11 14.414V8a2 2 0 012-2h4a2 2 0 012 2z"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-teal-600 bg-teal-50 rounded-full">Hired</span>
          </div>
          <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hired</p>
          <p class="text-4xl lg:text-5xl font-black text-gray-900 drop-shadow-sm tracking-tighter">{{ statistics.hired || 0 }}</p>
        </div>

        <div class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-red-200 transform hover:-translate-y-1">
          <div class="flex items-start justify-between mb-4">
            <div class="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
              </svg>
            </div>
            <span class="px-2 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full">Rejected</span>
          </div>
          <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Rejected</p>
          <p class="text-4xl lg:text-5xl font-black text-gray-900 drop-shadow-sm tracking-tighter">{{ statistics.rejected || 0 }}</p>
        </div>
      </div>

      <!-- New Applications Alert -->
      <div v-if="recentApplications.length > 0" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-blue-800 font-medium">
            {{ recentApplications.length }} new application{{ recentApplications.length > 1 ? 's' : '' }} in the last 24 hours
          </span>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select v-model="filterStatus" @change="loadApplications" class="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Career</label>
            <select v-model="filterCareer" @change="loadApplications" class="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Careers</option>
              <option v-for="career in careers" :key="career.id" :value="career.id">{{ career.title_job }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Applicant</label>
            <input 
              v-model="searchQuery" 
              @input="debouncedSearch"
              type="text" 
              placeholder="Name or email..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
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
        <p class="mt-2 text-gray-600">Loading applications...</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- Applications Table -->
      <div v-if="!loading && !error" class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            Applications ({{ applications.length }})
          </h3>
        </div>
        
        <div v-if="applications.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">No applications found</h3>
          <p class="text-gray-600">No job applications match your current filters.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="application in applications" :key="application.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ application.full_name }}</div>
                    <div class="text-sm text-gray-500">{{ application.email }}</div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ application.career?.title_job || 'N/A' }}</div>
                  <div class="text-sm text-gray-500">{{ application.career?.position || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ application.phone_number }}</div>
                  <div v-if="application.telegram_number" class="text-sm text-gray-500">
                    Telegram: {{ application.telegram_number }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span :class="getStatusBadgeClass(application.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ formatStatus(application.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {{ formatDate(application.applied_at) }}
                </td>
                <td class="px-6 py-4 text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button 
                      @click="viewApplication(application)"
                      class="text-indigo-600 hover:text-indigo-900"
                      title="View Details"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                    <button 
                      @click="downloadCV(application)"
                      class="text-green-600 hover:text-green-900"
                      title="Download CV"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                    <button 
                      @click="updateStatus(application)"
                      class="text-blue-600 hover:text-blue-900"
                      title="Update Status"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="deleteApplication(application)"
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

    <!-- View Application Modal -->
    <div v-if="showViewModal && viewingApplication" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-black text-corporate-dark tracking-tight">Application Details</h2>
            <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Applicant Information -->
            <div class="lg:col-span-1 space-y-6">
              <div>
                <h3 class="text-xl font-black text-corporate-dark mb-4 border-b border-corporate-gold/20 pb-2">Applicant Information</h3>
                <div class="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div>
                    <p class="text-sm text-gray-600">Full Name</p>
                    <p class="font-medium text-lg">{{ viewingApplication.full_name }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Email Address</p>
                    <p class="font-medium">
                      <a :href="`mailto:${viewingApplication.email}`" class="text-blue-600 hover:text-blue-800">
                        {{ viewingApplication.email }}
                      </a>
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Phone Number</p>
                    <p class="font-medium">
                      <a :href="`tel:${viewingApplication.phone_number}`" class="text-blue-600 hover:text-blue-800">
                        {{ viewingApplication.phone_number }}
                      </a>
                    </p>
                  </div>
                  <div v-if="viewingApplication.telegram_number">
                    <p class="text-sm text-gray-600">Telegram</p>
                    <p class="font-medium">{{ viewingApplication.telegram_number }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Applied Date</p>
                    <p class="font-medium">{{ formatDetailedDate(viewingApplication.applied_at) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Application Status</p>
                    <span :class="getStatusBadgeClass(viewingApplication.status)" class="inline-flex px-3 py-1 text-sm font-semibold rounded-full">
                      {{ formatStatus(viewingApplication.status) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Position Information -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Position Information</h3>
                <div class="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <p class="text-sm text-gray-600">Job Title</p>
                    <p class="font-medium">{{ viewingApplication.career?.title_job || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Position Level</p>
                    <p class="font-medium">{{ viewingApplication.career?.position || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Department</p>
                    <p class="font-medium">{{ viewingApplication.career?.department || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Location</p>
                    <p class="font-medium">{{ viewingApplication.career?.location || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Job Type</p>
                    <p class="font-medium">{{ viewingApplication.career?.job_type || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Salary Range</p>
                    <p class="font-medium">{{ viewingApplication.career?.salary_range || 'N/A' }}</p>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div class="space-y-3">
                  <button 
                    @click="updateStatus(viewingApplication)"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Update Status
                  </button>
                  <button 
                    @click="downloadCV(viewingApplication)"
                    class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Download CV
                  </button>
                  <button 
                    @click="viewCVInModal(viewingApplication)"
                    class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    View CV
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Column: Cover Letter & Admin Notes -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Cover Letter -->
              <div v-if="viewingApplication.cover_letter">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="prose max-w-none">
                    <p class="text-gray-700 whitespace-pre-line leading-relaxed">{{ viewingApplication.cover_letter }}</p>
                  </div>
                </div>
              </div>

              <!-- CV File Information -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">CV/Resume File</h3>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="flex-shrink-0">
                        <svg class="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                        </svg>
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ viewingApplication.cv_original_name }}</p>
                        <p class="text-sm text-gray-500">{{ getCVFileType(viewingApplication.cv_original_name) }} Document</p>
                      </div>
                    </div>
                    <div class="flex space-x-2">
                      <button 
                        @click="viewCVInModal(viewingApplication)"
                        class="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded hover:bg-purple-200 transition-colors"
                      >
                        View
                      </button>
                      <button 
                        @click="downloadCV(viewingApplication)"
                        class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200 transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Job Description & Requirements (for reference) -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Job Details (Reference)</h3>
                <div class="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div>
                    <h4 class="font-medium text-gray-900 mb-2">Job Description</h4>
                    <p class="text-sm text-gray-700 whitespace-pre-line">{{ viewingApplication.career?.job_description || 'N/A' }}</p>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900 mb-2">Job Requirements</h4>
                    <p class="text-sm text-gray-700 whitespace-pre-line">{{ viewingApplication.career?.job_requirements || 'N/A' }}</p>
                  </div>
                </div>
              </div>

              <!-- Admin Notes -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h3>
                <div class="bg-yellow-50 p-4 rounded-lg">
                  <div v-if="viewingApplication.admin_notes" class="mb-4">
                    <h4 class="font-medium text-gray-900 mb-2">Current Notes</h4>
                    <p class="text-gray-700 whitespace-pre-line">{{ viewingApplication.admin_notes }}</p>
                  </div>
                  <div v-else class="text-gray-500 italic mb-4">
                    No admin notes yet
                  </div>
                  <button 
                    @click="updateStatus(viewingApplication)"
                    class="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Add/Update Notes
                  </button>
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
              @click="updateStatus(viewingApplication)"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Status & Notes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Status Modal -->
    <div v-if="showStatusModal && updatingApplication" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">Update Application Status</h2>
            <button @click="showStatusModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitStatusUpdate" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select v-model="statusForm.status" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="pending">Pending Review</option>
                <option value="reviewed">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
              <textarea 
                v-model="statusForm.admin_notes"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Add notes about this status change..."
              ></textarea>
            </div>

            <div class="flex justify-end space-x-4 pt-4">
              <button 
                type="button"
                @click="showStatusModal = false"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="updating"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {{ updating ? 'Updating...' : 'Update Status' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- CV Viewer Modal -->
    <div v-if="showCVModal && viewingCV" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-60">
      <div class="bg-white rounded-lg max-w-5xl w-full max-h-[95vh] overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-xl font-bold text-gray-900">CV Viewer</h2>
              <p class="text-sm text-gray-600">{{ viewingCV.cv_original_name }} - {{ viewingCV.full_name }}</p>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="downloadCV(viewingCV)"
                class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
              >
                Download
              </button>
              <button @click="showCVModal = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="h-[80vh] overflow-auto">
          <div v-if="getCVFileType(viewingCV.cv_original_name) === 'PDF'" class="h-full">
            <iframe 
              :src="getCVViewUrl(viewingCV)"
              class="w-full h-full border-0"
              title="CV Viewer"
            ></iframe>
          </div>
          <div v-else class="p-8 text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Preview Not Available</h3>
            <p class="text-gray-600 mb-4">
              This file type ({{ getCVFileType(viewingCV.cv_original_name) }}) cannot be previewed in the browser.
            </p>
            <button 
              @click="downloadCV(viewingCV)"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Download to View
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

const { jobApplications: jobAppApi, careers: careerApi } = useApi()

// Reactive data
const applications = ref([])
const careers = ref([])
const statistics = ref({})
const recentApplications = ref([])
const loading = ref(true)
const error = ref('')
const updating = ref(false)

// Filters
const filterStatus = ref('')
const filterCareer = ref('')
const searchQuery = ref('')

// Modals
const showViewModal = ref(false)
const showStatusModal = ref(false)
const showCVModal = ref(false)
const viewingApplication = ref(null)
const updatingApplication = ref(null)
const viewingCV = ref(null)

// Status form
const statusForm = ref({
  status: '',
  admin_notes: ''
})

// Load data on mount
onMounted(async () => {
  if (process.server) return
  await Promise.all([
    loadStatistics(),
    loadRecentApplications(),
    loadCareers(),
    loadApplications()
  ])
})

// Methods
const loadApplications = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    loading.value = true
    error.value = ''
    
    const params = {}
    if (filterStatus.value) params.status = filterStatus.value
    if (filterCareer.value) params.career_id = filterCareer.value
    if (searchQuery.value) params.search = searchQuery.value
    
    const response = await jobAppApi.adminGetAll(params)
    if (response.success) {
      applications.value = response.data || []
    } else {
      error.value = response.error || 'Failed to load applications'
    }
  } catch (err) {
    console.error('Error loading applications:', err)
    error.value = 'Failed to load applications'
  } finally {
    loading.value = false
  }
}

const loadStatistics = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    const response = await jobAppApi.getStatistics()
    if (response.success) {
      statistics.value = response.data || {}
    }
  } catch (err) {
    console.error('Error loading statistics:', err)
  }
}

// Function to mark all pending applications as reviewed
const markAllPendingAsReviewed = async () => {
  if (!confirm(`Are you sure you want to mark all ${statistics.value.pending} pending applications as reviewed?`)) {
    return
  }
  
  try {
    loading.value = true
    
    // Get all pending applications
    const pendingResponse = await jobAppApi.adminGetAll({ status: 'pending' })
    if (pendingResponse.success && pendingResponse.data.length > 0) {
      const pendingApps = pendingResponse.data
      
      console.log(`Marking ${pendingApps.length} pending applications as reviewed`)
      
      // Update each pending application to reviewed status
      const updatePromises = pendingApps.map(app => 
        jobAppApi.updateStatus(app.id, {
          status: 'reviewed',
          admin_notes: 'Bulk reviewed by admin'
        })
      )
      
      await Promise.all(updatePromises)
      
      // Refresh data
      await Promise.all([
        loadApplications(),
        loadStatistics()
      ])
      
      // Show success message
      alert(`Successfully marked ${pendingApps.length} applications as reviewed!`)
    }
  } catch (err) {
    console.error('Error marking applications as reviewed:', err)
    alert('Failed to mark applications as reviewed')
  } finally {
    loading.value = false
  }
}

const loadRecentApplications = async () => {
  try {
    const response = await jobAppApi.getRecent()
    if (response.success) {
      recentApplications.value = response.data || []
    }
  } catch (err) {
    console.error('Error loading recent applications:', err)
  }
}

const loadCareers = async () => {
  try {
    const response = await careerApi.adminGetAll()
    if (response.success) {
      careers.value = response.data || []
    }
  } catch (err) {
    console.error('Error loading careers:', err)
  }
}

const viewApplication = async (application) => {
  viewingApplication.value = application
  showViewModal.value = true
  
  // Auto-mark as reviewed if currently pending
  if (application.status === 'pending') {
    try {
      await jobAppApi.updateStatus(application.id, {
        status: 'reviewed',
        admin_notes: 'Auto-reviewed when admin viewed details'
      })
      
      // Update the application status in our local data
      application.status = 'reviewed'
      viewingApplication.value.status = 'reviewed'
      
      // Refresh statistics to update counters
      await loadStatistics()
      
      console.log(`Application ${application.id} auto-marked as reviewed`)
    } catch (err) {
      console.error('Error auto-marking application as reviewed:', err)
    }
  }
}

const viewCVInModal = (application) => {
  viewingCV.value = application
  showCVModal.value = true
}

const updateStatus = (application) => {
  updatingApplication.value = application
  statusForm.value = {
    status: application.status,
    admin_notes: application.admin_notes || ''
  }
  showViewModal.value = false
  showStatusModal.value = true
}

const submitStatusUpdate = async () => {
  try {
    updating.value = true
    
    const response = await jobAppApi.updateStatus(updatingApplication.value.id, statusForm.value)
    if (response.success) {
      showStatusModal.value = false
      await loadApplications()
      await loadStatistics()
    } else {
      alert('Failed to update status: ' + (response.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error updating status:', err)
    alert('Failed to update status')
  } finally {
    updating.value = false
  }
}

const downloadCV = async (application) => {
  try {
    const response = await jobAppApi.downloadCV(application.id)
    if (!response.success) {
      alert('Failed to download CV: ' + (response.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error downloading CV:', err)
    alert('Failed to download CV')
  }
}

const deleteApplication = async (application) => {
  if (!confirm(`Are you sure you want to delete the application from "${application.full_name}"?`)) {
    return
  }
  
  try {
    const response = await jobAppApi.delete(application.id)
    if (response.success) {
      await loadApplications()
      await loadStatistics()
    } else {
      alert('Failed to delete application: ' + (response.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error deleting application:', err)
    alert('Failed to delete application')
  }
}

const clearFilters = () => {
  filterStatus.value = ''
  filterCareer.value = ''
  searchQuery.value = ''
  loadApplications()
}

// Debounced search
const debouncedSearch = debounce(() => {
  loadApplications()
}, 500)

// Utility functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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

const formatStatus = (status) => {
  const statusMap = {
    pending: 'Pending Review',
    reviewed: 'Under Review',
    shortlisted: 'Shortlisted',
    hired: 'Hired',
    rejected: 'Rejected'
  }
  return statusMap[status] || status
}

const getStatusBadgeClass = (status) => {
  const classMap = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewed: 'bg-purple-100 text-purple-800',
    shortlisted: 'bg-green-100 text-green-800',
    hired: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const getCVFileType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase()
  const typeMap = {
    'pdf': 'PDF',
    'doc': 'DOC',
    'docx': 'DOCX'
  }
  return typeMap[extension] || extension.toUpperCase()
}

const getCVViewUrl = (application) => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'http://127.0.0.1:8000/api'
  return `${apiBase.replace('/api', '')}/storage/${application.cv_file_path}`
}

// Debounce utility
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Load data on mount
onMounted(() => {
  if (process.server) return
  loadApplications()
  loadStatistics()
})

// SEO
useSeoMeta({
  title: 'Job Applications - Admin - Aprati Food Company',
  description: 'Admin panel for managing job applications and candidates.'
})
</script>
