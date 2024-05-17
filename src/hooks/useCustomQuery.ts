import { useQuery } from '@tanstack/react-query';
import { config } from '../utils/config';

type QueryState = {
    isLoading: boolean,
    isError: boolean,
    error: unknown
};

type QueryOptions<T> = {
    queryKey: (string | number)[],
    queryFn: () => Promise<T>
}

export const useCustomQuery = <T>(options: QueryOptions<T>): [QueryState, T | undefined] => {
    const { isLoading, isError, error, data } = useQuery({ ...options, refetchInterval: (query) => query.state.error ? 0 : config.queryRefetchInterval });
    return [{ isLoading, isError, error }, data ];
};
