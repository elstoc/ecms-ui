import React, { FC, ReactElement } from 'react';

import { useGetVideo } from '../hooks/useVideoDbQueries';

export const ViewVideo: FC<{ apiPath: string, id: number }> = ({ apiPath, id }): ReactElement => {
    const video = useGetVideo(apiPath, id);
    return (
        <div>You chose {video.title}. Well done!</div>
    );
};
