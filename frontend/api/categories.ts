import apiClient from './axios'
import type { Category } from './types'
import { findFirstAvailableRoute } from './openapi'

const FALLBACK_CATEGORIES: Category[] = [
  { id: 'employee-search', title: 'Hľadanie zamestnanca', description: 'Hľadanie kolegu, freelancera alebo špecialistu do tímu.', slug: 'hladanie-zamestnanca' },
  { id: 'investor-search', title: 'Hľadanie investora', description: 'Potrebujete investora, partnera alebo financovanie projektu.', slug: 'hladanie-investora' },
  { id: 'event-speaking', title: 'Speakovanie na evente', description: 'Máte záujem vystúpiť, prezentovať alebo viesť diskusiu na podujatí.', slug: 'speakovanie-na-evente' },
  { id: 'social-media-sharing', title: 'Zdieľanie marketingových podkladov', description: 'Potrebujete pomoc so zdieľaním podkladov na sociálnych sieťach.', slug: 'zdielanie-marketingovych-podkladov' },
  { id: 'sales-support', title: 'Podpora v oblasti sales', description: 'Pomoc s obchodnou stratégiou, outreachom alebo predajným procesom.', slug: 'podpora-v-oblasti-sales' },
  { id: 'client-search', title: 'Hľadanie klientov', description: 'Potrebujete osloviť nových klientov a získať dopyt.', slug: 'hladanie-klientov' },
  { id: 'other', title: 'Iné', description: 'Iný typ požiadavky, ktorý nespĺňa vyššie uvedené oblasti.', slug: 'ine' },
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
