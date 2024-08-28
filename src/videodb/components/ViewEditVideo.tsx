import React, { FC, ReactElement, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dialog, DialogBody } from '@blueprintjs/core';

import { EditVideo } from './EditVideo';

export const ViewEditVideo: FC = (): ReactElement => {
    const [ searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');

    const exitVideo = () => {
        setSearchParams((searchParams) => {
            searchParams.delete('id');
            return searchParams;
        });
    };

    return (
        <Dialog
            title="Video"
            isOpen={id !== null && id === parseInt(id).toString()}
            onClose={exitVideo}
            canEscapeKeyClose={false}
            className='view_edit_video'
        >
            <DialogBody>
                <Suspense fallback='Loading'>
                    <EditVideo id={parseInt(id || '')} />
                </Suspense>
            </DialogBody>
        </Dialog>
    );
};
