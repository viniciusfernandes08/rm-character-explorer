import { CharacterCard } from '@/features/characters/ui'
import { render, screen } from '@testing-library/react'

describe('CharacterCard', () => {
  it('deve renderizar os dados do personagem corretamente', () => {
    const character = {
      id: 1,
      name: 'Rick Sanchez',
      image: 'https://rick.com/image.png',
      species: 'Human'
    }

    render(<CharacterCard character={character} />)

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()

    const image = screen.getByAltText('Rick Sanchez')
    expect(image).toBeInTheDocument()
  })
})