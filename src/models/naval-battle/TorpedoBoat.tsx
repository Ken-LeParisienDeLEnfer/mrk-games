import { NavBoat } from "./NavBoat";

export class TorpedoBoat extends NavBoat {
    
    constructor() {
        super(5, "Torpedo Boat", [], 2, "./assets/torpedo.png",false);
    }
}