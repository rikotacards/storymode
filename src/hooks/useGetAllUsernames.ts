import { getUsernames } from '@/firebase/db';
import useSWR from 'swr';

const fetcher = ([username]: string[]) => {
  return getUsernames().then((res) => {
    if(res){
      return res
    }
  })
}
export const useGetAllUsernames = () => {
  const {data, error, isLoading} = useSWR(['useGetAllUsernames'], fetcher);
  return {
    data, 
    error, 
    isLoading
  }
}