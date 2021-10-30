import {
  MEDIAQUERY_SM,
  MEDIAQUERY_MD,
  MEDIAQUERY_LG,
  MEDIAQUERY_XL,
  MEDIAQUERY_2X1,
} from '@Constants'

//Media Query
export type MediaQuery =
  | typeof MEDIAQUERY_SM
  | typeof MEDIAQUERY_MD
  | typeof MEDIAQUERY_LG
  | typeof MEDIAQUERY_XL
  | typeof MEDIAQUERY_2X1

export interface Show {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string
  officialSite: string
  schedule: {
    time: string
    days: string[]
  }
  rating: {
    average: number
  }
  weight: number
  network: {
    id: number
    name: string
    country: {
      name: string
      code: string
      timezone: string
    }
  }
  webChannel?: any
  dvdCountry?: any
  externals: {
    tvrage: number
    thetvdb: number
    imdb: string
  }
  image: {
    medium: string
    original: string
  }
  summary: string
  updated: number
  _links: {
    self: {
      href: string
    }
    previousepisode: {
      href: string
    }
  }
}
