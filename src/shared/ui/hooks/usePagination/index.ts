'use client'

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export const usePagination = (lastPage: number) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get('page') ?? 1)

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))

    router.replace(`?${params.toString()}`)
  }

  const goNextPage = () => updatePage(currentPage + 1)
  const goPrevPage = () => updatePage(currentPage - 1)
  const goFirstPage = () => updatePage(1)
  const goLastPage = () => updatePage(lastPage)

  // faz o prefetch da próxima página
  useEffect(() => {
    if (currentPage < lastPage) {
      const params = new URLSearchParams(searchParams)
      params.set('page', String(currentPage + 1))

      router.prefetch(`?${params.toString()}`)
    }
  }, [currentPage, lastPage, router, searchParams])

  return {
    currentPage,
    goNextPage,
    goPrevPage,
    goFirstPage,
    goLastPage
  }
}