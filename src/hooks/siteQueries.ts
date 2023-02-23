import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { ComponentMetadata } from '../types/Site';

const apiUrl = process.env.API_URL || '';

const siteNavQuery = async (): Promise<ComponentMetadata[]> => {
    const { data } = await axios.get<ComponentMetadata[]>(`${apiUrl}/site/nav`);
    return data;
};

export const useSiteNav = () => {
    const queryName = 'siteNav';
    return useQuery([queryName], () => siteNavQuery());
};
