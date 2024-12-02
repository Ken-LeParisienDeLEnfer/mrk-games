import { PlayingGround } from "../PlayingGround";

export class NavField implements PlayingGround {
    width: number;
    height: number;
    backgroundColor: string;

    constructor () {
        this.width = 11;
        this.height = 11;
        this.backgroundColor = "#000000";
    }
    toPlainObject(): NavField {
        return {
            width: this.width,
            height: this.width,
            backgroundColor: this.backgroundColor
        } as NavField;
    }
    
}