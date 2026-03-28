<template>
  <div class="space-y-8 animate-fade-in" data-testid="step1-container">
    <div class="space-y-4">
      <h2 class="text-2xl font-bold font-display">Krok 1: Identita</h2>
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
      label="Organizácia (Nepovinné)"
      placeholder="napr. Acme s.r.o."
      testId="step1-organization"
    />

    <!-- Role Pills -->
    <div class="space-y-2">
      <label class="text-caps text-xs text-muted mb-2 block uppercase tracking-widest">Vaša rola *</label>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="role in roles"
          :key="role.value"
          type="button"
          @click="selectRole(role.value)"
          :data-testid="`step1-role-${role.value}`"
          :class="[
            'px-4 py-2 border text-sm font-medium transition-colors duration-200 focus:outline-none',
            store.data.role === role.value
              ? 'bg-text text-bg border-text'
              : 'bg-transparent text-text border-border hover:border-text'
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
  { label: 'Člen', value: 'member' }
] as const

const errors = ref({
  name: '',
  email: '',
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
  }
})

// We extract the validation logic to be callable internally as well
function validateLocal() {
  let isValid = true

  errors.value.name = ''
  errors.value.email = ''
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

  return isValid
}
</script>
