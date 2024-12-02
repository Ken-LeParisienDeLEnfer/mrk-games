import { NavBoat } from "./NavBoat";

export class SubmarineBoat extends NavBoat {
    
    constructor() {
        super("Submarine", [], 3, "./assets/submarine.png", false);
    }
}