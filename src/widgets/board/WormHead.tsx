import { Rect, Circle, Arc } from 'react-konva';

import { FIELD_SIZE } from './constants';
import { Worm } from './worm';
import { Part } from './part';

type Props = {
    worm: Worm;
    apple: Part;
};

export const BASE_RADIUS = 20;

export const getCornerRadius = (dx: number, dy: number) => {
    let cornerRadius: [number, number, number, number] = [0, 0, 0, 0];
    if (dx === 1) cornerRadius = [0, BASE_RADIUS, BASE_RADIUS, 0];
    else if (dx === -1) cornerRadius = [BASE_RADIUS, 0, 0, BASE_RADIUS];
    else if (dy === 1) cornerRadius = [0, 0, BASE_RADIUS, BASE_RADIUS];
    else if (dy === -1) cornerRadius = [BASE_RADIUS, BASE_RADIUS, 0, 0];
    return cornerRadius;
};

export const WormHead = (props: Props) => {
    const { worm, apple } = props;
    const head = worm.parts[0];
    const neck = worm.parts[1];

    const baseX = head.x * FIELD_SIZE;
    const baseY = head.y * FIELD_SIZE;

    let dx = 0;
    let dy = 0;
    if (neck) {
        dx = head.x - neck.x;
        dy = head.y - neck.y;
    }

    // Скругление головы в направлении движения
    const cornerRadius = getCornerRadius(dx, dy);

    // Глаза — направление
    let eyeOffsetX = 0;
    let eyeOffsetY = 0;
    if (dx === 1) eyeOffsetX = 2;
    else if (dx === -1) eyeOffsetX = -2;
    else if (dy === 1) eyeOffsetY = 2;
    else if (dy === -1) eyeOffsetY = -2;

    // Рот — координаты и направление
    let mouthX = baseX + FIELD_SIZE / 2;
    let mouthY = baseY + FIELD_SIZE / 2;
    let rotation = 0;

    if (dx === 1) {
        mouthX = baseX + FIELD_SIZE - 6;
        rotation = 0;
    } else if (dx === -1) {
        mouthX = baseX + 6;
        rotation = 180;
    } else if (dy === 1) {
        mouthY = baseY + FIELD_SIZE - 6;
        rotation = 90;
    } else if (dy === -1) {
        mouthY = baseY + 6;
        rotation = -90;
    }

    // Проверка: яблоко в любой соседней клетке (включая диагонали)
    const dxApple = Math.abs(apple.x - head.x);
    const dyApple = Math.abs(apple.y - head.y);
    const isMouthOpen = (dxApple <= 1 && dyApple <= 1) && !(dxApple === 0 && dyApple === 0) && dxApple + dyApple !== 2;

    return (
        <>
            <Rect
                x={baseX}
                y={baseY}
                width={FIELD_SIZE}
                height={FIELD_SIZE}
                fill="#006400"
                cornerRadius={cornerRadius}
            />
            {/* Глаза */}
            <Circle
                x={baseX + FIELD_SIZE * 0.3}
                y={baseY + FIELD_SIZE * 0.3}
                radius={FIELD_SIZE * 0.1}
                fill="white"
            />
            <Circle
                x={baseX + FIELD_SIZE * 0.3 + eyeOffsetX}
                y={baseY + FIELD_SIZE * 0.3 + eyeOffsetY}
                radius={FIELD_SIZE * 0.05}
                fill="black"
            />
            <Circle
                x={baseX + FIELD_SIZE * 0.7}
                y={baseY + FIELD_SIZE * 0.3}
                radius={FIELD_SIZE * 0.1}
                fill="white"
            />
            <Circle
                x={baseX + FIELD_SIZE * 0.7 + eyeOffsetX}
                y={baseY + FIELD_SIZE * 0.3 + eyeOffsetY}
                radius={FIELD_SIZE * 0.05}
                fill="black"
            />
            {/* Рот */}
            {isMouthOpen ? (
                <Circle
                    x={mouthX}
                    y={mouthY}
                    radius={6}
                    fill="black"
                />
            ) : (
                <Arc
                    x={mouthX}
                    y={mouthY}
                    innerRadius={6}
                    outerRadius={6.5}
                    angle={180}
                    rotation={rotation}
                    fill="black"
                />
            )}
        </>
    );
};
