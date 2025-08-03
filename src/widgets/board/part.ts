import { makeObservable, observable } from 'mobx';

export class Part {
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
