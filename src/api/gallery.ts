import { GalleryImages } from '../types/Gallery';
import { axiosSecureClient } from '../api/axiosClients';

export const getGalleryImages = async (path: string, limit = 0): Promise<GalleryImages> => {
    const urlPath = `gallery/imagelist/${path}?limit=${limit}`;
    const { data } = await axiosSecureClient.get<GalleryImages>(urlPath);
    return data;
};
