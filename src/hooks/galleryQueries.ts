import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { GalleryData } from '../types/Gallery';

const apiUrl = process.env.API_URL || '';
const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL || '10000');

const galleryListQuery = async (path: string, limit = 0): Promise<GalleryData> => {
    const { data } = await axios.get<GalleryData>(`${apiUrl}/gallery/imagelist/${path}?limit=${limit}`);
    return data;
};

export const useGalleryList = (path: string, limit = 0) => {
    const queryName = `gallery/imagelist/${path}`;
    return useQuery({
        queryKey: [queryName, limit],
        keepPreviousData: true,
        queryFn: () => galleryListQuery(path, limit),
        refetchInterval
    });
};
