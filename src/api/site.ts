import { axiosSecureClient } from '../api/axiosClients';
import { ComponentMetadata, SiteConfig } from '../types/Site';

export const getSiteComponents = async (): Promise<ComponentMetadata[]> => {
    const { data } = await axiosSecureClient.get<ComponentMetadata[]>('site/components');
    return data;
};

export const getSiteConfig = async (): Promise<SiteConfig> => {
    const { data } = await axiosSecureClient.get<SiteConfig>('site/config');
    return data;
};
