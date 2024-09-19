import React, { FC, ReactElement, useState } from 'react';
import { FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, MultiSelect } from '@blueprintjs/select';

import './MultiTagInput.scss';

export type KeyValue = {
    key: string;
    value: string;
}

type MultiTagInputParams = {
    selectableTags: string[];
    tags: string[];
    onSelectionChange?: (selectedKeys: string[]) => void;
    label: string;
    inline?: boolean;
    className?: string;
};

export const MultiTagInput: FC<MultiTagInputParams> = ({ selectableTags, tags, onSelectionChange, label, inline, className }): ReactElement => {
    const [queryString, setQueryString] = useState('');
    const allTags = Array.from(new Set([...selectableTags, ...tags]))
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    const toggleTag = (tag: string) => {
        if (!tags.includes(tag)) {
            onSelectionChange?.([...(tags), tag]);
        } else {
            onSelectionChange?.(tags.filter((tagToRemove) => tag !== tagToRemove));
        }
    };

    const itemRenderer: ItemRenderer<string> = (tag, { handleClick, handleFocus, modifiers }) => {
        return (
            <MenuItem
                text={tag}
                key={tag}
                selected={tags.includes(tag)}
                shouldDismissPopover={true}
                roleStructure='listoption'
                active={modifiers.active}
                disabled={modifiers.disabled}
                onFocus={handleFocus}
                onClick={handleClick}
                className='tag-menuitem'
            />
        );
    };

    const createItemRenderer = (
        query: string,
        active: boolean,
        handleClick: React.MouseEventHandler<HTMLElement>
    ) => {
        return (
            <MenuItem
                icon='add'
                text={query}
                key={query}
                active={active}
                onClick={handleClick}
                roleStructure='listoption'
                shouldDismissPopover={true}
            />
        );
    };

    const filterTag: ItemPredicate<string> = (query: string, tag: string) => {
        if (!query || tag.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
        return false;
    };

    return (
        <FormGroup label={label} inline={inline} className={className}>
            <MultiSelect<string>
                items={allTags}
                selectedItems={tags}
                tagRenderer={(tag) => tag}
                itemRenderer={itemRenderer}
                createNewItemFromQuery={(tag) => tag}
                createNewItemRenderer={createItemRenderer}
                onItemSelect={toggleTag}
                onRemove={toggleTag}
                onClear={() => onSelectionChange?.([])}
                itemPredicate={filterTag}
                query={queryString}
                onQueryChange={setQueryString}
                resetOnSelect={true}
                placeholder=''
                noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
                popoverProps={{minimal: true}}
            />
        </FormGroup>
    );
};
