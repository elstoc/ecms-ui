import { useCustomQuery } from './useCustomQuery';
import { getGalleryContents, getSiteComponents, getMarkdownPage, getMarkdownTree, getUserInfo, getVideoDbVideos } from '../api';
import { getSiteConfig } from '../api/site';
import { VideoQueryParams } from '../types/VideoDb';
import { getVideoDbLookup } from '../api/videodb';
import { useSuspenseQuery } from '@tanstack/react-query';
import { config } from '../utils/config';

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

export const useGalleryContent = (path: string, limit = 0) => {
    const { data } = useSuspenseQuery({
        queryKey: ['galleryContents', path, limit],
        queryFn: () => getGalleryContents(path, limit),
        refetchInterval: config.queryRefetchInterval
    });
    return data;
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

export const useVideoDbVideos = (path: string, params?: VideoQueryParams) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'videos', `${path}:${JSON.stringify(params)}`],
        queryFn: () => getVideoDbVideos(path, params),
    });
};

export const useVideoDbLookup = (path: string, lookupTable: string) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'lookup', path, lookupTable],
        queryFn: () => getVideoDbLookup(path, lookupTable),
    });
};
