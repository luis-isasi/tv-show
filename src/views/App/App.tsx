import { useState } from 'react'
import { useQuery } from 'react-query'
import { getShows } from '@Services'

import { useContextFavoriteShow } from '@Context/contextFavoriteShow'
import { renderShows } from './utils'

const App = () => {
  const { data, isLoading, error } = useQuery('shows', () => getShows())
  const [isSeeFavorites, setIsSeeFavorites] = useState<boolean>(false)
  const { favoriteShows } = useContextFavoriteShow()

  const handleClick = () => {
    setIsSeeFavorites(!isSeeFavorites)
  }

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="flex flex-col mb-4">
        <h1 className="text-4xl font-semibold mb-4">My TV Shows</h1>
        <input
          type="text"
          placeholder="Search"
          className="border-1 border-gray-500 rounded-md py-[2px] px-3 text-base outline-none mb-4"
        />
        <button
          type="button"
          onClick={handleClick}
          className="rounded-md bg-indigo-600 hover:bg-indigo-500 py-[2px] px-3 text-white"
        >
          {isSeeFavorites ? 'See All' : 'See Favorites'}
        </button>
      </div>
      <div className="w-full max-w-4xl flex flex-col">
        {isLoading && <p className="text-xl">Loading... 😀</p>}
        {error && (
          <p className="text-xl">Error, Vuelve a recargar la pagína web 😕</p>
        )}
        {isSeeFavorites &&
          renderShows({ showlist: favoriteShows, favoriteShows })}
        {!isSeeFavorites &&
          !isLoading &&
          !error &&
          data &&
          renderShows({ showlist: data, favoriteShows })}
      </div>
    </div>
  )
}

export default App
