import React from 'react';
import { Shape } from 'react-konva';

import { FIELD_SIZE } from './constants';

type Coord = { x: number; y: number };

const getMainColor = (index: number, total: number) => {
    const g = 100 + Math.round((index / total) * 80); // от 100 до 180
    return `rgb(34, ${g}, 34)`; // тёмно-зелёный к светло-зелёному
};

export const WormBodySegment = (props: {
    prev: Coord;
    current: Coord;
    next: Coord;
    index: number;
    total: number;
}) => {
    const {
        prev,
        current,
        next,
        index,
        total,
    } = props;
    const x = current.x * FIELD_SIZE;
    const y = current.y * FIELD_SIZE;

    const getDirection = (from: Coord, to: Coord): 'up' | 'down' | 'left' | 'right' => {
        if (to.x > from.x) return 'right';
        if (to.x < from.x) return 'left';
        if (to.y > from.y) return 'down';
        if (to.y < from.y) return 'up';
        throw new Error('Invalid direction');
    };

    const getCornerType = () => {
        const from = getDirection(prev, current);
        const to = getDirection(current, next);

        const key = `${from}-${to}`;

        const cornerMap: Record<string, string> = {
            'up-right': 'top-left', // ↱
            'right-up': 'bottom-right', // ↰

            'up-left': 'top-right', // ↰
            'left-up': 'bottom-left', // ↱

            'down-left': 'bottom-right', // ↲
            'left-down': 'top-left', // ↳

            'down-right': 'bottom-left', // ↳
            'right-down': 'top-right', // ↲
        };

        return cornerMap[key] ?? 'straight';
    };

    const corner = getCornerType();
    const r = FIELD_SIZE; // радиус скругления — на весь квадрат

    const mainColor = getMainColor(index, total);

    if (corner === 'straight') {
        return (
            <Shape
                sceneFunc={(ctx) => {
                    // Основной сегмент
                    ctx.beginPath();
                    ctx.rect(x, y, FIELD_SIZE, FIELD_SIZE);

                    ctx.fillStyle = mainColor;
                    ctx.fill();

                    ctx.lineWidth = 1;
                    ctx.strokeStyle = '#145214';
                    ctx.stroke();

                    // Блик — ПОВЕРХ всего
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';

                    ctx.beginPath();
                    ctx.roundRect(
                        x + 2,
                        y + 2,
                        FIELD_SIZE - 4,
                        (FIELD_SIZE - 4) / 2,
                        3,
                    );
                    ctx.fill();

                    ctx.closePath();
                }}

            />
        );
    }

    return (
        <Shape
            sceneFunc={(ctx) => {
                ctx.beginPath();
                switch (corner) {
                    case 'top-left':
                        ctx.moveTo(x + r, y);
                        ctx.arcTo(x, y, x, y + r, r);
                        ctx.lineTo(x, y + r);
                        ctx.lineTo(x, y + FIELD_SIZE);
                        ctx.lineTo(x + FIELD_SIZE, y + FIELD_SIZE);
                        ctx.lineTo(x + FIELD_SIZE, y);
                        ctx.lineTo(x + r, y);
                        break;
                    case 'top-right':
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + FIELD_SIZE - r, y);
                        ctx.arcTo(x + FIELD_SIZE, y, x + FIELD_SIZE, y + r, r);
                        ctx.lineTo(x + FIELD_SIZE, y + FIELD_SIZE);
                        ctx.lineTo(x, y + FIELD_SIZE);
                        ctx.lineTo(x, y);
                        break;
                    case 'bottom-left':
                        ctx.moveTo(x, y);
                        ctx.lineTo(x, y + FIELD_SIZE - r);
                        ctx.arcTo(x, y + FIELD_SIZE, x + r, y + FIELD_SIZE, r);
                        ctx.lineTo(x + FIELD_SIZE, y + FIELD_SIZE);
                        ctx.lineTo(x + FIELD_SIZE, y);
                        ctx.lineTo(x, y);
                        break;
                    case 'bottom-right':
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + FIELD_SIZE, y);
                        ctx.lineTo(x + FIELD_SIZE, y + FIELD_SIZE - r);
                        ctx.arcTo(x + FIELD_SIZE, y + FIELD_SIZE, x + FIELD_SIZE - r, y + FIELD_SIZE, r);
                        ctx.lineTo(x, y + FIELD_SIZE);
                        ctx.lineTo(x, y);
                        break;
                    default:
                }

                // Заливка цветом
                ctx.fillStyle = mainColor;
                ctx.fill();

                // Обводка
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#145214';
                ctx.stroke();

                // Блик: маленький скруглённый прямоугольник в верхнем левом углу сегмента
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
                ctx.roundRect(
                    x + 2,
                    y + 2,
                    FIELD_SIZE - 4,
                    (FIELD_SIZE - 4) / 2,
                    3,
                );
                ctx.fill();

                ctx.closePath();
            }}
        />
    );
};
