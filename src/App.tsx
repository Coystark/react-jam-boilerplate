import React from 'react';

import { useCreateAnime, useSignIn, useSignOut } from './jam/mutations';
import { useGetAnimes } from './jam/queries';
import { useJam } from './jam';

function App() {
  const { user } = useJam()

  const createAnime = useCreateAnime()
  const { data: animes, isSuccess, isLoading } = useGetAnimes()

  const signIn = useSignIn()
  const signOut = useSignOut()

  const handleSignIn = async () => {
    await signIn.mutateAsync({
      username: 'caio',
      password: '898748'
    })
  }

  const handleSignOut = async () => {
    signOut.mutate()
  }

  const handleCreateAnime = async () => {
    await createAnime.mutateAsync({ name: 'Bleach' })
  }

  return (
    <div>
      {user && (
        <div>Olá {user.email}</div>
      )}

      {isLoading && (
        <div>Carregando lista...</div>
      )}

      <ul>
         {isSuccess && animes.map((anime: any, index: any) => (
           <li key={index}>{anime.name}</li>
         ))}
       </ul>

      <button onClick={handleSignIn}>Login</button>
      <button onClick={handleCreateAnime}>Criar anime</button>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default App;
