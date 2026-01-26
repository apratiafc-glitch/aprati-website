<template>
  <div class="min-h-screen bg-white">
    <!-- Use AppHeader Component - Removed ClientOnly for faster rendering -->
    <AppHeader />

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Use AppFooter Component -->
    <AppFooter />

    <!-- Toast Notifications -->
    <AppToast />
  </div>
</template>

<script setup>
// Default layout with AppHeader component
// Authentication state can be moved to a composable later
const isAuthenticated = ref(false)

// Logout function (placeholder)
const logout = () => {
  // Will implement actual logout logic later
  console.log('Logout clicked')
}
</script>

<style scoped>
/* Custom hover effects for dropdown */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>
