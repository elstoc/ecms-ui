import { axiosSecureClient } from '../api/axiosClients';
import { VideoWithId } from '../types/VideoDb';

export const getVideoDbVideos = async (path: string): Promise<VideoWithId> => {
    const url = 'videodb/videos';
    const { data } = await axiosSecureClient.get<VideoWithId>(url, { params: { path }});
    return data;
};
