<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useFormStore } from '~/stores/formStore'
import StepIndicator from '~/components/form/StepIndicator.vue'
import Step1Identity from '~/components/form/Step1Identity.vue'
import Step2Need from '~/components/form/Step2Need.vue'
import Step3Details from '~/components/form/Step3Details.vue'
import Step4Review from '~/components/form/Step4Review.vue'
import { useToast } from '~/composables/useToast'
import { mapApiError } from '~/utils/errorMessages'
import { useRouter } from 'vue-router'

const store = useFormStore()
const stepRef = ref<any>(null)
const { addToast } = useToast()
const router = useRouter()

const components = [
  Step1Identity,
  Step2Need,
  Step3Details,
  Step4Review
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
    submitForm()
  }
}

function submitForm() {
  store.submitForm().then((response) => {
    router.push({ path: '/thank-you', query: { id: response.id } })
  }).catch(error => {
    const mapped = mapApiError(error)
    
    if (mapped.fieldErrors && mapped.affectedStep) {
      store.goToStep(mapped.affectedStep)
      
      nextTick(() => {
        if (stepRef.value?.setServerErrors) {
          stepRef.value.setServerErrors(mapped.fieldErrors)
        }
      })
    }
    
    const retryCallback = (error.isOffline || error.isTimeout) ? submitForm : undefined
    addToast(mapped.message, mapped.type, retryCallback)
  })
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
        <div v-if="store.currentStep < store.totalSteps" class="mt-auto pt-12 border-t border-border flex items-center justify-between gap-4">
          <button 
            type="button"
            @click="handlePrev"
            :class="['px-4 md:px-6 py-3 font-medium transition-colors border border-border text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg', store.currentStep === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-muted/10 text-text']"
          >
            Späť
          </button>

          <button 
            type="button"
            @click="handleNext"
            class="px-6 md:px-8 py-3 bg-text text-bg font-medium hover:bg-muted transition-colors disabled:opacity-50 text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            :disabled="store.isSubmitting"
          >
            Pokračovať
          </button>
        </div>

        <div v-else class="mt-auto pt-12 border-t border-border flex flex-col gap-4">
          <button 
            type="button"
            @click="handleNext"
            :class="[
              'w-full py-4 border-2 border-text text-text font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
              store.isSubmitting ? 'animate-pulse' : 'hover:bg-text hover:text-bg'
            ]"
            :disabled="store.isSubmitting"
            data-testid="step4-submit"
          >
            {{ store.isSubmitting ? 'Odosielam...' : 'Odoslať' }}
          </button>
          
          <button 
            type="button"
            @click="handlePrev"
            class="text-center text-sm font-medium text-muted hover:text-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            :disabled="store.isSubmitting"
          >
            Späť
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

@media (prefers-reduced-motion: reduce) {
  .step-enter-active,
  .step-leave-active {
    transition-duration: 0.01ms !important;
  }
  .step-enter-from,
  .step-leave-to {
    transform: none;
  }
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
