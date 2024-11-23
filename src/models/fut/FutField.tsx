import { PlayingGround } from "../PlayingGround";

export class FutField implements PlayingGround {
    width: number;
    height: number;
    backgroundColor: string;

    constructor () {
        this.width = 5;
        this.height = 8;
        this.backgroundColor = "#000000";
    }
    toPlainObject(): FutField {
        return {
            width: this.width,
            height: this.width,
            backgroundColor: this.backgroundColor
        } as FutField;
    }
    
}