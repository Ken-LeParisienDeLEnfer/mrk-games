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
    toPlainObject(): MineField {
        return {
            width: this.width,
            height: this.height,
            backgroundColor: this.backgroundColor
        } as MineField;
    }
    
}