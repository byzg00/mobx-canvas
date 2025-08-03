'use client';

import React, { useEffect } from 'react';
import { Layer, Rect, Stage, Text } from 'react-konva';
import { observer } from 'mobx-react';

import { FIELD_SIZE, SIZE_PX } from '@/widgets/board/constants';
import { Board, board as boardModel } from '@/widgets/board/board';
import { AppleFancy } from '@/widgets/board/AppleFancy';
import { WormHead } from '@/widgets/board/WormHead';
import { WormTail } from '@/widgets/board/WormTail';

const BoardInner = observer((props: { board: Board }) => {
    const { board } = props;
    const { worm, apple } = board;
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    board.wormMove(-1, 0);
                    break;
                case 'ArrowRight':
                    board.wormMove(1, 0);
                    break;
                case 'ArrowUp':
                    board.wormMove(0, -1);
                    break;
                case 'ArrowDown':
                    board.wormMove(0, 1);
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
    }, [board]);
    console.log('board', board);

    return (
        <Stage width={SIZE_PX} height={SIZE_PX}>
            <Layer>
                {/* {range(0, FIELDS).map((i) => ( */}
                {/*    range(0, FIELDS).map((j) => ( */}
                {/*        <Rect */}
                {/*            key={`field-${i}${j}`} */}
                {/*            x={FIELD_SIZE * i} */}
                {/*            y={FIELD_SIZE * j} */}
                {/*            width={FIELD_SIZE} */}
                {/*            height={FIELD_SIZE} */}
                {/*            stroke="black" */}
                {/*            strokeWidth={1} */}
                {/*        /> */}
                {/*    )) */}
                {/* ))} */}
                <Rect
                    x={1}
                    y={1}
                    width={SIZE_PX - 1}
                    height={SIZE_PX - 1}
                    stroke="black"
                    strokeWidth={1}
                />
                {worm.parts.map((part, index) => {
                    if (index === 0) {
                        return <WormHead key="worm-head" worm={worm} apple={apple} />;
                    }

                    if (index === worm.parts.length - 1) {
                        return <WormTail worm={worm} key="worm-tail" />;
                    }

                    return (
                        <Rect
                            key={`worm-part-${part.x}-${part.y}`}
                            x={FIELD_SIZE * part.x}
                            y={FIELD_SIZE * part.y}
                            width={FIELD_SIZE}
                            height={FIELD_SIZE}
                            fill="#228B22"
                        />
                    );
                })}
                <AppleFancy x={apple.x} y={apple.y} />

                {board.isGameOver ? (
                    <Text
                        x={SIZE_PX / 3}
                        y={SIZE_PX / 3}
                        fontSize={70}
                        fill="orange"
                        text="Game over"
                    />
                ) : null}
            </Layer>
        </Stage>
    );
});

export const BoardComponent = () => {
    return (
        <BoardInner board={boardModel} />
    );
};
