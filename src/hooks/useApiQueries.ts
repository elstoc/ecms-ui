import { useCustomQuery } from './useCustomQuery';
import { getGalleryContents, getSiteComponents, getMarkdownPage, getMarkdownTree, getUserInfo } from '../api';
import { getSiteConfig } from '../api/site';

export const useSiteComponents = () => {
    return useCustomQuery({
        queryKey: ['siteComponents'],
        queryFn: getSiteComponents,
    });
};

export const useSiteConfig = () => {
    return useCustomQuery({
        queryKey: ['siteConfig'],
        queryFn: getSiteConfig,
    });
};

export const useUserInfo = () => {
    return useCustomQuery({
        queryKey: ['user-info'],
        queryFn: getUserInfo,
    });
};

export const useGalleryContents = (path: string, limit = 0) => {
    return useCustomQuery({
        queryKey: ['galleryContents', path, limit],
        queryFn: () => getGalleryContents(path, limit),
    });
};

export const useMarkdownPage = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownFile', path],
        queryFn: () => getMarkdownPage(path),
    });
};

export const useMarkdownTree = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownTree', path],
        queryFn: () => getMarkdownTree(path),
    });
};
