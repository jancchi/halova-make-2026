<template>
  <div class="space-y-8 animate-fade-in" data-testid="step4-review">
    <div class="space-y-4">
      <h2 class="text-2xl font-bold font-display">Krok 4: Zhrnutie</h2>
      <p class="text-muted text-sm">Skontrolujte údaje pred odoslaním.</p>
    </div>

    <!-- Step 1: Identity Summary -->
    <div class="border-l-4 border-accent p-6 bg-border/10">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">Identita</h3>
        <button
          type="button"
          @click="editStep(1)"
          data-testid="step4-edit-step1"
          class="text-sm text-text border border-transparent hover:border-text px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors"
          aria-label="Upraviť Identitu"
        >
          Upraviť
        </button>
      </div>
      <dl class="space-y-4 sm:space-y-2 text-sm">
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Meno:</dt>
          <dd class="text-text font-medium break-words">{{ store.data.name }}</dd>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">E-mail:</dt>
          <dd class="text-text font-medium break-all">{{ store.data.email }}</dd>
        </div>
        <div v-if="store.data.organization" class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Organizácia:</dt>
          <dd class="text-text font-medium break-words">{{ store.data.organization }}</dd>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Typ žiadateľa:</dt>
          <dd class="text-text font-medium">{{ roleLabel }}</dd>
        </div>
        <div v-if="store.data.phone" class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Telefón:</dt>
          <dd class="text-text font-medium">{{ store.data.phone }}</dd>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Mesto:</dt>
          <dd class="text-text font-medium break-words">{{ store.data.city }}</dd>
        </div>
      </dl>
    </div>

    <!-- Step 2: Need Summary -->
    <div class="border-l-4 border-accent p-6 bg-border/10">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">Požiadavka</h3>
        <button
          type="button"
          @click="editStep(2)"
          data-testid="step4-edit-step2"
          class="text-sm text-text border border-transparent hover:border-text px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors"
          aria-label="Upraviť Požiadavku"
        >
          Upraviť
        </button>
      </div>
      <dl class="space-y-4 sm:space-y-2 text-sm">
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Oblasť:</dt>
          <dd class="text-text font-medium">{{ categoryTitle }}</dd>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Názov:</dt>
          <dd class="text-text font-medium break-words">{{ store.data.title }}</dd>
        </div>
        <div class="flex flex-col mt-2">
          <dt class="text-muted mb-1 shrink-0">Popis:</dt>
          <dd class="text-text whitespace-pre-wrap break-words">{{ store.data.description }}</dd>
        </div>
      </dl>
    </div>

    <!-- Step 3: Details Summary -->
    <div class="border-l-4 border-accent p-6 bg-border/10">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">Detaily</h3>
        <button
          type="button"
          @click="editStep(3)"
          data-testid="step4-edit-step3"
          class="text-sm text-text border border-transparent hover:border-text px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors"
          aria-label="Upraviť Detaily"
        >
          Upraviť
        </button>
      </div>
      <dl class="space-y-4 sm:space-y-2 text-sm">
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Naliehavosť:</dt>
          <dd class="text-text font-medium">{{ urgencyLabel }}</dd>
        </div>
        <div v-if="store.data.deadline" class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Termín:</dt>
          <dd class="text-text font-medium">{{ formattedDeadline }}</dd>
        </div>
        <div v-if="store.data.budget" class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Rozpočet:</dt>
          <dd class="text-text font-medium">{{ store.data.budget }} €</dd>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
          <dt class="text-muted sm:w-32 shrink-0">Typ pomoci:</dt>
          <dd class="text-text font-medium">{{ helpTypeLabel }}</dd>
        </div>
        <div v-if="store.data.tags.length > 0" class="flex flex-col mt-2">
          <dt class="text-muted mb-1 shrink-0">Štítky:</dt>
          <dd class="flex flex-wrap gap-2">
            <span
              v-for="tag in store.data.tags"
              :key="tag"
              class="px-2 py-1 text-xs bg-accent/10 text-accent border border-accent/20 break-all"
            >
              {{ tag }}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFormStore } from '~/stores/formStore'
import { useRequestStore } from '~/stores/requestStore'

const store = useFormStore()
const requestStore = useRequestStore()

onMounted(() => {
  if (requestStore.categories.data.length === 0) {
    requestStore.loadCategories()
  }
})

const roleLabel = computed(() => {
  const roleMap = {
    startup: 'Startup',
    investor: 'Investor',
    service_provider: 'Poskytovateľ služieb',
    member: 'Člen komunity'
  }
  return store.data.role ? roleMap[store.data.role] : '-'
})

const categoryTitle = computed(() => {
  const category = requestStore.categories.data.find(c => c.id === store.data.category)
  return category ? category.title : store.data.category
})

const urgencyLabel = computed(() => {
  const urgencyMap = {
    low: 'Nízka - neponáhľa to',
    medium: 'Stredná - do niekoľkých týždňov',
    high: 'Vysoká - čo najskôr'
  }
  return urgencyMap[store.data.urgency]
})

const helpTypeLabel = computed(() => {
  const helpTypeMap = {
    volunteer: 'Dobrovoľnícky čas',
    financial: 'Finančná podpora',
    material: 'Materiál/vybavenie',
    other: 'Iné'
  }
  return helpTypeMap[store.data.helpType]
})

const formattedDeadline = computed(() => {
  if (!store.data.deadline) return '-'
  const date = new Date(store.data.deadline)
  return date.toLocaleDateString('sk-SK')
})

function editStep(step: number) {
  store.goToStep(step)
}

defineExpose({
  validate: () => true
})
</script>
