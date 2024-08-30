import {IHomeRoleType} from "./homeRole.type.ts";

export interface ITrustedNeighbor {
    homeId: number;
    userId: number;
    role?: IHomeRoleType;
    
    displayName: string;
}