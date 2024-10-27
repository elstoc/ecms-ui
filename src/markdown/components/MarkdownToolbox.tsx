/* eslint-disable no-restricted-globals */
import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import YAML from 'yaml';

import { deleteMarkdownPage } from '../api';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import { Icon } from '../../shared/components/icon';
import { showToast } from '../../shared/components/toaster';
import { splitFrontMatter } from '../../utils';
import { useUpdateMarkdownPage } from '../hooks/useMarkdownQueries';

export const MarkdownToolbox: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { markdownState: { editedMarkdown, singlePage, currentPage } } = useContext(MarkdownStateContext);
    const mode = searchParams.get('mode');
    const { mutate: saveMutate } = useUpdateMarkdownPage(apiPath, 'page saved');

    const { content, canWrite, canDelete, pathValid, pageExists } = currentPage ?? {};

    const toggleEditMode = useCallback(() => {
        if (mode === 'edit') {
            if (editedMarkdown === content
                || confirm('You have unsaved changes. Are you sure you wish to leave?')
            ) {
                setSearchParams();
            }
        } else {
            setSearchParams({ mode: 'edit' });
        }
    }, [editedMarkdown, content, mode, setSearchParams]);

    const invalidateAndToast = useCallback(async (message: string) => {
        await showToast(message, 2000);
        await queryClient.invalidateQueries({ queryKey: ['markdownFile', apiPath]});
        await queryClient.invalidateQueries({ queryKey: ['markdownTree']});
        setSearchParams();
    }, [apiPath, queryClient, setSearchParams]);

    const savePage = async () => {
        try {
            try {
                const [yaml] = splitFrontMatter(editedMarkdown);
                YAML.parse(yaml);
            } catch (error: unknown) {
                throw new Error('Unable to parse YAML front matter');
            }
            saveMutate( editedMarkdown, { onSuccess: () => setSearchParams() });
        } catch (error: unknown) {
            alert('error ' + error);
        }
    };

    const deletePage = useCallback(async () => {
        try {
            if (confirm('Are you sure you want to delete this page')) {
                await deleteMarkdownPage(apiPath);
                await invalidateAndToast('page deleted');
                navigate('..', { relative: 'path' });
            }
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [invalidateAndToast, apiPath, navigate]);

    return (
        <>
            <Icon
                name={mode === 'edit' ? 'cancel' : 'edit'}
                disabled={!pageExists || !pathValid}
                onClick={toggleEditMode}
            />
            <Icon
                name='save'
                onClick={savePage}
                disabled={mode !== 'edit' || !canWrite || content === editedMarkdown}
            />
            <Icon
                name='delete'
                disabled={singlePage || !canDelete || mode !== 'edit'}
                onClick={deletePage}
            />
            <Icon
                name='add'
                disabled={singlePage || !canWrite || mode === 'edit'}
                onClick={() => setSearchParams({ mode: 'add' })}
            />
        </>
    );
};
