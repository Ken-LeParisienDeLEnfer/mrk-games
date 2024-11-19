import { Tile } from "../Tile";

export class FutTile implements Tile {
    x: number;
    y: number;
    isRevealed: boolean;
    
    
    constructor(x: number, y: number);
    constructor(x: number, y: number, isRevealed: boolean);

    constructor(x: number, y: number, isRevealed?: boolean)
    {
        this.x = x;
        this.y = y;
        this.isRevealed = isRevealed ?? false;
    }

}