<template>
  <header 
    class="fixed w-full top-0 z-50 transition-all duration-300"
    :class="{ 
      'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 backdrop-blur-md shadow-2xl shadow-blue-500/50': isScrolled, 
      'bg-gradient-to-br from-blue-500/98 via-blue-600/98 to-indigo-700/98 backdrop-blur-sm shadow-lg shadow-blue-400/30': !isScrolled 
    }"
  >
    <!-- Top accent stripe -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 shadow-sm shadow-blue-400/50"></div>
    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 opacity-60"></div>
    
    <!-- Subtle glow overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none"></div>
    
    <!-- Floating Fruit Characters -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img src="/images/Grape Character.png" alt="" class="absolute w-8 h-8 object-contain opacity-15 animate-float" style="left: 5%; top: 20%;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute w-8 h-8 object-contain opacity-15 animate-float-delayed" style="left: 15%; top: 60%; animation-delay: 1s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute w-6 h-6 object-contain opacity-12 animate-float" style="left: 25%; top: 30%; animation-delay: 0.5s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute w-7 h-7 object-contain opacity-14 animate-float-delayed" style="left: 35%; top: 70%; animation-delay: 1.5s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute w-6 h-6 object-contain opacity-10 animate-float" style="left: 45%; top: 25%; animation-delay: 2s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute w-7 h-7 object-contain opacity-13 animate-float-delayed" style="left: 55%; top: 65%; animation-delay: 0.8s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute w-6 h-6 object-contain opacity-11 animate-float" style="left: 65%; top: 35%; animation-delay: 1.2s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute w-8 h-8 object-contain opacity-15 animate-float-delayed" style="left: 75%; top: 50%; animation-delay: 1.8s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute w-7 h-7 object-contain opacity-12 animate-float" style="left: 85%; top: 40%; animation-delay: 0.3s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute w-6 h-6 object-contain opacity-10 animate-float-delayed" style="left: 95%; top: 55%; animation-delay: 2.2s;" />
    </div>
    
    <nav class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 sm:h-20 md:h-24">
        <!-- Logo with Cambodia Flag -->
        <div class="flex items-center gap-2 sm:gap-3 md:gap-4">
          <NuxtLink to="/" class="flex items-center space-x-2 sm:space-x-3 md:space-x-4 group">
            <!-- Cambodia Flag -->
            <div class="relative">
              <div class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg overflow-hidden shadow-md transform transition-all duration-300 group-hover:scale-105 border-2 border-gray-100">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg" 
                  alt="Cambodia Flag" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <!-- Company Logo -->
            <div class="relative">
              <div class="relative transition-all duration-300 group-hover:scale-105">
                <img 
                  v-if="adminProfileImage || headerSettings.branding?.header_logo"
                  :src="adminProfileImage ? getProfileImageUrl(adminProfileImage) : getImageUrl(headerSettings.branding.header_logo)" 
                  alt="Aprati Foods" 
                  class="h-10 sm:h-14 md:h-16 lg:h-20 w-auto transition-all duration-300"
                  loading="eager"
                  @error="handleLogoError"
                  ref="headerLogo"
                >
                <img 
                  v-else
                  src="/images/logo-white.png" 
                  alt="Aprati Foods" 
                  class="h-10 sm:h-14 md:h-16 lg:h-20 w-auto transition-all duration-300"
                  loading="eager"
                  @error="(e) => e.target.src = '/images/Company Logo-01.png'"
                >
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-2">
          <NuxtLink 
            to="/" 
            class="px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 rounded-lg"
            :class="isHomePage 
              ? 'bg-white text-blue-600 shadow-md' 
              : 'text-white hover:bg-white/10'"
          >
            Home
          </NuxtLink>
          
          <NuxtLink 
            to="/management" 
            class="px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 rounded-lg"
            :class="isManagementPage 
              ? 'bg-white text-blue-600 shadow-md' 
              : 'text-white hover:bg-white/10'"
          >
            Management
          </NuxtLink>
          
          <!-- Our Brands Dropdown -->
          <div class="relative group" 
               @mouseenter="desktopBrandsOpen = true" 
               @mouseleave="desktopBrandsOpen = false"
               @touchstart.passive="desktopBrandsOpen = true">
            <button 
              @click="desktopBrandsOpen = !desktopBrandsOpen"
              @touchend.prevent="desktopBrandsOpen = !desktopBrandsOpen"
              class="px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 flex items-center gap-1 rounded-lg active:bg-white/20"
              :class="isBrandsPage 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-white hover:bg-white/10'"
            >
              Our Brands
              <ChevronDownIcon class="w-4 h-4 transition-transform duration-200" :class="desktopBrandsOpen ? 'rotate-180' : ''" />
            </button>
            
            <!-- Dropdown Menu -->
            <Transition name="dropdown">
              <div v-if="desktopBrandsOpen" class="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-50 border border-gray-100 overflow-hidden">
                <div class="py-2">
                  <ClientOnly>
                    <div v-if="brandsLoading" class="px-4 py-3 text-sm text-gray-500">
                      Loading...
                    </div>
                    
                    <template v-else-if="brands.length > 0">
                      <NuxtLink 
                        v-for="brand in brands.filter(b => b && b.slug)" 
                        :key="brand.id"
                        :to="`/brands/${brand.slug}`" 
                        class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200"
                      >
                        <div class="w-3 h-3 rounded-full mr-3" :class="getBrandColorClass(brand.slug)"></div>
                        <span class="font-medium">{{ brand.name }}</span>
                      </NuxtLink>
                    </template>
                  </ClientOnly>
                </div>
              </div>
            </Transition>
          </div>
          
          <NuxtLink 
            to="/careers" 
            class="px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 rounded-lg"
            :class="isCareersPage 
              ? 'bg-white text-blue-600 shadow-md' 
              : 'text-white hover:bg-white/10'"
          >
            Careers
          </NuxtLink>
          
          <NuxtLink 
            to="/about" 
            class="px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 rounded-lg"
            :class="isAboutPage 
              ? 'bg-white text-blue-600 shadow-md' 
              : 'text-white hover:bg-white/10'"
          >
            About
          </NuxtLink>
          
          <!-- Search Button -->
          <div class="ml-2 pl-2 border-l border-white/20">
             <button 
               @click="toggleSearch"
               class="p-2.5 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
               aria-label="Search"
             >
               <MagnifyingGlassIcon class="w-5 h-5" />
             </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center gap-2">
          <!-- Mobile Search Button -->
          <button 
            @click="toggleSearch"
            class="text-white p-2 hover:bg-white/10 active:bg-white/20 rounded-lg transition-all duration-200"
            aria-label="Search"
          >
            <MagnifyingGlassIcon class="w-6 h-6" />
          </button>
          
          <!-- Hamburger Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-white p-2 hover:bg-white/10 active:bg-white/20 rounded-lg transition-all duration-200"
            aria-label="Menu"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Search Overlay -->
    <div v-show="isSearchOpen" class="absolute top-0 left-0 w-full h-16 sm:h-20 md:h-24 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 border-b border-white/20 flex items-center px-4 z-50 transition-all duration-200"
         :class="isSearchOpen ? 'opacity-100' : 'opacity-0'">
      <div class="max-w-4xl mx-auto w-full relative">
        <MagnifyingGlassIcon class="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
        <input 
          ref="searchInputRef"
          v-model="searchQuery"
          type="text" 
          placeholder="Search products, brands..." 
          class="w-full border-0 border-b-2 border-white/30 text-white text-lg placeholder-white/60 focus:border-white focus:ring-0 py-3 pl-8 pr-12 bg-white/10 backdrop-blur-sm rounded-t-lg"
          @keyup.enter="performSearch"
        >
        <button @click="toggleSearch" class="absolute right-0 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation -->
  <Transition name="slide-down">
    <div v-if="mobileMenuOpen" class="fixed left-0 right-0 top-[64px] sm:top-[80px] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 z-[60] md:hidden max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl">
        <div class="px-4 py-4 space-y-1">
          <div class="space-y-1">
          <NuxtLink 
            to="/" 
            class="block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
            :class="isHomePage ? 'bg-white text-blue-600' : 'text-white hover:bg-white/10'"
            @click="mobileMenuOpen = false"
          >
            HOME
          </NuxtLink>
          <NuxtLink 
            to="/management" 
            class="block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
            :class="isManagementPage ? 'bg-white text-blue-600' : 'text-white hover:bg-white/10'"
            @click="mobileMenuOpen = false"
          >
            Management
          </NuxtLink>
          
          <!-- Mobile Brands -->
          <div class="py-2">
            <button 
              @click="mobileBrandsOpen = !mobileBrandsOpen"
              class="w-full flex items-center justify-between px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
              :class="mobileBrandsOpen ? 'bg-white/10 text-white' : 'text-white hover:bg-white/10'"
            >
              <span>OUR BRANDS</span>
              <ChevronDownIcon class="w-5 h-5 transition-transform duration-200" :class="mobileBrandsOpen ? 'rotate-180' : ''" />
            </button>
            
            <Transition name="slide-down">
              <div v-if="mobileBrandsOpen" class="mt-1 space-y-1 pl-2">
                <ClientOnly>
                  <div v-if="brandsLoading" class="px-4 py-2 text-white/60 text-sm">Loading...</div>
                  
                  <template v-else-if="brands.length > 0">
                    <NuxtLink 
                      v-for="brand in brands.filter(b => b && b.slug)"
                      :key="brand.id"
                      :to="`/brands/${brand.slug}`" 
                      class="flex items-center px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                      @click="mobileMenuOpen = false; mobileBrandsOpen = false"
                    >
                      <div class="w-2 h-2 rounded-full mr-3" :class="getBrandColorClass(brand.slug)"></div>
                      {{ brand.name }}
                    </NuxtLink>
                  </template>
                </ClientOnly>
              </div>
            </Transition>
          </div>
          
          <NuxtLink 
            to="/careers" 
            class="block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
            :class="isCareersPage ? 'bg-white text-blue-600' : 'text-white hover:bg-white/10'"
            @click="mobileMenuOpen = false"
          >
            Careers
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="block px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200"
            :class="isAboutPage ? 'bg-white text-blue-600' : 'text-white hover:bg-white/10'"
            @click="mobileMenuOpen = false"
          >
            About Us
          </NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { 
  ChevronDownIcon, 
  MagnifyingGlassIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

// Reactive data
const mobileMenuOpen = ref(false)
const mobileBrandsOpen = ref(false)
const desktopBrandsOpen = ref(false)
const searchQuery = ref('')
const brands = ref([])
const brandsLoading = ref(true)
const headerSettings = ref({})
const adminProfileImage = ref(null)
const isScrolled = ref(false)
const isSearchOpen = ref(false)
const searchInputRef = ref(null)

// Scroll Handler
const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 20
  }
}

// Search Toggle
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    setTimeout(() => searchInputRef.value?.focus(), 100)
  }
}

// Load header settings from API
const loadHeaderSettings = async () => {
  try {
    const api = useApi()
    const response = await api.request('/header-settings', {
      timeout: 3000 // 3 second timeout
    })
    
    if ((response.success && response.data) || (response.status === 'success' && response.data)) {
      headerSettings.value = response.data
    } else {
      headerSettings.value = {}
    }
  } catch (error) {
    // Silent fail - don't block header rendering
    headerSettings.value = {}
  }
}

// Load brands from API
const loadBrands = async () => {
  try {
    brandsLoading.value = true
    const api = useApi()
    const response = await api.request('/brands', {
      timeout: 3000 // 3 second timeout
    })
    
    if (response.success && response.data && response.data.brands) {
      brands.value = response.data.brands.filter(brand => brand.is_active)
    } else if (response.status === 'success' && response.data && response.data.brands) {
      brands.value = response.data.brands.filter(brand => brand.is_active)
    } else {
      brands.value = []
    }
  } catch (error) {
    console.error('Failed to load brands in header:', error)
    brands.value = []
  } finally {
    brandsLoading.value = false
  }
}

// Get brand color class based on slug
const getBrandColorClass = (slug) => {
  const colorClasses = {
    'aprati': 'bg-blue-500',
    'frutati': 'bg-green-500',
    'mocati': 'bg-orange-500'
  }
  const defaultColors = ['bg-purple-500', 'bg-pink-500', 'bg-indigo-500']
  return colorClasses[slug] || defaultColors[0]
}

// Helper function to get image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/logo-white.png' // Default fallback
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.apiBaseUrl || 'https://sdev.apratifoods.asia'
  
  if (imagePath.startsWith('/images/') || imagePath.startsWith('/storage/')) {
    return `${baseUrl}${imagePath}`
  } else if (imagePath.startsWith('storage/')) {
    return `${baseUrl}/${imagePath}`
  } else {
    return `${baseUrl}/storage/${imagePath}`
  }
}

// Helper function for profile images
const getProfileImageUrl = (imagePath) => {
  if (!imagePath) return '/images/logo-white.png' // Default fallback
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.apiBaseUrl || 'https://sdev.apratifoods.asia'
  return imagePath.startsWith('/storage/') ? `${baseUrl}${imagePath}` : `${baseUrl}/storage/${imagePath}`
}

// Load admin profile image for logo
const loadAdminProfileImage = async () => {
  try {
    const api = useApi()
    const response = await api.request('/admin-profile-image')
    
    if ((response.success && response.data) || (response.status === 'success' && response.data)) {
      const adminData = response.data
      if (adminData && adminData.profile_image) {
        adminProfileImage.value = adminData.profile_image
      }
    }
  } catch (error) {
    adminProfileImage.value = null
  }
}

// Handle logo image error - fallback to default logo
const handleLogoError = (event) => {
  console.warn('Logo load failed, using fallback')
  if (event.target) {
    event.target.src = '/images/logo-white.png'
    // If that also fails, try Company Logo
    event.target.onerror = () => {
      event.target.src = '/images/Company Logo-01.png'
    }
  }
}

// Load data on component mount - Load all in parallel for faster performance
onMounted(async () => {
  // Load all API calls in parallel instead of sequential
  await Promise.all([
    loadHeaderSettings(),
    loadBrands(),
    loadAdminProfileImage()
  ])
  
  if (process.client) {
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})

// Safe route access - always call useRoute() for Nuxt composables
const route = useRoute()
const isHomePage = computed(() => {
  try {
    return route.path === '/'
  } catch {
    return false
  }
})
const isManagementPage = computed(() => {
  try {
    return route.path?.startsWith('/management')
  } catch {
    return false
  }
})
const isBrandsPage = computed(() => {
  try {
    return route.path?.startsWith('/brands')
  } catch {
    return false
  }
})
const isProductsPage = computed(() => {
  try {
    return route.path?.startsWith('/products')
  } catch {
    return false
  }
})
const isCareersPage = computed(() => {
  try {
    return route.path?.startsWith('/careers')
  } catch {
    return false
  }
})
const isAboutPage = computed(() => {
  try {
    return route.path === '/about'
  } catch {
    return false
  }
})

// Search functionality
const performSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
    searchQuery.value = ''
    isSearchOpen.value = false
  }
}

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false
  mobileBrandsOpen.value = false
  isSearchOpen.value = false
}, { immediate: false })

// Reset brands dropdown when mobile menu closes
watch(mobileMenuOpen, (newValue) => {
  if (!newValue) {
    mobileBrandsOpen.value = false
  }
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  25% {
    transform: translateY(-15px) translateX(8px);
  }
  50% {
    transform: translateY(-10px) translateX(-8px);
  }
  75% {
    transform: translateY(-20px) translateX(5px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 8s ease-in-out infinite;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
