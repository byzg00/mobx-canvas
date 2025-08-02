'use client';

import React, { useEffect } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import range from 'lodash/range';
import { observer } from 'mobx-react';

import { FIELD_SIZE, FIELDS, SIZE_PX } from '@/widgets/board/constants';
import { worm as wormStore, Worm } from '@/widgets/board/worm';

const BoardInner = observer((props: { worm: Worm }) => {
    const { worm } = props;
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    worm.move(-1, 0);
                    break;
                case 'ArrowRight':
                    worm.move(1, 0);
                    break;
                case 'ArrowUp':
                    worm.move(0, -1);
                    break;
                case 'ArrowDown':
                    worm.move(0, 1);
                    break;
                default: {
                    break;
                }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
        };
    }, [worm]);
    console.log(worm);

    return (
        <Stage width={SIZE_PX} height={SIZE_PX}>
            <Layer>
                {range(0, FIELDS).map((i) => (
                    range(0, FIELDS).map((j) => (
                        <Rect
                            key={`field-${i}${j}`}
                            x={FIELD_SIZE * i}
                            y={FIELD_SIZE * j}
                            width={FIELD_SIZE}
                            height={FIELD_SIZE}
                            stroke="black"
                            strokeWidth={1}
                        />
                    ))
                ))}
                {worm.parts.map((part) => (
                    <Rect
                        key={`worm-part-${part.x}${part.y}`}
                        x={FIELD_SIZE * part.x}
                        y={FIELD_SIZE * part.y}
                        width={FIELD_SIZE}
                        height={FIELD_SIZE}
                        fill="black"
                    />
                ))}
            </Layer>
        </Stage>
    );
});

export const Board = () => {
    return (
        <BoardInner worm={wormStore} />
    );
};
