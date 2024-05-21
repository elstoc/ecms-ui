import { Dialog, DialogBody } from '@blueprintjs/core';
import React, { FC, ReactElement, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ViewVideo } from './ViewVideo';

export const ViewEditVideo: FC<{ apiPath: string }> = ({ apiPath }): ReactElement => {
    const [ searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');

    const exitVideo = () => {
        setSearchParams((searchParams) => {
            searchParams.delete('id');
            return searchParams;
        });
    };

    return (
        <Dialog title="Video" isOpen={id !== null && id === parseInt(id).toString()} onClose={exitVideo}>
            <DialogBody>
                <Suspense fallback='Loading'>
                    <ViewVideo apiPath={apiPath} id={parseInt(id || '')} />
                </Suspense>
            </DialogBody>
        </Dialog>
    );
};
