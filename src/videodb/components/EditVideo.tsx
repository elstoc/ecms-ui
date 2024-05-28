import React, { FC, ReactElement, useReducer } from 'react';

import { useVideoDbLookup, useVideoDbVideo } from '../hooks/useVideoDbQueries';
import { videoReducer } from '../hooks/useVideoReducer';
import { SelectKeyValue, StringInput } from '../../common/components/forms';

export const EditVideo: FC<{ apiPath: string, id: number }> = ({ apiPath, id }): ReactElement => {
    const video = useVideoDbVideo(apiPath, id);
    const categoryLookup = useVideoDbLookup(apiPath, 'categories');
    const [state, stateReducer] = useReducer(videoReducer, video);
    return (
        <div>
            <StringInput
                label='Title'
                value={state.title}
                onValueChange={(value) => stateReducer({ key: 'title', value })}
            />
            <SelectKeyValue
                label='Category'
                allItems={categoryLookup}
                selectedKey={state.category}
                onSelectionChange={(value) => stateReducer({ key: 'category', value})}
            />
        </div>
    );
};
