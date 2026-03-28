import apiClient from './axios'
import type { Stats } from './types'

const FALLBACK_STATS: Stats = {
  activeRequests: 127,
  completedRequests: 589,
  activeHelpers: 342,
  successRate: 94,
}

export async function fetchStats(): Promise<Stats> {
  try {
    const response = await apiClient.get<Stats>('/api/v1/stats')
    return response.data
  } catch (error) {
    console.warn('Stats API unavailable, using fallback', error)
    return FALLBACK_STATS
  }
}
