import { Game } from "../Game";
import { TeamType } from "../TeamType";
import { FutField } from "./FutField";
import { FutTeam } from "./FutTeam";
import { FutTile } from "./FutTile";
import { FutGoalTile } from "./FutGoalTile";
import { FutOutOfFieldTile } from "./FutOutOfFieldTile";
import { FutPlayTile } from "./FutPlayTile";
import { FutActionEnum } from "./FutActionEnum";
import { FUT_TITLE, FUT_URI } from "../../constants/Constants";

export class FutGame extends Game<FutTile, FutField> {

    playingGround: FutField;

    tiles: FutTile[];

    action: FutActionEnum;

    

    constructor (id: number) {
        super(id, FUT_TITLE, FUT_URI, true, true, false);
        this.playingGround = new FutField();
        this.tiles = [];
        this.action = FutActionEnum.NONE;
        for(let y: number = 0; y < this.playingGround.height; y++) {
            let x: number = 0;
            while (x < this.playingGround.width) {
                let tile: FutTile;
                if ((y === 0 || y === this.playingGround.height - 1) && x >= Math.floor(this.playingGround.width / 2) - 1 && x <= Math.floor(this.playingGround.width / 2) + 1) {
                    tile = new FutGoalTile(x, y, null, true, "G");
                }
                // DisabledTile: Rest of the y-axis extremity tiles
                else if (y === 0 || y === this.playingGround.height - 1) {
                    tile = new FutOutOfFieldTile(x, y);
                } else {
                    tile = new FutPlayTile(x, y, null, true, '');
                }
                this.tiles.push(tile);
                x++;
            }
        }
        


        const tileTeamUser1 = this.tiles.find(tile => tile.x === 2 && tile.y === 2);
        if(tileTeamUser1) {
            tileTeamUser1.team = new FutTeam(TeamType.USER);
            tileTeamUser1.isRevealed = true;
            tileTeamUser1.value = "U";
        }
        const tileTeamUser2 = this.tiles.find(tile => tile.x === 0 && tile.y === 4);
        if(tileTeamUser2) {
            tileTeamUser2.team = new FutTeam(TeamType.USER);
            tileTeamUser2.isRevealed = true;
            tileTeamUser2.value = "U";
        }
        const tileTeamUser3 = this.tiles.find(tile => tile.x === 3 && tile.y === 4);
        if(tileTeamUser3) {
            tileTeamUser3.team = new FutTeam(TeamType.USER);
            tileTeamUser3.isRevealed = true;
            tileTeamUser3.value = "U";
        }
        const tileTeamUser4 = this.tiles.find(tile => tile.x === 2 && tile.y === 5);
        if(tileTeamUser4) {
            tileTeamUser4.team = new FutTeam(TeamType.USER);
            tileTeamUser4.isRevealed = true;
            tileTeamUser4.value = "U";
            tileTeamUser4.isHasBall = true;
        }
        const tileTeamUser5 = this.tiles.find(tile => tile.x === 2 && tile.y === 7);
        if(tileTeamUser5) {
            tileTeamUser5.team = new FutTeam(TeamType.USER);
            tileTeamUser5.isRevealed = true;
            tileTeamUser5.value = "U";
        }
    }

    toPlainObject(): FutGame {
        return {
            id: this.id,
            title: this.title,
            uri: this.uri,
            isMyTurn: this.isMyTurn,
            isStarted: this.isStarted,
            isFinished: this.isFinished,
            playingGround: this.playingGround,
            tiles: this.tiles,
            action: this.action
        } as FutGame;
    }

    init(): void {
        // a voir
    }

}