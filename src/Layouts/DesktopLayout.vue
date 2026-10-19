<script lang="ts" setup>
import DesktopNav from '@/Components/Nav/DesktopNav.vue'
import DesktopHeader from '@/Layouts/DesktopHeader.vue'
import DesktopContent from '@/Layouts/DesktopContent.vue'
import { ref } from 'vue'
import ButtonComponent from '@/Components/UI/ButtonComponent.vue'

const hasError = ref(false)
const metric = ref(true)

function alertError() {
  hasError.value = true
}
function refreshPage() {
  location.reload()
}
</script>

<template>
  <div class="w-screen h-280 px-28 py-12 bg-neutral-900 text-neutral-0">
    <DesktopNav v-model="metric" />
    <DesktopHeader v-if="!hasError" />
    <Suspense>
      <DesktopContent v-if="!hasError" :metric="metric" @error="alertError" />
    </Suspense>
    <div v-if="hasError" class="flex flex-col justify-center items-center w-full mt-8 gap-6">
      <div><img alt="Error" class="w-13 h-13" src="/images/icon-error.svg" /></div>
      <h1 class="text-center text-preset-2 font-cursive">Something went wrong</h1>
      <p class="text-center text-preset-5 max-w-md">
        We couldn't connect to the server (API Error). Please try again in a few moments.
      </p>
      <ButtonComponent class="w-40 h-12" @click="refreshPage">
        <div class="flex flex-row justify-center items-center w-full gap-2">
          <img alt="retry" src="/images/icon-retry.svg" />
          <span>retry</span>
        </div>
      </ButtonComponent>
    </div>
  </div>
</template>

<style scoped></style>
