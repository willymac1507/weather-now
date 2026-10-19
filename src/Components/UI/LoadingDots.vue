<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Loading...',
  },
)
</script>

<template>
  <div :aria-label="label" class="loading-container" role="status">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>

    <span class="sr-only">{{ label }}</span>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #eee;
  animation: bounce 0.6s ease-in-out infinite alternate;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-14px);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: none;
  }
}
</style>
