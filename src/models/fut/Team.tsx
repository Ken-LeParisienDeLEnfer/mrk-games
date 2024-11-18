import { TeamType } from "./TeamType";

export class Team {
    type: TeamType;
    constructor (type: TeamType) {
        this.type = type;
    }
}