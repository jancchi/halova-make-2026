<template>
  <div class="tag-input">
    <label v-if="label" class="text-caps text-xs text-muted mb-2 block">
      {{ label }}
    </label>
    <div class="flex flex-wrap gap-2 mb-2" v-if="modelValue && modelValue.length > 0">
      <span
        v-for="(tag, index) in modelValue"
        :key="index"
        class="inline-flex items-center px-3 py-1 bg-border text-text text-sm rounded-full"
        :data-testid="`tag-${index}`"
      >
        {{ tag }}
        <button
          @click="removeTag(index)"
          class="ml-2 text-muted hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:rounded"
          :data-testid="`tag-remove-${index}`"
          type="button"
          :disabled="disabled"
          :aria-label="`Odstrániť štítok ${tag}`"
        >
          &times;
        </button>
      </span>
    </div>
    <input
      v-model="inputValue"
      @keydown.enter.prevent="addTag"
      :placeholder="placeholder"
      :data-testid="testId"
      :disabled="disabled"
      :class="[
        'w-full bg-transparent text-text border-0 border-b-2 border-border focus:border-accent focus:outline-none py-2',
        error ? 'border-red-500' : ''
      ]"
    />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string[]
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  testId?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const inputValue = ref('')

function addTag() {
  const tag = inputValue.value.trim()
  if (tag && !(props.modelValue || []).includes(tag)) {
    emit('update:modelValue', [...(props.modelValue || []), tag])
    inputValue.value = ''
  }
}

function removeTag(index: number) {
  const updated = [...(props.modelValue || [])]
  updated.splice(index, 1)
  emit('update:modelValue', updated)
}
</script>
