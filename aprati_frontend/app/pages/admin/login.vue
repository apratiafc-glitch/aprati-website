<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-indigo-600">Admin Portal</h1>
        <h2 class="mt-6 text-2xl font-extrabold text-gray-900">Sign in to admin panel</h2>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
        <div class="text-center py-4">
          <p class="text-gray-600">
            Please use the
            <NuxtLink to="/admin-access" class="text-indigo-600 font-semibold hover:underline">Admin Access</NuxtLink>
            page to sign in.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

// Redirect to the real admin login page
const router = useRouter()
onMounted(() => {
  router.replace('/admin-access')
})
</script>
