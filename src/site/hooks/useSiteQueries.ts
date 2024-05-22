import { getSiteComponents } from '../api';
import { getSiteConfig } from '../api';
import { useCustomQuery } from '../../common/hooks/useCustomQuery';

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
