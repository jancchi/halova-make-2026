<template>
  <div class="base-select">
    <label v-if="label" class="text-caps text-xs text-muted mb-2 block">
      {{ label }}
    </label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :disabled="disabled"
      :data-testid="testId"
      :class="[
        'w-full bg-surface/35 text-text',
        'border border-border rounded-xl',
        'focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accentAlt focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'transition-colors duration-200',
        error ? 'border-red-500' : '',
      ]"
      class="py-3 px-4"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  options: Array<{ label: string; value: string }>
  placeholder?: string
  disabled?: boolean
  error?: string
  testId?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
