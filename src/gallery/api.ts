import { GalleryContents } from '../contracts/gallery.contract';
import { axiosSecureClient } from '../shared/api';

export const getGalleryContents = async (path: string, limit = 0): Promise<GalleryContents> => {
    const url = 'gallery/contents/';
    const { data } = await axiosSecureClient.get<GalleryContents>(url, { params: { path, limit }});
    return data;
};
