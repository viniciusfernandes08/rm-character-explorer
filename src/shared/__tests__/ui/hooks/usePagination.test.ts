import { usePagination } from "@/shared/ui"
import { act, renderHook } from "@testing-library/react"

const mockReplace = jest.fn()
const mockPrefetch = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
    prefetch: mockPrefetch
  }),
  useSearchParams: () => new URLSearchParams("page=1")
}))

describe('usePagination', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve ir para a próxima página', () => {
    const { result } = renderHook(() => usePagination(10))

    act(() => {
      result.current.goNextPage()
    })

    expect(mockReplace).toHaveBeenCalledWith("?page=2")
  })

  it('deve fazer o prefetch da próxima página', () => {
    renderHook(() => usePagination(10))

    expect(mockPrefetch).toHaveBeenCalledWith("?page=2")
  })
})