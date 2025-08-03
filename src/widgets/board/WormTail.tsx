import { Rect } from 'react-konva';

import { Worm } from '@/widgets/board/worm';
import { FIELD_SIZE } from '@/widgets/board/constants';
import {BASE_RADIUS, getCornerRadius} from '@/widgets/board/WormHead';

type Props = {
    worm: Worm;
};

export const WormTail = (props: Props) => {
    const { worm } = props;
    const tail = worm.parts.at(-1);
    if (!tail) {
        return null;
    }
    const beforeTail = worm.parts.at(-2);

    let cornerRadius: [number, number, number, number] = [0, 0, 0, 0];

    if (beforeTail) {
        const dx = tail.x - beforeTail.x;
        const dy = tail.y - beforeTail.y;

        cornerRadius = getCornerRadius(dx, dy);
    }

    return (
        <Rect
            key={`worm-part-${tail.x}-${tail.y}`}
            x={FIELD_SIZE * tail.x}
            y={FIELD_SIZE * tail.y}
            width={FIELD_SIZE}
            height={FIELD_SIZE}
            fill="#90ee90"
            cornerRadius={cornerRadius}
        />
    );
};
