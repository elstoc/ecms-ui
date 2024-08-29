import React, { FC, ReactElement, useContext } from 'react';

import { MultiTagInput } from '../../common/components/forms';
import { useGetTags } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from '../hooks/useVideoDbState';

type TagInputParams = {
    tags: string[];
    onSelectionChange?: (selectedKeys: string[]) => void;
    label: string;
    inline?: boolean;
};

export const TagInput: FC<TagInputParams> = ({ tags, onSelectionChange, label, inline }): ReactElement => {
    const { state: { apiPath } } = useContext(VideoDbContext);
    const tagLookup = useGetTags(apiPath);
    return (
        <MultiTagInput
            selectableTags={tagLookup}
            tags={tags}
            onSelectionChange={onSelectionChange}
            label={label}
            inline={inline}
        />
    );
};
