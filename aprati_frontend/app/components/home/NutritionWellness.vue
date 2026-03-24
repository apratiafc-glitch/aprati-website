<template>
  <section class="py-24 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Visual Content -->
        <div class="relative">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] group">
            <img 
              src="/images/luxury_snack_assortment_hero.png" 
              alt="Premium Snacks"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-corporate-dark/60 via-transparent to-transparent"></div>
            
            <!-- Floating Decorative Element -->
            <div class="absolute -bottom-6 -right-6 w-48 h-48 bg-corporate-gold/10 rounded-full blur-3xl"></div>
          </div>
          
          <!-- Secondary Image (Overlapping) -->
          <div class="absolute -bottom-12 -left-12 w-2/3 hidden lg:block">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl aspect-square border-8 border-white">
              <img 
                src="/images/luxury_health_product_innovation.png" 
                alt="Health Innovation"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Text Content -->
        <div class="lg:pl-12">
          <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-corporate-gold/10 border border-corporate-gold/20 text-corporate-gold mb-8">
            <span class="text-[10px] font-black tracking-[0.2em] uppercase">Nutrition & Wellness</span>
          </div>
          
          <h2 class="text-5xl lg:text-7xl font-black text-corporate-dark mb-8 leading-tight tracking-tighter">
            Elevating the <span class="italic text-corporate-gold">Science</span> of Snacking
          </h2>
          
          <p class="text-xl text-corporate-slate mb-10 leading-relaxed font-medium">
            At Aprati, we redefine the relationship between health and indulgence. Our curated selection of snacks and consumer health products is built on three pillars of excellence:
          </p>

          <div class="space-y-8">
            <!-- Pillar 1 -->
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-corporate-dark text-corporate-gold flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-xl font-bold text-corporate-dark mb-2">Nutritional Integrity</h3>
                <p class="text-corporate-slate">Every ingredient is rigorously selected for its biological value and purity, ensuring no compromises on health.</p>
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-corporate-gold text-white flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.642.321a6 6 0 01-3.86.517l-2.388-.477a2 2 0 00-1.022.547l-1.16 1.16a2 2 0 000 2.828l7.245 7.245a2 2 0 002.828 0l7.245-7.245a2 2 0 000-2.828l-1.16-1.16z"/>
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-xl font-bold text-corporate-dark mb-2">Artisanal Craftsmanship</h3>
                <p class="text-corporate-slate">We combine traditional methods with precision science to create flavors that satisfy as much as they nourish.</p>
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="flex items-start">
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-corporate-dark text-blue-400 flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-xl font-bold text-corporate-dark mb-2">Global Health Innovation</h3>
                <p class="text-corporate-slate">Our R&D centers work tirelessly to develop next-generation superfoods for the modern consumer.</p>
              </div>
            </div>
          </div>

          <div class="mt-12 flex gap-4">
            <NuxtLink to="/brands" class="px-8 py-4 bg-corporate-dark text-white font-black text-xs tracking-widest uppercase rounded-2xl transition-all duration-300 hover:bg-slate-800 shadow-xl shadow-corporate-dark/20 transform hover:-translate-y-1">
              Explore Snacks
            </NuxtLink>
            <NuxtLink to="/products" class="px-8 py-4 border-2 border-corporate-gold text-corporate-dark font-black text-xs tracking-widest uppercase rounded-2xl transition-all duration-300 hover:bg-corporate-gold hover:text-white transform hover:-translate-y-1">
              View All Products
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props or logic can be added here
</script>

<style scoped>
/* Scoped styles for elite health section */
</style>
