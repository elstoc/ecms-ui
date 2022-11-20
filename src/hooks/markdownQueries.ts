import { useQuery } from '@tanstack/react-query';
import { MdNavContents } from '../types/Markdown';

const apiUrl = process.env.API_URL || '';

const markdownFileQuery = async (path: string): Promise<string> => {
    const response = await fetch(`${apiUrl}/markdown/mdfile/${path}`);

    if (!response.ok) throw new Error('Network Response was not Ok');

    const returnData: string = await response.text();

    return returnData;
};

export const useMarkdownFile = (path: string) => {
    const queryName = `markdown/${path}`;

    return useQuery([queryName], () => markdownFileQuery(path));
};

const markdownNavQuery = async (path: string): Promise<MdNavContents> => {
    const response = await fetch(`${apiUrl}/markdown/mdnav/${path}`);

    if (!response.ok) throw new Error('Network Response was not Ok');

    const returnData: MdNavContents = await response.json();

    return returnData;
};

export const useMarkdownNav = (path: string) => {
    const queryName = `markdown/${path}`;

    return useQuery([queryName], () => markdownNavQuery(path));
};
