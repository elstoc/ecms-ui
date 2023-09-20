import { MdNavContents } from '../types/Markdown';
import { axiosSecureClient } from '../api/axiosClients';

export const getMarkdownFile = async (path: string): Promise<string> => {
    const urlPath = `markdown/mdfile/${path.replace(/\/$/, '')}`;
    const { data } = await axiosSecureClient.get<string>(urlPath);
    return data;
};

export const putMarkdownFile = async (path: string, fileContents: string): Promise<void> => {
    const urlPath = `markdown/mdFile/${path.replace(/\/$/, '')}`;
    await axiosSecureClient.put(urlPath, { fileContents });
};

export const getMdNavContents = async (path: string): Promise<MdNavContents> => {
    const urlPath = `markdown/mdnav/${path}`;
    const { data } = await axiosSecureClient.get<MdNavContents>(urlPath);
    return data;
};
