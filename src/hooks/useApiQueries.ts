import { useCustomQuery } from './useCustomQuery';
import { getGalleryContents, getSiteNav, getMarkdownFile, getMarkdownTree } from '../api';

export const useSiteNav = () => {
    return useCustomQuery({
        queryKey: ['siteNav'],
        queryFn: () => getSiteNav(),
    });
};

export const useGalleryContents = (path: string, limit = 0) => {
    return useCustomQuery({
        queryKey: ['galleryContents', path, limit],
        queryFn: () => getGalleryContents(path, limit),
    });
};

export const useMarkdownFile = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownFile', path],
        queryFn: () => getMarkdownFile(path),
    });
};

export const useMarkdownTree = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownTree', path],
        queryFn: () => getMarkdownTree(path),
    });
};
