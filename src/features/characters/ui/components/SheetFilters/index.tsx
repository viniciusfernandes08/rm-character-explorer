'use client'

import { Sheet } from '@/shared/ui/components/Sheet'
import { FiltersOptions } from '@/features/characters'
import { FC, useState } from 'react'

type Props = {
  isOpen: boolean
  toggleOpen: () => void
  cleanFilters: () => void
  onApplyFilters: (filters: FiltersOptions) => void
  statusSelected: string | null
  genderSelected: string | null
  specieSelected: string | null
}

const filterOptions: Record<keyof FiltersOptions, readonly string[]> = {
  status: ['Alive', 'Dead', 'Unknown'],
  gender: ['Female', 'Male', 'Genderless', 'Unknown'],
  species: [
    'Human',
    'Alien',
    'Humanoid',
    'Mythological Creature',
    'Disease',
    'Animal'
  ]
} as const

const buttonClasses = "rounded-2xl px-2 cursor-pointer font-sans"

const SheetFilters: FC<Props> = ({ 
  isOpen, 
  toggleOpen,
  cleanFilters,
  onApplyFilters,
  statusSelected,
  genderSelected,
  specieSelected
}) => {
  const [filters, setFilters] = useState<FiltersOptions>({
    status: statusSelected,
    gender: genderSelected,
    species: specieSelected
  })

  const toggleFilter = (key: keyof FiltersOptions, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
  }

  return (
    <Sheet 
      title="Filtros"
      isOpen={isOpen}
      toggleOpen={toggleOpen}
    >
      <div className="w-full flex flex-col p-2 gap-4">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className="flex flex-col w-full px-4 gap-2">
            <h3 className="text-black text-sm lg:text-base capitalize">
              {key}
            </h3>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => {
                const value = option.toLowerCase()
      
                return (
                  <button
                    key={option}
                    className={`${buttonClasses}
                      ${filters[key as keyof FiltersOptions] === value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-800'
                      }`
                    }
                    onClick={() =>
                      toggleFilter(key as keyof FiltersOptions, value)
                    }
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <div className='flex w-full justify-center gap-5 
          absolute left-0 right-0 bottom-4'
        >
          <button 
            className='bg-white border border-blue-600 text-blue-600 rounded-2xl px-4 
              cursor-pointer'
            onClick={cleanFilters}
          >
            Limpar
          </button>
          <button
            className='bg-blue-600 text-white rounded-2xl px-4 cursor-pointer'
            onClick={handleApply}
          >
            Filtrar
          </button>
        </div>
      </div>
    </Sheet>
  )
}

export { SheetFilters }