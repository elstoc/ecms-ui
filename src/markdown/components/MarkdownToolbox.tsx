/* eslint-disable no-restricted-globals */
import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import YAML from 'yaml';

import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import { Icon } from '../../shared/components/icon';
import { splitFrontMatter } from '../../utils';
import { useDeleteMarkdownPage, useUpdateMarkdownPage } from '../hooks/useMarkdownQueries';

export const MarkdownToolbox: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const { markdownState: { editedMarkdown, singlePage, currentPage } } = useContext(MarkdownStateContext);
    const mode = searchParams.get('mode');
    const { mutate: saveMutate } = useUpdateMarkdownPage(apiPath, 'page saved');
    const { mutate: deleteMutate } = useDeleteMarkdownPage(apiPath, 'page deleted');

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

    const deletePage = () => {
        if (confirm('Are you sure you want to delete this page')) {
            deleteMutate(undefined, {
                onSuccess: () => {
                    setSearchParams();
                    navigate('..', { relative: 'path' });
                }
            });
        }
    };

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
