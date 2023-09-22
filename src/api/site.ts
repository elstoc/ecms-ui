import { axiosSecureClient } from '../api/axiosClients';
import { ComponentMetadata } from '../types/Site';

export const getSiteNav = async (): Promise<ComponentMetadata[]> => {
    const { data } = await axiosSecureClient.get<ComponentMetadata[]>('site/components');
    return data;
};
