import { useQuery } from 'react-query'
import { getShows } from '@Services'

import { useContextFavoriteShow } from '@Context/contextFavoriteShow'
import ShowView from '@Components/ShowView'

const App = () => {
  const { data, isLoading, error } = useQuery('shows', () => getShows())
  const { favoriteShows } = useContextFavoriteShow()

  console.log({ favoriteShows })

  const renderShows = () => {
    return data.map((show) => {
      const favoriteShowsFilter = favoriteShows.filter((favoriteShow) => {
        return favoriteShow.id === show.id
      })
      const isFavorite = favoriteShowsFilter.length > 0

      return <ShowView key={show.id} show={show} isFavorite={isFavorite} />
    })
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
        <button className="rounded-md bg-indigo-600 hover:bg-indigo-500 py-[2px] px-3 text-white">
          View favorites
        </button>
      </div>
      <div className="w-full max-w-4xl flex flex-col">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error, Vuelve a recargar la pagína web 😕</p>}
        {!isLoading && !error && data && renderShows()}
      </div>
    </div>
  )
}

export default App
