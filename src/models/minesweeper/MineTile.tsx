import { Tile } from "../Tile";

export class MineTile implements Tile {
    x: number;
    y: number;
    isRevealed: boolean;
    value: string;

    constructor(x: number, y: number, isRevealed?: boolean, value?: string)
    {
        this.x = x;
        this.y = y;
        this.isRevealed = isRevealed ?? false;
        this.value = value ?? '';
    }

}