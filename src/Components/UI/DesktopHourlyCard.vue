<script lang="ts" setup>
import ButtonComponent from '@/Components/UI/ButtonComponent.vue'
import HourForecast from '@/Components/UI/HourForecast.vue'
import { computed, ref } from 'vue'
import type { WeatherData } from '@/Types/API.ts'
import { addDays, format, isSameDay } from 'date-fns'
import { getWeatherIcon } from '@/Composables/weatherCodes.ts'

interface Props {
  hourly: WeatherData['hourly']
  currentDate: Date
  isNight: boolean
}

const model = defineModel<boolean>()

const props = defineProps<Props>()

const currentDay = computed(() => props.currentDate)
const selectedDay = ref(currentDay.value)

const dropdownDays = computed(() => {
  const days = []
  for (let i = 0; i < 7; i++) {
    days.push(addDays(currentDay.value, i))
  }
  return days
})

const dayDropdown = ref(false)

const hours = computed(() => {
  const result: WeatherData['hourly'] =
    props.hourly?.filter((hour) =>
      isSameDay(props.currentDate, selectedDay.value)
        ? hour.date > props.currentDate && isSameDay(hour.date, selectedDay.value)
        : isSameDay(hour.date, selectedDay.value),
    ) ?? []
  return result
})

if (hours.value[0]) {
  model.value = !!hours.value[0].is_day
}

function changeDay() {
  dayDropdown.value = true
}

function selectDay(date: Date) {
  selectedDay.value = date
  dayDropdown.value = false
}
</script>

<template>
  <div class="flex flex-col bg-neutral-800 rounded-20 h-full w-full p-6 gap-2.5">
    <div class="relative flex flex-row justify-between items-center w-full h-9.25">
      <div class="text-preset-5">Hourly Forecast</div>
      <ButtonComponent class="bg-neutral-600! basis-5/12" @click="changeDay">
        <div>{{ format(selectedDay, 'EEEE') }}</div>
        <div>
          <img alt="" src="/images/icon-dropdown.svg" />
        </div>
      </ButtonComponent>

      <ul
        v-if="dayDropdown"
        class="bg-neutral-700 text-neutral-0 px-6 py-4 absolute left-0 right-0 top-full z-50 overflow-hidden rounded-b-xl"
      >
        <li v-for="day in dropdownDays" :key="day">
          <button
            class="w-full px-4 py-3 text-left hover:bg-neutral-600"
            type="button"
            @click="selectDay(day)"
          >
            <span class="block font-medium text-neutral-0"> {{ day }} </span>
          </button>
        </li>
      </ul>
    </div>
    <div class="overflow-y-scroll flex flex-col gap-2.5">
      <div v-for="hour in hours" :key="format(hour.date, 'T')">
        <HourForecast
          :iconUrl="getWeatherIcon(hour.weather_code ?? 0, isNight) ?? '/icons/no-data.png'"
          :temp="Math.ceil(hour.temperature ?? 20)"
          :time="format(hour.date, 'HH:mm')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
