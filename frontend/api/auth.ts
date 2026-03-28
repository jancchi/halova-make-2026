import apiClient from './axios'
import type { AuthTokenResponse, LoginPayload, RegisterPayload, User } from './types'
import { clearAuthToken, setAuthToken } from './token'

function toFormData(payload: LoginPayload): URLSearchParams {
  const formData = new URLSearchParams()
  formData.set('username', payload.email)
  formData.set('password', payload.password)
  return formData
}

export async function registerUser(payload: RegisterPayload): Promise<User> {
  const response = await apiClient.post<User>('/auth/register', payload)
  return response.data
}

export async function loginUser(payload: LoginPayload): Promise<AuthTokenResponse> {
  const response = await apiClient.post<AuthTokenResponse>('/auth/login', toFormData(payload), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  setAuthToken(response.data.access_token)
  return response.data
}

export function logoutUser(): void {
  clearAuthToken()
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await apiClient.get<User>('/auth/me')
  return response.data
}
