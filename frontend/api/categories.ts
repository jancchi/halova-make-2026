import apiClient from './axios'
import type { Category } from './types'
import { findFirstAvailableRoute } from './openapi'

const FALLBACK_CATEGORIES: Category[] = [
  { id: '1', title: 'Zdravie', description: 'Zdravotná pomoc a podpora', slug: 'zdravie' },
  { id: '2', title: 'Bývanie', description: 'Pomoc s ubytovaním', slug: 'byvanie' },
  { id: '3', title: 'Vzdelávanie', description: 'Vzdelávacie potreby', slug: 'vzdelavanie' },
  { id: '4', title: 'Financie', description: 'Finančná podpora', slug: 'financie' },
]

const CATEGORIES_ROUTES = ['/api/v1/categories']
const BACKEND_PING_ROUTE = '/api/ping'

export async function fetchCategories(): Promise<Category[]> {
  try {
    const route = await findFirstAvailableRoute(CATEGORIES_ROUTES)

    if (route) {
      const response = await apiClient.get<Category[]>(route)
      return response.data
    }

    await apiClient.get(BACKEND_PING_ROUTE)
    return FALLBACK_CATEGORIES
  } catch (error) {
    console.warn('Categories API unavailable, using fallback', error)
    return FALLBACK_CATEGORIES
  }
}
