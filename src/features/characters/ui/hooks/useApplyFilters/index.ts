'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export type FiltersOptions = {
  status: string | null
  gender: string | null
  species: string | null
}

export const useApplyFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const status = searchParams.get("status")
  const gender = searchParams.get("gender")
  const species = searchParams.get("species")

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const onApplyFilters = (filters: FiltersOptions) => {
    const params = new URLSearchParams()

    if (filters.status) params.set("status", filters.status)
    if (filters.gender) params.set("gender", filters.gender)
    if (filters.species) params.set("species", filters.species)

    params.set("page", "1")

    router.replace(`/?${params.toString()}`)
    setIsOpen(false)
  }

  const cleanFilters = () => {
    router.push('/')
    setIsOpen(false)
  }

  return {
    isOpen,
    toggleOpen,
    cleanFilters,
    onApplyFilters,
    status,
    gender,
    species
  }
}