import { useQuery } from '@tanstack/react-query';

const apiUrl = process.env.API_URL || '';

const markdownQuery = async (): Promise<string> => {
    const response = await fetch(`${apiUrl}/markdown`);

    if (!response.ok) throw new Error('Network Response was not Ok');

    const returnData: string = await response.text();

    return returnData;
};

export const useMarkdownFile = () => {
    const queryName = 'markdown';

    return useQuery([queryName], () => markdownQuery());
};
