import axios from 'axios'

const getBaseURL = (): string => {
  if (typeof window === 'undefined') {
    return process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000'
  }
  
  try {
    return useRuntimeConfig().public.apiBase
  } catch {
    return 'http://localhost:8000'
  }
}

const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized: any = {
      message: error.message || 'Unknown error',
    }
    
    if (error.code === 'ECONNABORTED') {
      normalized.isTimeout = true
      normalized.message = 'Request timeout'
    } else if (error.code === 'ERR_NETWORK') {
      normalized.isOffline = true
      normalized.message = 'Network unavailable'
    }
    
    if (error.response) {
      normalized.status = error.response.status
      normalized.message = error.response.data?.message || error.message
    }
    
    return Promise.reject(normalized)
  }
)

export default apiClient
