import { Coordinate } from "./Coordinate";

export class NavBoat {
    name: string;
    coordinates: Coordinate[];
    length: number;
    isSinked: boolean;
    img: string;

    constructor(name: string, coordinates: Coordinate[], length: number, img: string, isSinked?: boolean) {
        this.name = name;
        this.coordinates = coordinates;
        this.length = length;
        this.img = img;
        this.isSinked = isSinked ?? false;
    }
}