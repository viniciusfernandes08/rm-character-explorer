import { httpRequest } from "@/shared/lib/httpRequest";
import { ICharactersRepository } from "../../domain/interfaces/ICharactersRepository";
import { CharactersResponseDTO } from "../dtos/CharactersResponseDTO";

type QueryParams = Record<string, string | number | boolean>

export class CharactersRepository implements ICharactersRepository {
  async getAll(queryParams?: QueryParams): Promise<CharactersResponseDTO> {
    return httpRequest.get<CharactersResponseDTO>('character', queryParams)
  }
}