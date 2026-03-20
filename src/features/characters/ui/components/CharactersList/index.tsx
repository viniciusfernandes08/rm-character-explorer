import { PaginationControls } from "@/shared"
import { CharacterCard } from "../CharacterCard"
import { CharactersRepository } from "@/features/characters/infra/repositories/characters.repository"
import { getCharacters } from "@/features/characters/application/usecases/getCharacters"
import { Filters } from "../Filters"
import { FC } from "react"

type Props = {
  page: number
  status: string
  gender: string
  species: string
}

const repository = new CharactersRepository()

const CharactersList: FC<Props> = async ({ page, status, gender, species }) => {  
  const characters = await getCharacters(repository, { 
    page,
    status,
    gender,
    species 
  })

  return (
    <>
      <Filters />
      <section 
        className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 pt-4 pb-10"
      >
        {characters.results.map((character) => (
          <CharacterCard
            key={character.id} 
            character={character} 
          />
        ))}
        <PaginationControls 
          className="px-2 col-span-1 md:col-span-2 lg:col-span-4"
          lastPage={characters.info.pages} 
        />
      </section>
    </>
  )
}

export { CharactersList }