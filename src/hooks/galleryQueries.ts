import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { GalleryImages } from '../types/Gallery';

const apiUrl = process.env.API_URL || '';
const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL || '10000');

const galleryImagesQuery = async (path: string, limit = 0): Promise<GalleryImages> => {
    const { data } = await axios.get<GalleryImages>(`${apiUrl}/gallery/imagelist/${path}?limit=${limit}`);
    return data;
};

export const useGalleryList = (path: string, limit = 0) => {
    const queryName = `gallery/imagelist/${path}`;
    return useQuery({
        queryKey: [queryName, limit],
        keepPreviousData: true,
        queryFn: () => galleryImagesQuery(path, limit),
        refetchInterval
    });
};
