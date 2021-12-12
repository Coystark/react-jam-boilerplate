import axios, { AxiosInstance } from 'axios'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'


interface IAPI {
  baseUrl: string;
  setCache: any;
  getCache: any;
}

class API {
  private instance: AxiosInstance

  private setCache: any;

  constructor(props: IAPI) {

    this.instance = axios.create({
      baseURL: props.baseUrl,
      timeout: 30 * 1000,
    })

    this.setCache = props.setCache

    this.instance.interceptors.request.use(async (config) => {

      const token = (await props.getCache())?.accessToken

      return {
        ...config,
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      }
    })
  }

  auth() {
    return {
      login: async (data: any) => {
        const response = await this.instance.post('/auth/login', data)
        this.setCache(response.data)
      },
      signOut: () => {
        this.setCache(null)
      },
    }
  }

  animes() {
    return {
      getAll: async (data?: any) => {
        const response = await this.instance.get('/animes', {
          params: data,
        })
        return response.data
      },
      create: async (data: any) => {
        
        await this.instance.post('/animes', data)
      },
    }
  }
}

export default API