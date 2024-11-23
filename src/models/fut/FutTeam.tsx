import { Team } from "../Team";
import { TeamType } from "../TeamType";

export class FutTeam implements Team {
    type: TeamType;
    constructor (type: TeamType) {
        this.type = type;
    }
}