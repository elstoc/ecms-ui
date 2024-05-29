import React, { FC, ReactElement, useContext } from 'react';

import { useGetVideo } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from '../hooks/useVideoDbState';

export const ViewVideo: FC<{ id: number }> = ({ id }): ReactElement => {
    const { state: { apiPath } } = useContext(VideoDbContext);
    const video = useGetVideo(apiPath, id);
    return (
        <div>You chose {video.title}. Well done!</div>
    );
};
