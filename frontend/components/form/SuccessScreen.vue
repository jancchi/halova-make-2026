<template>
  <section class="min-h-[60vh] flex items-center justify-center px-6" data-testid="success-screen">
    <div class="w-full max-w-2xl text-center border-t border-b border-border py-12 md:py-16 animate-fade-in-up">
      <p class="text-caps text-xs text-muted mb-3">Žiadosť bola odoslaná</p>
      <h1 class="text-4xl md:text-5xl font-display leading-tight mb-4">Žiadosť prijatá.</h1>
      <p class="text-muted text-sm md:text-base max-w-xl mx-auto mb-8">
        Ďakujeme. Naša komunita vašu požiadavku overí a následne zverejní.
      </p>

      <div class="border-y border-border py-5 mb-8">
        <p class="text-sm text-muted mb-1">ID žiadosti</p>
        <p class="font-display text-2xl" data-testid="thankyou-request-id">{{ requestIdDisplay }}</p>
      </div>

      <p class="text-sm text-muted mb-8">Predpokladaná odpoveď: do 1–3 pracovných dní</p>

      <button
        type="button"
        class="inline-flex items-center justify-center border-2 border-text px-6 py-3 text-sm uppercase tracking-wider hover:bg-text hover:text-bg transition-colors"
        data-testid="thankyou-new-request"
        @click="$emit('new-request')"
      >
        Zadať ďalšiu žiadosť →
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  requestId?: string | null
}>()

defineEmits<{
  'new-request': []
}>()

const requestIdDisplay = computed(() => props.requestId || '—')
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 320ms ease both;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up {
    animation: none;
  }
}
</style>
