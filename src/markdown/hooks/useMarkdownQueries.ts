import { getMarkdownPage, getMarkdownTree } from '../api';
import { useCustomQuery } from '../../shared/hooks';

const useMarkdownPage = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownFile', path],
        queryFn: () => getMarkdownPage(path),
    });
};

const useMarkdownTree = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownTree', path],
        queryFn: () => getMarkdownTree(path),
    });
};

export { useMarkdownPage, useMarkdownTree };
