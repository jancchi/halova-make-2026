const TOKEN_STORAGE_KEY = 'token'

export function getAuthToken(): string {
  if (typeof window === 'undefined') {
    return ''
  }

  return localStorage.getItem(TOKEN_STORAGE_KEY) ?? ''
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.removeItem(TOKEN_STORAGE_KEY)
}
