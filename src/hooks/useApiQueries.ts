import { getGalleryContents, getSiteComponents, getMarkdownPage, getMarkdownTree, getUserInfo, getVideoDbVideos } from '../api';
import { getSiteConfig } from '../api/site';
import { VideoQueryParams } from '../types/VideoDb';
import { getVideoDbLookup } from '../api/videodb';
import { useSuspenseQuery } from '@tanstack/react-query';
import { config } from '../utils/config';

export const useSiteComponents = () => {
    const { data } = useSuspenseQuery({
        queryKey: ['siteComponents'],
        queryFn: getSiteComponents,
    });
    return data;
};

export const useSiteConfig = () => {
    const { data } = useSuspenseQuery({
        queryKey: ['siteConfig'],
        queryFn: getSiteConfig,
        refetchInterval: config.queryRefetchInterval
    });
    return data;
};

export const useUserInfo = () => {
    const { data } = useSuspenseQuery({
        queryKey: ['user-info'],
        queryFn: getUserInfo,
        refetchInterval: config.queryRefetchInterval
    });
    return data;
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
    const { data } = useSuspenseQuery({
        queryKey: ['markdownFile', path],
        queryFn: () => getMarkdownPage(path),
        refetchInterval: config.queryRefetchInterval
    });
    return data;
};

export const useMarkdownTree = (path: string) => {
    const { data } = useSuspenseQuery({
        queryKey: ['markdownTree', path],
        queryFn: () => getMarkdownTree(path),
        refetchInterval: config.queryRefetchInterval
    });
    return data;
};

export const useVideoDbVideos = (path: string, params?: VideoQueryParams) => {
    const { data } = useSuspenseQuery({
        queryKey: ['videoDb', 'videos', `${path}:${JSON.stringify(params)}`],
        queryFn: () => getVideoDbVideos(path, params),
        refetchInterval: config.queryRefetchInterval
    });
    return data;
};

export const useVideoDbLookup = (path: string, lookupTable: string) => {
    const { data } = useSuspenseQuery({
        queryKey: ['videoDb', 'lookup', path, lookupTable],
        queryFn: () => getVideoDbLookup(path, lookupTable),
        refetchInterval: config.queryRefetchInterval
    });
    return data;
};
