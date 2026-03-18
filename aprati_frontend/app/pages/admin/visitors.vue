<template>
  <div class="min-h-screen bg-gray-50">
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
            <h1 class="text-2xl font-bold text-gray-900">Website Analytics</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              @click="refreshData" 
              :disabled="loading"
              class="flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:bg-gray-100 text-blue-700 disabled:text-gray-400 rounded-lg transition-colors duration-200"
            >
              <svg 
                class="w-4 h-4 mr-2" 
                :class="{ 'animate-spin': loading }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span v-if="loading">Loading...</span>
              <span v-else>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Visitors</p>
              <p class="text-2xl font-semibold text-gray-900">
                <span v-if="loading" class="animate-pulse bg-gray-200 rounded w-12 h-8 inline-block"></span>
                <span v-else>{{ stats.total_visitors || 0 }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Today's Visitors</p>
              <p class="text-2xl font-semibold text-gray-900">
                <span v-if="loading" class="animate-pulse bg-gray-200 rounded w-12 h-8 inline-block"></span>
                <span v-else>{{ stats.today_visitors || 0 }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">This Week</p>
              <p class="text-2xl font-semibold text-gray-900">
                <span v-if="loading" class="animate-pulse bg-gray-200 rounded w-12 h-8 inline-block"></span>
                <span v-else>{{ stats.week_visitors || 0 }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-orange-100">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 8l-2-2m0 0l2-2m-2 2h8m-8 0V9a4 4 0 118 0v6"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">This Month</p>
              <p class="text-2xl font-semibold text-gray-900">
                <span v-if="loading" class="animate-pulse bg-gray-200 rounded w-12 h-8 inline-block"></span>
                <span v-else>{{ stats.month_visitors || 0 }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Device Statistics -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Device Types</h3>
          <div v-if="loading" class="space-y-3">
            <div class="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
            <div class="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div>
            <div class="animate-pulse bg-gray-200 rounded h-4 w-1/2"></div>
          </div>
          <div v-else class="space-y-4">
            <div v-for="device in deviceStats" :key="device.device" class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full mr-3" :class="getDeviceColor(device.device)"></div>
                <span class="text-sm font-medium text-gray-700 capitalize">{{ device.device }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">{{ device.count }}</span>
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full" 
                    :class="getDeviceColor(device.device, true)"
                    :style="{ width: `${getPercentage(device.count, stats.total_visitors)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Browser Statistics -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Browser Types</h3>
          <div v-if="loading" class="space-y-3">
            <div class="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
            <div class="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div>
            <div class="animate-pulse bg-gray-200 rounded h-4 w-1/2"></div>
          </div>
          <div v-else class="space-y-4">
            <div v-for="browser in browserStats" :key="browser.browser" class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full mr-3" :class="getBrowserColor(browser.browser)"></div>
                <span class="text-sm font-medium text-gray-700">{{ browser.browser }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">{{ browser.count }}</span>
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full" 
                    :class="getBrowserColor(browser.browser, true)"
                    :style="{ width: `${getPercentage(browser.count, stats.total_visitors)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Pages -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Pages</h3>
        <div v-if="loading" class="space-y-3">
          <div class="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
          <div class="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div>
          <div class="animate-pulse bg-gray-200 rounded h-4 w-1/2"></div>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page URL</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="page in popularPages" :key="page.url">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ page.url || 'Unknown' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ page.count }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ getPercentage(page.count, stats.total_visitors).toFixed(1) }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Visitors -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Visitors</h3>
        <div v-if="loading" class="space-y-3">
          <div class="animate-pulse bg-gray-200 rounded h-4 w-full"></div>
          <div class="animate-pulse bg-gray-200 rounded h-4 w-3/4"></div>
          <div class="animate-pulse bg-gray-200 rounded h-4 w-1/2"></div>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="visitor in recentVisitors" :key="visitor.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(visitor.visited_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ visitor.page_url || 'Unknown' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                        :class="getDeviceColor(visitor.device_type)"
                  >
                    {{ visitor.device_type || 'Unknown' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ visitor.browser || 'Unknown' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ visitor.country || 'Unknown' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Check admin authentication
definePageMeta({
  middleware: 'admin-auth'
})

useSeoMeta({
  title: 'Website Analytics - Aprati Food Company',
  description: 'Website visitor analytics and statistics'
})

// Reactive data
const loading = ref(true)
const stats = ref({})
const deviceStats = ref([])
const browserStats = ref([])
const popularPages = ref([])
const recentVisitors = ref([])

// Methods
const refreshData = async () => {
  try {
    loading.value = true
    await loadAnalyticsData()
  } catch (error) {
    console.error('Error refreshing analytics data:', error)
  } finally {
    loading.value = false
  }
}

const loadAnalyticsData = async () => {
  if (process.server) return
  
  const api = useApi()
  try {
    // Load analytics data in parallel using useApi
    const [statsResult, analyticsResult] = await Promise.allSettled([
      api.visitors.getStats(),
      api.visitors.getAnalytics()
    ])

    // Process stats
    if (statsResult.status === 'fulfilled' && statsResult.value.success) {
      stats.value = statsResult.value.data
    } else if (statsResult.status === 'rejected') {
      console.error('Stats fetch rejected:', statsResult.reason)
    }

    // Process analytics
    if (analyticsResult.status === 'fulfilled' && analyticsResult.value.success) {
      const data = analyticsResult.value.data
      deviceStats.value = data.device_stats || []
      browserStats.value = data.browser_stats || []
      popularPages.value = data.popular_pages || []
      recentVisitors.value = data.recent_visitors || []
    } else if (analyticsResult.status === 'rejected') {
      console.error('Analytics fetch rejected:', analyticsResult.reason)
    }

  } catch (error) {
    console.error('Error in loadAnalyticsData:', error)
  }
}

const getPercentage = (value, total) => {
  if (!total || total === 0) return 0
  return (value / total) * 100
}

const getDeviceColor = (device, isBg = false) => {
  const colors = {
    'desktop': isBg ? 'bg-blue-500' : 'bg-blue-100 text-blue-800',
    'mobile': isBg ? 'bg-green-500' : 'bg-green-100 text-green-800',
    'tablet': isBg ? 'bg-purple-500' : 'bg-purple-100 text-purple-800',
    'robot': isBg ? 'bg-red-500' : 'bg-red-100 text-red-800'
  }
  return colors[device?.toLowerCase()] || (isBg ? 'bg-gray-500' : 'bg-gray-100 text-gray-800')
}

const getBrowserColor = (browser, isBg = false) => {
  const colors = {
    'chrome': isBg ? 'bg-blue-500' : 'bg-blue-100 text-blue-800',
    'firefox': isBg ? 'bg-orange-500' : 'bg-orange-100 text-orange-800',
    'safari': isBg ? 'bg-gray-500' : 'bg-gray-100 text-gray-800',
    'edge': isBg ? 'bg-indigo-500' : 'bg-indigo-100 text-indigo-800',
    'opera': isBg ? 'bg-red-500' : 'bg-red-100 text-red-800'
  }
  return colors[browser?.toLowerCase()] || (isBg ? 'bg-gray-500' : 'bg-gray-100 text-gray-800')
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  try {
    return new Date(dateString).toLocaleString()
  } catch (error) {
    return 'Invalid Date'
  }
}

// Load data on mount
onMounted(async () => {
  if (process.server) return
  await loadAnalyticsData()
  loading.value = false
})
</script>
