import { useQuery } from '@tanstack/react-query';

import { getGalleryImages, getSiteNav, getMarkdownFile, getMdNavContents } from '../api';
import { GalleryImages } from '../types/Gallery';

type queryState = {
    isLoading: boolean,
    isError: boolean,
    error: unknown
};

type customQueryOptions<T> = {
    queryKey: (string | number)[],
    queryFn: () => Promise<T>
}

const useCustomQuery = <T>(options: customQueryOptions<T>): [queryState, T | undefined] => {
    const { queryKey, queryFn } = options;
    const { isLoading, isError, error, data } = useQuery({
        queryKey,
        queryFn,
    });

    return [{ isLoading, isError, error }, data ];
};

export const useSiteNav = () => {
    return useCustomQuery({
        queryKey: ['siteNav'],
        queryFn: () => getSiteNav(),
    });
};

export const useGalleryList = (path: string, limit = 0) => {
    return useCustomQuery<GalleryImages>({
        queryKey: ['galleryList', path, limit],
        queryFn: () => getGalleryImages(path, limit),
    });
};

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
