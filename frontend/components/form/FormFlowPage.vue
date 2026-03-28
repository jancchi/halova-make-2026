<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import StepIndicator from '~/components/form/StepIndicator.vue'
import Step1Identity from '~/components/form/Step1Identity.vue'
import Step2Need from '~/components/form/Step2Need.vue'
import Step3Details from '~/components/form/Step3Details.vue'
import Step4Review from '~/components/form/Step4Review.vue'
import { useToast } from '~/composables/useToast'
import { useFormStore } from '~/stores/formStore'
import { mapApiError } from '~/utils/errorMessages'

const store = useFormStore()
const stepRef = ref<any>(null)
const { addToast } = useToast()
const router = useRouter()

const components = [Step1Identity, Step2Need, Step3Details, Step4Review]

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
  store
    .submitForm()
    .then((response) => {
      router.push({ path: '/thank-you', query: { id: response.id } })
    })
    .catch((error) => {
      const mapped = mapApiError(error)

      if (mapped.fieldErrors && mapped.affectedStep) {
        store.goToStep(mapped.affectedStep)

        nextTick(() => {
          if (stepRef.value?.setServerErrors) {
            stepRef.value.setServerErrors(mapped.fieldErrors)
          }
        })
      }

      const retryCallback = error.isOffline || error.isTimeout ? submitForm : undefined
      addToast(mapped.message, mapped.type, retryCallback)
    })
}

function handlePrev() {
  store.prevStep()
}
</script>

<template>
  <div data-testid="form-route-shell" class="min-h-screen grid lg:grid-cols-[4fr_6fr] bg-bg text-text">
    <aside data-testid="form-left-panel" class="hidden lg:flex flex-col sticky top-0 h-screen pt-24 px-12 pb-12 border-r border-border bg-surface/45 backdrop-blur-sm relative overflow-hidden">
      <div class="panel-edge-blob" aria-hidden="true"></div>
      <div class="mb-auto relative z-[1]">
        <h1 class="text-4xl xl:text-5xl font-display font-extrabold leading-tight mb-6">
          Zanechajte <br /> nám vašu <br /> požiadavku.
        </h1>
        <p class="text-muted text-lg max-w-md font-body">
          Vaša výzva bude po overení zverejnená v sieti Halova. Prosím, poskytnite presné a overiteľné informácie.
        </p>
      </div>

      <div class="mt-auto pt-12 border-t border-border relative z-[1]">
        <div class="text-sm text-muted">
          Potrebujete poradiť? <br />
          <a href="mailto:help@0100.vc" class="text-text underline mt-1 inline-block">help@0100.vc</a>
        </div>
      </div>
    </aside>

    <main class="flex flex-col min-h-screen">
      <header class="sticky top-0 z-20 h-[60px] border-b border-border bg-bg/90 backdrop-blur-sm flex items-center">
        <div class="w-full max-w-[1200px] mx-auto px-4 md:px-6 flex items-center gap-4 md:gap-6">
          <NuxtLink to="/" class="text-sm md:text-base font-display text-caps tracking-[0.08em] text-text shrink-0">
            0100 Komunita pomáha
          </NuxtLink>

          <div class="flex-1 min-w-0">
            <StepIndicator :current-step="store.currentStep" :total-steps="store.totalSteps" />
          </div>
        </div>
      </header>

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

        <div v-if="store.currentStep < store.totalSteps" class="mt-auto pt-12 border-t border-border flex items-center justify-between gap-4">
          <button
            type="button"
            @click="handlePrev"
            :class="['px-4 md:px-6 py-3 font-medium transition-colors border border-border text-sm md:text-base bg-transparent text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-accentAlt focus-visible:ring-offset-2 focus-visible:ring-offset-bg', store.currentStep === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-surface']"
          >
            Späť
          </button>

          <button
            type="button"
            @click="handleNext"
            class="px-6 md:px-8 py-3 bg-accent text-bg font-semibold hover:bg-accentAlt transition-colors disabled:opacity-50 text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-accentAlt focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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
              'w-full py-4 border-2 border-accent bg-accent text-bg font-bold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accentAlt focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
              store.isSubmitting ? 'animate-pulse' : 'hover:bg-accentAlt hover:border-accentAlt'
            ]"
            :disabled="store.isSubmitting"
            data-testid="step4-submit"
          >
            {{ store.isSubmitting ? 'Odosielam...' : 'Odoslať' }}
          </button>

          <button
            type="button"
            @click="handlePrev"
            class="text-center text-sm font-medium text-text hover:text-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accentAlt focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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

.panel-edge-blob {
  position: absolute;
  top: -16%;
  bottom: -16%;
  left: -64%;
  z-index: 0;
  width: 44rem;
  pointer-events: none;
  opacity: 0.82;
  border-radius: 58% 42% 67% 33% / 39% 61% 44% 56%;
  background:
    radial-gradient(circle at 64% 24%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 46%),
    linear-gradient(148deg, rgba(15, 239, 170, 0.62) 0%, rgba(17, 237, 226, 0.44) 72%);
  filter: blur(1px);
  transform-origin: 62% 50%;
  animation: panel-edge-blob-orbit 44s linear infinite;
}

@keyframes panel-edge-blob-orbit {
  from {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.05);
  }
  to {
    transform: rotate(360deg) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel-edge-blob {
    animation: none;
  }

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
