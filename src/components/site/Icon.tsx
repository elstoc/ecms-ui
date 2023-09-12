// See https://react-icons.github.io/react-icons

import React, { FC, ReactElement } from 'react';
import { FiUser, FiUserX, FiX } from 'react-icons/fi';
import { HiOutlineCodeBracket } from 'react-icons/hi2';

import './Icon.scss';
import { IconType } from 'react-icons';
import { Tooltip } from '@primer/react';

const icons: { [key: string]: IconType} = {
    user: FiUser,
    noUser: FiUserX,
    showSource: HiOutlineCodeBracket,
    cancel: FiX
};

type IconProps = {
    name: string;
    onClick?: () => void;
    tooltipContent?: string;
    tooltipDirection?: 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';
};

export const Icon: FC<IconProps> = ({ name, onClick, tooltipContent, tooltipDirection }): ReactElement => {
    const IconComponent = icons[name];

    if (!IconComponent) return <></>;

    const iconElement = <IconComponent className='icon' onClick={onClick} />;

    if (tooltipContent) {
        return (
            <Tooltip className='icon-tooltip' aria-label={tooltipContent} direction={tooltipDirection ?? 'w'}>
                {iconElement}
            </Tooltip>
        );
    }
    return iconElement;
};
