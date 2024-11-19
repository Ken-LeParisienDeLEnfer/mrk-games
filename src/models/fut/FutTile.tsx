import { Tile } from "../Tile";
import { FutTeam } from "./FutTeam";

export class FutTile implements Tile {
    x: number;
    y: number;
    isRevealed: boolean;
    
    team?: FutTeam | null;

    constructor(x: number, y: number, team?: FutTeam, isRevealed?: boolean)
    {
        this.x = x;
        this.y = y;
        this.isRevealed = isRevealed ?? false;
        this.team = team ?? null;
    }

}