import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '../api';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export const useUserInfo = () => {
    return useQuery({
        queryKey: ['user-info'],
        keepPreviousData: true,
        queryFn: () => getUserInfo(),
        refetchInterval
    });
};
