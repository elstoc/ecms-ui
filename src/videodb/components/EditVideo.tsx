import React, { FC, ReactElement, useReducer } from 'react';

import { useGetLookup, useGetVideo } from '../hooks/useVideoDbQueries';
import { videoReducer } from '../hooks/useVideoReducer';
import { MultiTagInput, OptionalIntInput, OptionalStringInput, SelectKeyValue, StringInput } from '../../common/components/forms';
import { Button } from '@blueprintjs/core';

export const EditVideo: FC<{ apiPath: string, id: number }> = ({ apiPath, id }): ReactElement => {
    const video = useGetVideo(apiPath, id);
    const categoryLookup = useGetLookup(apiPath, 'categories');
    const watchedStatusLookup = useGetLookup(apiPath, 'watched_status');
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
            <SelectKeyValue
                label='Watched'
                allItems={watchedStatusLookup}
                selectedKey={state.watched}
                onSelectionChange={(value) => stateReducer({ key: 'watched', value})}
            />
            <OptionalStringInput
                label='Director'
                value={state.director}
                onValueChange={(value) => stateReducer({ key: 'director', value })}
            />
            <OptionalIntInput
                label='Length (mins)'
                value={state.length_mins}
                onValueChange={(value) => stateReducer({ key: 'length_mins', value})}
            />
            <MultiTagInput
                selectableTags={[]}
                tags={state.tags ?? []}
                onSelectionChange={(value: string[]) => stateReducer({key: 'tags', value})}
                label='Tags'
            />
            <Button onClick={() => console.log(JSON.stringify(state))}>
                Update
            </Button>
        </div>
    );
};
