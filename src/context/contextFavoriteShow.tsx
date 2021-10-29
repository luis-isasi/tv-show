import { createContext, useContext, useState, useEffect } from 'react'

import type { Show } from '@Types'
import { USER_FAVORITES_SHOWS } from '@Constants'

interface ContextFavoriteShow {
  favoriteShows: Show[]
  addNewFavoriteShow: (show: Show) => void
  deleteFavoriteShow: (idShow: number) => void
}

//we create context theme
const ContextFavoriteShow = createContext<ContextFavoriteShow | undefined>(
  undefined
)

//Provider of context theme
export const ContextFavoriteShowProvider = ({ children }) => {
  const [favoriteShows, setFavoriteShows] = useState<Show[] | []>([])

  useEffect(() => {
    //obteniendo los shows favoritos
    const favoriteShowsFromLS = JSON.parse(
      localStorage.getItem(USER_FAVORITES_SHOWS)
    )

    if (favoriteShowsFromLS) {
      setFavoriteShows(favoriteShowsFromLS)
    } else {
      localStorage.setItem(USER_FAVORITES_SHOWS, JSON.stringify([]))
    }
  }, [])

  const addNewFavoriteShow = (show: Show) => {
    const newFavoriteShows = [...favoriteShows, show]
    localStorage.setItem(USER_FAVORITES_SHOWS, JSON.stringify(newFavoriteShows))
    setFavoriteShows(newFavoriteShows)
  }

  const deleteFavoriteShow = (idShow: number) => {
    const newFavoriteShows = favoriteShows.filter((show) => show.id !== idShow)
    localStorage.setItem(USER_FAVORITES_SHOWS, JSON.stringify(newFavoriteShows))
    setFavoriteShows(newFavoriteShows)
  }

  return (
    <ContextFavoriteShow.Provider
      value={{ favoriteShows, addNewFavoriteShow, deleteFavoriteShow }}
    >
      {children}
    </ContextFavoriteShow.Provider>
  )
}

export const useContextFavoriteShow = () => {
  const theme = useContext(ContextFavoriteShow)

  if (theme === undefined) {
    throw new Error('You must be whithin Provider context Favorite Shows')
  }

  return theme
}
