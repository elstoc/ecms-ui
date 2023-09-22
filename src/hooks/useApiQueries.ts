import { useQuery } from '@tanstack/react-query';

import { getGalleryImages, getSiteNav, getMarkdownFile, getMdNavContents } from '../api';

export const useGalleryList = (path: string, limit = 0) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ['galleryList', path, limit],
        queryFn: () => getGalleryImages(path, limit),
    });

    return {
        queryState: {
            isLoading, isError, error
        },
        galleryContent: data
    };
};

export const useSiteNav = () => {
    return useQuery({
        queryKey: ['siteNav'],
        queryFn: () => getSiteNav(),
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
