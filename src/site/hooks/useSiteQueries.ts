import { getSiteConfig, getSiteComponents } from '../api';
import { useCustomQuery } from '../../common/hooks';

const useSiteComponents = () => {
    return useCustomQuery({
        queryKey: ['siteComponents'],
        queryFn: getSiteComponents,
        staleTime: 60*60*1000,
        refetchInterval: 60 * 60 * 1000
    });
};

const useSiteConfig = () => {
    return useCustomQuery({
        queryKey: ['siteConfig'],
        queryFn: getSiteConfig,
        staleTime: 60 * 60 * 1000,
        refetchInterval: 60 * 60 * 1000
    });
};

export { useSiteComponents, useSiteConfig };
