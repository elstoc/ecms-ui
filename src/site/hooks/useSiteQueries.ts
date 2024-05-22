import { getSiteConfig, getSiteComponents } from '../api';
import { useCustomQuery } from '../../common/hooks';

const useSiteComponents = () => {
    return useCustomQuery({
        queryKey: ['siteComponents'],
        queryFn: getSiteComponents,
    });
};

const useSiteConfig = () => {
    return useCustomQuery({
        queryKey: ['siteConfig'],
        queryFn: getSiteConfig,
    });
};

export { useSiteComponents, useSiteConfig };
