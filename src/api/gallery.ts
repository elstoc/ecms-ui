import { GalleryContents } from '../types/Gallery';
import { axiosSecureClient } from '../api/axiosClients';

export const getGalleryImages = async (path: string, limit = 0): Promise<GalleryContents> => {
    const urlPath = `gallery/imagelist/${path}?limit=${limit}`;
    const { data } = await axiosSecureClient.get<GalleryContents>(urlPath);
    return data;
};
