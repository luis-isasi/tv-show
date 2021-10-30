import { useState, useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import _debounce from 'lodash.debounce'

import { useContextFavoriteShow } from '@Context/contextFavoriteShow'
import { getShows, searchShow } from '@Services'
import ButtonPrimary from '@Components/buttons/ButtonPrimary'
import { renderShows } from './utils'
import type { Show } from '@Types'

const App = () => {
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery('shows', () => getShows())
  const { favoriteShows } = useContextFavoriteShow()

  const [textShow, setTextShow] = useState<string>('')
  const [showsByText, setShowsByText] = useState<Show[]>([])
  const [isSeeFavorites, setIsSeeFavorites] = useState<boolean>(false)

  const handleClick = () => {
    setIsSeeFavorites(!isSeeFavorites)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTextShow(value)
    debounceHandleChange(value)
  }

  const debounceHandleChange = useCallback(
    _debounce(async (value: string) => {
      const data = await queryClient.fetchQuery(`showsBy${value}`, () =>
        searchShow(value)
      )
      const shows = data.map(({ show }) => show)

      setShowsByText(shows)
    }, 400),
    []
  )

  return (
    <div className="w-full max-w-4xl mx-auto px-5 h-auto flex flex-col items-center">
      <div className="flex flex-col items-center my-4">
        <h1 className="text-4xl text-center font-semibold mb-4">My TV Shows</h1>
        <input
          type="text"
          value={textShow}
          onChange={handleChange}
          placeholder="Search"
          className="border-1 border-gray-500 rounded-md py-[2px] px-3 text-base outline-none mb-4"
        />
        <ButtonPrimary onClick={handleClick}>
          {isSeeFavorites ? 'View All' : 'View Favorites'}
        </ButtonPrimary>
      </div>
      <div className="w-full max-w-4xl flex flex-col text-center">
        {isLoading && <p className="text-xl">Loading... 😀</p>}
        {error && (
          <p className="text-xl">Error, Vuelve a recargar la pagína web 😕</p>
        )}
        {isSeeFavorites &&
          renderShows({ showlist: favoriteShows, favoriteShows })}
        {!isSeeFavorites &&
          !showsByText.length &&
          !textShow &&
          !isLoading &&
          !error &&
          data &&
          renderShows({ showlist: data, favoriteShows })}
        {showsByText.length > 1 &&
          textShow &&
          renderShows({ showlist: showsByText, favoriteShows })}
      </div>
    </div>
  )
}

export default App
