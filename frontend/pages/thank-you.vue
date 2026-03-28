<template>
  <SuccessScreen :request-id="requestId" @new-request="handleNewRequest" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { navigateTo, useRoute } from '#app'
import SuccessScreen from '~/components/form/SuccessScreen.vue'
import { useFormStore } from '~/stores/formStore'

const route = useRoute()
const formStore = useFormStore()

const requestId = computed(() => {
  const idFromQuery = route.query.id
  if (typeof idFromQuery === 'string' && idFromQuery.length > 0) return idFromQuery
  return formStore.submittedId
})

async function handleNewRequest() {
  formStore.resetForm()
  await navigateTo('/')
}
</script>
