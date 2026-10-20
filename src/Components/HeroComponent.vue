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
    class="py-20 px-6 mb-8 lg:mb-0 w-full min-h-71.5 bg-cover bg-center p-4 rounded-20"
  >
    <div v-if="loading" class="flex flex-col justify-between items-center h-full">
      <LoadingDots />
      <p>Loading...</p>
    </div>

    <div
      class="flex flex-row justify-center sm:justify-between items-center gap-8 flex-wrap md:flex-nowrap"
    >
      <div v-if="!loading" class="flex flex-col gap-3 items-center sm:items-start">
        <div class="text-preset-4">
          <slot name="location" />
        </div>
        <div class="text-preset-6">
          <slot name="date" />
        </div>
      </div>
      <div
        v-if="!loading"
        class="flex flex-row justify-center sm:justify-end grow items-center gap-8"
      >
        <img :src="iconUrl" alt="conditions" class="max-h-30 max-w-30 shrink" />
        <div class="max-xs:text-preset-2 text-preset-1 font-italic!">
          <slot name="temperature" />
        </div>
      </div>
    </div>
  </div>
</template>
