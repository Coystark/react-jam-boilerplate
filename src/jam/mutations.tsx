import {
  useMutation,
  useQueryClient,
} from 'react-query'
import { useJam } from '.'
// import { publish } from './events'

export const useCreateAnime = () => {
  const { axios } = useJam()
  const queryClient = useQueryClient()

  return useMutation((data: any) => {
    return axios.post('animes', data)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAllAnimes')
    },
  })
}

export const useSignIn = () => {
  const { axios, setUser } = useJam()

  return useMutation(async (data: any) => {
    const response = await axios.post('/auth/login', data)

    setUser(response.data)

    // publish('OnUserSignIn', response.data)
  })
}

export const useSignOut = () => {
  const { setUser } = useJam()

  return useMutation(async () => {
    setUser(null)
    
    // publish('OnUserSignOut')
  })
}