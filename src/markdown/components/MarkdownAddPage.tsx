/* eslint-disable no-restricted-globals */
import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Card, Dialog, DialogBody } from '@blueprintjs/core';

import { getMarkdownPage, putMarkdownPage } from '../api';

import { AppToaster } from '../../shared/components/toaster';
import { StringInput } from '../../shared/components/forms';

import './MarkdownAddPage.scss';

export const MarkdownAddPage: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [, setSearchParams] = useSearchParams();

    const [errorText, setErrorText] = useState('');
    const [newPagePath, setNewPagePath] = useState('');

    const newPageFullPath = `${apiPath}/${newPagePath}`;

    const createPage = useCallback(async () => {
        try {
            const possNewPage = await getMarkdownPage(newPageFullPath);
            if (possNewPage.pageExists) {
                setErrorText('Page already exists');
            } else if (!possNewPage.pathValid) {
                setErrorText('Invalid path');
            } else if (!possNewPage.canWrite) {
                setErrorText('You are not permitted to create a new page here');
            } else {
                await putMarkdownPage(newPageFullPath, possNewPage.content);
                await queryClient.invalidateQueries({ queryKey: ['markdownTree']});
                (await AppToaster).show({ message: 'page added', timeout: 2000 });
                navigate(`./${newPagePath}?mode=edit`);
            }
        } catch (error: unknown) {
            setErrorText('Unexpected error: ' + error);
        }
    }, [navigate, newPageFullPath, newPagePath, queryClient]);

    return (
        <Dialog
            title='Add new child page'
            isOpen={true}
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
