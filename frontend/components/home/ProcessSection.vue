<script setup lang="ts">
const steps = [
  { number: 1, title: 'Vyplňte formulár', description: 'Popíšte, akú pomoc potrebujete' },
  { number: 2, title: 'Posúdenie žiadosti', description: 'Skontrolujeme vašu požiadavku' },
  { number: 3, title: 'Hľadanie pomocníkov', description: 'Spojíme vás s ľuďmi, ktorí môžu pomôcť' },
  { number: 4, title: 'Riešenie', description: 'Získate podporu, ktorú potrebujete' }
];
</script>

<template>
  <section class="border-b border-border">
    <div class="px-6 py-20 md:py-32 border-b border-border">
      <h2 class="font-display text-4xl md:text-6xl text-center text-text tracking-tight">
        Ako to funguje
      </h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
      <div 
        v-for="(step, index) in steps" 
        :key="step.number"
        class="p-6 sm:p-10 md:p-16 border-border flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 items-start border-b"
        :class="[
          index % 2 === 0 ? 'md:border-r' : '',
          index >= 2 ? 'md:border-b-0' : '',
          'last:border-b-0'
        ]"
      >
        <span class="font-display text-6xl md:text-7xl text-muted/30 leading-none">
          0{{ step.number }}
        </span>
        <div class="flex flex-col gap-3 pt-2">
          <h3 class="font-body font-bold text-xl md:text-2xl text-text uppercase tracking-wide">
            {{ step.title }}
          </h3>
          <p class="font-body text-muted text-base md:text-lg max-w-sm">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
