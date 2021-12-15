// Caso o boilerplate seja usado também no React-Native, usar https://github.com/react-native-async-storage/async-storage
// A mesma é compatível tanto com browser e native, porém tudo virará async (por este motivo todas as funções aqui estão retornando uma promise.)

export const setCache = async (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const deleteCache = async (key: string) => {
  localStorage.removeItem(key)
}

export const getCache = async (key: string) => {
  const cache = localStorage.getItem(key)
  if (!cache) return null
  return JSON.parse(cache)
}