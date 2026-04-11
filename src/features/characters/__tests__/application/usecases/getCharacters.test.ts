import { getCharacters } from '@/features/characters/application'
import { ICharactersRepository } from "../../../domain/interfaces/ICharactersRepository"

describe('getCharacters', () => {
  it('deve retornar a lista de personagens', async () => {
    const mockResponse = {
      info: {
        count: 1,
        pages: 1
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          image: 'https://rick.com/image.png',
          species: 'Human'
        },
      ]
    }

    const repository: ICharactersRepository = {
      getAll: jest.fn().mockResolvedValue(mockResponse)
    }

    const result = await getCharacters(repository)

    expect(repository.getAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockResponse)
  })

  it('deve chamar o repository com filtros', async () => {
    const mockResponse = {
      info: {
        count: 0,
        pages: 0
      },
      results: []
    }

    const repository: ICharactersRepository = {
      getAll: jest.fn().mockResolvedValue(mockResponse)
    }

    const filters = {
      page: 2,
      status: 'alive'
    }

    await getCharacters(repository, filters)

    expect(repository.getAll).toHaveBeenCalledWith(filters)
  })

  it('deve propagar o erro do repository', async () => {
    const repository: ICharactersRepository = {
      getAll: jest.fn().mockRejectedValue(new Error('Erro ao buscar personagens'))
    }

    await expect(getCharacters(repository)).rejects.toThrow('Erro ao buscar personagens')
  })
})