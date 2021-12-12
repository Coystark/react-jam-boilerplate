import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useApi } from './contexts/ApiContext';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import axios from 'axios';
import { useCreateAnime, useSignIn } from './api/external/mutations';
import { useGetAnimes } from './api/external/queries';


function App() {
  const api = useApi()

  const createAnime = useCreateAnime(api)
  const { data, isFetched } = useGetAnimes(api)
  const signIn = useSignIn(api)

  const handleSignIn = async () => {
    signIn.mutateAsync({
      username: 'caio',
      password: '898748'
    })
  }

  const logout = async () => {
    api.auth().signOut()
  }

  const handleCreateAnime = async () => {
    createAnime.mutateAsync({ name: 'Bleach' })
  }


  return (
    <div>
      <ul>
         {isFetched && data.map((anime: any) => (
           <li key={anime.name}>{anime.name}</li>
         ))}
       </ul>

      <button onClick={handleSignIn}>Login</button>
      <button onClick={handleCreateAnime}>Criar anime</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
