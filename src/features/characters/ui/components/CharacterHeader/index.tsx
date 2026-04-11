import Image from "next/image"

const CharacterHeader = () => {
  return (
    <header className="w-[80%] mx-auto flex flex-col items-center py-2">
      <Image
        alt="Rick and Morty" 
        src={'/images/rick_and_morty.svg'} 
        width={250} 
        height={50} 
      />
      <h1 className="text-center text-xl lg:text-3xl text-gray-600 py-4 font-semibold font-serif">
        Character Explorer
      </h1>
    </header>
  )
}

export { CharacterHeader }