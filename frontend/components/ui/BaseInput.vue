<template>
  <div class="base-input">
    <label v-if="label" class="text-caps text-xs text-muted mb-2 block">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :data-testid="testId"
      :class="[
        'w-full bg-surface/35 text-text placeholder:text-muted/75',
        'border border-border rounded-xl',
        'focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accentAlt focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'transition-colors duration-200',
        error ? 'border-red-500' : '',
      ]"
      class="py-3 px-4"
    />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  testId?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
