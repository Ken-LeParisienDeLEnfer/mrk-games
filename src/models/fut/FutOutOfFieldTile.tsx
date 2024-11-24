import { FutTeam } from "./FutTeam";
import { FutTile } from "./FutTile";
import { FutTileTypeEnum } from "./FutTileTypeEnum";

export class FutOutOfFieldTile extends FutTile {
    constructor(x: number, y: number)
    {
        super(x, y, null, 'out-of-field-tile', FutTileTypeEnum.OUT_OF_FIELD, true, '');
    }
}