<template>
  <fieldset class="radio-group">
    <legend v-if="label" class="text-caps text-xs text-muted mb-2 block w-full">
      {{ label }}
    </legend>
    <div class="space-y-2">
      <label
        v-for="option in options"
        :key="option.value"
        class="flex items-center space-x-3 cursor-pointer bg-surface/35 border border-border rounded-xl px-3 py-2.5 transition-colors hover:border-accent/60"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
          :disabled="disabled"
          class="w-4 h-4 accent-accent bg-transparent border-border focus:ring-2 focus:ring-accentAlt focus:outline-none"
        />
        <span class="text-text" :class="{ 'opacity-50': disabled }">{{ option.label }}</span>
      </label>
    </div>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </fieldset>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  name: string
  options: Array<{ label: string; value: string }>
  disabled?: boolean
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
