import React, { FC, ReactElement, useCallback, useContext, useReducer } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Card, ControlGroup } from '@blueprintjs/core';

import { useGetVideo } from '../hooks/useVideoDbQueries';
import { videoReducer } from '../hooks/useVideoReducer';
import { NullableIntInput, NullableStringInput, StringInput } from '../../common/components/forms';
import { putVideoDbVideo } from '../api';
import { VideoDbContext } from '../hooks/useVideoDbState';
import { SelectLookup } from './SelectLookup';
import { EditTags } from './EditTags';
import { AppToaster } from '../../common/components/toaster';
import { NullableSelectLookup } from './NullableSelectLookup';

import './EditVideo.scss';

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
        <div className='edit_video'>
            <StringInput
                label='Title'
                value={videoState.title}
                onValueChange={(value) => videoStateReducer({ key: 'title', value })}
            />
            <ControlGroup>
                <NullableIntInput
                    label='Length (mins)'
                    value={videoState.length_mins}
                    onValueChange={(value) => videoStateReducer({ key: 'length_mins', value})}
                    className='length'
                />
                <SelectLookup
                    label='Watched'
                    lookupTable='watched_status'
                    selectedKey={videoState.watched}
                    onSelectionChange={(value) => videoStateReducer({ key: 'watched', value})}
                    className='watched_status'
                />
                <SelectLookup
                    label='Category'
                    lookupTable='categories'
                    selectedKey={videoState.category}
                    onSelectionChange={(value) => videoStateReducer({ key: 'category', value})}
                    className='category'
                />
            </ControlGroup>
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
            <Card className='media'>
                <ControlGroup>
                    <NullableSelectLookup
                        label='Media'
                        lookupTable='media_types'
                        selectedKey={videoState.primary_media_type}
                        onSelectionChange={(value) => videoStateReducer({ key: 'primary_media_type', value})}
                        className='media_type'
                    />
                    <NullableSelectLookup
                        label='Location'
                        lookupTable='media_locations'
                        selectedKey={videoState.primary_media_location}
                        onSelectionChange={(value) => videoStateReducer({ key: 'primary_media_location', value})}
                        className='media_location'
                    />
                    <NullableSelectLookup
                        label='Watched'
                        lookupTable='watched_status'
                        selectedKey={videoState.primary_media_watched}
                        onSelectionChange={(value) => videoStateReducer({ key: 'primary_media_watched', value})}
                        className='watched_status'
                    />
                </ControlGroup>
                <ControlGroup>
                    <NullableSelectLookup
                        label=''
                        lookupTable='media_types'
                        selectedKey={videoState.other_media_type}
                        onSelectionChange={(value) => videoStateReducer({ key: 'other_media_type', value})}
                        className='media_type'
                    />
                    <NullableSelectLookup
                        label=''
                        lookupTable='media_locations'
                        selectedKey={videoState.other_media_location}
                        onSelectionChange={(value) => videoStateReducer({ key: 'other_media_location', value})}
                        className='media_location'
                    />
                </ControlGroup>
                <NullableStringInput
                    label='Notes'
                    className='notes'
                    value={videoState.media_notes}
                    onValueChange={(value) => videoStateReducer({ key: 'media_notes', value })}
                />
            </Card>
            <Button className='update_button' onClick={saveVideo}>
                Update
            </Button>
        </div>
    );
};
