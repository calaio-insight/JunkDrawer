import {ITrustedNeighbor} from "./trustedNeighbor.interface";
import {IHomeRoleType} from "./homeRole.type.ts";

export interface INeighborOption {
    label: string;
    value: ITrustedNeighbor;
}

export interface IRoleOption {
    label: string;
    value: IHomeRoleType
}