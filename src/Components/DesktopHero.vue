<script lang="ts" setup>
import LoadingDots from '@/Components/UI/LoadingDots.vue'

interface Props {
  iconUrl: string
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    :class="loading ? 'bg-neutral-800' : 'bg-hero'"
    class="py-20 px-6 mb-8 w-full min-h-71.5 bg-cover bg-center p-4 rounded-20"
  >
    <div v-if="loading" class="flex flex-col justify-center items-center h-full">
      <LoadingDots />
      <p>Loading...</p>
    </div>

    <div class="flex flex-row items-center gap-8">
      <div v-if="!loading" class="flex flex-col gap-3 items-start grow">
        <div class="text-preset-4">
          <slot name="location" />
        </div>
        <div class="text-preset-6">
          <slot name="date" />
        </div>
      </div>
      <div v-if="!loading" class="h-30 w-30">
        <img :src="iconUrl" alt="conditions" />
      </div>
      <div v-if="!loading" class="text-preset-1">
        <slot name="temperature" />
      </div>
    </div>
  </div>
</template>
