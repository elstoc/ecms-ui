import { VideoQueryParams, getVideoDbVideos, getVideoDbVideo, getVideoDbLookup } from '../api';
import { useCustomQuery } from '../../hooks/useCustomQuery';

export const useVideoDbVideos = (path: string, params?: VideoQueryParams) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'videos', `${path}:${JSON.stringify(params)}`],
        queryFn: () => getVideoDbVideos(path, params),
    });
};

export const useVideoDbVideo = (path: string, id: number) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'video', id],
        queryFn: () => getVideoDbVideo(path, id),
    });
};

export const useVideoDbLookup = (path: string, lookupTable: string) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'lookup', path, lookupTable],
        queryFn: () => getVideoDbLookup(path, lookupTable),
    });
};
