import React, { FC, ReactElement, useCallback, useReducer, useState } from 'react';
import { Button, Card, Collapse, ControlGroup, Divider } from '@blueprintjs/core';

import { videoReducer } from '../hooks/useVideoReducer';
import { VideoWithId } from '../api';

import { Switch, NullableIntInput, NullableStringInput, StringInput } from '../../common/components/forms';
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
    const [collapseIsOpen, setCollapseIsOpen] = useState(false);

    const saveVideo = useCallback(async () => {
        onSave?.(videoState);
    }, [onSave, videoState]);

    const deleteVideo = useCallback(async () => {
        onDelete?.(videoState.id);
    }, [onDelete, videoState]);

    return (
        <div className='edit-video-form'>
            <StringInput
                label=''
                className='title'
                inline={true}
                value={videoState.title}
                onValueChange={(value) => videoStateReducer({ key: 'title', value })}
                autoFocus={true}
            />
            <ControlGroup className='first-group'>
                <SelectLookup
                    label='Watched'
                    className='watched-status'
                    selectedKey={videoState.watched}
                    lookupTable='watched_status'
                    onSelectionChange={(value) => videoStateReducer({ key: 'watched', value})}
                />
                <SelectLookup
                    label='Category'
                    className='category'
                    lookupTable='categories'
                    selectedKey={videoState.category}
                    onSelectionChange={(value) => videoStateReducer({ key: 'category', value})}
                />
            </ControlGroup>
            <ControlGroup className='second-group'>
                <NullableIntInput
                    label='Episodes'
                    className='num-episodes'
                    value={videoState.num_episodes}
                    onValueChange={(value) => videoStateReducer({ key: 'num_episodes', value})}
                />
                <NullableIntInput
                    label='Length'
                    className='length'
                    value={videoState.length_mins}
                    onValueChange={(value) => videoStateReducer({ key: 'length_mins', value})}
                />
            </ControlGroup>
            <Card className='media'>
                <ControlGroup>
                    <NullableSelectLookup
                        label='Media'
                        className='media-type'
                        lookupTable='media_types'
                        selectedKey={videoState.primary_media_type}
                        onSelectionChange={(value) => videoStateReducer({ key: 'primary_media_type', value})}
                    />
                    <NullableSelectLookup
                        label='Location'
                        className='media-location'
                        lookupTable='media_locations'
                        selectedKey={videoState.primary_media_location}
                        onSelectionChange={(value) => videoStateReducer({ key: 'primary_media_location', value})}
                    />
                    <NullableSelectLookup
                        label='Watched'
                        className='watched-status'
                        lookupTable='watched_status'
                        selectedKey={videoState.primary_media_watched}
                        onSelectionChange={(value) => videoStateReducer({ key: 'primary_media_watched', value})}
                    />
                </ControlGroup>
                <ControlGroup>
                    <NullableSelectLookup
                        label=''
                        className='media-type'
                        lookupTable='media_types'
                        selectedKey={videoState.other_media_type}
                        onSelectionChange={(value) => videoStateReducer({ key: 'other_media_type', value})}
                    />
                    <NullableSelectLookup
                        label=''
                        className='media-location'
                        lookupTable='media_locations'
                        selectedKey={videoState.other_media_location}
                        onSelectionChange={(value) => videoStateReducer({ key: 'other_media_location', value})}
                    />
                </ControlGroup>
                <NullableStringInput
                    label='Notes'
                    className='notes'
                    value={videoState.media_notes}
                    onValueChange={(value) => videoStateReducer({ key: 'media_notes', value })}
                />
            </Card>
            <Switch
                label='Flag'
                className='priority-flag'
                inline={true}
                value={(videoState.priority_flag ?? 0) > 0}
                onValueChange={(value) => videoStateReducer({ key: 'priority_flag', value: value ? 1 : 0 })}
            />
            <TagInput
                label='Tags'
                inline={true}
                tags={videoState.tags}
                onSelectionChange={(value) => videoStateReducer({ key: 'tags', value })}
            />
            <NullableStringInput
                label='Progress'
                className='progress'
                inline={true}
                value={videoState.progress}
                onValueChange={(value) => videoStateReducer({ key: 'progress', value })}
            />
            <Button className='collapser' onClick={() => setCollapseIsOpen((open) => !open)} icon={collapseIsOpen ? 'caret-up' : 'caret-down'} />
            <Collapse isOpen={collapseIsOpen}>
                <NullableStringInput
                    label='Director'
                    className='director'
                    inline={true}
                    value={videoState.director}
                    onValueChange={(value) => videoStateReducer({ key: 'director', value })}
                />
                <NullableStringInput
                    label='Actors'
                    inline={true}
                    value={videoState.actors}
                    onValueChange={(value) => videoStateReducer({ key: 'actors', value })}
                />
                <NullableStringInput
                    label='Plot'
                    inline={true}
                    value={videoState.plot}
                    onValueChange={(value) => videoStateReducer({ key: 'plot', value })}
                />
            </Collapse>
            <div className='form-buttons'>
                {onDelete &&
                    <Button tabIndex={-1} className='delete-button' onClick={deleteVideo}>
                        Delete Video
                    </Button>
                }
                {onSave &&
                    <Button className='save-button' onClick={saveVideo}>
                        Save Changes
                    </Button>
                }
            </div>
        </div>
    );
};
