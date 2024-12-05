import { NavBoat } from "./NavBoat";

export class DestroyerBoat extends NavBoat {
    
    constructor() {
        super(2, "Destroyer", [], 4, "./assets/destroyer.png", false);
    }
}