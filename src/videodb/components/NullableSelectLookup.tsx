import React, { FC, ReactElement, useContext } from 'react';

import { VideoDbContext } from '../hooks/useVideoDbState';
import { useGetLookup } from '../hooks/useVideoDbQueries';
import { NullableSelectKeyValue } from '../../common/components/forms';

type NullableSelectLookupParams = {
    lookupTable: string;
    selectedKey: string | null;
    onSelectionChange?: (selectedKey: string | null) => void;
    label: string;
    small?: boolean;
    className?: string;
};

export const NullableSelectLookup: FC<NullableSelectLookupParams> = ({ lookupTable, selectedKey, onSelectionChange, label, small, className }): ReactElement => {
    const { state: { apiPath } } = useContext(VideoDbContext);
    const lookupKeyValues = useGetLookup(apiPath, lookupTable);
    return (
        <NullableSelectKeyValue
            label={label}
            allItems={lookupKeyValues}
            onSelectionChange={onSelectionChange}
            selectedKey={selectedKey}
            small={small}
            className={className}
        />
    );
};
