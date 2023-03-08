import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MdNavContents } from '../types/Markdown';

const apiUrl = process.env.API_URL || '';
const refetchInterval = parseInt(process.env.QUERY_REFETCH_INTERVAL || '10000');

const markdownFileQuery = async (path: string): Promise<string> => {
    const strippedPath = path.replace(/\/$/, '');
    const { data } = await axios.get<string>(`${apiUrl}/markdown/mdfile/${strippedPath}`);
    return data;
};

export const useMarkdownFile = (path: string) => {
    const queryName = `markdown/${path}`;
    return useQuery({
        queryKey: [queryName],
        queryFn: () => markdownFileQuery(path),
        refetchInterval
    });
};

const markdownNavQuery = async (path: string): Promise<MdNavContents> => {
    const { data } = await axios.get<MdNavContents>(`${apiUrl}/markdown/mdnav/${path}`);
    return data;
};

export const useMarkdownNav = (path: string) => {
    const queryName = `markdown/${path}`;
    return useQuery({
        queryKey: [queryName],
        queryFn: () => markdownNavQuery(path),
        refetchInterval
    });
};
