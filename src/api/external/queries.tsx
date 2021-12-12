import {
  useQuery,
} from 'react-query'

import API from '.'

export const useGetAnimes = (api: API) => {
  return useQuery('getAllAnimes', api.animes().getAll)
}