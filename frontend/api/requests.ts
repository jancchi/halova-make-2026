import apiClient from './axios'
import type { BackendPingResponse, RequestPayload, RequestResponse } from './types'
import { findFirstAvailableRoute } from './openapi'

const REQUEST_SUBMIT_ROUTES = ['/api/v1/requests']
const BACKEND_PING_ROUTE = '/api/ping'

export async function submitRequest(payload: RequestPayload): Promise<RequestResponse> {
  const route = await findFirstAvailableRoute(REQUEST_SUBMIT_ROUTES)

  if (route) {
    const response = await apiClient.post<RequestResponse>(route, payload)
    return response.data
  }

  await apiClient.get<BackendPingResponse>(BACKEND_PING_ROUTE)
  throw new Error('Odosielanie požiadaviek zatiaľ nie je na backend-e dostupné.')
}
