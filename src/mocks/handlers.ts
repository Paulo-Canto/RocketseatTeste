import { http, HttpResponse } from 'msw'

const items = [
  { id: '1', title: 'Sample item', updatedAt: new Date().toISOString() },
  { id: '2', title: 'Another item', updatedAt: new Date().toISOString() },
]

export const handlers = [
  http.post('/api/session/login', async () => {
    return HttpResponse.json({
      accessToken: 'mock-access',
      refreshToken: 'mock-refresh',
      user: { id: 'u1', label: 'Demo user' },
    })
  }),
  http.post('/api/session/refresh', async () => {
    return HttpResponse.json({
      accessToken: 'mock-access-refreshed',
      refreshToken: 'mock-refresh',
    })
  }),
  http.post('/api/session/logout', async () => {
    return new HttpResponse(null, { status: 204 })
  }),
  http.get('/api/items', ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')?.toLowerCase() ?? ''
    const filtered = q ? items.filter((i) => i.title.toLowerCase().includes(q)) : items
    return HttpResponse.json({ items: filtered, total: filtered.length })
  }),
  http.get('/api/items/:id', ({ params }) => {
    const row = items.find((i) => i.id === params.id)
    if (!row) {
      return HttpResponse.json({ title: 'Not found', status: 404 }, { status: 404 })
    }
    return HttpResponse.json(row)
  }),
  http.get('/api/profile/me', async () => {
    return HttpResponse.json({
      id: 'u1',
      displayName: 'Demo user',
      email: 'demo@example.com',
    })
  }),
  http.get('/api/dashboard/summary', async () => {
    return HttpResponse.json({
      widgets: [
        { id: 'a', value: 12 },
        { id: 'b', value: 30 },
      ],
    })
  }),
]
