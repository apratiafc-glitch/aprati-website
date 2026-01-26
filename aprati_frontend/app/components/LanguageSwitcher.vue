<template>
  <div class="language-switcher">
    <div class="relative inline-block">
      <button
        @click="toggleDropdown"
        class="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        :class="{ 'ring-2 ring-blue-500': isOpen }"
      >
        <span class="text-sm font-medium text-gray-700">
          {{ currentLocaleName }}
        </span>
        <svg
          class="w-4 h-4 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="isOpen"
        class="absolute z-50 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
        @click.stop
      >
        <div class="py-1">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="switchToLocale(locale.code)"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            :class="{
              'bg-blue-50 text-blue-700': locale.code === currentLocale,
              'text-gray-900': locale.code !== currentLocale
            }"
          >
            <span class="flex-1 text-left">{{ locale.name }}</span>
            <svg
              v-if="locale.code === currentLocale"
              class="w-4 h-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="ml-2">
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
    </div>
  </div>
</template>

<script setup>
// Language switcher component
const { locale, setLocale } = useI18n()

// Component state
const isOpen = ref(false)
const isLoading = ref(false)
const availableLocales = ref([
  { code: 'en', name: 'English' },
  { code: 'km', name: 'ខ្មែរ' }
])

// Computed properties
const currentLocale = computed(() => locale.value)
const currentLocaleName = computed(() => {
  const current = availableLocales.value.find(l => l.code === currentLocale.value)
  return current ? current.name : 'English'
})

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchToLocale = async (newLocale) => {
  try {
    isLoading.value = true
    setLocale(newLocale)
    isOpen.value = false
    
    // Store preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('user-locale', newLocale)
    }
    
    console.log(`Successfully switched to ${newLocale}`)
  } catch (err) {
    console.error('Language switch error:', err)
  } finally {
    isLoading.value = false
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const target = event.target
  const dropdown = target.closest('.language-switcher')
  if (!dropdown) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-switcher {
  position: relative;
}

/* Ensure dropdown appears above other content */
.language-switcher .absolute {
  z-index: 9999;
}
</style>
