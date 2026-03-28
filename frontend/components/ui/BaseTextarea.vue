<template>
  <div class="base-textarea">
    <label v-if="label" class="text-caps text-xs text-muted mb-2 block">
      {{ label }}
    </label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="placeholder"
      :disabled="disabled"
      :data-testid="testId"
      :rows="rows || 3"
      :class="[
        'w-full bg-transparent text-text',
        'border-0 border-b-2 border-border',
        'focus:border-text focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'transition-colors duration-200 resize-y',
        error ? 'border-red-500' : '',
      ]"
      class="py-2"
    ></textarea>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  rows?: number
  testId?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
