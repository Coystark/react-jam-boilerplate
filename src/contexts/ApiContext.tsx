import React, {
  createContext,
  useContext,
  useState,
} from 'react';
import API from '../api/external';
import { useUser } from './UserContext';

const ApiContext = createContext({} as API);

export const ApiProvider: React.FC = ({ children }) => {
  const { setUser } = useUser()
 
  const [api] = useState(
    new API({
      baseUrl: 'http://localhost:3000',
      getCache: async () => {
        const cachedUser = localStorage.getItem('user')
        if (!cachedUser) return null
        return JSON.parse(cachedUser)
      },
      setCache: async (data: any) => {
        if (!data) {
          setUser(null)
          localStorage.removeItem('user')
          return
        }

        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
      },
    })
  );

  return (
    <ApiContext.Provider
      value={api}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  return context;
};