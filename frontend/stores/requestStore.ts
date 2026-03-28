import { defineStore } from 'pinia'
import type { Category, Stats } from '~/api/types'
import { fetchCategories } from '~/api/categories'
import { fetchStats } from '~/api/stats'

export const useRequestStore = defineStore('request', {
  state: () => ({
    categories: {
      loading: false,
      error: null as string | null,
      data: [] as Category[],
    },
    stats: {
      loading: false,
      error: null as string | null,
      data: null as Stats | null,
    },
  }),
  
  actions: {
    async loadCategories() {
      this.categories.loading = true
      this.categories.error = null
      try {
        this.categories.data = await fetchCategories()
      } catch (error: any) {
        this.categories.error = error.message || 'Failed to load categories'
      } finally {
        this.categories.loading = false
      }
    },
    
    async loadStats() {
      this.stats.loading = true
      this.stats.error = null
      try {
        this.stats.data = await fetchStats()
      } catch (error: any) {
        this.stats.error = error.message || 'Failed to load stats'
      } finally {
        this.stats.loading = false
      }
    },
  },
})
