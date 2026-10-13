<script lang="ts" setup>
import ButtonComponent from '@/Components/UI/ButtonComponent.vue'
import DesktopHero from '@/Components/DesktopHero.vue'
import DesktopConditionsCard from '@/Components/UI/DesktopConditionsCard.vue'
import DesktopDailyCard from '@/Components/UI/DesktopDailyCard.vue'
import DesktopHourlyCard from '@/Components/UI/DesktopHourlyCard.vue'
import { getLocation, getWeather } from '@/Composables/GetWeatherData.ts'
import { computed, ref } from 'vue'
import type { Location, LocationArray, WeatherData } from '@/Types/API.ts'

const searchField = ref()
const results = ref<LocationArray>()
// const loading = ref(false)
const error = ref()
const showDropdown = computed(() => (results.value ? results.value.length > 0 : false))
let weather: WeatherData = <WeatherData>await getWeather(52.6141, 1.2991)

const current = weather.current
const hourly = weather.hourly
let myLocation = 'Berlin, DE'

async function searchLocation() {
  if (searchField.value) {
    error.value = null
    await getLocation(searchField.value).then((data) => {
      if (data.length < 1) {
        error.value = 'No results found'
      } else {
        results.value = data
      }
    })
  } else {
    error.value = 'Please enter a location'
  }
}

async function selectLocation(location: Location) {
  searchField.value = `${location.name}, ${location.country}`
  myLocation = searchField.value
  results.value = undefined
  await getWeather(location.lat, location.lon).then((data) => {
    if (!data) {
    } else {
      weather = data
    }
  })
}

console.log(results.value, current, hourly)
</script>

<template>
  <div class="w-full flex flex-row justify-center gap-4 h-14 mb-12">
    <div
      :class="{ 'rounded-b-xl': !showDropdown }"
      class="bg-neutral-700 text-neutral-0 relative rounded-t-xl basis-lg px-6 py-4 flex flex-row gap-4 justify-start focus-within:ring-2 focus-within:ring-blue-500/80"
    >
      <img alt="search" src="/images/icon-search.svg" />
      <input
        v-model="searchField"
        class="grow focus:outline-hidden font-medium text-preset-5m"
        placeholder="Search for a place"
        type="text"
      />
      <span v-if="error" class="text-red-500">{{ error }}</span>
      <ul
        v-if="showDropdown"
        class="bg-neutral-700 text-neutral-0 px-6 py-4 absolute left-0 right-0 top-full z-50 overflow-hidden rounded-b-xl"
      >
        <li v-for="result in results" :key="result.lat">
          <button
            class="w-full px-4 py-3 text-left hover:bg-neutral-600"
            type="button"
            @click="selectLocation(result)"
          >
            <span class="block font-medium text-neutral-0"> {{ result.name }} </span>
            <span v-if="result.state" class="block text-sm text-neutral-200">
              {{ result.state }}
            </span>
            <span v-if="result.country" class="block text-sm text-neutral-300">
              {{ result.country }}
            </span>
          </button>
        </li>
      </ul>
    </div>
    <ButtonComponent
      class="bg-blue-500! text-neutral-0 text-preset-5m! rounded-xl"
      @click="searchLocation"
      >Search
    </ButtonComponent>
  </div>
  <div class="w-full max-w-304 flex flex-row gap-8 justify-center">
    <div class="basis-2/3 flex flex-col max-w-200">
      <DesktopHero icon-url="/images/icon-sunny.webp">
        <template #location>{{ myLocation }}</template>
        <template #date>Tuesday, Aug 5, 2025</template>
        <template #temperature>25°</template>
      </DesktopHero>
      <div class="flex flex-row gap-8 max-w-200 h-29.5 mb-2.5">
        <DesktopConditionsCard>
          <template #heading>Feels Like</template>
          25°
        </DesktopConditionsCard>
        <DesktopConditionsCard>
          <template #heading>Humidity</template>
          46%
        </DesktopConditionsCard>
        <DesktopConditionsCard>
          <template #heading>Wind</template>
          14 km/h
        </DesktopConditionsCard>
        <DesktopConditionsCard>
          <template #heading>Precipitation</template>
          0 mm
        </DesktopConditionsCard>
      </div>
      <p class="text-preset-5 mb-5">Daily forecast</p>
      <div class="flex flex-row gap-4 h-41.25">
        <DesktopDailyCard icon-url="/images/icon-rain.webp">
          <template #day>Tue</template>
          <template #maxTemp>25°</template>
          <template #minTemp>15°</template>
        </DesktopDailyCard>
        <DesktopDailyCard icon-url="/images/icon-drizzle.webp">
          <template #day>Wed</template>
          <template #maxTemp>21°</template>
          <template #minTemp>15°</template>
        </DesktopDailyCard>
        <DesktopDailyCard icon-url="/images/icon-sunny.webp">
          <template #day>Thu</template>
          <template #maxTemp>24°</template>
          <template #minTemp>15°</template>
        </DesktopDailyCard>
        <DesktopDailyCard icon-url="/images/icon-partly-cloudy.webp">
          <template #day>Fri</template>
          <template #maxTemp>25°</template>
          <template #minTemp>15°</template>
        </DesktopDailyCard>
        <DesktopDailyCard icon-url="/images/icon-storm.webp">
          <template #day>Sat</template>
          <template #maxTemp>21°</template>
          <template #minTemp>15°</template>
        </DesktopDailyCard>
        <DesktopDailyCard icon-url="/images/icon-snow.webp">
          <template #day>Sun</template>
          <template #maxTemp>25°</template>
          <template #minTemp>15°</template>
        </DesktopDailyCard>
        <DesktopDailyCard icon-url="/images/icon-fog.webp">
          <template #day>Mon</template>
          <template #maxTemp>19°</template>
          <template #minTemp>15°</template>
        </DesktopDailyCard>
      </div>
    </div>
    <div class="grow">
      <DesktopHourlyCard :startTime="15" day="Tuesday" />
    </div>
  </div>
</template>
