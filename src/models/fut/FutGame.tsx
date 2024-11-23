import { Game } from "../Game";
import { TeamType } from "../TeamType";
import { FutField } from "./FutField";
import { FutTeam } from "./FutTeam";
import { FutTile } from "./FutTile";

export class FutGame extends Game<FutTile, FutField> {

    playingGround: FutField;

    tiles: FutTile[];

    constructor (id: number, title: string, uri: string) {
        super(id, title, uri);
        this.playingGround = new FutField();
        this.tiles = [];
    }

    toPlainObject(): FutGame {
        return {
            id: this.id,
            title: this.title,
            uri: this.uri,
            playingGround: this.playingGround,
            tiles: this.tiles
        } as FutGame;
    }

    init(): void {
        
        for(let y: number = 0; y < this.playingGround.height; y++) {
            let x: number = 0;
            while (x < this.playingGround.width) {
                this.tiles.push(new FutTile(x, y));
                x++;
            }
        }
        


        const tileTeamUser1 = this.tiles.find(tile => tile.x === 2 && tile.y === 2);
        if(tileTeamUser1) {
            tileTeamUser1.team = new FutTeam(TeamType.USER);
            tileTeamUser1.isRevealed = true;
        }
        const tileTeamUser2 = this.tiles.find(tile => tile.x === 0 && tile.y === 4);
        if(tileTeamUser2) {
            tileTeamUser2.team = new FutTeam(TeamType.USER);
            tileTeamUser2.isRevealed = true;
        }
        const tileTeamUser3 = this.tiles.find(tile => tile.x === 3 && tile.y === 4);
        if(tileTeamUser3) {
            tileTeamUser3.team = new FutTeam(TeamType.USER);
            tileTeamUser3.isRevealed = true;
        }
        const tileTeamUser4 = this.tiles.find(tile => tile.x === 2 && tile.y === 5);
        if(tileTeamUser4) {
            tileTeamUser4.team = new FutTeam(TeamType.USER);
            tileTeamUser4.isRevealed = true;
        }
        const tileTeamUser5 = this.tiles.find(tile => tile.x === 2 && tile.y === 7);
        if(tileTeamUser5) {
            tileTeamUser5.team = new FutTeam(TeamType.USER);
            tileTeamUser5.isRevealed = true;
        }
        
    }

}