import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getMarkdownPage, getMarkdownTree, putMarkdownPage } from '../api';
import { useCustomQuery } from '../../shared/hooks';

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

export const useCreateMarkdownPage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { path: string, pageContent: string }) => putMarkdownPage(data.path, data.pageContent),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['markdownTree'] });
        }
    });
};
