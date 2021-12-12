import {
  useMutation,
  useQueryClient,
} from 'react-query'

import API from '.'

export const useCreateAnime = (api: API) => {
  const queryClient = useQueryClient()

  return useMutation(api.animes().create, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllAnimes')
    },
  })
}

export const useSignIn = (api: API) => {
  return useMutation(api.auth().login)
}