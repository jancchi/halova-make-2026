<template>
  <div class="space-y-8 animate-fade-in" data-testid="step1-container">
    <div class="space-y-4">
      <h2 class="text-2xl font-display font-extrabold">Krok 1: Identita</h2>
      <p class="text-muted text-sm">Povedzte nám, kto ste.</p>
    </div>

    <!-- Name -->
    <BaseInput
      v-model="store.data.name"
      type="text"
      label="Celé meno *"
      placeholder="napr. Jozef Mak"
      :error="errors.name"
      testId="step1-name"
      @update:modelValue="clearError('name')"
    />

    <!-- Email -->
    <BaseInput
      v-model="store.data.email"
      type="email"
      label="E-mailová adresa *"
      placeholder="napr. jozef@priklad.sk"
      :error="errors.email"
      testId="step1-email"
      @update:modelValue="clearError('email')"
    />

    <!-- Organization -->
    <BaseInput
      v-model="store.data.organization"
      type="text"
      label="Organizácia"
      placeholder="napr. Acme s.r.o."
      testId="step1-organization"
      :error="errors.organization"
      @update:modelValue="clearError('organization')"
    />

    <BaseInput
      v-model="store.data.city"
      type="text"
      label="Mesto *"
      placeholder="napr. Bratislava"
      testId="step1-city"
      :error="errors.city"
      @update:modelValue="clearError('city')"
    />

    <BaseInput
      v-model="store.data.phone"
      type="tel"
      label="Telefón"
      placeholder="napr. +421 900 123 456"
      testId="step1-phone"
      :error="errors.phone"
      @update:modelValue="clearError('phone')"
    />

    <!-- Role Pills -->
    <div class="space-y-2" role="radiogroup" aria-labelledby="role-label">
      <div id="role-label" class="text-caps text-xs text-muted mb-2 block uppercase tracking-widest">Typ žiadateľa *</div>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="role in roles"
          :key="role.value"
          type="button"
          role="radio"
          :aria-checked="store.data.role === role.value"
          @click="selectRole(role.value)"
          :data-testid="`step1-role-${role.value}`"
          :class="[
            'px-4 py-2 border text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accentAlt focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
            store.data.role === role.value
              ? 'bg-accent text-bg border-accent'
              : 'bg-transparent text-text border-border hover:border-accent hover:text-text'
          ]"
        >
          {{ role.label }}
        </button>
      </div>
      <p v-if="errors.role" class="text-red-500 text-sm mt-1">{{ errors.role }}</p>
    </div>

    <!-- Navigation Handled by Parent -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormStore } from '~/stores/formStore'
import BaseInput from '~/components/ui/BaseInput.vue'

const store = useFormStore()

const roles = [
  { label: 'Startup', value: 'startup' },
  { label: 'Investor', value: 'investor' },
  { label: 'Poskytovateľ služieb', value: 'service_provider' },
  { label: 'Člen komunity', value: 'member' }
] as const

const errors = ref({
  name: '',
  email: '',
  organization: '',
  city: '',
  phone: '',
  role: ''
})

function clearError(field: keyof typeof errors.value) {
  errors.value[field] = ''
}

function selectRole(roleValue: typeof roles[number]['value']) {
  store.data.role = roleValue
  clearError('role')
}

// Validate method to be called by the parent
defineExpose({
  validate: () => {
    return validateLocal()
  },
  setServerErrors: (fieldErrors: Record<string, string>) => {
    if (fieldErrors.name) errors.value.name = fieldErrors.name
    if (fieldErrors.email) errors.value.email = fieldErrors.email
    if (fieldErrors.organization) errors.value.organization = fieldErrors.organization
    if (fieldErrors.city) errors.value.city = fieldErrors.city
    if (fieldErrors.phone) errors.value.phone = fieldErrors.phone
    if (fieldErrors.role) errors.value.role = fieldErrors.role
  }
})

// We extract the validation logic to be callable internally as well
function validateLocal() {
  let isValid = true

  errors.value.name = ''
  errors.value.email = ''
  errors.value.organization = ''
  errors.value.city = ''
  errors.value.phone = ''
  errors.value.role = ''

  if (!store.data.name?.trim()) {
    errors.value.name = 'Meno je povinné'
    isValid = false
  }

  if (!store.data.email?.trim()) {
    errors.value.email = 'E-mail je povinný'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.data.email)) {
    errors.value.email = 'Zadajte platnú e-mailovú adresu'
    isValid = false
  }

  if (!store.data.role) {
    errors.value.role = 'Prosím, vyberte rolu'
    isValid = false
  }

  const city = (store.data.city || '').trim()
  if (!city) {
    errors.value.city = 'Mesto je povinné'
    isValid = false
  } else if (city.length < 2) {
    errors.value.city = 'Zadajte platné mesto'
    isValid = false
  }

  return isValid
}
</script>
