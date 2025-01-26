import { Video, VideoUpdate, VideoWithId } from '../../contracts/videodb.contract';
import { useCustomQuery, useMutationWithToast } from '../../shared/hooks';
import {
    getVideoDbVideos,
    getVideoDbVideo,
    getVideoDbLookup,
    getVideoDbTags,
    patchVideoDbVideo,
    postVideoDbVideo,
    deleteVideoDbVideo,
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
    return useCustomQuery({
        queryKey: [],
        queryFn: () => getVideoDbVideo(path, id),
        gcTime: 0
    });
};

export const usePostVideo = (path: string, successMessage: string) => {
    return useMutationWithToast<Video>({
        mutationFn: (video) => postVideoDbVideo(path, video),
        invalidateKeys: [
            ['videoDb', 'videos'],
            ['videoDb', 'tags']
        ],
        successMessage
    });
};

export const useDeleteVideo = (path: string, id: number, successMessage: string) => {
    return useMutationWithToast<void>({
        mutationFn: () => deleteVideoDbVideo(path, id),
        invalidateKeys: [
            ['videoDb', 'videos'],
            ['videoDb', 'tags']
        ],
        successMessage
    });
};

export const usePutVideo = (path: string, id: number, successMessage: string) => {
    return useMutationWithToast<VideoWithId>({
        mutationFn: (video) => putVideoDbVideo(path, video),
        invalidateKeys: [
            ['videoDb', 'videos'],
            ['videoDb', 'tags'],
        ],
        successMessage
    });
};

export const usePatchVideo = (path: string, id: number, successMessage: string) => {
    return useMutationWithToast<VideoUpdate>({
        mutationFn: (videoUpdate) => patchVideoDbVideo(path, videoUpdate),
        invalidateKeys: [
            ['videoDb', 'videos'],
        ],
        successMessage
    });
};
