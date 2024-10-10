import React, { FC, ReactElement } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { config } from '../../../utils';

import './Tesselate.scss';

type TileInfo = {
    maxWidth: number;
    maxHeight: number;
    key: string;
    element: ReactElement;
};

type TesselateProps = {
    tiles: TileInfo[];
}

/*
    Takes an array of React Elements (tiles) that all have the same height
    and tesselates them into a grid by reducing the height of each row
    and therefore scaling that row's content
    Input elements should be styled to fill the content of their container (width/height = 100%)
    as this component will wrap them in a bunch of divs
*/

export const Tesselate: FC<TesselateProps> = ({ tiles }): ReactElement => {
    const { width: containerWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });
    const { tesselateMarginPx } = config;

    const tiledRows: ReactElement[] = [];

    if (containerWidth) {
        let rowContents: ReactElement[] = [];
        let cumulativeRowWidth = 0;

        tiles.forEach((tile, index) => {
            const isLastRow = index === tiles.length - 1;
            rowContents.push(<div key={tile.key}>{tile.element}</div>);

            cumulativeRowWidth += tile.maxWidth;
            const availableWidth = containerWidth - (2 * tesselateMarginPx * rowContents.length);

            let fillRatio = availableWidth / cumulativeRowWidth;
            if (isLastRow && fillRatio > 1) fillRatio = 1;

            if (fillRatio <= 1) {
                const rowElement = (
                    <div
                        className='row'
                        key={rowContents[0].key}
                        style={{ height: `${tile.maxHeight * fillRatio}px` }}
                    >
                        {rowContents}
                    </div>
                );

                tiledRows.push(rowElement);
                cumulativeRowWidth = 0;
                rowContents = [];
            }
        });
    }

    return (
        <div ref={widthRef} className='tiled-container'>
            {tiledRows}
        </div>
    );
};
