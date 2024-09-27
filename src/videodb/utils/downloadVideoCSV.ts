import { downloadBlob } from '../../utils';
import { ColumnParam, createCSV } from '../../utils/createCSV';
import { getVideoDbVideos, VideoWithId } from '../api';

const videoColumnParams: ColumnParam<VideoWithId>[] = [
    { title: 'Id', getField: (video) => video.id },
    { title: 'Flag', getField: (video) => video.to_watch_priority || null },
    { title: 'Title', getField: (video) => video.title },
    { title: 'Category', getField: (video) => video.category },
    { title: 'Length', getField: (video) => video.length_mins },
    { title: 'Watched', getField: (video) => video.watched },
    { title: 'Tags', getField: (video) => video.tags },
    { title: 'Primary Media', getField: (video) => video.primary_media_type },
    { title: 'Primary Media Location', getField: (video) => video.primary_media_location },
    { title: 'Primary Media Watched', getField: (video) => video.primary_media_watched },
    { title: 'Other Media', getField: (video) => video.other_media_type },
    { title: 'Other Media Location', getField: (video) => video.other_media_location },
    { title: 'Media Notes', getField: (video) => video.media_notes },
    { title: 'Year', getField: (video) => video.year },
    { title: 'Director', getField: (video) => video.director },
    { title: 'Actors', getField: (video) => video.actors },
];

export const downloadVideoCSV = async (path: string): Promise<void> => {
    const now = new Date();
    const videos = await getVideoDbVideos(path);
    const videoCSV = createCSV(videoColumnParams, videos);
    const csvBlob = new Blob([videoCSV], { type: 'text/csv' });
    downloadBlob(csvBlob, `videos-${now.toISOString().substring(0, 10)}.csv`);
};
