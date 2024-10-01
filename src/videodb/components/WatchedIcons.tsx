import { Icon, Tooltip } from '@blueprintjs/core';
import React, { ReactElement, FC } from 'react';

const watchedColorLookup = {
    'Y': 'green',
    'N': 'crimson',
    'P': 'orange',
    '': 'white'
} as { [key: string]: string };

const watchedDescLookup = {
    'Y': 'watched',
    'N': 'unwatched',
    'P': 'part watched'
} as { [key: string]: string };

type WatchedIconsParams = {
    watchedStatus?: string | null,
    mediaWatchedStatus?: string | null,
    mediaDesc?: string | null,
}

export const WatchedIcons: FC<WatchedIconsParams> = ({ watchedStatus, mediaWatchedStatus, mediaDesc }): ReactElement => {
    const watchedTooltip = watchedDescLookup[watchedStatus ?? ''];
    let mediaWatchedTooltip = '';
    if (mediaWatchedStatus && mediaDesc) {
        mediaWatchedTooltip = `${watchedDescLookup[mediaWatchedStatus]} on ${mediaDesc} media`;
    }
    return (
        <>
            <Tooltip content={watchedTooltip} hoverOpenDelay={500} position='top'>
                <Icon
                    icon='record'
                    size={20}
                    color={watchedColorLookup[watchedStatus ?? '']}
                />
            </Tooltip>
            <Tooltip content={mediaWatchedTooltip} hoverOpenDelay={500} position='top'>
                <Icon
                    icon='record'
                    size={20}
                    color={watchedColorLookup[mediaWatchedStatus ?? '']}
                />
            </Tooltip>
        </>
    );

};
