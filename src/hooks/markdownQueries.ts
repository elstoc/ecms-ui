import { useQuery } from '@tanstack/react-query';

import { getMarkdownFile, getMdNavContents } from '../api';

export const useMarkdownFile = (path: string) => {
    return useQuery({
        queryKey: ['markdownFile', path],
        queryFn: () => getMarkdownFile(path),
    });
};

export const useMarkdownNav = (path: string) => {
    return useQuery({
        queryKey: ['markdownNav', path],
        queryFn: () => getMdNavContents(path),
    });
};
