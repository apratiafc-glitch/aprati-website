<template>
  <div>
    <NuxtLayout>
        <NuxtPage :key="$route?.fullPath || 'default'" /> 
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
useHead({
  titleTemplate: (title) => title ? `${title} - Aprati Foods Cambodia` : 'Aprati Foods Cambodia'
})
</script>
