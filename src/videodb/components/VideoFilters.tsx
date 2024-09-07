import React, { FC, ReactElement, useCallback, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Card } from '@blueprintjs/core';
import { useQueryClient } from '@tanstack/react-query';

import { useGetLookup } from '../hooks/useVideoDbQueries';
import { VideoDbContext, useClearSearchParams, useSetSearchParamsFromFilterState } from '../hooks/useVideoDbState';
import { patchVideoDbVideos, VideoUpdate } from '../api';

import { NullableIntInput, NullableStringInput, MultiSelectKeyValue } from '../../common/components/forms';
import { AppToaster } from '../../common/components/toaster';
import { TagInput } from './TagInput';

import './VideoFilters.scss';

export const VideoFilters: FC = (): ReactElement => {
    const [searchParams] = useSearchParams();
    const { state: { apiPath, pendingFlagUpdates, filters: { titleContains, maxLength, categories, watchedStatuses, pmWatchedStatuses, primaryMediaTypes, tags } }, stateReducer } = useContext(VideoDbContext);
    const setSearchParamsFromState = useSetSearchParamsFromFilterState();
    const categoryLookup = useGetLookup(apiPath, 'categories');
    const watchedStatusLookup = useGetLookup(apiPath, 'watched_status');
    const mediaTypeLookup = useGetLookup(apiPath, 'media_types');
    const clearSearchParams = useClearSearchParams();
    const flagUpdateCount = Object.keys(pendingFlagUpdates).length;
    const queryClient = useQueryClient();

    const postFlagUpdates = useCallback(async () => {
        try {
            const videoUpdates: VideoUpdate[] = [];
            for (const [id, to_watch_priority] of Object.entries(pendingFlagUpdates)) {
                videoUpdates.push({ id: parseInt(id), to_watch_priority });
            }
            await patchVideoDbVideos(apiPath, videoUpdates);
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos']});
            stateReducer({ action: 'resetFlagUpdates' });
            (await AppToaster).show({ message: 'flags updated', timeout: 2000 });
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, pendingFlagUpdates, queryClient, stateReducer]);

    return (
        <div className='video-filters'>
            <Card className='card'>
                <NullableIntInput
                    value={maxLength}
                    inline={true}
                    label='Shorter Than' 
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'maxLength', value })}
                />
                <NullableStringInput
                    value={titleContains}
                    inline={true}
                    label='Title Contains'
                    placeholder=''
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'titleContains', value })}
                />
                <MultiSelectKeyValue
                    allItems={categoryLookup}
                    inline={true}
                    selectedKeys={categories ?? []}
                    label='Categories'
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'categories', value })}
                />
                <MultiSelectKeyValue
                    allItems={watchedStatusLookup}
                    inline={true}
                    selectedKeys={watchedStatuses ?? []}
                    label='Watched'
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'watchedStatuses', value })}
                />
                <MultiSelectKeyValue
                    allItems={mediaTypeLookup}
                    inline={true}
                    selectedKeys={primaryMediaTypes ?? []}
                    label='Media Type'
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'primaryMediaTypes', value })}
                />
                <MultiSelectKeyValue
                    allItems={watchedStatusLookup}
                    inline={true}
                    selectedKeys={pmWatchedStatuses ?? []}
                    label='Media Watched'
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'pmWatchedStatuses', value })}
                />
                <TagInput
                    tags={tags ?? []}
                    inline={true}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'tags', value })}
                    label='Tags'
                    className='tags'
                />
                <div className='filter-action-buttons'>
                    <Button onClick={clearSearchParams}>Clear All</Button>
                    <Button onClick={setSearchParamsFromState}>Submit</Button>
                </div>
            </Card>
            <div className='video-action-buttons'>
                {flagUpdateCount > 0 && <Button onClick={postFlagUpdates}>Update {flagUpdateCount} Flags</Button>}
                {flagUpdateCount > 0 && <Button onClick={() => stateReducer({ action: 'resetFlagUpdates' })}>Reset Flags</Button>}
                <Link to={`./add?${searchParams.toString()}`}><Button>Add New Video</Button></Link>
            </div>
        </div>
    );
};
