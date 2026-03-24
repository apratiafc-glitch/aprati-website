<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Subtle Corporate Background Patterns -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid-contact" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" stroke-width="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-contact)" />
      </svg>
    </div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-16 pt-12">
        <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-corporate-gold/10 border border-corporate-gold/20 text-corporate-gold mb-8">
          <span class="text-[10px] font-black tracking-[0.2em] uppercase">Global Outreach</span>
        </div>
        <h1 class="text-5xl lg:text-7xl font-black text-corporate-dark mb-6">Contact <span class="text-corporate-gold italic">Strategic</span> Relations</h1>
        <p class="text-xl lg:text-2xl text-corporate-slate font-medium">Professional inquiries for Aprati Food Company across the globe.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-1 gap-12">
        <!-- Contact Information -->
        <div class="space-y-8">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <svg class="w-6 h-6 text-corporate-gold mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <h3 class="font-bold text-corporate-dark uppercase tracking-wider text-sm mb-1">Address</h3>
                  <p class="text-corporate-slate">{{ getFormattedAddress }}</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="w-6 h-6 text-corporate-gold mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <h3 class="font-bold text-corporate-dark uppercase tracking-wider text-sm mb-1">Phone</h3>
                  <p class="text-corporate-slate">
                    <a :href="`tel:${getPhone}`" class="hover:text-corporate-gold transition-colors font-medium">
                      {{ getPhone }}
                    </a>
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <svg class="w-6 h-6 text-corporate-gold mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <div>
                  <h3 class="font-bold text-corporate-dark uppercase tracking-wider text-sm mb-1">Email</h3>
                  <p class="text-corporate-slate">
                    <a :href="`mailto:${getEmail}`" class="hover:text-corporate-gold transition-colors font-medium">
                      {{ getEmail }}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <!-- Social Media Links -->
            <div v-if="hasSocialLinks" class="mt-6 pt-6 border-t border-gray-200">
              <h3 class="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div class="flex space-x-4">
                <a 
                  v-if="getSocialLinks.social_facebook" 
                  :href="getSocialLinks.social_facebook" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  v-if="getSocialLinks.social_twitter" 
                  :href="getSocialLinks.social_twitter" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  v-if="getSocialLinks.social_instagram" 
                  :href="getSocialLinks.social_instagram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-red-600 hover:text-red-700 transition-colors"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.185-1.534-.456-.582-.729-1.314-.729-2.108 0-.794.273-1.526.729-2.108.737-.938 1.888-1.534 3.185-1.534s2.448.596 3.185 1.534c.456.582.729 1.314.729 2.108s-.273 1.526-.729 2.108c-.737.938-1.888 1.534-3.185 1.534z"/>
                  </svg>
                </a>
                <a 
                  v-if="getSocialLinks.social_linkedin" 
                  :href="getSocialLinks.social_linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-blue-700 hover:text-blue-800 transition-colors"
                >
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
            <div class="space-y-2">
              <div v-for="(hours, day) in contactData.businessHours" :key="day" class="flex justify-between">
                <span class="text-gray-600">{{ day }}</span>
                <span class="font-semibold">{{ hours }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { 
  contactData, 
  loading, 
  loadContactData,
  getFormattedAddress,
  getPhone, 
  getEmail,
  getSocialLinks
} = useContact()

// Check if social links exist
const hasSocialLinks = computed(() => {
  const social = getSocialLinks.value
  return social.social_facebook || social.social_twitter || social.social_instagram || social.social_linkedin
})

// Load contact data on mount
onMounted(() => {
  loadContactData()
})

// SEO
useSeoMeta({
  title: 'Contact Us - Aprati Food Company',
  description: 'Get in touch with Aprati Food Company. Contact information and business hours.'
})
</script>
