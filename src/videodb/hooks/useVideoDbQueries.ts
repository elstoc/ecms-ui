import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomQuery, useCustomQueryFetching } from '../../shared/hooks';
import {
    Video,
    getVideoDbVideos,
    getVideoDbVideo,
    getVideoDbLookup,
    getVideoDbTags,
    VideoUpdate,
    patchVideoDbVideo,
    postVideoDbVideo,
    deleteVideoDbVideo,
    VideoWithId,
    putVideoDbVideo,
} from '../api';

export const useGetLookup = (path: string, lookupTable: string) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'lookup', path, lookupTable],
        queryFn: () => getVideoDbLookup(path, lookupTable),
        staleTime: 60 * 60 * 1000,
        refetchInterval: 60 * 60 * 1000
    });
};

export const useLookupValue = (path: string, lookupTable: string, value?: string | null) => {
    const lookup = useGetLookup(path, lookupTable);
    return lookup[value ?? ''];
};

export const useGetTags = (path: string) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'tags', path],
        queryFn: () => getVideoDbTags(path),
    });
};

export const useGetVideos = (path: string, params?: { [key: string]: string }) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'videos', `${path}:${JSON.stringify(params)}`],
        queryFn: () => getVideoDbVideos(path, params),
    });
};

export const useGetVideo = (path: string, id: number) => {
    return useCustomQueryFetching({
        queryKey: ['videoDb', 'video', id],
        queryFn: () => getVideoDbVideo(path, id),
    });
};

export const useAddVideo = (path: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (video: Video) => postVideoDbVideo(path, video),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos'] });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'tags'] });
        }
    });
};

export const useDeleteVideo = (path: string, id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteVideoDbVideo(path, id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos'] });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'tags'] });
        }
    });
};

export const usePutVideo = (path: string, id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (video: VideoWithId) => putVideoDbVideo(path, video),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos'] });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'tags'] });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'video', id] });
        }
    });
};

export const usePatchVideo = (path: string, id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (videoUpdate: VideoUpdate) => patchVideoDbVideo(path, videoUpdate),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos'] });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'video', id] });
        }
    });
};
