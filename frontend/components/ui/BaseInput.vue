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
        'w-full bg-transparent text-text',
        'border-0 border-b-2 border-border',
        'focus:border-accent focus:outline-none',
        'transition-colors duration-200',
        error ? 'border-red-500' : '',
      ]"
      class="py-2"
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
