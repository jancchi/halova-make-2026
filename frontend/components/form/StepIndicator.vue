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
    <div 
      v-for="step in steps" 
      :key="step"
      class="h-1 flex-1 transition-colors duration-300 ease-in-out"
      :class="[
        step <= currentStep ? 'bg-text' : 'bg-border'
      ]"
    ></div>
  </div>
</template>
