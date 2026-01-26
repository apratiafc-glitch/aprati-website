<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
    <!-- Admin Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800 mr-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">Admin Profile</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              @click="saveProfile" 
              :disabled="loading || !hasChanges"
              class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
              </svg>
              <span v-if="loading">Saving...</span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Success/Error Messages -->
    <div v-if="message" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div 
        :class="[
          'p-4 rounded-md',
          messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        ]"
      >
        {{ message }}
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Settings -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Profile Information</h3>
          <p class="text-gray-600">Update your account details and profile picture</p>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Profile Picture Section -->
            <div class="lg:col-span-1">
              <h4 class="text-sm font-medium text-gray-700 mb-4">Profile Picture</h4>
              
              <!-- Current Profile Picture -->
              <div class="flex flex-col items-center">
                <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                  <img 
                    v-if="getCurrentProfileImage()"
                    :src="getCurrentProfileImage()" 
                    :alt="formData.name"
                    class="w-full h-full object-cover"
                    @error="onImageError"
                  >
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                    <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                </div>

                <!-- Upload/Remove Buttons -->
                <div class="flex flex-col space-y-2 w-full">
                  <input
                    ref="profileImageInput"
                    type="file"
                    accept="image/*"
                    @change="handleProfileImageUpload"
                    class="hidden"
                  >
                  <button
                    @click="$refs.profileImageInput.click()"
                    :disabled="uploading"
                    class="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200 text-sm"
                  >
                    <span v-if="uploading">Uploading...</span>
                    <span v-else>{{ currentUser?.profile_image ? 'Change Picture' : 'Upload Picture' }}</span>
                  </button>
                  
                  <button
                    v-if="currentUser?.profile_image"
                    @click="removeProfileImage"
                    :disabled="uploading"
                    class="w-full px-4 py-2 bg-red-100 hover:bg-red-200 disabled:bg-gray-100 text-red-700 disabled:text-gray-400 rounded-lg transition-colors duration-200 text-sm"
                  >
                    Remove Picture
                  </button>
                </div>
                
                <p class="text-xs text-gray-500 mt-2 text-center">
                  Recommended: Square image, at least 400x400px<br>
                  Max size: 2MB (JPG, PNG, GIF)
                </p>
              </div>
            </div>

            <!-- Form Fields -->
            <div class="lg:col-span-2">
              <div class="space-y-6">
                <!-- Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    @input="markAsChanged"
                  >
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                    @input="markAsChanged"
                  >
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                    @input="markAsChanged"
                  >
                </div>

                <!-- Address -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    v-model="formData.address"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your address"
                    @input="markAsChanged"
                  ></textarea>
                </div>

                <!-- Role (Read-only) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input
                    :value="getRoleLabel(currentUser?.role)"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    readonly
                  >
                  <p class="text-xs text-gray-500 mt-1">Role cannot be changed from this page</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Password Change Section -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden mt-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Change Password</h3>
          <p class="text-gray-600">Update your account password for security</p>
        </div>

        <div class="p-6">
          <div class="max-w-lg space-y-6">
            <!-- Current Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                v-model="passwordData.current_password"
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your current password"
              >
            </div>

            <!-- New Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                v-model="passwordData.new_password"
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your new password"
              >
            </div>

            <!-- Confirm New Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                v-model="passwordData.new_password_confirmation"
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your new password"
              >
            </div>

            <button
              @click="changePassword"
              :disabled="loading || !passwordData.current_password || !passwordData.new_password || !passwordData.new_password_confirmation"
              class="flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 text-green-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 01-2 2m2-2h-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V9z"/>
              </svg>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Authentication and layout
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

// Reactive data
const loading = ref(false)
const uploading = ref(false)
const message = ref('')
const messageType = ref('success')
const hasChanges = ref(false)

// User data
const currentUser = ref(null)
const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: ''
})

const passwordData = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

// Load current user
const loadCurrentUser = async () => {
  if (process.server) return
  const token = useCookie('auth-token').value
  if (!token) {
    console.warn('No auth token found')
    return
  }
  try {
    loading.value = true
    const api = useApi()
    
    // Sync auth systems first
    api.utils.syncAuth()
    
    // Check if we have auth data
    if (!api.utils.isAuthenticated()) {
      throw new Error('No authentication token found')
    }
    
    const response = await api.request('/me')
    
    console.log('loadCurrentUser response:', response) // Debug log
    
    // Handle different Laravel response formats
    if (response.success && response.data) {
      // Check if user data is nested (response.data.user) or direct (response.data)
      const userData = response.data.user || response.data
      
      if (userData && userData.id) {
        currentUser.value = userData
        
        // Sync user data to auth systems
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(userData))
        }
        const userCookie = useCookie('auth-user')
        userCookie.value = userData
        
        // Initialize form data
        formData.value = {
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || ''
        }
      } else {
        throw new Error('Invalid user data structure received')
      }
    } else {
      throw new Error(response.error || 'Failed to load user data')
    }
  } catch (error) {
    console.error('Failed to load current user:', error)
    
    // If unauthorized, clear auth and redirect
    if (error.message?.includes('Unauthorized') || error.message?.includes('Unauthenticated') || error.message?.includes('401')) {
      const api = useApi()
      api.utils.clearAuth()
      showMessage('Session expired. Please login again.', 'error')
      await navigateTo('/admin-access')
    } else {
      showMessage(error.message || 'Failed to load profile data', 'error')
    }
  } finally {
    loading.value = false
  }
}

// Handle profile image upload
const handleProfileImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Check if user data is loaded
  if (!currentUser.value || !currentUser.value.id) {
    showMessage('User data not loaded. Please refresh the page.', 'error')
    event.target.value = ''
    return
  }

  try {
    uploading.value = true
    const api = useApi()
    
    const formDataUpload = new FormData()
    formDataUpload.append('profile_image', file)

    const response = await api.request(`/users/${currentUser.value.id}/upload-profile-image`, {
      method: 'POST',
      body: formDataUpload
    })

    if (response.success) {
      // Update the user data with the new profile image
      currentUser.value = { ...currentUser.value, ...response.data.user }
      showMessage('Profile picture uploaded successfully', 'success')
    } else {
      throw new Error(response.error || 'Upload failed')
    }
  } catch (error) {
    console.error('Profile image upload failed:', error)
    showMessage('Failed to upload profile picture', 'error')
  } finally {
    uploading.value = false
    // Clear the file input
    event.target.value = ''
  }
}

// Remove profile image
const removeProfileImage = async () => {
  try {
    uploading.value = true
    const api = useApi()
    
    const response = await api.request(`/users/${currentUser.value.id}/profile-image`, {
      method: 'DELETE'
    })

    if (response.success) {
      currentUser.value = response.data.user
      showMessage('Profile picture removed successfully', 'success')
    } else {
      throw new Error(response.error || 'Remove failed')
    }
  } catch (error) {
    console.error('Failed to remove profile image:', error)
    showMessage('Failed to remove profile picture', 'error')
  } finally {
    uploading.value = false
  }
}

// Get current profile image URL
const getCurrentProfileImage = () => {
  const imagePath = currentUser.value?.profile_image
  if (!imagePath) return null
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.apiBase?.replace('/api', '') || 'http://127.0.0.1:8000'
  return imagePath.startsWith('/storage/') ? `${baseUrl}${imagePath}` : `${baseUrl}/storage/${imagePath}`
}

// Handle image error
const onImageError = (event) => {
  console.warn('Profile image failed to load:', event.target?.src)
  if (event.target) {
    event.target.style.display = 'none'
  }
}

// Get role label
const getRoleLabel = (role) => {
  const roleLabels = {
    'admin': 'Administrator',
    'brand_admin': 'Brand Administrator',
    'user': 'User'
  }
  return roleLabels[role] || role
}

// Mark form as changed
const markAsChanged = () => {
  hasChanges.value = true
}

// Save profile changes
const saveProfile = async () => {
  try {
    loading.value = true
    const api = useApi()
    
    const response = await api.request(`/users/${currentUser.value.id}`, {
      method: 'PUT',
      body: JSON.stringify(formData.value)
    })

    if (response.success) {
      currentUser.value = response.data.user
      hasChanges.value = false
      showMessage('Profile updated successfully', 'success')
    } else {
      throw new Error(response.error || 'Update failed')
    }
  } catch (error) {
    console.error('Failed to save profile:', error)
    showMessage('Failed to update profile', 'error')
  } finally {
    loading.value = false
  }
}

// Change password
const changePassword = async () => {
  if (passwordData.value.new_password !== passwordData.value.new_password_confirmation) {
    showMessage('New passwords do not match', 'error')
    return
  }

  try {
    loading.value = true
    const api = useApi()
    
    const response = await api.request('/change-password', {
      method: 'PUT',
      body: JSON.stringify({
        current_password: passwordData.value.current_password,
        password: passwordData.value.new_password,
        password_confirmation: passwordData.value.new_password_confirmation
      })
    })

    if (response.success) {
      // Clear password fields
      passwordData.value = {
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      }
      showMessage('Password changed successfully', 'success')
    } else {
      throw new Error(response.error || 'Password change failed')
    }
  } catch (error) {
    console.error('Failed to change password:', error)
    showMessage('Failed to change password', 'error')
  } finally {
    loading.value = false
  }
}

// Show message
const showMessage = (msg, type = 'success') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

// Load user on mount
onMounted(() => {
  if (process.server) return
  loadCurrentUser()
})
</script>
