import React, { FC, ReactElement, useCallback, useState } from 'react';
import { Button, Card, Collapse, ControlGroup } from '@blueprintjs/core';

import { useEditVideoReducer } from '../hooks/useEditVideoReducer';
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
    const [state, stateReducer] = useEditVideoReducer(initialVideoState);
    const [collapseIsOpen, setCollapseIsOpen] = useState(false);

    const saveVideo = useCallback(async () => {
        onSave?.(state);
    }, [onSave, state]);

    const deleteVideo = useCallback(async () => {
        onDelete?.(state.id);
    }, [onDelete, state]);

    return (
        <div className='edit-video-form'>
            <StringInput
                label=''
                className='title'
                inline={true}
                value={state.title}
                onValueChange={(value) => stateReducer({ key: 'title', value })}
                autoFocus={true}
            />
            <ControlGroup className='first-group'>
                <SelectLookup
                    label='Watched'
                    className='watched-status'
                    selectedKey={state.watched}
                    lookupTable='watched_status'
                    onSelectionChange={(value) => stateReducer({ key: 'watched', value})}
                />
                <SelectLookup
                    label='Category'
                    className='category'
                    lookupTable='categories'
                    selectedKey={state.category}
                    onSelectionChange={(value) => stateReducer({ key: 'category', value})}
                />
            </ControlGroup>
            <ControlGroup className='second-group'>
                <NullableIntInput
                    label='Episodes'
                    className='num-episodes'
                    value={state.num_episodes}
                    onValueChange={(value) => stateReducer({ key: 'num_episodes', value})}
                />
                <NullableIntInput
                    label='Length'
                    className='length'
                    value={state.length_mins}
                    onValueChange={(value) => stateReducer({ key: 'length_mins', value})}
                />
            </ControlGroup>
            <Card className='media'>
                <ControlGroup>
                    <NullableSelectLookup
                        label='Media'
                        className='media-type'
                        lookupTable='media_types'
                        selectedKey={state.primary_media_type}
                        onSelectionChange={(value) => stateReducer({ key: 'primary_media_type', value})}
                    />
                    <NullableSelectLookup
                        label='Location'
                        className='media-location'
                        lookupTable='media_locations'
                        selectedKey={state.primary_media_location}
                        onSelectionChange={(value) => stateReducer({ key: 'primary_media_location', value})}
                    />
                    <NullableSelectLookup
                        label='Watched'
                        className='watched-status'
                        lookupTable='watched_status'
                        selectedKey={state.primary_media_watched}
                        onSelectionChange={(value) => stateReducer({ key: 'primary_media_watched', value})}
                    />
                </ControlGroup>
                <ControlGroup>
                    <NullableSelectLookup
                        label=''
                        className='media-type'
                        lookupTable='media_types'
                        selectedKey={state.other_media_type}
                        onSelectionChange={(value) => stateReducer({ key: 'other_media_type', value})}
                    />
                    <NullableSelectLookup
                        label=''
                        className='media-location'
                        lookupTable='media_locations'
                        selectedKey={state.other_media_location}
                        onSelectionChange={(value) => stateReducer({ key: 'other_media_location', value})}
                    />
                </ControlGroup>
                <NullableStringInput
                    label='Notes'
                    className='notes'
                    value={state.media_notes}
                    onValueChange={(value) => stateReducer({ key: 'media_notes', value })}
                />
            </Card>
            <Switch
                label='Flag'
                className='priority-flag'
                inline={true}
                value={(state.priority_flag ?? 0) > 0}
                onValueChange={(value) => stateReducer({ key: 'priority_flag', value: value ? 1 : 0 })}
            />
            <TagInput
                label='Tags'
                inline={true}
                tags={state.tags}
                onSelectionChange={(value) => stateReducer({ key: 'tags', value })}
            />
            <NullableStringInput
                label='Progress'
                className='progress'
                inline={true}
                value={state.progress}
                onValueChange={(value) => stateReducer({ key: 'progress', value })}
            />
            <Button className='collapser' onClick={() => setCollapseIsOpen((open) => !open)} icon={collapseIsOpen ? 'caret-up' : 'caret-down'} />
            <Collapse isOpen={collapseIsOpen}>
                <NullableStringInput
                    label='Director'
                    className='director'
                    inline={true}
                    value={state.director}
                    onValueChange={(value) => stateReducer({ key: 'director', value })}
                />
                <NullableStringInput
                    label='Actors'
                    inline={true}
                    value={state.actors}
                    onValueChange={(value) => stateReducer({ key: 'actors', value })}
                />
                <NullableStringInput
                    label='Plot'
                    inline={true}
                    value={state.plot}
                    onValueChange={(value) => stateReducer({ key: 'plot', value })}
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
