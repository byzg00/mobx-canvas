// eslint-disable-next-line max-classes-per-file
import range from 'lodash/range';
import { observable, makeObservable, action } from 'mobx';

import { FIELDS } from './constants';
import { Part } from './part';

export type ChangeCoord = 1 | -1 | 0;

export class Worm {
    public length: number;

    public parts: Part[];

    public head: Part;

    constructor(props: {
        length: number;
        headX: number;
        headY: number;
    }) {
        const { length, headX, headY } = props;
        this.length = length;
        this.parts = range(0, length).map((i) => {
            return new Part({ x: headX - i, y: headY });
        });
        const [head] = this.parts;
        this.head = head;
        makeObservable(this, {
            parts: observable,
            length: observable,
            move: action,
        });
    }

    public canMove(dx: ChangeCoord, dy: ChangeCoord) {
        if (
            this.head.x + dx > FIELDS - 1
            || this.head.x + dx < 0
            || this.head.y + dy > FIELDS - 1
            || this.head.y + dy < 0
        ) {
            return false;
        }
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
        // if (this.head.x + dx > FIELDS - 1) {
        //     this.head.x = 0;
        // } else if (this.head.x + dx < 0) {
        //     this.head.x = FIELDS - 1;
        // } else {
        //     this.head.x += dx;
        // }
        // if (this.head.y + dy > FIELDS - 1) {
        //     this.head.y = 0;
        // } else if (this.head.y + dy < 0) {
        //     this.head.y = FIELDS - 1;
        // } else {
        //     this.head.y += dy;
        // }
        this.head.x += dx;
        this.head.y += dy;
        this.parts.slice(1).forEach((part, index) => {
            part.x = prevCoords[index].x;
            part.y = prevCoords[index].y;
        });
    }

    public eat(dx: ChangeCoord, dy: ChangeCoord) {
        const newHead = new Part({
            x: this.head.x + dx,
            y: this.head.y + dy,
        });
        this.parts.unshift(newHead);
        this.head = newHead;
    }
}
