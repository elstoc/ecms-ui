import { MdNavContents } from '../types/Markdown';
import { axiosSecureClient } from '../api/axiosClients';

export const getMarkdownFile = async (path: string): Promise<string> => {
    const urlPath = `markdown/mdfile/${path.replace(/\/$/, '')}`;
    const { data } = await axiosSecureClient.get<string>(urlPath);
    return data;
};

export const getMdNavContents = async (path: string): Promise<MdNavContents> => {
    const urlPath = `markdown/mdnav/${path}`;
    const { data } = await axiosSecureClient.get<MdNavContents>(urlPath);
    return data;
};
