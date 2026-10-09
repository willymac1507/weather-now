<script lang="ts" setup>
import ButtonComponent from '@/Components/UI/ButtonComponent.vue'
</script>

<template>
  <div class="w-full flex flex-row items-center justify-between">
    <div class="basis-7/8 text-preset-5">
      <img alt="Logo" src="/images/logo.svg" />
    </div>
    <ButtonComponent>
      <img alt="units" src="/images/icon-units.svg" />
      <div>Units</div>
      <img alt="down arrow" src="/images/icon-dropdown.svg" />
    </ButtonComponent>
  </div>
</template>
