import { getAlphabetByIndex } from "../../utils/navUtils";
import { Tile } from "../Tile";
import { NavTile } from "./NavTile";

export class NavReferentialTile extends NavTile {

    constructor(x: number, y: number) {
        super(x,y,true);
        this.value = x === 0 && y === 0 ? "XY" : (y === 0 ? x.toString() : getAlphabetByIndex(y)); 
    }

}