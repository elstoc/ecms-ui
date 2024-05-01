import React, { FC, ReactElement } from 'react';
import { ControlGroup, FormGroup, MenuItem, Switch } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';

export type KeyValue = {
    key: string;
    value: string;
}

type OptionalMultiSelectLookupParams = {
    allItems?: { [key: string]: string };
    selectedKeys?: string[];
    onSelectionChange?: (selectedKeys?: string[]) => void;
    label: string;
};

export const OptionalMultiSelectLookup: FC<OptionalMultiSelectLookupParams> = ({ allItems, selectedKeys, onSelectionChange, label }): ReactElement => {
    const allItemsArray = Object.entries(allItems ?? {}).map(([key, value]) => ({ key, value }));
    const selectedItems = selectedKeys?.map((key) => ({ key, value: allItems?.[key] ?? '' })) ?? [];

    const switchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newSelectedItems = event.target.checked ? [] : undefined;
        onSelectionChange?.(newSelectedItems);
    };

    const toggleItem = (item: KeyValue) => {
        if (!selectedKeys?.includes(item.key)) {
            onSelectionChange?.([...(selectedKeys ?? []), item.key]);
        } else {
            onSelectionChange?.(selectedKeys.filter((key) => key !== item.key));
        }
    };

    const clearItems = () => {
        onSelectionChange?.([]);
    };

    const areTheyEqual = (item1: KeyValue, item2: KeyValue): boolean => {
        return item1.key === item2.key;
    };

    const itemRenderer: ItemRenderer<KeyValue> = (keyValue: KeyValue) => {
        return (
            <MenuItem
                text={keyValue.value}
                key={keyValue.key}
                roleStructure='listoption'
                selected={selectedKeys?.includes(keyValue.key)}
                shouldDismissPopover={true}
                onClick={() => toggleItem(keyValue)}
            />
        );
    };

    const tagRenderer = (keyValue: KeyValue) => keyValue.value;

    return (
        <FormGroup>
            <ControlGroup vertical={false}>
                <Switch
                    className='switch'
                    inline={false}
                    checked={selectedKeys !== undefined}
                    onChange={switchChange}
                />
                <FormGroup label={label} inline={true}>
                    <MultiSelect<KeyValue>
                        disabled={selectedKeys === undefined}
                        fill={false}
                        itemRenderer={itemRenderer}
                        items={allItemsArray}
                        itemsEqual={areTheyEqual}
                        onItemSelect={() => undefined}
                        onRemove={toggleItem}
                        onClear={clearItems}
                        selectedItems={selectedItems}
                        tagRenderer={tagRenderer}
                    />
                </FormGroup>
            </ControlGroup>
        </FormGroup>
    );
};
