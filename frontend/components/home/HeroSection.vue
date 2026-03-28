<script setup lang="ts">
// Hero Section with Editorial Headline and CTA
</script>

<template>
  <section class="hero-section flex flex-col items-center justify-center text-center py-24 md:py-40 px-6 border-b border-border min-h-[70vh]">
    <div class="max-w-4xl mx-auto flex flex-col items-center gap-8">
      
      <!-- Headline -->
      <h1 class="hero-reveal hero-reveal-1 font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-text leading-tight">
        Komunita, ktorá <br class="hidden md:block" /> sa snaží
      </h1>
      
      <!-- Subtitle -->
      <p class="hero-reveal hero-reveal-2 font-body text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
        Spojujeme tých, ktorí potrebujú pomocnú ruku, s tými, ktorí ju môžu podať. 
        Vytvárame bezpečný priestor pre vzájomnú podporu a solidaritu.
      </p>
      
      <!-- Actions -->
      <div class="hero-reveal hero-reveal-3 flex flex-col sm:flex-row gap-4 mt-4">
        <NuxtLink 
          to="/form" 
          class="inline-flex items-center justify-center px-8 py-3 bg-text text-bg border border-text hover:bg-transparent hover:text-text transition-colors duration-300 font-body font-medium uppercase tracking-wider text-sm rounded-sm"
        >
          Požiadať o pomoc
        </NuxtLink>
        
        <NuxtLink 
          to="/ako-pomoct" 
          class="inline-flex items-center justify-center px-8 py-3 bg-transparent text-text border border-border hover:border-text transition-colors duration-300 font-body font-medium uppercase tracking-wider text-sm rounded-sm"
        >
          Ako pomôcť
        </NuxtLink>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
.hero-reveal {
  opacity: 0;
  animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-reveal-1 {
  animation-delay: 0ms;
}

.hero-reveal-2 {
  animation-delay: 200ms;
}

.hero-reveal-3 {
  animation-delay: 400ms;
}

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-reveal {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
