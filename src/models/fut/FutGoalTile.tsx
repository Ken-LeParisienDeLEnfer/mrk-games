import { FutTeam } from "./FutTeam";
import { FutTile } from "./FutTile";
import { FutTileTypeEnum } from "./FutTileTypeEnum";

export class FutGoalTile extends FutTile {
    constructor(x: number, y: number, team: FutTeam | null, isRevealed?: boolean, value?: string)
    {
        super(x, y, team, 'goal-tile', FutTileTypeEnum.GOAL, isRevealed, value);
    }
}