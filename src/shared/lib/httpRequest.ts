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
        next: { revalidate },
        signal: controller.signal
      })

      if (!res.ok) {
        let errorMessage = 'Houve um erro ao processar a requisição'
      
        try {
          const error = await res.json()
          errorMessage = error?.message ?? errorMessage
        } catch {}
      
        throw new Error(errorMessage)
      }

      return res.json()
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Tempo de requisição excedido')
        }
        
        throw new Error(error.message)
      }

      throw error
    } finally {
      clearTimeout(timeoutId)
    }
  }
}