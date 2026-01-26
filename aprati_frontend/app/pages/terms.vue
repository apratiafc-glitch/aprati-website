<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div class="bg-white rounded-lg shadow-md p-8 space-y-6">
        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p class="text-gray-600">
            Welcome to Aprati Foods. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
          <p class="text-gray-600 mb-3">
            Permission is granted to temporarily download one copy of the materials (information or software) on Aprati Foods' website for personal, non-commercial transitory viewing only.
          </p>
          <p class="text-gray-600">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul class="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">3. Product Information</h2>
          <p class="text-gray-600">
            We strive to provide accurate product information. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">4. Disclaimer</h2>
          <p class="text-gray-600">
            The materials on Aprati Foods' website are provided on an 'as is' basis. Aprati Foods makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">5. Limitations</h2>
          <p class="text-gray-600">
            In no event shall Aprati Foods or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Aprati Foods' website.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">6. Revisions</h2>
          <p class="text-gray-600">
            The materials appearing on Aprati Foods' website could include technical, typographical, or photographic errors. Aprati Foods does not warrant that any of the materials on its website are accurate, complete or current. Aprati Foods may make changes to the materials contained on its website at any time without notice.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">7. Links</h2>
          <p class="text-gray-600">
            Aprati Foods has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Aprati Foods of the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">8. Modifications</h2>
          <p class="text-gray-600">
            Aprati Foods may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">9. Contact Information</h2>
          <p class="text-gray-600">
            If you have any questions about these Terms of Service, please contact us through our 
            <NuxtLink to="/contact" class="text-blue-600 hover:text-blue-800 underline">contact page</NuxtLink>.
          </p>
        </section>
      </div>

      <div class="mt-8 text-center">
        <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 underline">
          ← Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Terms of Service - Aprati Foods',
  meta: [
    {
      name: 'description',
      content: 'Terms of Service for Aprati Foods website. Read our terms and conditions for using our services.'
    }
  ]
})
</script>
