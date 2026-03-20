const baseUrl = process.env.BASE_URL

type QueryParams = Record<string, string | number | boolean>

export const httpRequest = {
  async get<T>(path: string, queryParams?: QueryParams, revalidate = 60): Promise<T> {
    if (!baseUrl) throw new Error('BASE_URL não definida')

    const normalizePath = path.replace(/^\/+/, '')

    const query = queryParams
      ? `?${new URLSearchParams(
          Object.entries(queryParams)
            .filter(([, value]) => value !== undefined && value !== '')
            .map(([key, value]) => [key, String(value)])
        )}`
      : ''

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    try {
      const res = await fetch(`${baseUrl}/${normalizePath}${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        next: { revalidate },
        signal: controller.signal
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message ?? 'Houve um erro ao processar a requisição')
      }

      return res.json()
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Tempo de reuisição excedido')
        }
        
        throw new Error(error.message)
      }

      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }
}