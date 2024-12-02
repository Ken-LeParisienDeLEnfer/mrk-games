

export class Coordinate {
    x: number;
    y: number;
    isTouched: boolean;

    constructor(x: number, y: number, isTouched?: boolean) {
        this.x = x;
        this.y = y;
        this.isTouched = isTouched ?? false;
    }
}