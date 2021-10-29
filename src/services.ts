import { fetcher } from '@Utils'
import { Show } from '@Types'

export const getShows = () => {
  return fetcher<Show[]>({
    endpoint: '/shows',
    method: 'GET',
  })
}
