<template>
  <div class="min-h-screen bg-gray-50 relative overflow-hidden">
    <!-- Animated Fruit Characters -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/6 left-1/6 w-20 h-20 object-contain opacity-15 animate-float" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/4 right-1/6 w-20 h-20 object-contain opacity-20 animate-float-delayed" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-1/3 right-1/4 w-16 h-16 object-contain opacity-15 animate-float" style="animation-delay: 0.5s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-1/3 left-1/4 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="animation-delay: 1s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-1/6 right-1/6 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 1.5s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/6 left-1/3 w-16 h-16 object-contain opacity-16 animate-float-delayed" style="animation-delay: 2s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-2/3 right-1/5 w-14 h-14 object-contain opacity-14 animate-float" style="animation-delay: 0.8s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-2/5 left-1/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 1.3s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-2/5 left-2/5 w-20 h-20 object-contain opacity-13 animate-float" style="animation-delay: 1.7s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-3/5 right-2/5 w-14 h-14 object-contain opacity-11 animate-float-delayed" style="animation-delay: 0.4s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-4/5 left-1/4 w-16 h-16 object-contain opacity-19 animate-float" style="animation-delay: 2.1s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-4/5 right-1/4 w-20 h-20 object-contain opacity-16 animate-float-delayed" style="animation-delay: 0.9s;" />
      <img src="/images/Grape Character.png" alt="" class="absolute top-1/5 left-3/5 w-14 h-14 object-contain opacity-12 animate-float" style="animation-delay: 1.4s;" />
      <img src="/images/Orange Charactor.png" alt="" class="absolute bottom-1/5 right-3/5 w-16 h-16 object-contain opacity-18 animate-float-delayed" style="animation-delay: 0.6s;" />
      <img src="/images/Guava Charactor.png" alt="" class="absolute top-3/5 left-1/8 w-20 h-20 object-contain opacity-14 animate-float" style="animation-delay: 2.3s;" />
      <img src="/images/Plum CHARACTER.png" alt="" class="absolute bottom-3/4 right-1/8 w-16 h-16 object-contain opacity-15 animate-float-delayed" style="animation-delay: 1.1s;" />
      <img src="/images/Pineapple Character copy.png" alt="" class="absolute top-1/8 left-4/5 w-14 h-14 object-contain opacity-13 animate-float" style="animation-delay: 0.2s;" />
      <img src="/images/Tamarin Character.png" alt="" class="absolute bottom-1/8 right-4/5 w-16 h-16 object-contain opacity-17 animate-float-delayed" style="animation-delay: 1.6s;" />
    </div>
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            {{ currentLanguage === 'km' ? 'គោលការណ៍ភាពឯកជន' : 'Privacy Policy' }}
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            {{ currentLanguage === 'km' 
              ? 'ភាពឯកជនរបស់អ្នកមានសារៈសំខាន់សម្រាប់យើង។ គោលការណ៍នេះពន្យល់អំពីរបៀបដែលយើងប្រមូល ប្រើប្រាស់ និងការពារព័ត៌មានរបស់អ្នក។'
              : 'Your privacy is important to us. This policy explains how we collect, use, and protect your information.'
            }}
          </p>

          <!-- Language Selector -->
          <div class="mt-6 flex justify-center space-x-4">
            <button 
              @click="switchLanguage('en')"
              :class="currentLanguage === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
            >
              English
            </button>
            <button 
              @click="switchLanguage('km')"
              :class="currentLanguage === 'km' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
            >
              ខ្មែរ (Khmer)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-lg shadow-lg p-8 space-y-8">
        
        

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Loading privacy policy...</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {{ error }}
        </div>

        <!-- Dynamic Sections -->
        <section v-for="section in sections" :key="section.id">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ section.title }}</h2>
          <div class="prose prose-gray max-w-none">
            <div class="text-gray-700 whitespace-pre-line" v-html="formatContent(section.content)"></div>
          </div>
        </section>

        <!-- Default Content if no sections -->
        <div v-if="!loading && !error && sections.length === 0">
          <!-- Information We Collect -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li>Create an account or register for our services</li>
                <li>Apply for a position through our careers page</li>
                <li>Contact us for customer support</li>
                <li>Subscribe to our newsletter or promotional communications</li>
                <li>Participate in surveys or feedback forms</li>
              </ul>
            </div>
          </section>

          <!-- How We Use Your Information -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process job applications and recruitment activities</li>
                <li>Send you technical notices and security alerts</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze usage patterns and trends</li>
              </ul>
            </div>
          </section>

          <!-- Information Sharing -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With trusted service providers who assist in our operations</li>
              </ul>
            </div>
          </section>

          <!-- Data Security -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure.
              </p>
            </div>
          </section>

          <!-- Your Rights -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </div>
          </section>

          <!-- Cookies -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
              </p>
            </div>
          </section>

          <!-- Contact -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-700">
                  <strong>Aprati Foods Cambodia</strong><br>
                  Email: privacy@aprati.com<br>
                  Phone: +855 23 xxx xxx<br>
                  Address: Phnom Penh, Cambodia
                </p>
              </div>
            </div>
          </section>
        </div>

        <!-- Back to Site -->
        <div class="pt-8 border-t">
          <NuxtLink 
            to="/" 
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Website
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// State
const sections = ref([])
const loading = ref(true)
const error = ref(null)
const currentLanguage = ref('en')

// Get API instance
const api = useApi()

// Methods
const switchLanguage = (lang) => {
  currentLanguage.value = lang
  loadSections()
}

const loadSections = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await api.privacyContent.getAll()
    
    if (response.success && response.data) {
      // Filter by language and active status, then sort by order
      sections.value = response.data
        .filter(section => section.is_active && (section.language === currentLanguage.value || !section.language))
        .sort((a, b) => a.sort_order - b.sort_order)
    } else {
      sections.value = []
    }
  } catch (err) {
    console.error('Error loading privacy sections:', err)
    error.value = 'Failed to load privacy policy content.'
    sections.value = []
  } finally {
    loading.value = false
  }
}

const formatContent = (content) => {
  // Simple formatting: convert line breaks to <br> and handle basic lists
  return content
    .replace(/\n/g, '<br>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
}

const lastUpdated = computed(() => {
  if (sections.value.length > 0) {
    const latest = sections.value.reduce((latest, section) => {
      return new Date(section.updated_at) > new Date(latest.updated_at) ? section : latest
    })
    return new Date(latest.updated_at).toLocaleDateString()
  }
  return new Date().toLocaleDateString()
})

// Lifecycle
onMounted(() => {
  loadSections()
})

// Page meta
useSeoMeta({
  title: 'Privacy Policy - Aprati Foods Cambodia',
  description: 'Privacy policy for Aprati Foods Cambodia. Learn how we collect, use, and protect your personal information.',
  ogTitle: 'Privacy Policy - Aprati Foods Cambodia',
  ogDescription: 'Privacy policy for Aprati Foods Cambodia. Learn how we collect, use, and protect your personal information.',
  ogType: 'website'
})

// Page layout
definePageMeta({
  layout: 'default'
})
</script>
