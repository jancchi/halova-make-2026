<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFormStore } from '~/stores/formStore'
import StepIndicator from '~/components/form/StepIndicator.vue'
import Step1Identity from '~/components/form/Step1Identity.vue'
import Step2Need from '~/components/form/Step2Need.vue'
import Step3Details from '~/components/form/Step3Details.vue'

const store = useFormStore()
const stepRef = ref<any>(null)

const components = [
  Step1Identity,
  Step2Need,
  Step3Details,
  // Placeholder for step 4 since it's missing but store has totalSteps: 4
  {
    template: `
      <div>
        <h2 class="text-2xl font-display mb-4">Zhrnutie</h2>
        <p class="text-muted mb-8">Skontrolujte a odošlite vašu požiadavku.</p>
        <div class="p-6 border border-border">
          <p class="font-bold mb-2">Pripravené na odoslanie.</p>
        </div>
      </div>
    `,
    setup() {
      return { validate: () => true }
    }
  }
]

const currentComponent = computed(() => {
  return components[store.currentStep - 1]
})

function handleNext() {
  if (stepRef.value?.validate) {
    if (!stepRef.value.validate()) {
      return
    }
  }
  
  if (store.currentStep < store.totalSteps) {
    store.nextStep()
  } else {
    // submit
    store.submitForm().then(() => {
      // success handling would go here
    }).catch(e => {
      console.error(e)
    })
  }
}

function handlePrev() {
  store.prevStep()
}
</script>

<template>
  <div data-testid="form-route-shell" class="min-h-screen grid lg:grid-cols-[4fr_6fr] bg-bg text-text">
    
    <!-- Left Panel -->
    <aside data-testid="form-left-panel" class="hidden lg:flex flex-col sticky top-0 h-screen p-12 border-r border-border bg-bg/50">
      <div class="mb-auto">
        <NuxtLink to="/" class="inline-block text-xl font-display mb-12 uppercase tracking-wide">
          Halova
        </NuxtLink>
        <h1 class="text-4xl xl:text-5xl font-display leading-tight mb-6">
          Zanechajte <br /> nám vašu <br /> požiadavku.
        </h1>
        <p class="text-muted text-lg max-w-md">
          Vaša výzva bude po overení zverejnená v sieti Halova. Prosím, poskytnite presné a overiteľné informácie.
        </p>
      </div>
      
      <div class="mt-auto pt-12 border-t border-border">
        <div class="text-sm text-muted">
          Potrebujete poradiť? <br />
          <a href="mailto:podpora@halova.sk" class="text-text underline mt-1 inline-block">podpora@halova.sk</a>
        </div>
      </div>
    </aside>

    <!-- Right Form Area -->
    <main class="flex flex-col min-h-screen">
      <!-- Header / Indicator -->
      <header class="p-6 md:p-12 border-b border-border sticky top-0 bg-bg z-10 flex items-center gap-6">
        <NuxtLink to="/" class="lg:hidden text-lg font-display uppercase tracking-wide">
          Halova
        </NuxtLink>
        <div class="flex-1 max-w-sm mx-auto w-full">
          <StepIndicator :current-step="store.currentStep" :total-steps="store.totalSteps" />
        </div>
      </header>

      <!-- Form Content -->
      <div class="flex-1 p-6 md:p-12 max-w-3xl mx-auto w-full relative overflow-hidden flex flex-col">
        <Transition name="step" mode="out-in">
          <component 
            :is="currentComponent" 
            ref="stepRef"
            data-testid="form-step-content"
            class="w-full flex-1"
            :key="store.currentStep" 
          />
        </Transition>

        <!-- Navigation -->
        <div class="mt-auto pt-12 border-t border-border flex items-center justify-between">
          <button 
            type="button"
            @click="handlePrev"
            :class="['px-6 py-3 font-medium transition-colors border border-border', store.currentStep === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-muted/10 text-text']"
          >
            Späť
          </button>

          <button 
            type="button"
            @click="handleNext"
            class="px-8 py-3 bg-text text-bg font-medium hover:bg-muted transition-colors disabled:opacity-50"
            :disabled="store.isSubmitting"
          >
            {{ store.currentStep === store.totalSteps ? 'Odoslať' : 'Pokračovať' }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.step-enter-active,
.step-leave-active {
  transition: all 300ms ease;
}

.step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
