<template>
  <div v-if="notifications.length > 0" class="relative">
    <!-- Notification Bell Icon -->
    <button 
      @click="toggleNotifications"
      class="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
      
      <!-- Notification Badge -->
      <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Notifications Dropdown -->
    <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
      <div class="p-4 border-b">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
          <button 
            @click="markAllAsRead"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div class="max-h-96 overflow-y-auto">
        <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
          No new notifications
        </div>
        
        <div v-else>
          <div 
            v-for="notification in notifications" 
            :key="notification.id"
            :class="[
              'p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors',
              !notification.read ? 'bg-blue-50' : ''
            ]"
            @click="handleNotificationClick(notification)"
          >
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
              </div>
              
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  {{ notification.title }}
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  {{ notification.message }}
                </p>
                <p class="text-xs text-gray-400 mt-2">
                  {{ formatTime(notification.created_at) }}
                </p>
              </div>
              
              <div v-if="!notification.read" class="flex-shrink-0">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 border-t">
        <NuxtLink 
          to="/admin/job-applications"
          class="block text-center text-sm text-blue-600 hover:text-blue-800"
          @click="showNotifications = false"
        >
          View all applications
        </NuxtLink>
      </div>
    </div>

    <!-- Overlay to close dropdown -->
    <div 
      v-if="showNotifications" 
      class="fixed inset-0 z-40" 
      @click="showNotifications = false"
    ></div>
  </div>
</template>

<script setup>
const { jobApplications: jobAppApi } = useApi()

// Reactive data
const notifications = ref([])
const showNotifications = ref(false)
const unreadCount = ref(0)

// Load notifications on mount
onMounted(() => {
  loadNotifications()
  // Set up polling for new notifications every 30 seconds
  setInterval(loadNotifications, 30000)
})

// Methods
const loadNotifications = async () => {
  try {
    const response = await jobAppApi.getRecent()
    if (response.success) {
      const recentApps = response.data || []
      
      // Convert recent applications to notifications
      notifications.value = recentApps.map(app => ({
        id: `app-${app.id}`,
        title: 'New Job Application',
        message: `${app.full_name} applied for ${app.career?.title_job || 'a position'}`,
        created_at: app.applied_at,
        read: false,
        data: app
      }))
      
      unreadCount.value = notifications.value.filter(n => !n.read).length
    }
  } catch (err) {
    console.error('Error loading notifications:', err)
  }
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
  unreadCount.value = 0
}

const handleNotificationClick = (notification) => {
  notification.read = true
  unreadCount.value = Math.max(0, unreadCount.value - 1)
  
  // Navigate to job applications page
  navigateTo('/admin/job-applications')
  showNotifications.value = false
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) {
    return 'Just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString()
  }
}
</script>
