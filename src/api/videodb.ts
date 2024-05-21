import { axiosSecureClient } from '../api/axiosClients';
import { VideoQueryParams, VideoSummaryAndPrimaryMedium, VideoWithId } from '../types/VideoDb';

export const getVideoDbVideos = async (path: string, params?: VideoQueryParams): Promise<VideoSummaryAndPrimaryMedium[]> => {
    const url = 'videodb/videos';
    const { data } = await axiosSecureClient.get<VideoSummaryAndPrimaryMedium[]>(url, { params: { path, ...params }});
    return data;
};

export const getVideoDbVideo = async (path: string, id: number): Promise<VideoWithId> => {
    const url = 'videodb/video';
    const { data } = await axiosSecureClient.get<VideoWithId>(url, { params: { path, id }});
    return data;
};

export const getVideoDbLookup = async (path: string, lookupTable: string): Promise<{ [key: string]: string }> => {
    const url = 'videodb/lookup';
    const { data } = await axiosSecureClient.get<{ [key: string]: string }>(url, { params: { path, table: lookupTable } });
    return data;
};
