import { useQuery } from '@tanstack/react-query';

import { apiSecure } from '../utils/apiClient';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export type User = {
    id: string;
    fullName?: string;
    roles?: string[];
    hashedPassword?: string;
};

export const useUserInfo = () => {
    const queryName = 'auth/get-user-info';
    const urlPath = 'auth/get-user-info';

    return useQuery({
        queryKey: [queryName],
        keepPreviousData: true,
        queryFn: async () => (await apiSecure.get<User>(urlPath)).data,
        refetchInterval
    });
};
