<script lang="ts" setup>
import ButtonComponent from '@/Components/UI/ButtonComponent.vue'
import DesktopHero from '@/Components/DesktopHero.vue'
import DesktopConditionsCard from '@/Components/UI/DesktopConditionsCard.vue'
import DesktopDailyCard from '@/Components/UI/DesktopDailyCard.vue'
import DesktopHourlyCard from '@/Components/UI/DesktopHourlyCard.vue'
</script>

<template>
  <div class="w-full flex flex-row justify-center gap-4 h-14 mb-12">
    <div
      class="bg-neutral-700 text-neutral-0 rounded-xl basis-lg px-6 py-4 flex flex-row gap-4 justify-start focus-within:ring-2 focus-within:ring-blue-500/80"
    >
      <img alt="search" src="/images/icon-search.svg" />
      <input
        class="grow focus:outline-hidden font-medium text-preset-5m"
        placeholder="Search for a place"
        type="text"
      />
    </div>
    <ButtonComponent class="bg-blue-500! text-neutral-0 text-preset-5m! rounded-xl"
      >Search</ButtonComponent
    >
  </div>
  <div class="w-full max-w-304 flex flex-row gap-8 justify-center">
    <div class="basis-2/3 flex flex-col max-w-200">
      <DesktopHero icon-url="/images/icon-sunny.webp">
        <template #location> Berlin, Germany </template>
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
