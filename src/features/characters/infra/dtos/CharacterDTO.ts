import { CharacterLocationDTO } from "./CharacterLocationDTO"

export interface CharacterDTO {
  id: number
  name: string
  status: "Alive" | "Dead" | "unknown"
  species: string
  type: string
  gender: "Female" | "Male" | "Genderless" | "unknown"
  origin: CharacterLocationDTO
  location: CharacterLocationDTO
  image: string
  episode: string[]
  url: string
  created: string
}