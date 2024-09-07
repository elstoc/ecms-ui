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
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const setSearchParamsFromState = useSetSearchParamsFromFilterState();
    const clearSearchParams = useClearSearchParams();
    const {
        state: {
            apiPath, pendingFlagUpdates,
            filters: {
                titleContains, maxLength, categories, watchedStatuses,
                pmWatchedStatuses, primaryMediaTypes, tags,
            },
        },
        stateReducer,
    } = useContext(VideoDbContext);

    const categoryLookup = useGetLookup(apiPath, 'categories');
    const watchedStatusLookup = useGetLookup(apiPath, 'watched_status');
    const mediaTypeLookup = useGetLookup(apiPath, 'media_types');

    const flagUpdateCount = Object.keys(pendingFlagUpdates).length;

    const postFlagUpdates = useCallback(async () => {
        try {
            const videoUpdates: VideoUpdate[] = [];
            for (const [id, to_watch_priority] of Object.entries(pendingFlagUpdates)) {
                videoUpdates.push({ id: parseInt(id), to_watch_priority });
            }
            await patchVideoDbVideos(apiPath, videoUpdates);
            (await AppToaster).show({ message: 'flags updated', timeout: 2000 });
            await queryClient.invalidateQueries({ queryKey: ['videoDb', 'videos']});
            stateReducer({ action: 'resetFlagUpdates' });
        } catch (error: unknown) {
            alert('error ' + error);
        }
    }, [apiPath, pendingFlagUpdates, queryClient, stateReducer]);

    return (
        <div className='video-filters'>
            <Card className='card'>
                <NullableIntInput
                    label='Shorter Than' 
                    inline={true}
                    value={maxLength}
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'maxLength', value })}
                />
                <NullableStringInput
                    label='Title Contains'
                    inline={true}
                    value={titleContains}
                    placeholder=''
                    onValueChange={(value) => stateReducer({ action: 'setFilter', key: 'titleContains', value })}
                />
                <MultiSelectKeyValue
                    label='Categories'
                    inline={true}
                    allItems={categoryLookup}
                    selectedKeys={categories ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'categories', value })}
                />
                <MultiSelectKeyValue
                    label='Watched'
                    inline={true}
                    allItems={watchedStatusLookup}
                    selectedKeys={watchedStatuses ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'watchedStatuses', value })}
                />
                <MultiSelectKeyValue
                    label='Media Type'
                    inline={true}
                    allItems={mediaTypeLookup}
                    selectedKeys={primaryMediaTypes ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'primaryMediaTypes', value })}
                />
                <MultiSelectKeyValue
                    label='Media Watched'
                    inline={true}
                    allItems={watchedStatusLookup}
                    selectedKeys={pmWatchedStatuses ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'pmWatchedStatuses', value })}
                />
                <TagInput
                    label='Tags'
                    className='tags'
                    inline={true}
                    tags={tags ?? []}
                    onSelectionChange={(value) => stateReducer({ action: 'setFilter', key: 'tags', value })}
                />
                <div className='filter-action-buttons'>
                    <Button onClick={clearSearchParams}>Clear All</Button>
                    <Button onClick={setSearchParamsFromState}>Submit</Button>
                </div>
            </Card>
            <div className='video-action-buttons'>
                {flagUpdateCount > 0 &&
                    <>
                        <Button onClick={postFlagUpdates}>Update {flagUpdateCount} Flags</Button>
                        <Button onClick={() => stateReducer({ action: 'resetFlagUpdates' })}>Reset Flags</Button>
                    </>
                }
                <Link to={`./add?${searchParams.toString()}`}><Button>Add New Video</Button></Link>
            </div>
        </div>
    );
};
