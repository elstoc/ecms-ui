import { useQuery } from '@tanstack/react-query';

import { getSiteNav } from '../api';

export const useSiteNav = () => {
    return useQuery({
        queryKey: ['siteNav'],
        queryFn: () => getSiteNav(),
    });
};
