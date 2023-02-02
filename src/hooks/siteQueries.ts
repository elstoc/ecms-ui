import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { SiteProps } from '../types/Site';

const apiUrl = process.env.API_URL || '';

const siteNavQuery = async (): Promise<SiteProps> => {
    const { data } = await axios.get<SiteProps>(`${apiUrl}/site/nav`);
    return data;
};

export const useSiteNav = () => {
    const queryName = 'siteNav';
    return useQuery([queryName], () => siteNavQuery());
};
