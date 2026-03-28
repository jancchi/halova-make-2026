import apiClient from './axios'
import type { Category } from './types'

const FALLBACK_CATEGORIES: Category[] = [
  { id: '1', title: 'Zdravie', description: 'Zdravotná pomoc a podpora', slug: 'zdravie' },
  { id: '2', title: 'Bývanie', description: 'Pomoc s ubytovaním', slug: 'byvanie' },
  { id: '3', title: 'Vzdelávanie', description: 'Vzdelávacie potreby', slug: 'vzdelavanie' },
  { id: '4', title: 'Financie', description: 'Finančná podpora', slug: 'financie' },
]

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await apiClient.get<Category[]>('/api/v1/categories')
    return response.data
  } catch (error) {
    console.warn('Categories API unavailable, using fallback', error)
    return FALLBACK_CATEGORIES
  }
}
