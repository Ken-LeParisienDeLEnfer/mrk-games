import { Team } from "./Team";

export class FutTile implements Tile {
    x: number;
    y: number;
    isRevealed: boolean;
    
    team: Team;
    
    constructor(x: number, y: number, team: Team);
    constructor(x: number, y: number, team: Team, isRevealed: boolean);

    constructor(x: number, y: number, team: Team, isRevealed?: boolean)
    {
        this.x = x;
        this.y = y;
        this.isRevealed = isRevealed ?? false;
        this.team = team;
    }

}