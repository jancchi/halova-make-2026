import { useRequestStore } from '~/stores/requestStore'

export const useRequests = () => {
  const store = useRequestStore()
  
  return {
    categories: computed(() => store.categories),
    stats: computed(() => store.stats),
    loadCategories: () => store.loadCategories(),
    loadStats: () => store.loadStats(),
  }
}
