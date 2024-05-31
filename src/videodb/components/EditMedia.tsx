import React, { FC, ReactElement } from 'react';
import { VideoMedium } from '../api';
import { EditMedium } from './EditMedium';
import { Button, FormGroup } from '@blueprintjs/core';

import './EditMedia.scss';

type EditMediaParams = {
    media?: VideoMedium[];
    onChange?: (media: VideoMedium[]) => void;
};

export const EditMedia: FC<EditMediaParams> = ({ media, onChange }): ReactElement => {
    if (!media) {
        return <></>;
    }

    const replaceMedium = (index: number, medium: VideoMedium) => {
        const newMedia = [...media];
        newMedia[index] = medium;
        onChange?.(newMedia);
    };

    return (
        <FormGroup label='Media' className='edit-media'>
            {media?.map((medium, index) => <EditMedium key={index} onChange={(medium) => replaceMedium(index, medium)} medium={medium} />)}
            <Button icon='add' />
        </FormGroup>
    );
};
