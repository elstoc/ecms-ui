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

    const removeMedium = (index: number) => {
        const newMedia = [...media];
        newMedia.splice(index, 1);
        onChange?.(newMedia);
    };

    const addMedium = () => {
        const newMedia = [...media];
        newMedia.push({ media_type: 'BD4K', media_location: 'NAS', watched: 'N', notes: null });
        onChange?.(newMedia);
    };

    return (
        <FormGroup label='Media' className='edit-media'>
            {media?.map((medium, index) =>
                <EditMedium
                    key={index}
                    medium={medium}
                    onChange={(medium) => replaceMedium(index, medium)}
                    onDelete={() => removeMedium(index)}
                />)
            }
            <Button icon='add' onClick={addMedium} />
        </FormGroup>
    );
};
