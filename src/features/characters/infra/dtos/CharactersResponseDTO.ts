import { CharacterDTO } from "./CharacterDTO"
import { InfoDTO } from "./InfoDTO"

export interface CharactersResponseDTO {
  info: InfoDTO
  results: CharacterDTO[]
}