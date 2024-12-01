import { Team } from "../Team";
import { TeamTypeEnum } from "../TeamTypeEnum";

export class FutTeam implements Team {
    type: TeamTypeEnum;
    constructor (type: TeamTypeEnum) {
        this.type = type;
    }
}