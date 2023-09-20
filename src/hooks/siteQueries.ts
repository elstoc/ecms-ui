import { useQuery } from '@tanstack/react-query';

import { getSiteNav } from '../api';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export const useSiteNav = () => {
    return useQuery({
        queryKey: ['siteNav'],
        queryFn: () => getSiteNav(),
        refetchInterval
    });
};
