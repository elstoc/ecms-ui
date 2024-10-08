import React, { FC, ReactElement } from 'react';

import { ComponentMetadata, ComponentTypes } from '../api';
import { Gallery } from '../../gallery';
import { Markdown } from '../../markdown';
import { VideoDb } from '../../videodb';

export const SiteComponent: FC<{ metadata: ComponentMetadata }> = ({ metadata }): ReactElement => {
    if (metadata.type === ComponentTypes.gallery) {
        return <Gallery key={metadata.apiPath} {...metadata} />;
    } else if (metadata.type === ComponentTypes.markdown) {
        return <Markdown key={metadata.apiPath} {...metadata} />;
    } else if (metadata.type === ComponentTypes.videodb) {
        return <VideoDb key={metadata.apiPath} {...metadata} />;
    }

    return <div>Component Type Not Supported</div>;
};
