import { useQuery } from '@tanstack/react-query';
import { MdNavContents } from '../types/Markdown';
import { apiClient } from '../utils/apiClient';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export const useMarkdownFile = (path: string) => {
    const urlPath = `markdown/mdfile/${path.replace(/\/$/, '')}`;
    const queryName = `markdown/${path}`;

    return useQuery({
        queryKey: [queryName],
        queryFn: async () => (await apiClient.get<string>(urlPath)).data,
        refetchInterval
    });
};

export const useMarkdownNav = (path: string) => {
    const queryName = `markdown/${path}`;
    const urlPath = `markdown/mdnav/${path}`;

    return useQuery({
        queryKey: [queryName],
        queryFn: async () => (await apiClient.get<MdNavContents>(urlPath)).data,
        refetchInterval
    });
};
