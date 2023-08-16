import { apiGet } from '../utils/apiServices';
import { useQuery } from '@tanstack/react-query';

import { ComponentMetadata } from '../types/Site';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export const useSiteNav = () => {
    return useQuery({
        queryKey: ['siteNav'],
        queryFn: () => apiGet<ComponentMetadata[]>('site/nav'),
        refetchInterval
    });
};
