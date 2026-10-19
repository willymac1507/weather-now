<script lang="ts" setup>
interface Props {
  iconUrl: string
  loading: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col grow items-center justify-between px-4 py-2.5 h-full max-w-25 rounded-xl bg-neutral-800"
  >
    <div v-if="!loading" class="text-preset-6">
      <slot name="day" />
    </div>
    <div v-if="!loading" class="w-15">
      <img :src="iconUrl" alt="icon" />
    </div>
    <div v-if="!loading" class="w-full flex flex-row justify-between text-preset-7">
      <div>
        <slot name="maxTemp" />
      </div>
      <div>
        <slot name="minTemp" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
