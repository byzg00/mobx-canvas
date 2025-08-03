import { Ellipse, Circle } from 'react-konva';

import { FIELD_SIZE } from './constants';

export const AppleFancy = ({ x, y }: { x: number, y: number }) => {
    const baseX = x * FIELD_SIZE;
    const baseY = y * FIELD_SIZE;

    return (
        <>
            <Circle
                x={baseX + FIELD_SIZE / 2}
                y={baseY + FIELD_SIZE / 2}
                radius={FIELD_SIZE / 2.2}
                fill="#e63946"
                shadowBlur={4}
            />
            {/* Листочек */}
            <Ellipse
                x={baseX + FIELD_SIZE / 2 + 4}
                y={baseY + FIELD_SIZE / 2 - 10}
                radiusX={4}
                radiusY={8}
                fill="green"
                rotation={-30}
            />
        </>
    );
};
