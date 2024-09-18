// See https://react-icons.github.io/react-icons for summary of available icons
import React, { FC, ReactElement } from 'react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiSave, FiTrash2, FiUser, FiUserX, FiX } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { PopoverPosition, Tooltip } from '@blueprintjs/core';

import './Icon.scss';

const icons: { [key: string]: IconType} = {
    user: FiUser,
    noUser: FiUserX,
    edit: FiEdit,
    delete: FiTrash2,
    cancel: FiX,
    save: FiSave,
    next: FiChevronRight,
    previous: FiChevronLeft,
    close: FiX
};

type IconProps = {
    name: string;
    disabled?: boolean;
    onClick?: () => void;
    tooltipContent?: string;
    tooltipPosition?: PopoverPosition;
};

export const Icon: FC<IconProps> = ({ name, onClick, tooltipContent, tooltipPosition, disabled = false }): ReactElement => {
    const IconComponent = icons[name];

    if (!IconComponent) return <></>;

    const iconOnClick = disabled ? undefined : onClick;
    const iconClass = `icon ${disabled ? 'disabled' : ''} ${iconOnClick ? 'clickable' : ''}`;

    const iconElement = <IconComponent className={iconClass} onClick={iconOnClick} />;

    if (tooltipContent) {
        return (
            <Tooltip className='icon-tooltip' content={tooltipContent} position={tooltipPosition ?? 'left'}>
                {iconElement}
            </Tooltip>
        );
    }
    return iconElement;
};
