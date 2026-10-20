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
  setTimeout(() => {
    showDropdown.value = false
  }, 500)
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
        <img
          :class="showDropdown ? 'rotate-180' : ''"
          alt="down arrow"
          src="/images/icon-dropdown.svg"
        />
      </ButtonComponent>
      <!--    Dropdown-->
      <transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        name="fade"
      >
        <div
          v-if="showDropdown"
          class="z-10 px-2 pb-4 pt-2 flex flex-col justify-start gap-4 rounded-12 absolute right-0 top-full mt-2 w-50 bg-neutral-800"
        >
          <button
            class="hover:bg-neutral-700 rounded-8 px-2 py-2.5 mb-4 text-left cursor-pointer"
            @click="changeUnits"
          >
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
          <div class="flex flex-col justify-start gap-2 border-b border-b-neutral-700">
            <div class="dropdown-heading">Wind Speed</div>
            <div :class="metric ? 'dropdown-item-active' : 'dropdown-item-inactive'">km/h</div>
            <div :class="metric ? 'dropdown-item-inactive' : 'dropdown-item-active'">mph</div>
          </div>
          <div class="flex flex-col justify-start gap-2 border-b border-b-neutral-700">
            <div class="dropdown-heading">Precipitation</div>
            <div :class="metric ? 'dropdown-item-active' : 'dropdown-item-inactive'">
              Millimeters (mm)
            </div>
            <div :class="metric ? 'dropdown-item-inactive' : 'dropdown-item-active'">
              Inches (in)
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
