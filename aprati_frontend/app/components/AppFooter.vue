<template>
  <footer class="bg-black text-white py-16 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <!-- Brand / About -->
        <div class="md:col-span-1 text-center md:text-left">
           <img 
             v-if="appFooterSettings.footer_logo || adminProfileImage"
             :src="appFooterSettings.footer_logo ? getImageUrl(appFooterSettings.footer_logo) : (adminProfileImage ? getProfileImageUrl(adminProfileImage) : '/images/logo-footer.png')" 
             alt="Aprati Foods" 
             class="h-12 w-auto mb-6 opacity-90 hover:opacity-100 transition-opacity mx-auto md:mx-0"
           />
           <h3 v-else class="text-2xl font-display font-bold uppercase mb-6">Aprati Foods</h3>
           
           <p class="text-gray-400 text-sm leading-relaxed mb-6">
             {{ appFooterSettings.footer_description || 'Enhanced introduction website with advanced product search, career management, and comprehensive inventory system.' }}
           </p>
           
           <div class="flex space-x-4 justify-center md:justify-start">
             <a v-if="appFooterSettings.social_links?.facebook" :href="appFooterSettings.social_links.facebook" target="_blank" class="text-gray-400 hover:text-white transition-colors">
               <span class="sr-only">Facebook</span>
               <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
             </a>
             <!-- Additional social icons simplified -->
           </div>
        </div>
        
        <!-- Quick Links -->
        <div class="text-center md:text-left">
          <h4 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 font-display">Company</h4>
          <ul class="space-y-3">
            <li><NuxtLink to="/about" class="text-gray-300 hover:text-orange-500 transition-colors text-sm font-medium">About</NuxtLink></li>
            <li><NuxtLink to="/careers" class="text-gray-300 hover:text-green-600 transition-colors text-sm font-medium">Careers</NuxtLink></li>
            <li><NuxtLink to="/management" class="text-gray-300 hover:text-blue-600 transition-colors text-sm font-medium">Management</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-gray-300 hover:text-red-500 transition-colors text-sm font-medium">Contact</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Products -->
        <div class="text-center md:text-left">
           <h4 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 font-display">Brands</h4>
           <ul class="space-y-3">
             <li v-for="brand in dynamicBrands.slice(0, 5)" :key="brand.id">
               <NuxtLink :to="`/brands/${brand.slug}`" class="text-gray-300 hover:text-orange-500 transition-colors text-sm font-medium">{{ brand.name }}</NuxtLink>
             </li>
           </ul>
        </div>
        
        <!-- Legal / Contact -->
        <div class="text-center md:text-left">
          <h4 class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 font-display">Legal</h4>
          <ul class="space-y-3">
             <li><NuxtLink to="/privacy" class="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</NuxtLink></li>
             <li><NuxtLink to="/terms" class="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</NuxtLink></li>
             <li><span class="text-gray-500 text-sm">© {{ new Date().getFullYear() }} Aprati Foods. All rights reserved</span></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const appFooterSettings = useState('footer-settings', () => ({}))
const dynamicBrands = useState('footer-brands', () => [])
const adminProfileImage = useState('footer-profile-image', () => null)

onMounted(async () => {
  // Only fetch if we don't have data
  if (Object.keys(appFooterSettings.value).length > 0 && dynamicBrands.value.length > 0) {
    return
  }

  // Load settings and brands
  try {
     const api = useApi()
     const [settingsRes, brandsRes, adminRes] = await Promise.all([
       api.request('/footer-settings').catch(() => ({})),
       api.request('/brands').catch(() => ({})),
       api.request('/admin-profile-image').catch(() => ({}))
     ])
     
     if (settingsRes.success) appFooterSettings.value = settingsRes.data || {}
     if (brandsRes.success && brandsRes.data?.brands) dynamicBrands.value = brandsRes.data.brands.filter(brand => brand.is_active)
     else if (brandsRes.status === 'success' && brandsRes.data?.brands) dynamicBrands.value = brandsRes.data.brands.filter(brand => brand.is_active)
     if (adminRes.success && adminRes.data?.profile_image) adminProfileImage.value = adminRes.data.profile_image

  } catch (e) { console.error(e) }
})

// Helpers
const getImageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `https://sdev.apratifoods.asia${path}` 
}

const getProfileImageUrl = (path) => getImageUrl(path)
</script>
