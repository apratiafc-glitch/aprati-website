<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Animated Fruit Characters -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute top-1/4 right-1/6 w-20 h-20 object-contain opacity-18 animate-float-delayed" style="animation-delay: 0.5s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-12 animate-float" style="animation-delay: 1s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-1/2 right-1/4 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="animation-delay: 1.5s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-1/6 right-1/3 w-14 h-14 object-contain opacity-16 animate-float" style="animation-delay: 2s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute top-2/3 left-1/6 w-20 h-20 object-contain opacity-14 animate-float-delayed" style="animation-delay: 0.8s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute bottom-1/4 right-1/6 w-14 h-14 object-contain opacity-15 animate-float" style="animation-delay: 1.2s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute top-3/4 left-1/3 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="animation-delay: 1.8s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/5 right-1/5 w-14 h-14 object-contain opacity-13 animate-float" style="animation-delay: 2.3s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 0.3s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-2/5 left-2/5 w-20 h-20 object-contain opacity-10 animate-float" style="animation-delay: 1.4s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-3/5 right-2/5 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="animation-delay: 0.7s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-4/5 left-1/4 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 1.9s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-4/5 right-1/4 w-20 h-20 object-contain opacity-15 animate-float-delayed" style="animation-delay: 0.4s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/3 left-2/3 w-16 h-16 object-contain opacity-18 animate-float" style="animation-delay: 2.1s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-1/5 right-2/3 w-14 h-14 object-contain opacity-14 animate-float-delayed" style="animation-delay: 1.6s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-3/5 right-1/5 w-20 h-20 object-contain opacity-11 animate-float" style="animation-delay: 0.9s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-2/3 left-3/5 w-16 h-16 object-contain opacity-19 animate-float-delayed" style="animation-delay: 2.2s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/8 right-3/4 w-14 h-14 object-contain opacity-13 animate-float" style="animation-delay: 1.1s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/8 left-3/4 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 0.2s;" />
    </div>
    <!-- Hero Section -->
    <section class="bg-blue-200 relative overflow-hidden py-24">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <!-- Hero Content Bar -->
          <div class="relative mb-8">  
            <div class="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 text-blue-800 mb-6">
              <div class="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
              <span class="text-sm font-semibold tracking-wide uppercase">Career Opportunities</span>
            </div>
          </div>

          <h1 class="text-4xl lg:text-6xl font-black text-blue-500 mb-6 leading-tight">
            Join Our <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Team</span>
          </h1>
          <p class="text-xl lg:text-2xl mb-8 text-blue-500 max-w-4xl mx-auto">
            Build your future with Aprati Food Company and be part of our innovative journey.
          </p>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <!-- Loading -->
      <div v-if="loading" class="text-center py-20">
        <div class="relative">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        </div>
        <p class="mt-8 text-gray-600 text-lg font-medium">Loading career opportunities...</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-center">
        <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {{ error }}
      </div>

      <!-- Job Listings -->
      <div v-if="!loading && !error" class="space-y-8">
        <!-- No Jobs Message -->
        <div v-if="careers.length === 0" class="text-center py-20">
          <div class="max-w-3xl mx-auto">
            <!-- Icon -->
            <div class="relative mb-12">
              <div class="w-32 h-32 mx-auto relative">
                <div class="absolute inset-0 rounded-full bg-gray-200"></div>
                <div class="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.586l1.293-1.293a1 1 0 111.414 1.414L19 16.414V18a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.586l-1.293 1.293a1 1 0 11-1.414-1.414L11 14.414V8a2 2 0 012-2h4a2 2 0 012 2z"/>
                  </svg>
                </div>
              </div>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-2">No Job Openings Available</h3>
            <p class="text-gray-600">
              Currently there are no active job positions available. Please check back later or contact us directly.
            </p>
          </div>
        </div>

        <!-- Job Cards - Home Page Style -->
        <!-- Centered Text with Border -->
        <div class="text-center mb-12">
          <div class="relative inline-block">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl blur-sm"></div>
            <div class="relative bg-white border-2 border-blue-300 rounded-2xl px-8 py-4 shadow-lg">
              <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Current Job <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Opportunities</span>
              </h2>
              <p class="text-gray-600 text-lg">Discover your next career move with us</p>
            </div>
          </div>
        </div>
        
        <div v-if="careers.length > 0" class="space-y-8">
          <div 
            v-for="(career, index) in careers" 
            :key="career.id"
            class="group relative cursor-pointer"
            @click="viewJobDetails(career)"
          >
            <!-- Card -->
            <div class="bg-white rounded-2xl shadow-md border border-blue-100 p-0.5 hover:shadow-lg transition-all duration-500 group-hover:scale-[1.005] flex justify-center items-center min-h-[250px] overflow-hidden">
              <!-- Inner Card --> 
              <div class="rounded-2xl w-full flex items-center justify-center overflow-hidden text-center">
                <div class="w-full flex justify-center text-center">

                  <!-- Content Section -->
                  <div class="flex flex-col justify-center items-center p-6 lg:p-8 text-center w-full max-w-2xl">
                    <!-- Category Badge -->
                    <div class="mb-4 flex justify-center">
                      <span class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-sm font-semibold">
                        <div class="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                        {{ career.department || 'General' }}
                      </span>
                    </div>
                    
                    <!-- Job Title and Position -->
                    <!-- Centered Text with Border -->
                    <div class="text-center mb-6">
                      <div class="relative inline-block">
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-xl blur-sm"></div>
                        <div class="relative bg-white border-2 border-blue-300 rounded-xl px-6 py-3 shadow-md">
                          <h3 class="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{{ career.title_job }}</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                    <h3 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight" style="display: none;">
                      {{ career.title_job }}
                    </h3>
                    <p class="text-xl text-blue-600 font-semibold mb-6">{{ career.position }}</p>
                    
                    <!-- Job Info -->
                    <div class="prose prose-gray prose-lg max-w-none text-gray-600 leading-relaxed mb-6">
                      <p class="line-clamp-3">{{ career.career_information }}</p>
                    </div>

                    <!-- Job Details -->
                    <div class="flex flex-wrap gap-2 mb-8">
                      <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        {{ career.job_type }}
                      </span>
                      <span class="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                        {{ career.salary_range }}
                      </span>
                    </div>
                    
                    <!-- Action Button -->
                    <div class="flex items-center justify-center">
                      <button 
                        v-if="career.status === 'active'"
                        @click.stop="viewJobDetails(career)"
                        class="group/btn relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1"
                      >
                        <span class="relative z-10">Apply Now</span>
                        <svg class="relative z-10 ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                      <button 
                        v-else
                        disabled
                        class="group/btn relative inline-flex items-center px-8 py-4 rounded-2xl bg-gray-400 text-white font-bold cursor-not-allowed"
                      >
                        <span class="relative z-10">Position Closed</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Benefits Section -->
      <section class="mt-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Why Work With Us?</h2>
          <p class="text-xl text-gray-600">Benefits and perks of joining our team</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div class="group text-center bg-white rounded-3xl p-8 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Competitive Salary</h3>
            <p class="text-gray-600 leading-relaxed">Industry-leading compensation packages with performance bonuses</p>
          </div>

          <div class="group text-center bg-white rounded-3xl p-8 shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Career Growth</h3>
            <p class="text-gray-600 leading-relaxed">Professional development opportunities and clear career progression paths</p>
          </div>

          <div class="group text-center bg-white rounded-3xl p-8 shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div class="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Great Team</h3>
            <p class="text-gray-600 leading-relaxed">Work with passionate professionals in a collaborative environment</p>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <div class="bg-gray-100 py-16 mt-16 -mx-4 sm:-mx-6 lg:-mx-8" v-if="!loading && careers.length > 0">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Ready to Join Our Team?</h2>
          <p class="text-xl text-gray-600 mb-8">
            Explore open positions and take the next step in your career journey with us.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/about" 
              class="group relative inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-700 to-green-900 text-white font-bold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-700/25 transform hover:scale-105"
            >
              <span class="relative z-10">Learn About Us</span>
              <svg class="relative z-10 ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
            
            <NuxtLink 
              to="/management" 
              class="group inline-flex items-center px-8 py-4 rounded-2xl border-2 border-gray-500 text-gray-700 font-bold text-lg transition-all duration-300 hover:bg-gray-100 hover:border-gray-400"
            >
              Meet Our Team
              <svg class="ml-3 w-6 h-6 transition-transform group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Career Modal -->
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
                <label class="block text-sm font-medium text-gray-700 mb-2">Salary Range *</label>
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

    <!-- Enhanced Job Details & Application Modal -->
    <div v-if="showJobDetailsModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" @click="closeJobDetailsModal">
      <div class="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp" @click.stop>
        <!-- Header -->
        <div class="relative bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
          <button 
            @click="closeJobDetailsModal" 
            class="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="flex items-center pr-12">
            <!-- Job Icon -->
            <div class="w-16 h-16 mr-6">
              <div class="w-full h-full rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.586l1.293-1.293a1 1 0 111.414 1.414L19 16.414V18a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.586l-1.293 1.293a1 1 0 11-1.414-1.414L11 14.414V8a2 2 0 012-2h4a2 2 0 012 2z"/>
                </svg>
              </div>
            </div>
            
            <div>
              <h3 class="text-2xl lg:text-3xl font-bold text-white">{{ selectedJob?.title_job }}</h3>
              <p class="text-white/80 text-lg mt-1">{{ selectedJob?.position }}</p>
              <div class="flex items-center mt-2 text-white/70">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-sm">{{ selectedJob?.location || 'Company Location' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <!-- Job Details -->
            <div class="space-y-6">
              <!-- Position Information Card -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900">Position Information</h3>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div><span class="font-medium text-gray-700">Position:</span><br><span class="text-gray-600">{{ selectedJob?.position }}</span></div>
                  <div><span class="font-medium text-gray-700">Department:</span><br><span class="text-gray-600">{{ selectedJob?.department || 'General' }}</span></div>
                  <div><span class="font-medium text-gray-700">Location:</span><br><span class="text-gray-600">{{ selectedJob?.location || 'Company Location' }}</span></div>
                  <div><span class="font-medium text-gray-700">Job Type:</span><br><span class="text-gray-600">{{ selectedJob?.job_type }}</span></div>
                  <div class="col-span-2"><span class="font-medium text-gray-700">Salary Range:</span><br><span class="text-gray-600">{{ selectedJob?.salary_range }}</span></div>
                </div>
              </div>

              <!-- About This Role -->
              <div>
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900">About This Role</h3>
                </div>
                <p class="text-gray-600 leading-relaxed">{{ selectedJob?.career_information }}</p>
              </div>

              <!-- Job Description -->
              <div>
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900">Job Description</h3>
                </div>
                <p class="text-gray-600 whitespace-pre-line leading-relaxed">{{ selectedJob?.job_description }}</p>
              </div>

              <!-- Requirements -->
              <div>
                <div class="flex items-center mb-3">
                  <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900">Requirements</h3>
                </div>
                <p class="text-gray-600 whitespace-pre-line leading-relaxed">{{ selectedJob?.job_requirements }}</p>
              </div>
            </div>

            <!-- Application Form -->
            <div class="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border border-blue-200">
              <div class="flex items-center mb-6">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Apply for This Position</h3>
              </div>
              
              <!-- Application Success Message -->
              <div v-if="applicationSubmitted" class="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-6">
                <div class="flex items-center">
                  <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="font-semibold text-lg">Application Submitted Successfully!</span>
                </div>
                <p class="mt-2 text-sm leading-relaxed">We have received your application and will review it shortly. You will hear from us soon.</p>
              </div>

              <!-- Application Form -->
              <form v-if="!applicationSubmitted" @submit.prevent="submitApplication" class="space-y-6">
                <!-- Error Message -->
                <div v-if="applicationError" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                    <span class="font-medium">{{ applicationError }}</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input 
                      v-model="applicationForm.full_name"
                      type="text" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input 
                      v-model="applicationForm.email"
                      type="email" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      v-model="applicationForm.phone_number"
                      type="tel" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+855 12 345 678"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Telegram Number</label>
                    <input 
                      v-model="applicationForm.telegram_number"
                      type="text" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="@yourusername or +855123456"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">CV/Resume *</label>
                  <input 
                    ref="cvFileInput"
                    @change="handleCVUpload"
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p class="text-xs text-gray-500 mt-2">Accepted formats: PDF, DOC, DOCX (Max: 5MB)</p>
                  <p v-if="selectedCVFile" class="text-sm text-emerald-600 mt-2 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Selected: {{ selectedCVFile.name }} ({{ formatFileSize(selectedCVFile.size) }})
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Cover Letter</label>
                  <textarea 
                    v-model="applicationForm.cover_letter"
                    rows="4"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us why you're the perfect fit for this role..."
                  ></textarea>
                </div>

                <div class="flex justify-end space-x-4 pt-6">
                  <button 
                    type="button"
                    @click="closeJobDetailsModal"
                    class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    :disabled="submittingApplication"
                    class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 font-bold"
                  >
                    {{ submittingApplication ? 'Submitting...' : 'Submit Application' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { careers: careerApi, jobApplications: jobApplicationApi, utils } = useApi()

// SEO Meta
useSeoMeta({
  title: 'Careers - Aprati Food Company',
  description: 'Join our team at Aprati Food Company. Explore career opportunities and build your future with us.'
})

// Reactive data
const careers = ref([])
const loading = ref(true)
const error = ref('')
const submitting = ref(false)
const formError = ref('')

// Modal states
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingCareer = ref(null)

// Job details and application states
const showJobDetailsModal = ref(false)
const selectedJob = ref(null)
const applicationSubmitted = ref(false)
const submittingApplication = ref(false)
const applicationError = ref('')
const selectedCVFile = ref(null)

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

// Application form data
const applicationForm = ref({
  full_name: '',
  email: '',
  phone_number: '',
  telegram_number: '',
  cover_letter: '',
  cv_file: null
})

// Check if user is admin - with SSR safety
const isAdmin = computed(() => {
  if (process.server) return false
  try {
    const user = utils.getCurrentUser()
    return user && user.role === 'admin'
  } catch (e) {
    return false
  }
})

// Load careers on mount
onMounted(async () => {
  await loadCareers()
})

// Methods
const loadCareers = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Always use public endpoint for careers listing page (it's a public page)
    const response = await careerApi.getAll()
    
    if (response.success) {
      careers.value = response.data || []
    } else {
      error.value = response.error || 'Failed to load careers'
      console.error('Careers loading error:', response.error)
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

const resetApplicationForm = () => {
  applicationForm.value = {
    full_name: '',
    email: '',
    phone_number: '',
    telegram_number: '',
    cover_letter: '',
    cv_file: null
  }
  selectedCVFile.value = null
  applicationError.value = ''
  applicationSubmitted.value = false
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingCareer.value = null
  resetForm()
}

const closeJobDetailsModal = () => {
  showJobDetailsModal.value = false
  selectedJob.value = null
  resetApplicationForm()
}

const viewJobDetails = (career) => {
  selectedJob.value = career
  showJobDetailsModal.value = true
  resetApplicationForm()
}

const editCareer = (career) => {
  editingCareer.value = career
  form.value = { ...career }
  showEditModal.value = true
}

const handleCVUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      applicationError.value = 'File size must be less than 5MB'
      event.target.value = ''
      return
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      applicationError.value = 'Please upload a PDF, DOC, or DOCX file'
      event.target.value = ''
      return
    }
    
    selectedCVFile.value = file
    applicationForm.value.cv_file = file
    applicationError.value = ''
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const submitApplication = async () => {
  try {
    submittingApplication.value = true
    applicationError.value = ''
    
    // Validate required fields
    if (!applicationForm.value.full_name || !applicationForm.value.email || !applicationForm.value.phone_number) {
      applicationError.value = 'Please fill in all required fields'
      return
    }
    
    if (!selectedCVFile.value) {
      applicationError.value = 'Please upload your CV/Resume'
      return
    }
    
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('career_id', selectedJob.value.id)
    formData.append('full_name', applicationForm.value.full_name)
    formData.append('email', applicationForm.value.email)
    formData.append('phone_number', applicationForm.value.phone_number)
    formData.append('telegram_number', applicationForm.value.telegram_number || '')
    formData.append('cover_letter', applicationForm.value.cover_letter || '')
    formData.append('cv_file', selectedCVFile.value)
    
    const response = await jobApplicationApi.apply(selectedJob.value.id, formData)
    
    if (response.success) {
      applicationSubmitted.value = true
      console.log('Application submitted successfully!')
    } else {
      // Handle specific error cases
      if (response.error && response.error.includes('not available')) {
        applicationError.value = 'This job position is no longer accepting applications'
      } else if (response.error && response.error.includes('not found')) {
        applicationError.value = 'Job position not found. Please refresh the page and try again'
      } else {
        applicationError.value = response.error || 'Failed to submit application'
      }
      
      if (response.errors) {
        applicationError.value += ': ' + Object.values(response.errors).flat().join(', ')
      }
    }
  } catch (err) {
    console.error('Error submitting application:', err)
    
    // Handle network or other errors
    if (err.message && err.message.includes('404')) {
      applicationError.value = 'This job position is no longer available or not found'
    } else if (err.message && err.message.includes('500')) {
      applicationError.value = 'Server error occurred. Please try again later'
    } else {
      applicationError.value = 'Failed to submit application. Please check your connection and try again'
    }
  } finally {
    submittingApplication.value = false
  }
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
      
      // Show success message (you can add a notification system)
      console.log('Career saved successfully!')
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

const deleteCareer = async (career) => {
  if (!confirm(`Are you sure you want to delete the position "${career.title_job}"?`)) {
    return
  }
  
  try {
    const response = await careerApi.delete(career.id)
    if (response.success) {
      await loadCareers()
      console.log('Career deleted successfully!')
    } else {
      alert('Failed to delete career: ' + (response.error || 'Unknown error'))
    }
  } catch (err) {
    console.error('Error deleting career:', err)
    alert('Failed to delete career')
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for modal content */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* File input styling */
input[type="file"]::file-selector-button {
  margin-right: 16px;
  padding: 8px 16px;
  border-radius: 9999px;
  border: none;
  background-color: #dbeafe;
  color: #1d4ed8;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

input[type="file"]::file-selector-button:hover {
  background-color: #bfdbfe;
}
</style>
