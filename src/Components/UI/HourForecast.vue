<script lang="ts" setup>
interface Props {
  iconUrl: string
  time: number
  temp: number
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-row bg-neutral-700 border border-neutral-600 w-full h-15 rounded-8 pl-3 pr-4 py-2.5 justify-between items-center gap-2"
  >
    <img :src="iconUrl" alt="Weather Icon" class="h-full" />
    <div class="grow text-preset-5m">{{ time }}:00</div>
    <div class="text-preset-7">20°</div>
  </div>
</template>

<style scoped></style>
