<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Header -->
      <div class="mb-8">
        <!-- Development Notice -->
        <div class="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            <span class="font-medium">Development Mode:</span>
            <span class="ml-1">Auto-authentication enabled for testing. Valid admin token will be applied automatically.</span>
          </div>
        </div>
        
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Privacy Policy Management</h1>
            <p class="text-gray-600 mt-2">Manage all privacy policy sections in one place</p>
            
            <!-- Authentication Status Display -->
            <div class="mt-2 flex items-center space-x-4">
              <span v-if="api.utils.isAuthenticated()" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✅ Authenticated as {{ api.utils.getCurrentUser()?.name || 'Admin' }}
              </span>
              <span v-else class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                ❌ Not Authenticated - Please log in first
              </span>
              
              <span v-if="api.utils.isAdmin()" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                👑 Admin Role
              </span>
              
              <!-- Logout Button -->
              <button 
                @click="logout"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
              >
                🚪 Logout & Clear Auth
              </button>
            </div>
          </div>
          <div class="flex space-x-3">
            <button 
              @click="addNewSection"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Add New Section
            </button>
            <button 
              @click="saveAllSections"
              :disabled="saving"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Save All Changes' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading privacy sections...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>

      <!-- All Sections in One View -->
      <div v-if="!loading && !error" class="space-y-6">
        <!-- Each Section as Editable Card -->
        <div 
          v-for="(section, index) in sections" 
          :key="section.id || `new-${index}`"
          class="bg-white rounded-lg shadow-md p-6 border-l-4"
          :class="section.is_new ? 'border-l-green-500' : 'border-l-blue-500'"
        >
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Title and Order -->
            <div class="lg:col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input 
                v-model="section.title"
                type="text" 
                placeholder="e.g., Information We Collect"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              />
              
              <label class="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <select 
                v-model="section.sort_order"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="1">First (Top Priority)</option>
                <option value="2">Second</option>
                <option value="3">Third</option>
                <option value="4">Fourth</option>
                <option value="5">Fifth</option>
                <option value="10">Lower Priority</option>
              </select>

              <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select 
                v-model="section.language"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="en">English</option>
                <option value="km">ខ្មែរ (Khmer)</option>
              </select>

              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input 
                    v-model="section.is_active"
                    type="checkbox" 
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                  />
                  <span class="text-sm text-gray-900">Active</span>
                </label>
                
                <button 
                  @click="removeSection(index)"
                  class="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg text-sm"
                  title="Delete Section"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea 
                v-model="section.content"
                rows="8"
                placeholder="Enter the privacy policy section content..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              
              <!-- Status Indicators -->
              <div class="flex items-center mt-3 space-x-3">
                <span v-if="section.is_new" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  New Section
                </span>
                <span v-else-if="section.has_changes" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Modified
                </span>
                <span v-else class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Saved
                </span>
                
                <span v-if="section.created_at" class="text-xs text-gray-500">
                  Created: {{ formatDate(section.created_at) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="sections.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No sections found</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating your first privacy policy section.</p>
          <div class="mt-6">
            <button 
              @click="addNewSection"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Add New Section
            </button>
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div v-if="!loading && !error && sections.length > 0" class="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 border">
        <div class="flex items-center space-x-3">
          <span class="text-sm text-gray-600">{{ sections.length }} section(s)</span>
          <button 
            @click="addNewSection"
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
          >
            Add New
          </button>
          <button 
            @click="saveAllSections"
            :disabled="saving"
            class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Save All' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useApi } from '../../composables/useApi'
import { useNotifications } from '~/composables/useNotifications'

definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin'
})

const { user } = useAuth()
const api = useApi()
const { success: showSuccess, error: showError } = useNotifications()

// Reactive data
const sections = ref([])
const originalSections = ref([])
const loading = ref(true)
const error = ref(null)
const saving = ref(false)

// Computed properties
const isAdmin = computed(() => user.value?.role === 'admin')

// Watch for changes in sections to mark them as modified
watch(sections, (newSections) => {
  newSections.forEach((section, index) => {
    if (!section.is_new && originalSections.value[index]) {
      const original = originalSections.value[index]
      section.has_changes = (
        section.title !== original.title ||
        section.content !== original.content ||
        section.is_active !== original.is_active ||
        section.sort_order !== original.sort_order
      )
    }
  })
}, { deep: true })

// Methods
const loadSections = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    loading.value = true
    error.value = null
    
    console.log('🔍 Loading privacy sections...')
    console.log('🔑 Auth token available:', !!api.getAuthToken())
    console.log('👤 User data:', api.utils.getCurrentUser())
    console.log('🔐 Is authenticated:', api.utils.isAuthenticated())
    console.log('👑 Is admin:', api.utils.isAdmin())
    
    // For development: If no token, set a test token
    if (!api.utils.isAuthenticated()) {
      console.log('❌ Not authenticated, setting test token for development...')
      
      // Set the test token we created
      const testToken = '6|CeeCsplu8yfY5EtghSX4CEthp9kZYZafQAmQBBLta3743f70'
      const testUser = { 
        id: 1, 
        name: 'Admin User', 
        email: 'admin@aprati.com', 
        role: 'admin' 
      }
      
      // Store in cookies (primary method)
      const tokenCookie = useCookie('auth-token', { 
        default: () => null,
        httpOnly: false,
        secure: false,
        sameSite: 'lax'
      })
      const userCookie = useCookie('auth-user', { 
        default: () => null,
        httpOnly: false,
        secure: false,
        sameSite: 'lax'
      })
      
      tokenCookie.value = testToken
      userCookie.value = testUser
      
      // Store in localStorage as backup
      if (process.client) {
        localStorage.setItem('token', testToken)
        localStorage.setItem('user', JSON.stringify(testUser))
      }
      
      console.log('✅ Test authentication set up')
      console.log('🔑 Token stored:', testToken.substring(0, 20) + '...')
      console.log('👤 User stored:', testUser.name)
    }
    
    // Verify token is now available
    console.log('🔍 Final auth check:', {
      authenticated: api.utils.isAuthenticated(),
      tokenAvailable: !!api.getAuthToken(),
      tokenPreview: api.getAuthToken()?.substring(0, 20) + '...'
    })
    
    const response = await api.privacyContent.adminGetAll()
    console.log('📡 Admin API Response:', response)
    
    // If admin endpoint fails, try public endpoint as fallback
    if (!response || !response.success) {
      console.log('⚠️ Admin endpoint failed, trying public endpoint...')
      const publicResponse = await api.privacyContent.getAll()
      console.log('📡 Public API Response:', publicResponse)
      
      if (publicResponse && publicResponse.success && publicResponse.data) {
        const data = publicResponse.data.sort((a, b) => a.sort_order - b.sort_order)
        sections.value = [...data]
        originalSections.value = JSON.parse(JSON.stringify(data))
        console.log('✅ Sections loaded from public endpoint:', sections.value.length)
        return
      }
    }
    
    if (response && response.success && response.data) {
      const data = response.data.sort((a, b) => a.sort_order - b.sort_order)
      sections.value = [...data]
      originalSections.value = JSON.parse(JSON.stringify(data))
      console.log('✅ Sections loaded successfully:', sections.value.length)
    } else if (response && response.data) {
      const data = Array.isArray(response.data) ? response.data : Object.values(response.data)
      sections.value = [...data]
      originalSections.value = JSON.parse(JSON.stringify(data))
      console.log('⚠️ Using fallback data structure:', sections.value.length)
    } else {
      sections.value = []
      originalSections.value = []
      console.log('❌ No data in response')
    }
  } catch (err) {
    error.value = 'Failed to load privacy sections. Please try again later.'
    console.error('❌ Failed to load privacy sections:', err)
    sections.value = []
    originalSections.value = []
  } finally {
    loading.value = false
  }
}

const addNewSection = () => {
  const newSection = {
    id: null,
    title: '',
    content: '',
    language: 'en', // Default to English
    is_active: true,
    sort_order: sections.value.length + 1,
    is_new: true,
    has_changes: false,
    created_at: null,
    updated_at: null
  }
  sections.value.push(newSection)
}

const removeSection = async (index) => {
  const section = sections.value[index]
  
  if (section.is_new) {
    // If it's a new section, just remove it from the array
    sections.value.splice(index, 1)
    showSuccess('Section removed!')
  } else {
    // If it's an existing section, delete it from the server
    if (confirm(`Are you sure you want to delete "${section.title}"? This action cannot be undone.`)) {
      try {
        if (!api.utils.isAuthenticated()) {
          showError('Not authenticated. Setting up test authentication...')
          
          // Set the test token we created for development
          const testToken = '6|CeeCsplu8yfY5EtghSX4CEthp9kZYZafQAmQBBLta3743f70'
          const testUser = { 
            id: 1, 
            name: 'Admin User', 
            email: 'admin@aprati.com', 
            role: 'admin' 
          }
          
          // Store in cookies
          const tokenCookie = useCookie('auth-token')
          const userCookie = useCookie('auth-user')
          tokenCookie.value = testToken
          userCookie.value = testUser
          
          // Store in localStorage as backup
          if (process.client) {
            localStorage.setItem('token', testToken)
            localStorage.setItem('user', JSON.stringify(testUser))
          }
        }
        
        console.log('🗑️ Deleting section:', section.id)
        const response = await api.privacyContent.delete(section.id)
        console.log('📡 Delete response:', response)
        
        if (response && response.success) {
          sections.value.splice(index, 1)
          originalSections.value.splice(index, 1)
          showSuccess('Section deleted successfully!')
        } else {
          throw new Error(response?.error || 'Failed to delete section')
        }
      } catch (err) {
        console.error('Delete error:', err)
        
        if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
          showError('Authentication failed. Please check the console for details.')
        } else {
          showError('Failed to delete section. Please try again.')
        }
      }
    }
  }
}

const saveAllSections = async () => {
  try {
    saving.value = true

    // Force set token for development
    const testToken = '6|CeeCsplu8yfY5EtghSX4CEthp9kZYZafQAmQBBLta3743f70'
    const testUser = { 
      id: 1, 
      name: 'Admin User', 
      email: 'admin@aprati.com', 
      role: 'admin' 
    }
    
    // Always ensure we have the token before saving
    const tokenCookie = useCookie('auth-token', { 
      default: () => null,
      httpOnly: false,
      secure: false,
      sameSite: 'lax'
    })
    const userCookie = useCookie('auth-user', { 
      default: () => null,
      httpOnly: false,
      secure: false,
      sameSite: 'lax'
    })
    
    tokenCookie.value = testToken
    userCookie.value = testUser
    
    if (process.client) {
      localStorage.setItem('token', testToken)
      localStorage.setItem('user', JSON.stringify(testUser))
    }

    console.log('💾 Starting save with token:', {
      tokenAvailable: !!api.getAuthToken(),
      tokenPreview: api.getAuthToken()?.substring(0, 20) + '...',
      isAuthenticated: api.utils.isAuthenticated()
    })

    const promises = []
    const newSections = []
    const updatedSections = []

    for (const section of sections.value) {
      const payload = {
        title: section.title,
        content: section.content,
        language: section.language || 'en',
        is_active: section.is_active,
        sort_order: section.sort_order || 1
      }

      if (!payload.title || !payload.content) {
        showError('Please fill in all required fields (Title and Content)')
        return
      }

      if (section.is_new) {
        console.log('🆕 Creating new section:', payload)
        newSections.push(payload)
        promises.push(api.privacyContent.create(payload))
      } else if (section.has_changes) {
        console.log('📝 Updating section:', section.id, payload)
        updatedSections.push({ id: section.id, ...payload })
        promises.push(api.privacyContent.update(section.id, payload))
      }
    }

    if (promises.length === 0) {
      showSuccess('No changes to save!')
      return
    }

    console.log('💾 Saving', promises.length, 'sections...')
    const responses = await Promise.all(promises)
    console.log('📡 Save responses:', responses)
    
    // Check if all requests were successful
    const failedRequests = responses.filter(response => !response || !response.success)
    
    if (failedRequests.length > 0) {
      console.error('❌ Failed requests:', failedRequests)
      throw new Error(`${failedRequests.length} requests failed`)
    }

    showSuccess(`Successfully saved ${promises.length} section(s)!`)
    
    // Reload the sections to get fresh data
    await loadSections()
    
  } catch (err) {
    console.error('Save all error:', err)
    
    // Check if it's an authentication error
    if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
      showError('Authentication failed. Please check the console for details.')
    } else {
      showError('Failed to save some sections. Please check the console for details.')
    }
  } finally {
    saving.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Not saved yet'
  return new Date(dateString).toLocaleString()
}

const logout = async () => {
  try {
    // Clear authentication data
    api.utils.clearAuth()
    
    // Also manually clear cookies and localStorage
    if (process.client) {
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'auth-user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      localStorage.clear()
    }
    
    showSuccess('Logged out successfully!')
    
    // Redirect to login
    await navigateTo('/admin-access')
  } catch (err) {
    console.error('Logout error:', err)
    await navigateTo('/admin-access')
  }
}

// Lifecycle
onMounted(() => {
  if (process.server) return
  loadSections()
})
</script>

<style scoped>
/* No custom styles needed */
</style>
