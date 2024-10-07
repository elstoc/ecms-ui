import React, { FC, ReactElement } from 'react';

import { ComponentMetadata, ComponentTypes } from '../api';
import { Gallery } from '../../gallery';
import { MarkdownPages } from '../../markdown';
import { VideoDb } from '../../videodb';

export const SiteComponent: FC<{ metadata: ComponentMetadata }> = ({ metadata }): ReactElement => {
    if (metadata.type === ComponentTypes.gallery) {
        return <Gallery {...metadata} />;
    } else if (metadata.type === ComponentTypes.markdown) {
        return <MarkdownPages {...metadata} />;
    } else if (metadata.type === ComponentTypes.videodb) {
        return <VideoDb {...metadata} />;
    }

    return <div>Component Type Not Supported</div>;
};
