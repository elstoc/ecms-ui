import React, { FC, ReactElement } from 'react';

import { ComponentMetadata, ComponentTypes } from '../../types/Site';
import { Gallery } from '../../gallery/components';
import { Markdown } from '../markdown';
import { VideoDb } from '../videodb/VideoDb';

export const Component: FC<{ metadata: ComponentMetadata }> = ({ metadata }): ReactElement => {
    if (metadata.type === ComponentTypes.gallery) {
        return <Gallery {...metadata} />;
    } else if (metadata.type === ComponentTypes.markdown) {
        return <Markdown {...metadata} />;
    }
    return <VideoDb {...metadata} />;
};
