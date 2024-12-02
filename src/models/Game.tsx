import { PlayingGround } from "./PlayingGround";
import { ResultEnum } from "./ResultEnum";
import { Tile } from "./Tile";

export abstract class Game<T extends Tile, U extends PlayingGround> {
    id: number;
    title: string;
    uri: string;
    isMyTurn: boolean;
    isStarted: boolean;
    isFinished: boolean;
    result: ResultEnum | undefined;
    
    constructor(
        id: number, 
        title: string,
        uri: string,
        isMyTurn: boolean,
        isStarted: boolean,
        isFinished: boolean,
        result?: ResultEnum
    ) {
        this.id = id;
        this.title = title;
        this.uri = uri;
        this.isMyTurn = isMyTurn;
        this.isStarted = isStarted;
        this.isFinished = isFinished;
        this.result = result; 
    }
    abstract playingGround: U;
    abstract tiles: T[];

    abstract toPlainObject(): Game<T, U>;
}