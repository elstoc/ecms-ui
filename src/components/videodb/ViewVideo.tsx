import React, { FC, ReactElement } from 'react';
import { useVideoDbVideo } from '../../hooks/useApiQueries';

export const ViewVideo: FC<{ apiPath: string, id: number }> = ({ apiPath, id }): ReactElement => {
    const video = useVideoDbVideo(apiPath, id);
    return (
        <div>You chose {video.title}. Well done!</div>
    );
};
