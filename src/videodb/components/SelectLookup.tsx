import React, { FC, ReactElement, useContext } from 'react';

import { VideoDbContext } from '../hooks/useVideoDbState';
import { useGetLookup } from '../hooks/useVideoDbQueries';

import { SelectKeyValue } from '../../common/components/forms';

type SelectLookupParams = {
    lookupTable: string;
    selectedKey: string;
    onSelectionChange?: (selectedKey: string) => void;
    label: string;
    small?: boolean;
    className?: string;
};

export const SelectLookup: FC<SelectLookupParams> = (props): ReactElement => {
    const { lookupTable, selectedKey, onSelectionChange, label, small, className } = props;
    const { videoDbState: { apiPath } } = useContext(VideoDbContext);
    const lookupKeyValues = useGetLookup(apiPath, lookupTable);

    return (
        <SelectKeyValue
            label={label}
            allItems={lookupKeyValues}
            onSelectionChange={onSelectionChange}
            selectedKey={selectedKey}
            small={small}
            className={className}
        />
    );
};
