<template>
  <footer class="bg-black text-white py-16 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <!-- Brand / About -->
        <div class="md:col-span-1 text-center md:text-left">
           <img 
             v-show="!imageError"
             :src="appFooterSettings.footer_logo ? getImageUrl(appFooterSettings.footer_logo) : '/images/Company Logo-01.png'" 
             alt="Aprati Foods" 
             class="h-12 w-auto mb-6 opacity-90 hover:opacity-100 transition-opacity mx-auto md:mx-0 object-contain"
             @error="handleImageError"
           />
           <h3 v-if="imageError" class="text-2xl font-display font-bold uppercase mb-6">Aprati Foods</h3>
           
           <p class="text-gray-400 text-sm leading-relaxed mb-6">
             {{ appFooterSettings.footer_description || 'Premium Quality Food Products - Bringing authentic taste to your table.' }}
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
             <li><span class="text-gray-500 text-sm">© {{ new Date().getFullYear() }} Aprati Foods (Cambodia) Ltd. All rights reserved</span></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const appFooterSettings = useState('footer-settings', () => ({}))
const dynamicBrands = useState('brands-list', () => [])
const adminProfileImage = useState('admin-profile-image', () => null)
const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}

onMounted(async () => {
  // Check what data we already have
  const needsSettings = Object.keys(appFooterSettings.value).length === 0
  const needsBrands = dynamicBrands.value.length === 0
  const needsAdmin = adminProfileImage.value === null

  if (!needsSettings && !needsBrands && !needsAdmin) {
    return
  }

  // Load settings and brands
  try {
     const api = useApi()
     const requests = []
     
     if (needsSettings) requests.push(api.request('/footer-settings').catch(() => ({})))
     else requests.push(Promise.resolve({}))

     if (needsBrands) requests.push(api.request('/brands').catch(() => ({})))
     else requests.push(Promise.resolve({}))

     if (needsAdmin) requests.push(api.request('/admin-profile-image').catch(() => ({})))
     else requests.push(Promise.resolve({}))

     const [settingsRes, brandsRes, adminRes] = await Promise.all(requests)
     
     if (needsSettings && settingsRes.success) appFooterSettings.value = settingsRes.data || {}
     
     if (needsBrands) {
       if (brandsRes.success && brandsRes.data?.brands) dynamicBrands.value = brandsRes.data.brands.filter(brand => brand.is_active)
       else if (brandsRes.status === 'success' && brandsRes.data?.brands) dynamicBrands.value = brandsRes.data.brands.filter(brand => brand.is_active)
     }
     
     if (needsAdmin && adminRes.success && adminRes.data?.profile_image) adminProfileImage.value = adminRes.data.profile_image

  } catch (e) { console.error(e) }
})

// Helpers
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('data:')) return imagePath
  if (imagePath.startsWith('http')) return imagePath
  
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = (runtimeConfig.public?.apiBaseUrl || 'https://sdev.apratifoods.asia').replace(/\/$/, '')
  
  // Local frontend assets
  if (imagePath.startsWith('/images/')) {
    return imagePath
  }
  
  // Backend storage assets
  if (imagePath.startsWith('/storage/')) {
    return `${baseUrl}${imagePath}`
  } else if (imagePath.startsWith('storage/')) {
    return `${baseUrl}/${imagePath}`
  } else {
    // If it's a relative path from DB without storage prefix
    return `${baseUrl}/storage/${imagePath}`
  }
}

const getProfileImageUrl = (path) => getImageUrl(path)
</script>
