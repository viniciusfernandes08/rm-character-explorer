'use client'

import { FC } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { LuChevronFirst, LuChevronLast } from "react-icons/lu"
import { usePagination } from "../../hooks"

type Props = {
  lastPage: number
  className?: string
}

const PaginationControls: FC<Props> = ({ lastPage, className }) => {
  const { 
    currentPage,
    goNextPage, 
    goPrevPage, 
    goFirstPage, 
    goLastPage 
  } = usePagination(lastPage)

  const icons = [
    { id: 1, icon: <LuChevronFirst />, fn: goFirstPage, label: 'Ir para a primeira página' },
    { id: 2, icon: <IoIosArrowBack />, fn: goPrevPage, label: 'Ir para a página anterior' },
    { id: 3, icon: <IoIosArrowForward />, fn: goNextPage, label: 'Ir para a próxima página' },
    { id: 4, icon: <LuChevronLast />, fn: goLastPage, label: 'Ir para a última página' }
  ]

  return (
    <div className={`w-full flex justify-end ${className}`}>
      <div className="flex gap-4">
        <p className="text-gray-800">
          Página atual: {currentPage}
        </p>
        {icons.map((icon) => (
          <button
            key={icon.id} 
            type="button"
            className="bg-blue-600 rounded-lg text-white p-1 flex justify-center cursor-pointer
              disabled:bg-blue-400"
            onClick={icon.fn}
            disabled={
              [1, 2].includes(icon.id) && currentPage === 1 ? 
                true : 
                  [3, 4].includes(icon.id) && currentPage === lastPage ? 
                    true  : 
                      false
            }
            aria-label={icon.label}
          >
            {icon.icon}
          </button>
        ))}
      </div>
    </div>
  )
}

export { PaginationControls }