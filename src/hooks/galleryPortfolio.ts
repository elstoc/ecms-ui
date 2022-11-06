import { useQuery } from '@tanstack/react-query';
import { ImageData } from '../components/gallery/IGallery';

const apiUrl = process.env.API_URL || '';

const galleryData = async (path: string): Promise<ImageData[]> => {
    const response = await fetch(`${apiUrl}/gallery/imagelist/${path}`);

    if (!response.ok) throw new Error('Network Response was not Ok');

    const returnData: ImageData[] = await response.json();

    return returnData || [];
};

export const useGalleryPortfolioList = () => useQuery(['galleryPortfolioList'], () => galleryData('portfolio'));
