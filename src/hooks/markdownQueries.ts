import { useQuery } from '@tanstack/react-query';

const apiUrl = process.env.API_URL || '';

const markdownQuery = async (path: string): Promise<string> => {
    const response = await fetch(`${apiUrl}/markdown/mdfile/${path}`);

    if (!response.ok) throw new Error('Network Response was not Ok');

    const returnData: string = await response.text();

    return returnData;
};

export const useMarkdownFile = (path: string) => {
    const queryName = `markdown/${path}`;

    return useQuery([queryName], () => markdownQuery(path));
};
