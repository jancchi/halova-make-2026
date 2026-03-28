<template>
  <section class="w-full max-w-[1440px] mx-auto">
    <div class="grid grid-cols-2 md:grid-cols-4 border-t border-l border-border">
      
      <!-- Skeletons -->
      <template v-if="stats.loading || !stats.data">
        <div v-for="i in 4" :key="`skeleton-${i}`" class="p-4 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border-r border-b border-border min-h-[160px]">
          <div class="h-8 sm:h-10 md:h-14 w-20 sm:w-24 bg-border animate-pulse mb-3 rounded-sm"></div>
          <div class="h-3 sm:h-4 w-24 sm:w-32 bg-border animate-pulse rounded-sm"></div>
        </div>
      </template>

      <!-- Real Data -->
      <template v-else>
        <!-- Item 1: Active Requests -->
        <div class="p-4 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border-r border-b border-border min-h-[160px]">
          <div class="font-display text-4xl sm:text-5xl md:text-6xl mb-2 text-text">
            {{ formatNumber(stats.data.activeRequests) }}
          </div>
          <div class="text-[10px] sm:text-xs md:text-sm text-caps text-muted">
            Aktívne žiadosti
          </div>
        </div>
        
        <!-- Item 2: Completed Requests -->
        <div class="p-4 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border-r border-b border-border min-h-[160px]">
          <div class="font-display text-4xl sm:text-5xl md:text-6xl mb-2 text-text">
            {{ formatNumber(stats.data.completedRequests) }}
          </div>
          <div class="text-[10px] sm:text-xs md:text-sm text-caps text-muted">
            Vybavené žiadosti
          </div>
        </div>
        
        <!-- Item 3: Active Helpers -->
        <div class="p-4 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border-r border-b border-border min-h-[160px]">
          <div class="font-display text-4xl sm:text-5xl md:text-6xl mb-2 text-text">
            {{ formatNumber(stats.data.activeHelpers) }}
          </div>
          <div class="text-[10px] sm:text-xs md:text-sm text-caps text-muted">
            Aktívni dobrovoľníci
          </div>
        </div>
        
        <!-- Item 4: Success Rate -->
        <div class="p-4 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center border-r border-b border-border min-h-[160px]">
          <div class="font-display text-4xl sm:text-5xl md:text-6xl mb-2 text-text">
            {{ formatNumber(stats.data.successRate) }}%
          </div>
          <div class="text-[10px] sm:text-xs md:text-sm text-caps text-muted">
            Úspešnosť
          </div>
        </div>
      </template>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRequests } from '~/composables/useRequests'

const { stats, loadStats } = useRequests()

onMounted(() => {
  loadStats()
})

const formatNumber = (val: number) => {
  return val.toLocaleString('sk-SK')
}
</script>
