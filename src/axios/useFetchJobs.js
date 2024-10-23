import { useMemo } from 'react';
import useSWR from 'swr';
import axiosInstance from './utils';


export const fetcher = (url) => axiosInstance.get(url)

const useFetchJobs = () => {
  const { data, error, isLoading } = useSWR('/api/user/getalljobs', fetcher);

  const memoizedJobs = useMemo(() => {
    return {
      jobs: data || [],
      isLoading,
      error,
    };
  }, [data, isLoading, error]);

  return memoizedJobs;
};

export default useFetchJobs;
