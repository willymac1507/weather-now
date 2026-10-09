<script lang="ts" setup>
import DesktopNav from '@/Components/Nav/DesktopNav.vue'
import DesktopHeader from '@/Layouts/DesktopHeader.vue'
import DesktopContent from '@/Layouts/DesktopContent.vue'
</script>

<template>
  <div class="w-screen h-280 px-28 py-12 bg-neutral-900 text-neutral-0">
    <DesktopNav />
    <DesktopHeader />
    <DesktopContent />
  </div>
</template>

<style scoped></style>
