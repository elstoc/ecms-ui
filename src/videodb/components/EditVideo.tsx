import React, { FC, ReactElement, useCallback, useContext, useReducer } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@blueprintjs/core';

import { useGetVideo } from '../hooks/useVideoDbQueries';
import { videoReducer } from '../hooks/useVideoReducer';
import { NullableIntInput, NullableStringInput, StringInput } from '../../common/components/forms';
import { putVideoDbVideo } from '../api';
import { VideoDbContext } from '../hooks/useVideoDbState';
import { SelectLookup } from './SelectLookup';
import { EditTags } from './EditTags';
import { EditMedia } from './EditMedia';
import { AppToaster } from '../../common/components/toaster';

export const EditVideo: FC<{ id: number }> = ({ id }): ReactElement => {
    const { state: { apiPath } } = useContext(VideoDbContext);
    const queryClient = useQueryClient();
    const storedVideo = useGetVideo(apiPath, id);
    const [videoState, videoStateReducer] = useReducer(videoReducer, storedVideo);

    const saveVideo = useCallback(async () => {
        try {
            await putVideoDbVideo(apiPath, videoState);
            queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos']});
            queryClient.invalidateQueries({ queryKey: ['videoDb', 'video', videoState.id]});
            (await AppToaster).show({ message: 'saved', timeout: 2000 });
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, queryClient, videoState]);

    return (
        <div>
            <StringInput
                label='Title'
                value={videoState.title}
                onValueChange={(value) => videoStateReducer({ key: 'title', value })}
            />
            <SelectLookup
                label='Category'
                lookupTable='categories'
                selectedKey={videoState.category}
                onSelectionChange={(value) => videoStateReducer({ key: 'category', value})}
            />
            <SelectLookup
                label='Watched'
                lookupTable='watched_status'
                selectedKey={videoState.watched}
                onSelectionChange={(value) => videoStateReducer({ key: 'watched', value})}
            />
            <NullableIntInput
                label='Length (mins)'
                value={videoState.length_mins}
                onValueChange={(value) => videoStateReducer({ key: 'length_mins', value})}
            />
            <EditTags
                tags={videoState.tags ?? []}
                onSelectionChange={(value: string[]) => videoStateReducer({key: 'tags', value})}
                label='Tags'
            />
            <NullableStringInput
                label='Director'
                value={videoState.director}
                onValueChange={(value) => videoStateReducer({ key: 'director', value })}
            />
            <Button onClick={saveVideo}>
                Update
            </Button>
        </div>
    );
};
