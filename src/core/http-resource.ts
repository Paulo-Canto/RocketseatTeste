import { getAppStoreLocale } from '@core/app-store'
import { getSessionSnapshot } from '@core/session-store'
import { isRecord } from '@core/utils'

export type FriendlyError = {
  kind: 'network' | 'http' | 'problem' | 'parse' | 'unknown'
  status?: number
  title: string
  detail?: string
  instance?: string
  cause?: unknown
}

type ProblemBody = {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
}

let refreshSession: (() => Promise<boolean>) | null = null

export function registerSessionRefresh(fn: () => Promise<boolean>): void {
  refreshSession = fn
}

export function defineApiRoute<const T extends string>(path: T): T {
  return path
}

export function defineApiRouteFn<TArgs extends unknown[], TPath extends string>(
  fn: (...args: TArgs) => TPath,
): (...args: TArgs) => TPath {
  return (...args: TArgs) => fn(...args)
}

function getDefaultHeaders(): Headers {
  const headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json, application/problem+json')
  headers.set('Accept-Language', getAppStoreLocale())
  const token = getSessionSnapshot().accessToken
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

function normalizeNetworkError(error: unknown): FriendlyError {
  return {
    kind: 'network',
    title: 'Network error',
    detail: error instanceof Error ? error.message : undefined,
    cause: error,
  }
}

function parseProblemJson(text: string): ProblemBody | null {
  try {
    const data: unknown = JSON.parse(text)
    if (!isRecord(data)) return null
    return {
      type: typeof data.type === 'string' ? data.type : undefined,
      title: typeof data.title === 'string' ? data.title : undefined,
      status: typeof data.status === 'number' ? data.status : undefined,
      detail: typeof data.detail === 'string' ? data.detail : undefined,
      instance: typeof data.instance === 'string' ? data.instance : undefined,
    }
  } catch {
    return null
  }
}

export async function parseResponseBody<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type') ?? ''
  if (contentType.includes('application/json')) {
    return (await response.json()) as T
  }
  return (await response.text()) as T
}

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: HeadersInit
  skipAuth?: boolean
  skipRefreshRetry?: boolean
}

const baseUrl = () => import.meta.env.VITE_API_BASE_URL ?? '/api'

export async function httpRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const execute = async (): Promise<T> => {
    const url = path.startsWith('http') ? path : `${baseUrl()}${path.startsWith('/') ? path : `/${path}`}`
    const headers = getDefaultHeaders()
    if (options.skipAuth) {
      headers.delete('Authorization')
    }
    if (options.headers) {
      const extra = new Headers(options.headers)
      extra.forEach((v, k) => {
        headers.set(k, v)
      })
    }
    const init: RequestInit = {
      method: options.method ?? 'GET',
      headers,
    }
    if (options.body !== undefined && options.method !== 'GET') {
      init.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
    }
    let response: Response
    try {
      response = await fetch(url, init)
    } catch (error) {
      throw normalizeNetworkError(error)
    }
    if (response.status === 401 && !options.skipAuth && !options.skipRefreshRetry && refreshSession) {
      const ok = await refreshSession()
      if (ok) {
        return httpRequest<T>(path, { ...options, skipRefreshRetry: true })
      }
    }
    const contentType = response.headers.get('Content-Type') ?? ''
    if (!response.ok) {
      const text = await response.text()
      if (contentType.includes('application/problem+json')) {
        const problem = parseProblemJson(text)
        const err: FriendlyError = {
          kind: 'problem',
          status: response.status,
          title: problem?.title ?? 'Request failed',
          detail: problem?.detail,
          instance: problem?.instance,
        }
        throw err
      }
      const err: FriendlyError = {
        kind: 'http',
        status: response.status,
        title: text || response.statusText || 'Request failed',
      }
      throw err
    }
    if (response.status === 204) {
      return undefined as T
    }
    if (contentType.includes('application/json')) {
      return (await response.json()) as T
    }
    return (await response.text()) as T
  }
  return execute()
}

export function httpResource<_TResponse>() {
  return {
    get: <T>(path: string) => httpRequest<T>(path, { method: 'GET' }),
    post: <T>(path: string, body: unknown) => httpRequest<T>(path, { method: 'POST', body }),
    put: <T>(path: string, body: unknown) => httpRequest<T>(path, { method: 'PUT', body }),
    patch: <T>(path: string, body: unknown) => httpRequest<T>(path, { method: 'PATCH', body }),
    delete: <T>(path: string) => httpRequest<T>(path, { method: 'DELETE' }),
  }
}

export async function httpUpload<T>(path: string, formData: FormData): Promise<T> {
  const url = `${baseUrl()}${path.startsWith('/') ? path : `/${path}`}`
  const headers = new Headers()
  headers.set('Accept', 'application/json, application/problem+json')
  headers.set('Accept-Language', getAppStoreLocale())
  const token = getSessionSnapshot().accessToken
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  try {
    const response = await fetch(url, { method: 'POST', body: formData, headers })
    if (!response.ok) {
      const text = await response.text()
      const err: FriendlyError = {
        kind: 'http',
        status: response.status,
        title: text || 'Upload failed',
      }
      throw err
    }
    return (await response.json()) as T
  } catch (error) {
    if (isFriendlyError(error)) throw error
    throw normalizeNetworkError(error)
  }
}

export function isFriendlyError(value: unknown): value is FriendlyError {
  return isRecord(value) && typeof value.title === 'string' && typeof value.kind === 'string'
}
