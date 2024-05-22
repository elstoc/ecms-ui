import { getSiteComponents } from '../api';
import { getSiteConfig } from '../api/site';
import { useCustomQuery } from './useCustomQuery';

export const useSiteComponents = () => {
    return useCustomQuery({
        queryKey: ['siteComponents'],
        queryFn: getSiteComponents,
    });
};

export const useSiteConfig = () => {
    return useCustomQuery({
        queryKey: ['siteConfig'],
        queryFn: getSiteConfig,
    });
};
