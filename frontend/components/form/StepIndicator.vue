<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const steps = computed(() => {
  return Array.from({ length: props.totalSteps }, (_, i) => i + 1)
})
</script>

<template>
  <div data-testid="form-step-indicator" class="flex items-center gap-2 w-full">
    <template v-for="step in steps" :key="step">
      <div
        class="size-7 md:size-8 rounded-full border flex items-center justify-center text-xs md:text-sm font-semibold transition-colors duration-300 ease-in-out"
        :class="step <= currentStep ? 'bg-accent text-bg border-accent shadow-[0_0_0_2px_rgba(15,239,170,0.18)]' : 'bg-surface text-muted border-border'"
      >
        {{ step }}
      </div>
      <div
        v-if="step < totalSteps"
        class="h-1 flex-1 transition-colors duration-300 ease-in-out"
        :class="step < currentStep ? 'bg-accent' : 'bg-border'"
      ></div>
    </template>
  </div>
</template>
