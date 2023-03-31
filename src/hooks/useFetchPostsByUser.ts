import { getPostsByUid } from '@/firebase/db'
import useSWR from 'swr'

const fetcher = ([username]: string[]) => {
  return getPostsByUid(username).then((res) => {
    if(res){
      return res
    } 
    return []
  })
}
export const  useFetchPostsByUser = (username?: string | string[]) => {
  const {data, error, isLoading} = useSWR([username, 'useFetchPostsByUser'], fetcher);
  return {
    posts: data || [], 
    error, 
    isLoading
  }
}