import { useMemo, createContext, useContext, PropsWithChildren, useState, useEffect } from 'react';
import Axios, { AxiosInstance} from 'axios'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { getCache, setCache, deleteCache } from './caching'

interface IJamContext {
  axios: AxiosInstance;
  user: any;
  setUser: React.Dispatch<any>;
}

interface IProps {
  baseUrl: string;
}

const JamContext = createContext({} as IJamContext);

const queryClient = new QueryClient()

export const JamProvider: React.FC<PropsWithChildren<IProps>> = ({ baseUrl, children }) => {
  const [user, setUser] = useState(null);
  const [isCacheLoaded, setIsCacheLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const cachedUser = await getCache('user')
      setUser(cachedUser)
      setIsCacheLoaded(true)
    })()
  }, [])

  useEffect(() => {
    if (!user) {
      deleteCache('user')
      return
    }

    setCache('user', user)
  }, [user])

  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL: baseUrl,
      timeout: 30 * 1000,
    });

    axios.interceptors.request.use(async(config) => {

      const cachedUser = await getCache('user')

      if (cachedUser && config.headers) {
        config.headers.Authorization = `Bearer ${cachedUser.accessToken}`;
      }

      return config;
    });

    return axios;
  }, [baseUrl]);

  if (!isCacheLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <JamContext.Provider 
        value={{
          axios,
          user,
          setUser,
        }}
      >
        {children}
      </JamContext.Provider>
    </QueryClientProvider>
  );
}

export const useJam = () => {
  return useContext(JamContext);
}