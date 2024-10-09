// See https://react-icons.github.io/react-icons for summary of available icons
import React, { FC, ReactElement } from 'react';
import { FiChevronLeft, FiChevronRight, FiEdit, FiFlag, FiSave, FiTrash2, FiUser, FiUserX, FiX, FiPlusSquare, FiMenu, FiDownload, FiCheck } from 'react-icons/fi';
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
    close: FiX,
    flag: FiFlag,
    add: FiPlusSquare,
    menu: FiMenu,
    download: FiDownload,
    check: FiCheck
};

type IconProps = {
    name: string;
    disabled?: boolean;
    onClick?: () => void;
    tooltipContent?: string;
    tooltipPosition?: PopoverPosition;
    className?: string;
    color?: string;
};

export const Icon: FC<IconProps> = ({ name, onClick, tooltipContent, tooltipPosition, disabled = false, className = '', color }): ReactElement => {
    const IconComponent = icons[name];

    if (!IconComponent) return <></>;

    const iconOnClick = disabled ? undefined : onClick;
    const divClass = `icon-div ${className} ${disabled ? 'disabled' : ''} ${iconOnClick ? 'clickable' : ''}`;

    let iconElement = <IconComponent className='icon' color={color} />;

    if (tooltipContent) {
        iconElement = (
            <Tooltip
                className='icon-tooltip'
                hoverOpenDelay={500}
                disabled={disabled}
                content={tooltipContent}
                position={tooltipPosition ?? 'left'}
            >
                {iconElement}
            </Tooltip>
        );
    }

    return (
        <div className={divClass} onClick={iconOnClick}>
            {iconElement}
        </div>
    );
};
