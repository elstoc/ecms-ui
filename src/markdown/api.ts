import { MarkdownPage, MarkdownTree } from '../contracts/markdown';
import { axiosSecureClient } from '../shared/api';

const getMarkdownPage = async (path: string): Promise<MarkdownPage> => {
    const url = 'markdown/page';
    const { data } = await axiosSecureClient.get<MarkdownPage>(url, { params: { path }});
    return data;
};

const putMarkdownPage = async (path: string, fileContents: string): Promise<void> => {
    const url = 'markdown/page';
    await axiosSecureClient.put(url, { path, fileContents });
};

const deleteMarkdownPage = async (path: string): Promise<void> => {
    const url = 'markdown/page';
    await axiosSecureClient.delete(url, { params: { path }});
};

const getMarkdownTree = async (path: string): Promise<MarkdownTree> => {
    const url = 'markdown/tree';
    const { data } = await axiosSecureClient.get<MarkdownTree>(url, { params: { path }});
    return data;
};

export { MarkdownPage, getMarkdownPage, putMarkdownPage, deleteMarkdownPage, getMarkdownTree };
