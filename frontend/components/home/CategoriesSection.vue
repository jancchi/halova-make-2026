<template>
  <section class="py-16 md:py-24 border-t border-border bg-bg text-text">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl md:text-5xl mb-12 font-display">
        Kategórie pomoci
      </h2>
      
      <div v-if="categories.data && categories.data.length > 0" class="flex flex-col">
        <div 
          v-for="(category, index) in categories.data" 
          :key="category.id"
          class="category-row py-8 border-b border-border group flex flex-col md:flex-row md:items-center justify-between transition-transform duration-300 ease-out hover:translate-x-2 cursor-default"
          :style="{ '--stagger-index': index }"
        >
          <h3 class="text-3xl md:text-4xl font-medium mb-2 md:mb-0 font-display">
            {{ category.title }}
          </h3>
          <p class="text-sm md:text-base md:w-1/2 md:text-right font-body text-muted">
            {{ category.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRequests } from '~/composables/useRequests'

const { loadCategories, categories } = useRequests()

onMounted(() => {
  loadCategories()
})
</script>

<style scoped>
@keyframes reveal-up {
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.category-row {
  opacity: 0; /* Starts hidden before animation kicks in */
  animation: reveal-up 0.5s ease forwards;
  animation-delay: calc(var(--stagger-index, 0) * 100ms);
}

@media (prefers-reduced-motion: reduce) {
  .category-row {
    animation: none;
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
