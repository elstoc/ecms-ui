import { MarkdownPage, MarkdownTree } from '../types/Markdown';
import { axiosSecureClient } from '../api/axiosClients';

export const getMarkdownPage = async (path: string): Promise<MarkdownPage> => {
    const urlPath = `markdown/page/${path}`;
    const { data } = await axiosSecureClient.get<MarkdownPage>(urlPath);
    return data;
};

export const putMarkdownPage = async (path: string, fileContents: string): Promise<void> => {
    const urlPath = `markdown/page/${path}`;
    await axiosSecureClient.put(urlPath, { fileContents });
};

export const deleteMarkdownPage = async (path: string): Promise<void> => {
    const urlPath = `markdown/page/${path}`;
    await axiosSecureClient.delete(urlPath);
};

export const getMarkdownTree = async (path: string): Promise<MarkdownTree> => {
    const urlPath = `markdown/tree/${path}`;
    const { data } = await axiosSecureClient.get<MarkdownTree>(urlPath);
    return data;
};
