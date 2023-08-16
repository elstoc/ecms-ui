import { useQuery } from '@tanstack/react-query';
import { MdNavContents } from '../types/Markdown';
import { apiGet } from '../utils/apiServices';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export const useMarkdownFile = (path: string) => {
    const urlPath = `markdown/mdfile/${path.replace(/\/$/, '')}`;
    const queryName = `markdown/${path}`;

    return useQuery({
        queryKey: [queryName],
        queryFn: () => apiGet<string>(urlPath),
        refetchInterval
    });
};

export const useMarkdownNav = (path: string) => {
    const queryName = `markdown/${path}`;
    const urlPath = `markdown/mdnav/${path}`;

    return useQuery({
        queryKey: [queryName],
        queryFn: () => apiGet<MdNavContents>(urlPath),
        refetchInterval
    });
};
