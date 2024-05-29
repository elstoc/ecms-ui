import { useCustomQuery } from '../../common/hooks';
import { getVideoDbVideos, getVideoDbVideo, getVideoDbLookup, getVideoDbTags } from '../api';

const useGetVideos = (path: string, params?: { [key: string]: string }) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'videos', `${path}:${JSON.stringify(params)}`],
        queryFn: () => getVideoDbVideos(path, params),
    });
};

const useGetVideo = (path: string, id: number) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'video', id],
        queryFn: () => getVideoDbVideo(path, id),
    });
};

const useGetLookup = (path: string, lookupTable: string) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'lookup', path, lookupTable],
        queryFn: () => getVideoDbLookup(path, lookupTable),
    });
};

const useGetTags = (path: string) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'tags', path],
        queryFn: () => getVideoDbTags(path),
    });
};

export { useGetVideos, useGetVideo, useGetLookup, useGetTags };
