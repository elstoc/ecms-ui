import { useQuery } from '@tanstack/react-query';

import { getGalleryImages, getSiteNav, getMarkdownFile, getMdNavContents } from '../api';

type QueryState = {
    isLoading: boolean,
    isError: boolean,
    error: unknown
};

type QueryOptions<T> = {
    queryKey: (string | number)[],
    queryFn: () => Promise<T>
}

const useCustomQuery = <T>(options: QueryOptions<T>): [QueryState, T | undefined] => {
    const { isLoading, isError, error, data } = useQuery(options);
    return [{ isLoading, isError, error }, data ];
};

export const useSiteNav = () => {
    return useCustomQuery({
        queryKey: ['siteNav'],
        queryFn: () => getSiteNav(),
    });
};

export const useGalleryList = (path: string, limit = 0) => {
    return useCustomQuery({
        queryKey: ['galleryList', path, limit],
        queryFn: () => getGalleryImages(path, limit),
    });
};

export const useMarkdownFile = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownFile', path],
        queryFn: () => getMarkdownFile(path),
    });
};

export const useMarkdownNav = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownNav', path],
        queryFn: () => getMdNavContents(path),
    });
};
