import { Tile } from "../Tile";

export class MineTile implements Tile {
    x: number;
    y: number;
    isRevealed: boolean;
    value: string;
    isDisabled: boolean;

    constructor(x: number, y: number, isRevealed?: boolean, value?: string, isDisabled?: boolean)
    {
        this.x = x;
        this.y = y;
        this.isRevealed = isRevealed ?? false;
        this.value = value ?? '';
        this.isDisabled = isDisabled ?? false;
    }

}