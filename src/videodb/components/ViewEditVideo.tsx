import React, { FC, ReactElement, Suspense, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';

import { ViewVideo } from './ViewVideo';
import { VideoDbContext } from '../hooks/useVideoDbState';

export const ViewEditVideo: FC = (): ReactElement => {
    const { state: { apiPath } } = useContext(VideoDbContext);
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
