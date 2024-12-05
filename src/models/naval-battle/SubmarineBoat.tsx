import { NavBoat } from "./NavBoat";

export class SubmarineBoat extends NavBoat {
    
    constructor(id: number) {
        super(id, "Submarine", [], 3, "./assets/submarine.png", false);
    }
}