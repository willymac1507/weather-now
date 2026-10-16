<script lang="ts" setup>
import ButtonComponent from '@/Components/UI/ButtonComponent.vue'
import DesktopHero from '@/Components/DesktopHero.vue'
import DesktopConditionsCard from '@/Components/UI/DesktopConditionsCard.vue'
import DesktopDailyCard from '@/Components/UI/DesktopDailyCard.vue'
import DesktopHourlyCard from '@/Components/UI/DesktopHourlyCard.vue'
import { getLocation, getWeather } from '@/Composables/GetWeatherData.ts'
import { computed, type Ref, ref, type UnwrapRef } from 'vue'
import type { Location, LocationArray, WeatherData } from '@/Types/API.ts'
import { getWeatherIcon } from '@/Composables/weatherCodes.ts'
import { format } from 'date-fns'

const emit = defineEmits(['error'])

const searchField = ref()
const results = ref<LocationArray>()
const error = ref()
const showDropdown = computed(() => (results.value ? results.value.length > 0 : false))
const weather: Ref<UnwrapRef<WeatherData> | null> = ref(null)
const current = computed(() => weather.value?.current)
const hourly = computed(() => weather.value?.hourly)
const daily = computed(() => weather.value?.daily)
const myLocation = ref('Berlin, DE')
const todaysDate = computed(() =>
  current.value
    ? new Date(current.value.time).toLocaleDateString('en-GB', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null,
)

const currentDateTime = computed(
  () => new Date(current.value ? current.value.time : new Date().getTime()),
)
const loading = ref(true)

const isItDayTime = ref(false)

const promises = [weather]

Promise.allSettled(promises).then(() => {
  loading.value = false
})

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
  myLocation.value = searchField.value
  results.value = undefined
  loading.value = true
  await getWeather(location.lat, location.lon, emit).then((data) => {
    if (!data) {
    } else {
      weather.value = data
    }
    loading.value = false
  })
}
</script>

<template>
  <!--  Loading Overlay-->
  <!--  <div-->
  <!--    v-if="loading"-->
  <!--    id="loading-overlay"-->
  <!--    class="fixed inset-0 w-full h-full bg-black opacity-70 flex justify-center items-center z-9999 pointer-events-none transition-opacity duration-300 ease-in-out"-->
  <!--  >-->
  <!--    &lt;!&ndash; Spinner &ndash;&gt;-->
  <!--    <div-->
  <!--      class="w-12.5 h-12.5 border-[5px] border-gray-500 border-t-blue-400 rounded-full animate-spin"-->
  <!--    ></div>-->
  <!--  </div>-->
  <!--  Search Field -->
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
      <!--      Search Results Dropdown-->
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
            <span class="font-medium text-neutral-0"> {{ result.name }} </span>
            <span v-if="result.state" class="text-sm text-neutral-200"> - {{ result.state }} </span>
            <span v-if="result.country" class="text-sm text-neutral-300">
              - {{ result.country }}
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
  <!-- Main Content -->
  <div v-if="weather" class="w-full max-w-304 flex flex-row gap-8 justify-center max-h-164">
    <div class="basis-2/3 flex flex-col max-w-200">
      <!-- Hero -->
      <DesktopHero
        :icon-url="getWeatherIcon(current?.weather_code, !isItDayTime) ?? '/icons/no-data.png'"
      >
        <template #location>{{ myLocation }}</template>
        <template #date>{{ todaysDate }}</template>
        <template #temperature>{{ current ? Math.round(current.temperature) : null }}°</template>
      </DesktopHero>

      <!-- Current Conditions -->
      <div class="flex flex-row gap-8 max-w-200 h-29.5 mb-2.5">
        <DesktopConditionsCard>
          <template #heading>Feels Like</template>
          {{ current ? Math.round(current.real_feel) : null }}°
        </DesktopConditionsCard>
        <DesktopConditionsCard>
          <template #heading>Humidity</template>
          {{ current ? Math.round(current.humidity) : null }}%
        </DesktopConditionsCard>
        <DesktopConditionsCard>
          <template #heading>Wind</template>
          {{ current ? Math.round(current.wind_speed) : null }} km/h
        </DesktopConditionsCard>
        <DesktopConditionsCard>
          <template #heading>Precipitation</template>
          {{ current ? Math.round(current.precipitation) : null }} mm
        </DesktopConditionsCard>
      </div>
      <!-- Daily Forecast -->
      <p class="text-preset-5 mb-5">Daily forecast</p>
      <div v-if="daily" class="flex flex-row gap-4 h-41.25">
        <div v-for="day in daily" :key="format(day.date, 't')" class="grow">
          <DesktopDailyCard
            :icon-url="getWeatherIcon(day.weather_code, false) ?? '/icons/no-data.png'"
          >
            <template #day>{{ format(day.date, 'iii') }}</template>
            <template #maxTemp
              >{{ day.temperature_max ? Math.round(day.temperature_max) : '' }}°</template
            >
            <template #minTemp
              >{{ day.temperature_min ? Math.round(day.temperature_min) : '' }}°</template
            >
          </DesktopDailyCard>
        </div>
      </div>
    </div>
    <!-- Hourly Forecast -->
    <div class="grow">
      <DesktopHourlyCard
        v-model="isItDayTime"
        :currentDate="currentDateTime"
        :hourly="hourly"
        :isNight="!isItDayTime"
      />
    </div>
  </div>
</template>
