import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const UserContext = createContext({} as any);

export const UserProvider: React.FC = (props) => {
  const { children } = props;

  const cachedUser = localStorage.getItem('user')
  const [user, setUser] = useState(cachedUser ? JSON.parse(cachedUser) : null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};