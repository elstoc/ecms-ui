import { Dialog, DialogBody } from '@blueprintjs/core';
import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ViewEditVideo: FC<{ apiPath: string, videoId?: number }> = ({ apiPath, videoId }): ReactElement => {
    const [, setSearchParams] = useSearchParams();

    const exitVideo = () => {
        setSearchParams((searchParams) => {
            searchParams.delete('id');
            return searchParams;
        });
    };

    return (
        <Dialog title="Video" isOpen={videoId !== undefined} onClose={exitVideo}>
            <DialogBody>
                <div>You chose id {videoId}. Well done!</div>
            </DialogBody>
        </Dialog>
    );
};
