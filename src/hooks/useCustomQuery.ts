import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { config } from '../utils/config';

type QueryState = {
    isPending: boolean,
    isError: boolean,
    error: unknown
};

type QueryOptions<T> = {
    queryKey: (string | number)[],
    queryFn: () => Promise<T>
}

export const useCustomQuery = <T>(options: QueryOptions<T>): [QueryState, T | undefined] => {
    const { isPending, isError, error, data } = useQuery({ ...options, placeholderData: keepPreviousData, refetchInterval: (query) => query.state.error ? 0 : config.queryRefetchInterval });
    return [{ isPending, isError, error }, data ];
};
