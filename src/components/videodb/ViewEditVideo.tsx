import { Dialog, DialogBody } from '@blueprintjs/core';
import React, { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

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
        <Dialog title="Video" isOpen={id !== null} onClose={exitVideo}>
            <DialogBody>
                <div>You chose id {id}. Well done!</div>
            </DialogBody>
        </Dialog>
    );
};
