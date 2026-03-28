<template>
  <div class="step-2-need flex flex-col space-y-8">
    <!-- Category Selection -->
    <div class="category-selection" role="radiogroup" aria-labelledby="category-label">
      <div id="category-label" class="text-caps text-xs text-muted mb-2 block">Kategória</div>
      <div v-if="requestStore.categories.loading" class="text-sm text-muted">
        Načítavam kategórie...
      </div>
      <div v-else class="flex flex-col border-y border-border">
        <button
          v-for="cat in requestStore.categories.data"
          :key="cat.id"
          type="button"
          role="radio"
          :aria-checked="formStore.data.category === cat.id"
          @click="selectCategory(cat.id)"
          :data-testid="'step2-category-row-' + cat.slug"
          :class="[
            'text-left px-4 py-4 border-l-4 transition-colors border-b border-border last:border-b-0 focus-visible:ring-2 focus-visible:ring-text focus-visible:outline-none',
            formStore.data.category === cat.id
              ? 'border-l-accent bg-border/20 text-accent'
              : 'border-l-transparent hover:bg-border/10 text-text'
          ]"
        >
          <div class="font-medium text-base mb-1">{{ cat.title }}</div>
          <div class="text-sm text-muted">{{ cat.description }}</div>
        </button>
      </div>
      <p v-if="errors.category" class="text-red-500 text-sm mt-1">{{ errors.category }}</p>
    </div>

    <!-- Title Field -->
    <div class="title-field">
      <BaseInput
        v-model="formStore.data.title"
        label="Názov"
        placeholder="Krátky, výstižný názov (napr. Hľadám grafika na logo)"
        testId="step2-title"
        :error="errors.title"
      />
    </div>

    <!-- Description Field with Char Counter -->
    <div class="description-field">
      <BaseTextarea
        v-model="formStore.data.description"
        label="Popis"
        placeholder="Opíšte detailne, čo potrebujete..."
        testId="step2-description"
        :rows="8"
        :error="errors.description"
        class="step-textarea"
      />
      <div class="flex justify-end mt-1">
        <span 
          class="text-xs transition-colors" 
          :class="charCountColor"
          data-testid="step2-char-count"
        >
          {{ formStore.data.description.length }} / {{ maxChars }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRequestStore } from '~/stores/requestStore'
import { useFormStore } from '~/stores/formStore'
import BaseInput from '~/components/ui/BaseInput.vue'
import BaseTextarea from '~/components/ui/BaseTextarea.vue'

const requestStore = useRequestStore()
const formStore = useFormStore()

const maxChars = 2000

const errors = ref({
  category: '',
  title: '',
  description: ''
})

onMounted(() => {
  if (requestStore.categories.data.length === 0) {
    requestStore.loadCategories()
  }
})

function selectCategory(id: string) {
  formStore.data.category = id
  if (errors.value.category) {
    errors.value.category = ''
  }
}

// Clear errors when typing
watch(() => formStore.data.title, () => {
  if (errors.value.title) errors.value.title = ''
})
watch(() => formStore.data.description, () => {
  if (errors.value.description) errors.value.description = ''
})

const charCountColor = computed(() => {
  const len = formStore.data.description.length
  if (len > maxChars) return 'text-red-500'
  if (len > maxChars * 0.9) return 'text-orange-500'
  return 'text-muted'
})

// Validate method to be called by parent component (Step Wizard)
const validate = () => {
  let isValid = true
  errors.value = { category: '', title: '', description: '' }

  if (!formStore.data.category) {
    errors.value.category = 'Prosím, vyberte si kategóriu.'
    isValid = false
  }
  
  const titleStr = (formStore.data.title || '').trim()
  if (!titleStr) {
    errors.value.title = 'Názov je povinný.'
    isValid = false
  } else if (titleStr.length < 5) {
    errors.value.title = 'Názov musí mať aspoň 5 znakov.'
    isValid = false
  }

  const descStr = (formStore.data.description || '').trim()
  if (!descStr) {
    errors.value.description = 'Popis je povinný.'
    isValid = false
  } else if (descStr.length < 20) {
    errors.value.description = 'Popis musí mať aspoň 20 znakov.'
    isValid = false
  } else if (descStr.length > maxChars) {
    errors.value.description = `Popis nesmie byť dlhší ako ${maxChars} znakov.`
    isValid = false
  }

  return isValid
}

defineExpose({
  validate,
  setServerErrors: (fieldErrors: Record<string, string>) => {
    if (fieldErrors.category) errors.value.category = fieldErrors.category
    if (fieldErrors.title) errors.value.title = fieldErrors.title
    if (fieldErrors.description) errors.value.description = fieldErrors.description
  }
})
</script>

<style scoped>
.step-textarea :deep(textarea) {
  min-height: 200px;
}
</style>
