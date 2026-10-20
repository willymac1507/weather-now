<script lang="ts" setup>
import MainNav from '@/Components/Nav/MainNav.vue'
import HeaderLayout from '@/Layouts/HeaderLayout.vue'
import ContentLayout from '@/Layouts/ContentLayout.vue'
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
  <div class="w-screen min-h-screen p-6 lg:px-28 lg:py-12 bg-neutral-900 text-neutral-0">
    <MainNav v-model="metric" />
    <HeaderLayout v-if="!hasError" />
    <Suspense>
      <ContentLayout v-if="!hasError" :metric="metric" @error="alertError" />
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
