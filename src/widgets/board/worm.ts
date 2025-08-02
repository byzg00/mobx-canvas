// eslint-disable-next-line max-classes-per-file
import range from 'lodash/range';
import { observable, makeObservable, action } from 'mobx';

import { FIELDS } from '@/widgets/board/constants';

class WormPart {
    public x: number;

    public y: number;

    constructor(props: {
        x: number;
        y: number;
    }) {
        this.x = props.x;
        this.y = props.y;
        makeObservable(this, {
            x: observable,
            y: observable,
        });
    }
}

type ChangeCoord = 1 | -1 | 0;

export class Worm {
    public length: number;

    public parts: WormPart[];

    public head: WormPart;

    constructor(props: {
        length: number;
        headX: number;
        headY: number;
    }) {
        const { length, headX, headY } = props;
        this.length = length;
        this.parts = range(0, length).map((i) => {
            return new WormPart({ x: headX - i, y: headY });
        });
        const [head] = this.parts;
        this.head = head;
        makeObservable(this, {
            parts: observable,
            length: observable,
            move: action,
        });
    }

    private canMove(dx: ChangeCoord, dy: ChangeCoord) {
        return this.parts.every((part, partNum) => {
            if (partNum === 0) {
                return true;
            }
            return !((part.x === this.head.x + dx) && (part.y === this.head.y + dy));
        });
    }

    public move(dx: ChangeCoord, dy: ChangeCoord) {
        if (!this.canMove(dx, dy)) {
            return;
        }
        const prevCoords = this.parts.map((part) => ({ x: part.x, y: part.y }));
        if (this.head.x + dx > FIELDS - 1) {
            this.head.x = 0;
        } else if (this.head.x + dx < 0) {
            this.head.x = FIELDS - 1;
        } else {
            this.head.x += dx;
        }
        if (this.head.y + dy > FIELDS - 1) {
            this.head.y = 0;
        } else if (this.head.y + dy < 0) {
            this.head.y = FIELDS - 1;
        } else {
            this.head.y += dy;
        }
        this.parts.slice(1).forEach((part, index) => {
            part.x = prevCoords[index].x;
            part.y = prevCoords[index].y;
        });
    }
}

export const worm = new Worm({
    length: 5,
    headX: 4,
    headY: 4,
});
