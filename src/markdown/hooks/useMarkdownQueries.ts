import { getMarkdownPage, getMarkdownTree, putMarkdownPage } from '../api';
import { useCustomQuery, useMutationWithToast } from '../../shared/hooks';

export const useMarkdownPage = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownFile', path],
        queryFn: () => getMarkdownPage(path),
    });
};

export const useMarkdownTree = (path: string) => {
    return useCustomQuery({
        queryKey: ['markdownTree', path],
        queryFn: () => getMarkdownTree(path),
    });
};

export const useCreateMarkdownPage = (successMessage: string) => {
    return useMutationWithToast<{ path: string, pageContent: string }>({
        mutationFn: ({ path, pageContent }) => putMarkdownPage(path, pageContent),
        invalidateKeys: [['markdownTree']],
        successMessage
    });
};
