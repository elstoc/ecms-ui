import { GalleryContents } from '../types/Gallery';
import { axiosSecureClient } from '../api/axiosClients';

export const getGalleryContents = async (path: string, limit = 0): Promise<GalleryContents> => {
    const urlPath = `gallery/contents/${path}?limit=${limit}`;
    const { data } = await axiosSecureClient.get<GalleryContents>(urlPath);
    return data;
};
