import React, { FC, ReactElement, useReducer } from 'react';

import { useVideoDbVideo } from '../hooks/useVideoDbQueries';
import { videoReducer } from '../hooks/useVideoReducer';
import { StringInput } from '../../common/components/forms';

export const EditVideo: FC<{ apiPath: string, id: number }> = ({ apiPath, id }): ReactElement => {
    const video = useVideoDbVideo(apiPath, id);
    const [state, stateReducer] = useReducer(videoReducer, video);
    return (
        <div>
            <StringInput
                label='Title'
                value={state.title}
                onValueChange={(value) => stateReducer({ key: 'title', value })}
            />
        </div>
    );
};
