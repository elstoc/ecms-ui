import { useQuery } from '@tanstack/react-query';

import { getMarkdownFile, getMdNavContents } from '../api';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export const useMarkdownFile = (path: string) => {
    return useQuery({
        queryKey: ['markdownFile', path],
        queryFn: () => getMarkdownFile(path),
        refetchInterval
    });
};

export const useMarkdownNav = (path: string) => {
    return useQuery({
        queryKey: ['markdownNav', path],
        queryFn: () => getMdNavContents(path),
        refetchInterval
    });
};
