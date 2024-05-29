import React, { FC, ReactElement, useCallback, useContext, useReducer } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, OverlayToaster } from '@blueprintjs/core';

import { useGetTags, useGetVideo } from '../hooks/useVideoDbQueries';
import { videoReducer } from '../hooks/useVideoReducer';
import { MultiTagInput, OptionalIntInput, OptionalStringInput, StringInput } from '../../common/components/forms';
import { putVideoDbVideo } from '../api';
import { createRoot } from 'react-dom/client';
import { VideoDbContext } from '../hooks/useVideoDbState';
import { SelectLookup } from './SelectLookup';

export const EditVideo: FC<{ id: number }> = ({ id }): ReactElement => {
    const { state: { apiPath } } = useContext(VideoDbContext);
    const queryClient = useQueryClient();
    const video = useGetVideo(apiPath, id);
    const tagLookup = useGetTags(apiPath);
    const [state, stateReducer] = useReducer(videoReducer, video);

    const saveVideo = useCallback(async () => {
        try {
            await putVideoDbVideo(apiPath, state);
            queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos']});
            queryClient.invalidateQueries({ queryKey: ['videoDb', 'video', state.id]});
            const toaster = await OverlayToaster.createAsync({}, { domRenderer: (toaster, containerElement) => createRoot(containerElement).render(toaster), });
            toaster.show({ message: 'saved', timeout: 2000 });
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, queryClient, state]);

    return (
        <div>
            <StringInput
                label='Title'
                value={state.title}
                onValueChange={(value) => stateReducer({ key: 'title', value })}
            />
            <SelectLookup
                label='Category'
                lookupTable='categories'
                selectedKey={state.category}
                onSelectionChange={(value) => stateReducer({ key: 'category', value})}
            />
            <SelectLookup
                label='Watched'
                lookupTable='watched_status'
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
                selectableTags={tagLookup}
                tags={state.tags ?? []}
                onSelectionChange={(value: string[]) => stateReducer({key: 'tags', value})}
                label='Tags'
            />
            <Button onClick={saveVideo}>
                Update
            </Button>
        </div>
    );
};
