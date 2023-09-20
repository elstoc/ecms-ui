import { useQuery } from '@tanstack/react-query';

import { getGalleryImages } from '../api';

const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL ?? '10000');

export const useGalleryList = (path: string, limit = 0) => {
    return useQuery({
        queryKey: ['galleryList', path, limit],
        keepPreviousData: true,
        queryFn: () => getGalleryImages(path, limit),
        refetchInterval
    });
};
