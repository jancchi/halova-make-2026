import apiClient from './axios'
import type { Stats } from './types'
import { findFirstAvailableRoute } from './openapi'

const FALLBACK_STATS: Stats = {
  activeRequests: 127,
  completedRequests: 589,
  activeHelpers: 342,
  successRate: 94,
}

const STATS_ROUTES = ['/api/v1/stats']
const BACKEND_HEALTH_ROUTE = '/health'

export async function fetchStats(): Promise<Stats> {
  try {
    const route = await findFirstAvailableRoute(STATS_ROUTES)

    if (route) {
      const response = await apiClient.get<Stats>(route)
      return response.data
    }

    await apiClient.get(BACKEND_HEALTH_ROUTE)
    return FALLBACK_STATS
  } catch (error) {
    console.warn('Stats API unavailable, using fallback', error)
    return FALLBACK_STATS
  }
}
