import { PlayingGround } from "../PlayingGround";

export class FutField implements PlayingGround {
    width: number;
    height: number;
    backgroundColor: string;

    constructor () {
        this.width = 20;
        this.height = 40;
        this.backgroundColor = "#000000";
    }
    
}