<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans transition-all duration-700 overflow-hidden relative">
    <!-- Professional Background Pattern -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div class="max-w-4xl w-full relative z-10 text-center">
      <!-- Logo Section -->
      <div class="mb-12 animate-fade-in">
        <img src="/images/Company Logo-01.png" alt="Aprati" class="h-16 mx-auto mb-4" />
        <div class="h-1 w-12 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <!-- Error Content -->
      <div class="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-12 lg:p-16 border border-slate-100 overflow-hidden relative animate-slide-up">
        <!-- Professional Accents -->
        <div class="absolute -right-24 -top-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div class="absolute -left-24 -bottom-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>

        <div class="relative z-10">
          <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black tracking-widest uppercase mb-6 border border-slate-200">
            System Integrity Alert
          </div>

          <h1 class="text-7xl sm:text-9xl font-black text-corporate-dark mb-6 tracking-tight leading-none">
            {{ error?.statusCode || '404' }}
          </h1>

          <h2 class="text-3xl sm:text-4xl font-black text-blue-600 mb-8 leading-tight">
            {{ error?.statusCode === 404 ? 'Resource Not Found' : 'Strategic System Interruption' }}
          </h2>

          <p class="text-lg sm:text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            We apologize for this unexpected technical variation. Our engineering team is focused on maintaining the high standards of our digital presence.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink 
              to="/" 
              class="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-black text-xs tracking-widest uppercase rounded-2xl transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center gap-3"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Standard Recovery (Home)
            </NuxtLink>
            
            <button 
              @click="goBack"
              class="w-full sm:w-auto px-10 py-4 bg-white text-corporate-dark font-black text-xs tracking-widest uppercase rounded-2xl border-2 border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center gap-3"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Maintain Context (Back)
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Branding -->
      <div class="mt-12 opacity-50">
        <p class="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">
          Aprati Food • Global Health Consumer Industry Excellence
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})

const goBack = () => {
  if (process.client && window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/')
  }
}

useSeoMeta({
  title: 'System Alert - Aprati Foods',
  description: 'Our team is addressing a strategic system variation. Thank you for your patience.'
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1.5s ease-out forwards;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slide-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
