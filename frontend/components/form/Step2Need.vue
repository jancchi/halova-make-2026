<template>
  <div class="step-2-need flex flex-col space-y-8">
    <!-- Category Selection -->
    <div class="category-selection" role="radiogroup" aria-labelledby="category-label">
      <div id="category-label" class="text-caps text-xs text-muted mb-2 block">Oblasť požiadavky *</div>
      <div v-if="requestStore.categories.loading" class="text-sm text-muted">
        Načítavam kategórie...
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          v-for="cat in requestStore.categories.data"
          :key="cat.id"
          type="button"
          role="radio"
          :aria-checked="formStore.data.category === cat.id"
          @click="selectCategory(cat.id)"
          :data-testid="'step2-category-row-' + cat.slug"
          :class="[
            'text-left p-4 rounded-md border-2 transition-all duration-200 min-h-[132px] flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none shadow-sm hover:shadow-md',
            formStore.data.category === cat.id
              ? 'border-text bg-text/10 text-text scale-[1.01]'
              : 'border-border bg-bg text-text hover:border-text/60 hover:bg-border/10'
          ]"
        >
          <div class="font-semibold text-base leading-tight mb-2">{{ cat.title }}</div>
          <div class="text-sm text-muted leading-relaxed">{{ cat.description }}</div>
        </button>
      </div>
      <p v-if="errors.category" class="text-red-500 text-sm mt-1">{{ errors.category }}</p>
    </div>

    <!-- Title Field -->
    <div class="title-field">
      <BaseInput
        v-model="formStore.data.title"
        label="Stručný názov požiadavky *"
        placeholder="napr. Hľadám investora pre startup v pre-seed fáze"
        testId="step2-title"
        :error="errors.title"
      />
    </div>

    <!-- Description Field with Char Counter -->
    <div class="description-field">
      <BaseTextarea
        v-model="formStore.data.description"
        label="Detailný popis požiadavky *"
        placeholder="Jasne popíšte problém alebo potrebu, koho hľadáte, čo už máte pripravené a aký je očakávaný výsledok."
        testId="step2-description"
        :rows="8"
        :error="errors.description"
        class="step-textarea"
      />
      <p class="text-xs text-muted mt-2" data-testid="step2-guidance">
        Príklady oblastí: hľadanie zamestnanca, hľadanie investora, možnosť speakovať na evente,
        zdieľanie marketingových podkladov na sociálnych sieťach, podpora v oblasti sales,
        hľadanie klientov a ďalšie.
      </p>
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
  } else if (descStr.length < 40) {
    errors.value.description = 'Popis musí mať aspoň 40 znakov, aby obsahoval relevantné informácie.'
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
