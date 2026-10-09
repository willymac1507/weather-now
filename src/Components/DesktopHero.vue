<script lang="ts" setup>
interface Props {
  iconUrl: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-row items-center gap-8 py-20 px-6 mb-8 w-full min-h-71.5 bg-[url('/images/bg-today-large.svg')] bg-cover bg-center p-4 rounded-radius-20"
  >
    <div class="flex flex-col gap-3 items-start grow">
      <div class="text-preset-4">
        <slot name="location" />
      </div>
      <div class="text-preset-6">
        <slot name="date" />
      </div>
    </div>
    <div class="h-30 w-30">
      <img :src="iconUrl" alt="conditions" />
    </div>
    <div class="text-preset-1">
      <slot name="temperature" />
    </div>
  </div>
</template>
