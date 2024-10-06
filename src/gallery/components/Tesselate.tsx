import React, { FC, ReactElement } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import './Tesselate.scss';

type TileInfo = {
    maxWidth: number;
    maxHeight: number;
    key: string;
    element: ReactElement;
};

type TesselateProps = {
    tiles: TileInfo[];
    marginPx: number;
}

/*
    Takes an array of React Elements (tiles) that all have the same height
    and tesselates them into a grid by reducing the height of each row
    and therefore scaling that row's content
    Input elements should be styled to fill the content of their container (width/height = 100%)
    as this component will wrap them in a bunch of divs
*/

export const Tesselate: FC<TesselateProps> = ({ tiles, marginPx }): ReactElement => {
    const { width: containerWidth, ref: widthRef } = useResizeDetector({ handleHeight: false });
    const tileStyle = { margin: `0 ${marginPx}px` };
    const rowStyle = { margin: `${marginPx}px 0` };

    const tiledRows: ReactElement[] = [];

    if (containerWidth) {
        let rowContents: ReactElement[] = [];
        let cumulativeRowWidth = 0;

        tiles.forEach((tile, index) => {
            const isLastRow = index === tiles.length - 1;
            rowContents.push(<div key={tile.key} style={tileStyle}>{tile.element}</div>);

            cumulativeRowWidth += tile.maxWidth;
            const availableWidth = containerWidth - (2 * marginPx * rowContents.length);

            let fillRatio = availableWidth / cumulativeRowWidth;
            if (isLastRow && fillRatio > 1) fillRatio = 1;

            if (fillRatio <= 1) {
                const rowElement = (
                    <div
                        className='row'
                        key={rowContents[0].key}
                        style={{ height: `${tile.maxHeight * fillRatio}px`, ...rowStyle }}
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
