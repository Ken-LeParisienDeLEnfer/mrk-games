import { FUT_TITLE, FUT_URI } from "../../constants/Constants";
import { Game } from "../Game";
import { FutField } from "./FutField";
import { FutTile } from "./FutTile";

export class FutGame implements Game {
    id: number;
    title: string;
    uri: string;
    playingGround: FutField;
    tiles: FutTile[];

    constructor (id: number) {
        this.id = id;
        this.title = FUT_TITLE;
        this.uri = FUT_URI;
        this.playingGround = new FutField();
        this.tiles = []
    }

    init(): void {
        for (let i: number = 1; i <= this.playingGround.width; i++) {
            for (let j: number = 1; j<= this.playingGround.height; j++) {
                this.tiles.push(new FutTile(i, j));
            }
        }
    }

}