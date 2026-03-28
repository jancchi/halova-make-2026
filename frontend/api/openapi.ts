import apiClient from './axios'

interface OpenApiSpec {
  paths?: Record<string, unknown>
}

let cachedPaths: Set<string> | null = null
let pendingLoad: Promise<Set<string>> | null = null

async function loadPaths(): Promise<Set<string>> {
  if (cachedPaths) {
    return cachedPaths
  }

  if (!pendingLoad) {
    pendingLoad = (async () => {
      try {
        const response = await apiClient.get<OpenApiSpec>('/openapi.json', {
          timeout: 5000,
        })

        const paths = Object.keys(response.data?.paths ?? {})
        cachedPaths = new Set(paths)
        return cachedPaths
      } catch {
        return new Set<string>()
      } finally {
        pendingLoad = null
      }
    })()
  }

  return pendingLoad
}

export async function isRouteAvailable(path: string): Promise<boolean> {
  const paths = await loadPaths()
  return paths.has(path)
}

export async function findFirstAvailableRoute(candidates: string[]): Promise<string | null> {
  const paths = await loadPaths()

  for (const candidate of candidates) {
    if (paths.has(candidate)) {
      return candidate
    }
  }

  return null
}

export function resetOpenApiCache(): void {
  cachedPaths = null
  pendingLoad = null
}
