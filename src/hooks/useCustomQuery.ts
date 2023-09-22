import { useQuery } from '@tanstack/react-query';

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
    const { isLoading, isError, error, data } = useQuery(options);
    return [{ isLoading, isError, error }, data ];
};
