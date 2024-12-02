import { Game } from "../Game";
import { TeamTypeEnum } from "../TeamTypeEnum";
import { AircraftCarrierBoat } from "./AircraftCarrierBoat";
import { DestroyerBoat } from "./DestroyerBoat";
import { NavActionEnum } from "./NavActionEnum";
import { NavBoat } from "./NavBoat";
import { NavField } from "./NavField";
import { NavReferentialTile } from "./NavReferentialTile";
import { NavTile } from "./NavTile";
import { SubmarineBoat } from "./SubmarineBoat";
import { TorpedoBoat } from "./TorpedoBoat";


export class NavGame extends Game<NavTile, NavField> {

    playingGround: NavField;

    tiles: NavTile[];
    tilesUser2: NavTile[];

    boats: NavBoat[];
    boatsUser2: NavBoat[];

    action: NavActionEnum;

    isActionFinished: boolean;

    myPlayer: TeamTypeEnum | undefined;

    constructor(id: number) {
        super(id, "NAVAL BATTLE", "naval-battle", false, false, false, undefined);
        this.playingGround = new NavField();
        this.action = NavActionEnum.POSITION_BOATS;
        this.isActionFinished = false;
        this.myPlayer = undefined;
        this.tiles = [];
        for(let y: number = 0; y < this.playingGround.height; y++) {
            let x: number = 0;
            if (y === 0) {
                this.tiles.push(new NavReferentialTile(0, 0, ""));
            }
            while (x < this.playingGround.width) {
                if(y === 0 || x === 0) {
                    this.tiles.push(new NavReferentialTile(x, y));
                }
                this.tiles.push(new NavTile(x, y));
                x++;
            }
        }
        this.tilesUser2 = [];
        for(let y: number = 0; y < this.playingGround.height; y++) {
            let x: number = 0;
            if (y === 0) {
                this.tilesUser2.push(new NavReferentialTile(0, 0, ""));
            }
            while (x < this.playingGround.width) {
                if(y === 0 || x === 0) {
                    this.tilesUser2.push(new NavReferentialTile(x, y));
                }
                this.tilesUser2.push(new NavTile(x, y));
                x++;
            }
        }

        this.boats = [];
        this.boats.push(new AircraftCarrierBoat(), new DestroyerBoat(), new SubmarineBoat(), new SubmarineBoat(), new TorpedoBoat());
        this.boatsUser2 = [];
        this.boatsUser2.push(new AircraftCarrierBoat(), new DestroyerBoat(), new SubmarineBoat(), new SubmarineBoat(), new TorpedoBoat());
    }

    toPlainObject(): Game<NavTile, NavField> {
        throw new Error("Method not implemented.");
    }
}