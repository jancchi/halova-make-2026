<template>
  <div class="space-y-8 animate-fade-in" data-testid="step3-container">
    <div class="space-y-4">
      <h2 class="text-2xl font-bold font-display">Krok 3: Detaily</h2>
      <p class="text-muted text-sm">Poskytnite ďalšie detaily, ktoré nám pomôžu vybaviť vašu požiadavku.</p>
    </div>

    <!-- Urgency -->
    <div data-testid="step3-urgency">
      <RadioGroup
        v-model="store.data.urgency"
        name="urgency"
        label="Úroveň naliehavosti *"
        :options="[
          { label: 'Nízka - neponáhľa to', value: 'low' },
          { label: 'Stredná - do niekoľkých týždňov', value: 'medium' },
          { label: 'Vysoká - čo najskôr', value: 'high' }
        ]"
      />
    </div>

    <!-- Deadline -->
    <BaseInput
      v-model="store.data.deadline"
      type="date"
      label="Termín (voliteľné)"
      testId="step3-deadline"
    />

    <!-- Budget -->
    <BaseInput
      v-model="budgetString"
      type="number"
      label="Odhadovaný rozpočet (€) (voliteľné)"
      placeholder="napr. 50"
      testId="step3-budget"
      @update:modelValue="onBudgetChange"
    />

    <!-- Help Type -->
    <div data-testid="step3-help-type">
      <RadioGroup
        v-model="store.data.helpType"
        name="helpType"
        label="Typ požadovanej pomoci *"
        :options="[
          { label: 'Dobrovoľnícky čas', value: 'volunteer' },
          { label: 'Finančná podpora', value: 'financial' },
          { label: 'Materiál/vybavenie', value: 'material' },
          { label: 'Iné', value: 'other' }
        ]"
      />
    </div>

    <!-- Tags -->
    <TagInput
      v-model="store.data.tags"
      label="Štítky (Stlačte Enter pre pridanie)"
      placeholder="napr. doprava, ťažká práca"
      testId="step3-tags"
    />

    <hr class="border-border my-6" />

    <!-- Consent -->
    <div class="flex items-start space-x-3" data-testid="step3-consent">
      <input
        type="checkbox"
        id="consent"
        v-model="localConsent"
        class="mt-1 w-4 h-4 accent-accent bg-transparent border-border focus:ring-accent cursor-pointer"
      />
      <label for="consent" class="text-sm text-text cursor-pointer">
        Potvrdzujem, že poskytnuté informácie sú presné a súhlasím s podmienkami používania platformy. *
      </label>
    </div>
    <p v-if="consentError" class="text-red-500 text-sm mt-1">Pre pokračovanie musíte súhlasiť.</p>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFormStore } from '~/stores/formStore'
import RadioGroup from '~/components/ui/RadioGroup.vue'
import BaseInput from '~/components/ui/BaseInput.vue'
import TagInput from '~/components/ui/TagInput.vue'

const store = useFormStore()

const budgetString = ref(store.data.budget !== undefined ? String(store.data.budget) : '')

function onBudgetChange(val: string) {
  if (val === '') {
    store.data.budget = undefined
  } else {
    store.data.budget = Number(val)
  }
}

const localConsent = ref(false)
const consentError = ref(false)

// Optional: Provide a validate method for parent component to call
defineExpose({
  validate: () => {
    let isValid = true
    if (!localConsent.value) {
      consentError.value = true
      isValid = false
    } else {
      consentError.value = false
    }
    return isValid
  }
})

watch(localConsent, (val) => {
  if (val) consentError.value = false
})

</script>
