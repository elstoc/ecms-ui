import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomQuery, useCustomQueryFetching } from '../../shared/hooks';
import { getVideoDbVideos, getVideoDbVideo, getVideoDbLookup, getVideoDbTags, VideoUpdate, patchVideoDbVideo } from '../api';

const useGetVideos = (path: string, params?: { [key: string]: string }) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'videos', `${path}:${JSON.stringify(params)}`],
        queryFn: () => getVideoDbVideos(path, params),
    });
};

const useGetVideo = (path: string, id: number) => {
    return useCustomQueryFetching({
        queryKey: ['videoDb', 'video', id],
        queryFn: () => getVideoDbVideo(path, id),
    });
};

const useGetLookup = (path: string, lookupTable: string) => {
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

const useGetTags = (path: string) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'tags', path],
        queryFn: () => getVideoDbTags(path),
    });
};

const useMutateVideo = (path: string, id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (videoUpdate: VideoUpdate) => patchVideoDbVideo(path, videoUpdate),
        onSettled: () => {
            return Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos'] }),
                queryClient.invalidateQueries({ queryKey: ['videoDb', 'video', id] })
            ]);
        }
    });
};

export { useGetVideos, useGetVideo, useMutateVideo, useGetLookup, useGetTags };
