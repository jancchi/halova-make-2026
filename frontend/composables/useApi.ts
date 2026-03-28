/**
 * Thin wrapper around $fetch that prepends the API base URL
 * and attaches the JWT token from localStorage if present.
 *
 * Usage:
 *   const { get, post } = useApi()
 *   const user = await get<UserRead>('/auth/me')
 */
export const useApi = () => {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  const token = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") ?? "" : ""

  const headers = (): Record<string, string> =>
    token() ? { Authorization: `Bearer ${token()}` } : {}

  const get = <T>(path: string) =>
    $fetch<T>(`${base}${path}`, { headers: headers() })

  const post = <T>(path: string, body: unknown) =>
    $fetch<T>(`${base}${path}`, { method: "POST", body, headers: headers() })

  return { get, post }
}
