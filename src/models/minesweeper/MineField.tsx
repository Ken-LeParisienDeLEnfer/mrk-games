import { PlayingGround } from "../PlayingGround";

export class MineField implements PlayingGround {
    width: number;
    height: number;
    backgroundColor: string;

    constructor () {
        this.width = 10;
        this.height = 10;
        this.backgroundColor = "#000000";
    }
    
}