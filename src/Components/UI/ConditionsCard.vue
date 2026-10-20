<script lang="ts" setup></script>

<template>
  <div class="grow flex flex-col justify-between items-start p-5 bg-neutral-800 rounded-xl">
    <div class="text-preset-6">
      <slot name="heading" />
    </div>
    <div class="text-preset-3">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
