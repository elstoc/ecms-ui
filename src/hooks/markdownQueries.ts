import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MdNavContents } from '../types/Markdown';

const apiUrl = process.env.API_URL || '';

const markdownFileQuery = async (path: string): Promise<string> => {
    const { data } = await axios.get<string>(`${apiUrl}/markdown/mdfile/${path}`);
    return data;
};

export const useMarkdownFile = (path: string) => {
    const queryName = `markdown/${path}`;
    return useQuery([queryName], () => markdownFileQuery(path));
};

const markdownNavQuery = async (path: string): Promise<MdNavContents> => {
    const { data } = await axios.get<MdNavContents>(`${apiUrl}/markdown/mdnav/${path}`);
    return data;
};

export const useMarkdownNav = (path: string) => {
    const queryName = `markdown/${path}`;
    return useQuery([queryName], () => markdownNavQuery(path));
};
