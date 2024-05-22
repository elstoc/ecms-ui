import { useCustomQuery } from '../../common/hooks';
import { VideoQueryParams, getVideoDbVideos, getVideoDbVideo, getVideoDbLookup } from '../api';

const useVideoDbVideos = (path: string, params?: VideoQueryParams) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'videos', `${path}:${JSON.stringify(params)}`],
        queryFn: () => getVideoDbVideos(path, params),
    });
};

const useVideoDbVideo = (path: string, id: number) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'video', id],
        queryFn: () => getVideoDbVideo(path, id),
    });
};

const useVideoDbLookup = (path: string, lookupTable: string) => {
    return useCustomQuery({
        queryKey: ['videoDb', 'lookup', path, lookupTable],
        queryFn: () => getVideoDbLookup(path, lookupTable),
    });
};

export { useVideoDbVideos, useVideoDbVideo, useVideoDbLookup };
