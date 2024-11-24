import { Tile } from "../Tile";
import { FutTeam } from "./FutTeam";
import { FutTileTypeEnum } from "./FutTileTypeEnum";

export class FutTile implements Tile {
    x: number;
    y: number;
    isRevealed: boolean;
    value: string;
    type: FutTileTypeEnum;
    cssClass: string;
    isHasBall: boolean;

    
    team?: FutTeam | null;

    constructor(x: number, y: number, team: FutTeam | null, cssClass: string, type: FutTileTypeEnum, isRevealed?: boolean, value?: string, isHasBall?: boolean)
    {
        this.x = x;
        this.y = y;
        this.isRevealed = isRevealed ?? false;
        this.cssClass = cssClass;
        this.team = team;
        this.value = value ?? '';
        this.type = type;
        this.isHasBall = isHasBall ?? false;
    }
    

}