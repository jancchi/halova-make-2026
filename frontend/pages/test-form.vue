<template>
  <div>
    <div data-testid="current-step">Step {{ form.currentStep }}</div>
    <input v-model="form.data.name" data-testid="input-name" placeholder="Name" />
    <input v-model="form.data.email" data-testid="input-email" placeholder="Email" />
    <button @click="form.nextStep()" data-testid="btn-next">Next</button>
    <button @click="handleSubmit" data-testid="btn-submit">
      {{ form.isSubmitting ? 'Submitting...' : 'Submit' }}
    </button>
    <div v-if="error" data-testid="error-message">{{ error }}</div>
  </div>
</template>

<script setup>
const form = useRequestForm()
const error = ref(null)

const handleSubmit = async () => {
  try {
    await form.submitForm()
  } catch (e) {
    error.value = e.message
  }
}
</script>
