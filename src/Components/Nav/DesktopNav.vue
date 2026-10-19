<script lang="ts" setup>
import ButtonComponent from '@/Components/UI/ButtonComponent.vue'
import { ref } from 'vue'

const metric = defineModel<boolean>()
const showDropdown = ref(false)

function selectUnits() {
  showDropdown.value = !showDropdown.value
}

function changeUnits() {
  metric.value = !metric.value
}
</script>

<template>
  <div class="w-full flex flex-row items-center justify-between">
    <div class="basis-7/8 text-preset-5">
      <img alt="Logo" src="/images/logo.svg" />
    </div>
    <div class="relative">
      <ButtonComponent @click="selectUnits">
        <img alt="units" src="/images/icon-units.svg" />
        <div>Units</div>
        <img alt="down arrow" src="/images/icon-dropdown.svg" />
      </ButtonComponent>
      <!--    Dropdown-->
      <div
        class="px-2 py-4 flex flex-col justify-start gap-4 rounded-12 absolute right-0 top-full mt-2 w-50 bg-neutral-800"
      >
        <button class="px-2 mb-4 text-left cursor-pointer" @click="changeUnits">
          Switch to {{ !metric ? 'Metric' : 'Imperial' }}
        </button>
        <div class="flex flex-col justify-start gap-2 border-b border-b-neutral-700">
          <div class="dropdown-heading">Temperature</div>
          <div :class="metric ? 'dropdown-item-active' : 'dropdown-item-inactive'">
            Celsius (°C)
          </div>
          <div :class="metric ? 'dropdown-item-inactive' : 'dropdown-item-active'">
            Fahrenheit (°F)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
