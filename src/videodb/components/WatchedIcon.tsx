import { Icon } from '@blueprintjs/core';
import React, { ReactElement, FC } from 'react';

const watchedColorLookup = {
    'Y': 'green',
    'N': 'crimson',
    'P': 'orange',
    '': 'white'
} as { [key: string]: string };

export const WatchedIcon: FC<{ watchedStatus?: string | null, medium?: string | null }> = ({ watchedStatus }): ReactElement => {
    return (
        <Icon
            icon='record'
            size={20}
            color={watchedColorLookup[watchedStatus || '']}
        />
    );

};
