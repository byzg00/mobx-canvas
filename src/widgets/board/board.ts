import { observable, makeObservable } from 'mobx';
import range from 'lodash/range';
import sample from 'lodash/sample';

import { ChangeCoord, Worm } from '@/widgets/board/worm';
import { Part } from '@/widgets/board/part';
import { FIELDS } from '@/widgets/board/constants';

function getFreePosition(fieldSize: number, wormParts: Part[]): Part | null {
    const allPositions: Part[] = [];

    for (let x = 0; x < fieldSize; x++) {
        for (let y = 0; y < fieldSize; y++) {
            allPositions.push({ x, y });
        }
    }

    const occupied = new Set(wormParts.map(p => `${p.x},${p.y}`));

    const freePositions = allPositions.filter(p => !occupied.has(`${p.x},${p.y}`));

    if (freePositions.length === 0) return null;

    return freePositions[Math.floor(Math.random() * freePositions.length)];
}

export class Board {
    public worm: Worm;

    public apple: Part;

    public isGameOver: boolean = false;

    constructor(props: {
        worm: Worm,
        apple: Part,
    }) {
        this.worm = props.worm;
        this.apple = props.apple;
        makeObservable(this, {
            apple: observable,
            isGameOver: observable,
        });
    }

    public wormMove(dx: ChangeCoord, dy: ChangeCoord) {
        const nextX = this.worm.head.x + dx;
        const nextY = this.worm.head.y + dy;

        const willEat = nextX === this.apple.x && nextY === this.apple.y;

        if (willEat) {
            this.worm.eat(dx, dy);
            const newApplePos = getFreePosition(FIELDS, this.worm.parts); // теперь координаты актуальны
            if (!newApplePos) {
                this.isGameOver = true;
                return;
            }
            this.apple = new Part(newApplePos);
        } else {
            this.worm.move(dx, dy);
        }
        if (
            !this.worm.canMove(-1, 0)
            && !this.worm.canMove(1, 0)
            && !this.worm.canMove(0, 1)
            && !this.worm.canMove(0, -1)
        ) {
            this.isGameOver = true;
        }
    }
}

const worm = new Worm({
    length: 3,
    headX: 2,
    headY: 2,
});
let applePos: Part | null;
for (let i = 0; i < 10; i++) {
    applePos = getFreePosition(FIELDS, worm.parts);
    if (applePos) {
        break;
    }
}
export const board = new Board({
    worm,
    apple: new Part({ x: applePos!.x, y: applePos!.y }),
});
