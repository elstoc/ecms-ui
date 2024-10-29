import React, { FC, ReactElement, useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Dialog, DialogBody } from '@blueprintjs/core';

import { getMarkdownPage } from '../api';
import { useCreateMarkdownPage } from '../hooks/useMarkdownQueries';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import { StringInput } from '../../shared/components/forms';

import './MarkdownAddPage.scss';

export const MarkdownAddPage: FC = (): ReactElement => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { markdownState: { pageApiPath } } = useContext(MarkdownStateContext);
    const { mutate } = useCreateMarkdownPage('page created');
    const mode = searchParams.get('mode');

    const [errorText, setErrorText] = useState('');
    const [newPagePath, setNewPagePath] = useState('');

    const newPageFullPath = `${pageApiPath}/${newPagePath}`;

    const createPage = async () => {
        const possNewPage = await getMarkdownPage(newPageFullPath);
        if (possNewPage.pageExists) {
            setErrorText('Page already exists');
        } else if (!possNewPage.pathValid) {
            setErrorText('Invalid path');
        } else if (!possNewPage.canWrite) {
            setErrorText('You are not permitted to create a new page here');
        } else {
            mutate(
                { path: newPageFullPath, pageContent: possNewPage.content },
                { onSuccess: () => navigate(`./${newPagePath}?mode=edit`) },
            );
        }
    };

    return (
        <Dialog
            title='Add new child page'
            isOpen={mode === 'add'}
            onClose={() => setSearchParams()}
            canEscapeKeyClose={false}
        >
            <DialogBody>
                <div className='markdown-add-page'>
                    <Card className='add-page-form'>
                        <StringInput
                            label='Path'
                            value={newPagePath}
                            onValueChange={(path) => setNewPagePath(path.replace(/[^a-z0-9\-_]/gi, '').toLowerCase())}
                            onPressEnter={createPage}
                            autoFocus={true}
                            inline={true}
                        />
                        <Button onClick={createPage}>Create Page</Button>
                    </Card>
                    <div className='error'>
                        {errorText}
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    );
};
