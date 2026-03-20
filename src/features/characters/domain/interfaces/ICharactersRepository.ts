import { CharactersResponseDTO } from "@/features/characters/infra/dtos/CharactersResponseDTO";

type QueryParams = Record<string, string | number | boolean>

export interface ICharactersRepository {
  getAll(queryParams?: QueryParams): Promise<CharactersResponseDTO>
}