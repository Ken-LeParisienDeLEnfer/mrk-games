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
        const tileTeamCPU1 = this.tiles.find(tile => tile.x === 2 && tile.y === 1);
        if(tileTeamCPU1) {
            tileTeamCPU1.team = new FutTeam(TeamType.CPU);
            tileTeamCPU1.isRevealed = false;
            tileTeamCPU1.value = "X";
        }
        const tileTeamCPU2 = this.tiles.find(tile => tile.x === 1 && tile.y === 3);
        if(tileTeamCPU2) {
            tileTeamCPU2.team = new FutTeam(TeamType.CPU);
            tileTeamCPU2.isRevealed = true;
            tileTeamCPU2.value = "X";
        }
        const tileTeamCPU3 = this.tiles.find(tile => tile.x === 2 && tile.y === 4);
        if(tileTeamCPU3) {
            tileTeamCPU3.team = new FutTeam(TeamType.CPU);
            tileTeamCPU3.isRevealed = true;
            tileTeamCPU3.value = "X";
        }
        const tileTeamCPU4 = this.tiles.find(tile => tile.x === 3 && tile.y === 3);
        if(tileTeamCPU4) {
            tileTeamCPU4.team = new FutTeam(TeamType.CPU);
            tileTeamCPU4.isRevealed = true;
            tileTeamCPU4.value = "X";
        }
        const tileTeamCPUGoal = this.tiles.find(tile => tile.x === 2 && tile.y === 0);
        if(tileTeamCPUGoal) {
            tileTeamCPUGoal.team = new FutTeam(TeamType.CPU);
            tileTeamCPUGoal.isRevealed = true;
            tileTeamCPUGoal.value = "X";
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