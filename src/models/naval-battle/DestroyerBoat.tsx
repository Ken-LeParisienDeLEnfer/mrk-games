import { NavBoat } from "./NavBoat";

export class DestroyerBoat extends NavBoat {
    
    constructor() {
        super("Destroyer", [], 4, "./assets/destroyer.png", false);
    }
}