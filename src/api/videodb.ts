import { axiosSecureClient } from '../api/axiosClients';
import { VideoQueryParams, VideoWithId } from '../types/VideoDb';

export const getVideoDbVideos = async (path: string, params?: VideoQueryParams): Promise<VideoWithId[]> => {
    const url = 'videodb/videos';
    const { data } = await axiosSecureClient.get<VideoWithId[]>(url, { params: { path, ...params }});
    return data;
};
