import { NavBoat } from "./NavBoat";

export class TorpedoBoat extends NavBoat {
    
    constructor() {
        super("Torpedo Boat", [], 2, "./assets/torpedo.png",false);
    }
}