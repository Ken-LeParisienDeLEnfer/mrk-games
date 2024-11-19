import { PlayingGround } from "./PlayingGround";
import { Tile } from "./Tile";

export interface Game {
    id: number;
    title: string;
    uri: string;
    playingGround: PlayingGround;
    tiles: Tile[];

    init(): void
}