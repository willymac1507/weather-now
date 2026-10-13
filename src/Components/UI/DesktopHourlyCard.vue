<script lang="ts" setup>
import ButtonComponent from '@/Components/UI/ButtonComponent.vue'
import HourForecast from '@/Components/UI/HourForecast.vue'
import { computed } from 'vue'
import { getWeather } from '@/Composables/GetWeatherData'

interface Props {
  day: string
  startTime: number
}

const props = defineProps<Props>()

const weather = await getWeather(52.6141, 1.2991)

const hours = computed(() => {
  const result: number[] = []
  for (let i = props.startTime; i < props.startTime + 8; i++) {
    if (i > 24) {
      i -= 24
    }
    result.push(i)
  }
  return result
})
</script>

<template>
  <div class="flex flex-col bg-neutral-800 rounded-20 h-full w-full p-6 gap-2.5">
    <div class="flex flex-row justify-between items-center w-full h-9.25">
      <div class="text-preset-5">Hourly Forecast</div>
      <ButtonComponent class="bg-neutral-600!">
        <div>{{ day }}</div>
        <div>
          <img alt="" src="/images/icon-dropdown.svg" />
        </div>
      </ButtonComponent>
    </div>
    <div v-for="hour in hours" :key="hour">
      <HourForecast :temp="20" :time="hour" iconUrl="/images/icon-overcast.webp" />
    </div>
  </div>
</template>

<style scoped></style>
