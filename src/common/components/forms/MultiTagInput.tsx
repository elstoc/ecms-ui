import React, { FC, ReactElement, useState } from 'react';
import { FormGroup, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, MultiSelect } from '@blueprintjs/select';

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
};

export const MultiTagInput: FC<MultiTagInputParams> = ({ selectableTags, tags, onSelectionChange, label, inline }): ReactElement => {
    const [myQuery, setMyQuery] = useState('');
    const allTags = Array.from(new Set([...selectableTags, ...tags]))
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    const createTag = (query: string) => {
        return query;
    };

    const toggleItem = (tag: string) => {
        if (!tags.includes(tag)) {
            onSelectionChange?.([...(tags), tag]);
        } else {
            onSelectionChange?.(tags.filter((tagToRemove) => tag !== tagToRemove));
        }
        setMyQuery('');
    };

    const clearItems = () => {
        onSelectionChange?.([]);
        setMyQuery('');
    };

    const itemRenderer: ItemRenderer<string> = (tag) => {
        return (
            <MenuItem
                text={tag}
                key={tag}
                roleStructure='listoption'
                selected={tags.includes(tag)}
                shouldDismissPopover={true}
                onClick={() => toggleItem(tag)}
            />
        );
    };

    const createItemRenderer = (tag: string) => {
        return (
            <MenuItem
                text={` + ${tag}`}
                key={tag}
                roleStructure='listoption'
                shouldDismissPopover={true}
                onClick={() => toggleItem(tag)}
            />
        );
    };

    const tagRenderer = (tag: string) => tag;

    const filterTag: ItemPredicate<string> = (query: string, tag: string) => {
        if (!query || tag.includes(query)) {
            return true;
        }
        return false;
    };

    return (
        <FormGroup label={label} inline={inline}>
            <MultiSelect<string>
                fill={false}
                itemRenderer={itemRenderer}
                items={allTags}
                onItemSelect={toggleItem}
                onRemove={toggleItem}
                onClear={clearItems}
                selectedItems={tags}
                tagRenderer={tagRenderer}
                createNewItemRenderer={createItemRenderer}
                createNewItemFromQuery={createTag}
                itemPredicate={filterTag}
                query={myQuery}
                onQueryChange={setMyQuery}
                noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
            />
        </FormGroup>
    );
};
