import { useSuspenseQuery } from '@tanstack/react-query';

import { config } from '../../utils';

type QueryOptions<T> = {
    queryKey: (string | number)[];
    queryFn: () => Promise<T>;
    staleTime?: number;
    refetchInterval?: number;
    gcTime?: number;
}

export const useCustomQuery = <T>(options: QueryOptions<T>): T => {
    const { data } = useSuspenseQuery({ refetchInterval: config.queryRefetchInterval, ...options });
    return data;
};
