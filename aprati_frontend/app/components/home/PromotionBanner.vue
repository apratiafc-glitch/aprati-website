<script setup>
defineProps({
  text: {
    type: String,
    default: 'Discover our new Health-Conscious Snack Range - Sourced for Wellbeing.'
  },
  buttonText: {
    type: String,
    default: 'Learn More'
  },
  link: {
    type: String,
    default: '/brands'
  }
})
</script>

<template>
  <div class="bg-emerald-50 border-y border-emerald-100 py-3 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <transition name="fade-banner" mode="out-in">
        <div :key="text" class="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <div class="flex items-center gap-3">
            <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p class="text-sm font-medium text-emerald-900 tracking-wide">
              {{ text }}
            </p>
          </div>
          <NuxtLink 
            :to="link" 
            class="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {{ buttonText }}
          </NuxtLink>
        </div>
      </transition>
    </div>
    
    <!-- Subtle Decorative Element -->
    <div class="absolute right-0 top-0 h-full opacity-10 pointer-events-none">
      <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 50C50 20 150 80 200 50" stroke="currentColor" stroke-width="2" class="text-emerald-500" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.fade-banner-enter-active,
.fade-banner-leave-active {
  transition: all 0.5s ease;
}

.fade-banner-enter-from,
.fade-banner-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
