import React, { FC, ReactElement } from 'react';

import { ComponentMetadata, ComponentTypes } from '../api';
import { Gallery } from '../../gallery';
import { Markdown } from '../../markdown';
import { VideoDb } from '../../videodb';

export const Component: FC<{ metadata: ComponentMetadata }> = ({ metadata }): ReactElement => {
    if (metadata.type === ComponentTypes.gallery) {
        return <Gallery {...metadata} />;
    } else if (metadata.type === ComponentTypes.markdown) {
        return <Markdown {...metadata} />;
    }
    return <VideoDb {...metadata} />;
};
