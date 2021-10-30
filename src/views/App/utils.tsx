import type { Show } from '@Types'

import ShowView from '@Components/ShowView'

export const renderShows = ({
  showlist,
  favoriteShows,
}: {
  showlist: Show[]
  favoriteShows: Show[]
}) => {
  return showlist.map((show) => {
    const favoriteShowsFilter = favoriteShows.filter((favoriteShow) => {
      return favoriteShow.id === show.id
    })
    const isFavorite = favoriteShowsFilter.length > 0

    return <ShowView key={show.id} show={show} isFavorite={isFavorite} />
  })
}
