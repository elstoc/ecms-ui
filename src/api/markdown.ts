import { MarkdownPage, MarkdownTree } from '../types/Markdown';
import { axiosSecureClient } from '../api/axiosClients';

export const getMarkdownPage = async (path: string): Promise<MarkdownPage> => {
    const url = 'markdown/page';
    const { data } = await axiosSecureClient.get<MarkdownPage>(url, { params: { path }});
    return data;
};

export const putMarkdownPage = async (path: string, fileContents: string): Promise<void> => {
    const url = 'markdown/page';
    await axiosSecureClient.put(url, { path, fileContents });
};

export const deleteMarkdownPage = async (path: string): Promise<void> => {
    const url = 'markdown/page';
    await axiosSecureClient.delete(url, { params: { path }});
};

export const getMarkdownTree = async (path: string): Promise<MarkdownTree> => {
    const url = 'markdown/tree';
    const { data } = await axiosSecureClient.get<MarkdownTree>(url, { params: { path }});
    return data;
};
