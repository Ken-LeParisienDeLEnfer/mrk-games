import { Tile } from "../Tile";

export class NavTile implements Tile {
    x: number;
    y: number;
    isRevealed: boolean;
    value: string;
    isDisabled: boolean;
    isHit: boolean;
    isTouched: boolean;

    constructor(x: number, y: number, isRevealed?: boolean, value?: string, isDisabled?: boolean, isHit?: boolean, isTouched?: boolean) {
        this.x = x;
        this.y = y;
        this.isRevealed = isRevealed ?? true;
        this.value = value ?? "";
        this.isDisabled = isDisabled ?? true;
        this.isHit = isHit ?? false;
        this.isTouched = isTouched ?? false;
    }

}