import { FC } from "react"
import Image from "next/image"
import { Character } from "@/features/characters/domain/entities/character"

type Props = {
  character: Character
}

const CharacterCard: FC<Props> = ({ character }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-xl flex flex-col items-center p-2"
    >
      <Image
        alt={character.name} 
        src={character.image} 
        width={120}
        height={120}
      />
      <p className="text-gray-800 mt-2 text-wrap text-center">
        {character.name}
      </p>
      <span className="text-gray-600 text-sm truncate">
        {character.species}
      </span>
    </div>
  )
}

export { CharacterCard }