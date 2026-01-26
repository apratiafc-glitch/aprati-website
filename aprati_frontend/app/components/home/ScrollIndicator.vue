<template>
  <section class="relative py-8 bg-white overflow-hidden">
    <!-- Floating Fruit Characters -->
    <div class="absolute inset-0 pointer-events-none">
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/4 left-1/6 w-20 h-20 object-contain opacity-25 animate-float" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute bottom-1/4 right-1/6 w-20 h-20 object-contain opacity-25 animate-float-delayed" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/2 left-1/4 w-16 h-16 object-contain opacity-20 animate-float" style="animation-delay: 0.7s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/3 right-1/4 w-16 h-16 object-contain opacity-22 animate-float-delayed" style="animation-delay: 1.2s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute top-1/6 right-1/3 w-14 h-14 object-contain opacity-18 animate-float" style="animation-delay: 0.4s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/6 left-1/3 w-16 h-16 object-contain opacity-20 animate-float-delayed" style="animation-delay: 1.8s;" />
    </div>
    
    <div class="flex justify-center animate-bounce">
      <div class="group relative cursor-pointer">
        <div class="flex flex-col items-center bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full shadow-2xl transform transition-all duration-500 hover:scale-110">
          <span class="relative z-10 text-white text-xs tracking-widest uppercase mb-2 font-black">🍬 Scroll Down 🍬</span>
          <svg class="relative z-10 w-6 h-6 text-white transition-transform group-hover:translate-y-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
