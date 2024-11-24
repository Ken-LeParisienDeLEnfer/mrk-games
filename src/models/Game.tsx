import { PlayingGround } from "./PlayingGround";
import { Tile } from "./Tile";

export abstract class Game<T extends Tile, U extends PlayingGround> {
    id: number;
    title: string;
    uri: string;
    isMyTurn: boolean;
    isStarted: boolean;
    isFinished: boolean;
    
    constructor(
        id: number, 
        title: string,
        uri: string,
        isMyTurn: boolean,
        isStarted: boolean,
        isFinished: boolean
    ) {
        this.id = id;
        this.title = title;
        this.uri = uri;
        this.isMyTurn = isMyTurn;
        this.isStarted = isStarted;
        this.isFinished = isFinished; 
    }
    abstract playingGround: U;
    abstract tiles: T[];

    abstract init(): void;
    abstract toPlainObject(): Game<T, U>;
}