import { ICharactersRepository } from "@/features/characters/domain/interfaces/ICharactersRepository"

type QueryParams = Record<string, string | number | boolean >

export async function getCharacters(
  repository: ICharactersRepository,
  queryParams?: QueryParams
) {
  return repository.getAll(queryParams)
}