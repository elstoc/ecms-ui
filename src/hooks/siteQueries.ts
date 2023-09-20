import { axiosSecureClient } from '../api/axiosClients';
import { useQuery } from '@tanstack/react-query';

import { ComponentMetadata } from '../types/Site';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export const useSiteNav = () => {
    return useQuery({
        queryKey: ['siteNav'],
        queryFn: async () => (await axiosSecureClient.get<ComponentMetadata[]>('site/nav')).data,
        refetchInterval
    });
};
