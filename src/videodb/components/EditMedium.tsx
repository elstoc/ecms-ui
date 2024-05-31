import React, { FC, ReactElement } from 'react';
import { VideoMedium } from '../api';
import { Button, ControlGroup } from '@blueprintjs/core';
import { SelectLookup } from './SelectLookup';
import { NullableStringInput } from '../../common/components/forms';

import './EditMedium.scss';

type EditMediumParams = {
    medium: VideoMedium;
    onChange?: (medium: VideoMedium) => void;
};

export const EditMedium: FC<EditMediumParams> = ({ medium, onChange }): ReactElement => {
    return (
        <ControlGroup >
            <ControlGroup vertical={true}>
                <ControlGroup fill={true} className='compress'>
                    <SelectLookup
                        label=''
                        lookupTable='media_types'
                        selectedKey={medium.media_type}
                        onSelectionChange={(media_type) => onChange?.({...medium, media_type})}
                        small={true}
                    />
                    <SelectLookup
                        label=''
                        lookupTable='media_locations'
                        selectedKey={medium.media_location}
                        onSelectionChange={(media_location) => onChange?.({...medium, media_location})}
                        small={true}
                    />
                    <SelectLookup
                        label=''
                        lookupTable='watched_status'
                        selectedKey={medium.watched}
                        onSelectionChange={(watched) => onChange?.({...medium, watched})}
                        small={true}
                    />
                    <Button small={true} icon='delete' />
                </ControlGroup>
                <NullableStringInput
                    label=''
                    value={medium.notes}
                    small={true}
                    onValueChange={(notes) => onChange?.({...medium, notes})}
                />
            </ControlGroup>
        </ControlGroup>
    );
};
