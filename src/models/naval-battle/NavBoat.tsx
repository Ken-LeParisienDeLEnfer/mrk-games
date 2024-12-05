import { Coordinate } from "./Coordinate";

export class NavBoat {
    id: number;
    name: string;
    coordinates: Coordinate[];
    length: number;
    isSinked: boolean;
    img: string;

    constructor(id: number, name: string, coordinates: Coordinate[], length: number, img: string, isSinked?: boolean) {
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
        this.length = length;
        this.img = img;
        this.isSinked = isSinked ?? false;
    }
}