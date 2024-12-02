import { getAlphabetByIndex } from "../../utils/navUtils";
import { Tile } from "../Tile";

export class NavReferentialTile implements Tile {
    x: number;
    y: number;
    isRevealed: boolean;
    value: string;
    isDisabled: boolean;
    isHit: boolean;
    isTouched: boolean;

    constructor(x: number, y: number, value?: string) {
        this.x = x;
        this.y = y;
        this.isRevealed = true;
        this.value = value ?? y === 0 ? x.toString() : getAlphabetByIndex(y); 
        this.isDisabled = true;
        this.isHit = false;
        this.isTouched = false;
    }

}