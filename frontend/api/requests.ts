import apiClient from './axios'
import type { RequestPayload, RequestResponse } from './types'

export async function submitRequest(payload: RequestPayload): Promise<RequestResponse> {
  const response = await apiClient.post<RequestResponse>('/api/v1/requests', payload)
  return response.data
}
