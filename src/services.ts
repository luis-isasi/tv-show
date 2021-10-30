import { fetcher } from '@Utils'
import { Show } from '@Types'

export const getShows = () => {
  return fetcher<Show[]>({
    endpoint: '/shows',
    method: 'GET',
  })
}

export const searchShow = (text: string) => {
  return fetcher<{ score: number; show: Show }[]>({
    endpoint: `/search/shows?q=${text}`,
  })
}
