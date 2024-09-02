import React, { FC, ReactElement, useCallback, useReducer } from 'react';
import { Button, Card, ControlGroup } from '@blueprintjs/core';

import { NullableIntInput, NullableStringInput, StringInput } from '../../common/components/forms';

import { videoReducer } from '../hooks/useVideoReducer';
import { VideoWithId } from '../api';
import { SelectLookup } from './SelectLookup';
import { NullableSelectLookup } from './NullableSelectLookup';
import { TagInput } from './TagInput';

import './EditVideoForm.scss';

type EditVideoFormProps = {
    initialVideoState: VideoWithId;
    onSave?: (video: VideoWithId) => Promise<void>;
    onDelete?: (id: number) => Promise<void>;
}

export const EditVideoForm: FC<EditVideoFormProps> = ({ initialVideoState, onSave, onDelete }): ReactElement => {
    const [videoState, videoStateReducer] = useReducer(videoReducer, initialVideoState);

    const saveVideo = useCallback(async () => {
        onSave?.(videoState);
    }, [onSave, videoState]);

    const deleteVideo = useCallback(async () => {
        onDelete?.(videoState.id);
    }, [onDelete, videoState]);

    return (
        <div className='edit-video-form'>
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
                    className='watched-status'
                />
                <SelectLookup
                    label='Category'
                    lookupTable='categories'
                    selectedKey={videoState.category}
                    onSelectionChange={(value) => videoStateReducer({ key: 'category', value})}
                    className='category'
                />
            </ControlGroup>
            <Card className='media'>
                <ControlGroup>
                    <NullableSelectLookup
                        label='Media'
                        lookupTable='media_types'
                        selectedKey={videoState.primary_media_type}
                        onSelectionChange={(value) => videoStateReducer({ key: 'primary_media_type', value})}
                        className='media-type'
                    />
                    <NullableSelectLookup
                        label='Location'
                        lookupTable='media_locations'
                        selectedKey={videoState.primary_media_location}
                        onSelectionChange={(value) => videoStateReducer({ key: 'primary_media_location', value})}
                        className='media-location'
                    />
                    <NullableSelectLookup
                        label='Watched'
                        lookupTable='watched_status'
                        selectedKey={videoState.primary_media_watched}
                        onSelectionChange={(value) => videoStateReducer({ key: 'primary_media_watched', value})}
                        className='watched-status'
                    />
                </ControlGroup>
                <ControlGroup>
                    <NullableSelectLookup
                        label=''
                        lookupTable='media_types'
                        selectedKey={videoState.other_media_type}
                        onSelectionChange={(value) => videoStateReducer({ key: 'other_media_type', value})}
                        className='media-type'
                    />
                    <NullableSelectLookup
                        label=''
                        lookupTable='media_locations'
                        selectedKey={videoState.other_media_location}
                        onSelectionChange={(value) => videoStateReducer({ key: 'other_media_location', value})}
                        className='media-location'
                    />
                </ControlGroup>
                <NullableStringInput
                    label='Notes'
                    className='notes'
                    value={videoState.media_notes}
                    onValueChange={(value) => videoStateReducer({ key: 'media_notes', value })}
                />
            </Card>
            <TagInput
                tags={videoState.tags ?? []}
                onSelectionChange={(value: string[]) => videoStateReducer({key: 'tags', value})}
                label='Tags'
            />
            <NullableStringInput
                label='Director'
                value={videoState.director}
                onValueChange={(value) => videoStateReducer({ key: 'director', value })}
            />
            <div className='form-buttons'>
                {onSave &&
                    <Button className='save-button' onClick={saveVideo}>
                        Save Changes
                    </Button>
                }
                {onDelete &&
                    <Button className='delete-button' onClick={deleteVideo}>
                        Delete Video
                    </Button>
                }
            </div>
        </div>
    );
};
