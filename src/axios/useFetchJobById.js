import { useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from './useFetchJobs';





const useFetchJobById = (id) => {
  const { data, error, isLoading } = useSWR(`/api/user/getjobsbyid/${id}`, fetcher);
    
    
  const memoizedJobs = useMemo(() => {
    return {
      job: data?.data || {},
      isLoading,
      error,
    };
  }, [data?.data, isLoading, error]);

  return memoizedJobs;
};

export default useFetchJobById;