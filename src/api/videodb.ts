import { axiosSecureClient } from '../api/axiosClients';
import { VideoQueryParams, VideoWithIdAndPrimaryMedium } from '../types/VideoDb';

export const getVideoDbVideos = async (path: string, params?: VideoQueryParams): Promise<VideoWithIdAndPrimaryMedium[]> => {
    const url = 'videodb/videos';
    const { data } = await axiosSecureClient.get<VideoWithIdAndPrimaryMedium[]>(url, { params: { path, ...params }});
    return data;
};

export const getVideoDbLookup = async (path: string, lookupTable: string): Promise<{ [key: string]: string }> => {
    const url = 'videodb/lookup';
    const { data } = await axiosSecureClient.get<{ [key: string]: string }>(url, { params: { path, table: lookupTable } });
    return data;
};
