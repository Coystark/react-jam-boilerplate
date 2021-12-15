import {
  useQuery,
} from 'react-query'
import { useJam } from '.'

export const useGetAnimes = () => {
  const { axios } = useJam()
  return useQuery('getAllAnimes', async (data) => {
    const response = await axios.get('animes', {
      params: data,
    })

    return response.data
  })
}