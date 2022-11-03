import { ImageData } from '../components/gallery/IGallery';

const apiUrl = process.env.API_URL || '';

export const galleryPortfolio = async (): Promise<ImageData[]> => {
    const response = await fetch(`${apiUrl}/gallery/imagelist/portfolio`);

    if (!response.ok) throw new Error('Network Response was not Ok');

    const returnData: ImageData[] = await response.json();

    return returnData || [];
};
