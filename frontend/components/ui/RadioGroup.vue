<template>
  <fieldset class="radio-group">
    <legend v-if="label" class="text-caps text-xs text-muted mb-2 block w-full">
      {{ label }}
    </legend>
    <div class="space-y-2">
      <label
        v-for="option in options"
        :key="option.value"
        class="flex items-center space-x-2 cursor-pointer"
      >
        <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
          :disabled="disabled"
          class="w-4 h-4 accent-text bg-transparent border-border focus:ring-2 focus:ring-text focus:outline-none"
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
