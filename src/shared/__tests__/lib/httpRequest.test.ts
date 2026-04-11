import { httpRequest } from "@/shared/lib/httpRequest";

describe('httpRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('deve retornar o json em caso de sucesso', async () => {
    const mockData = {
      results: [
        {
          id: 1,
          name: 'Rick Sanchez'
        }
      ]
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData)
    }) as jest.Mock

    const result = await httpRequest.get('character')

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockData)
  })

  it('deve lançar erro quando a api retornar erro', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        message: 'Personagem não encontrado'
      })
    }) as jest.Mock

    await expect(
      httpRequest.get('character')
    ).rejects.toThrow('Personagem não encontrado')
  })

  it('deve lançar erro de timeout quando a requisição exceder o tempo limite', async () => {
    const abortError = new Error('The operation was aborted')
    abortError.name = 'AbortError'

    global.fetch = jest.fn().mockRejectedValue(abortError) as jest.Mock

    await expect(
      httpRequest.get('character')
    ).rejects.toThrow('Tempo de requisição excedido')
  })
})