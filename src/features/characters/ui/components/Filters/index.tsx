'use client'

import { FC } from "react"
import { FaSliders } from "react-icons/fa6"
import { useApplyFilters } from "../../hooks"
import { SheetFilters } from "../SheetFilters"

type Props = {
  className?: string
}

const Filters: FC<Props> = ({ className = '' }) => {
  const {
    isOpen, 
    toggleOpen, 
    cleanFilters,
    onApplyFilters, 
    status, 
    gender, 
    species 
  } = useApplyFilters()

  return (
    <aside className={`w-full ${className}`}>
      <div className="flex w-[80%] mx-auto justify-end px-4">
        <button
          className="bg-transparent flex gap-2 items-center cursor-pointer px-2 rounded-full 
            border border-gray-600 text-gray-600"
          onClick={toggleOpen}
        >
          <FaSliders />
          <h3 className="font-sans font-medium">Filtros</h3>
        </button>
      </div>
      <SheetFilters 
        isOpen={isOpen} 
        toggleOpen={toggleOpen}
        cleanFilters={cleanFilters}
        onApplyFilters={onApplyFilters}
        statusSelected={status}
        genderSelected={gender}
        specieSelected={species}
      />
    </aside>
  )
}

export { Filters }