import { useCustomQuery } from './useCustomQuery';
import { getGalleryImages, getSiteNav, getMarkdownFile, getMarkdownTree } from '../api';

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
        queryFn: () => getMarkdownTree(path),
    });
};
