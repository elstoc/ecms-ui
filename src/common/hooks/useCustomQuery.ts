import { useSuspenseQuery } from '@tanstack/react-query';
import { config } from '../../utils/config';

type QueryOptions<T> = {
    queryKey: (string | number)[],
    queryFn: () => Promise<T>
}

export const useCustomQuery = <T>(options: QueryOptions<T>): T => {
    const { data } = useSuspenseQuery({ ...options, refetchInterval: config.queryRefetchInterval });
    return data;
};
