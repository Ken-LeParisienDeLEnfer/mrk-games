import { PlayingGround } from "./PlayingGround";
import { Tile } from "./Tile";

export abstract class Game<T extends Tile, U extends PlayingGround> {
    id: number;
    title: string;
    uri: string;
    
    constructor(
        id: number, 
        title: string,
        uri: string,
    ) {
        this.id = id;
        this.title = title;
        this.uri = uri;  
    }
    abstract playingGround: U;
    abstract tiles: T[];

    abstract init(): void;
    abstract toPlainObject(): Game<T, U>;
}