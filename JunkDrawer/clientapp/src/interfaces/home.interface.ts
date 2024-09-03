import {ITrustedNeighbor} from "./trustedNeighbor.interface.ts";
import {IHomeRoleType} from "./homeRole.type.ts";
import {IHomePermissionType} from "./homePermission.type.ts";

export interface IHome {
    homeId: number;
    homeName: string;
    homePhoto: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    purchaseDate: Date;
    purchasePrice: number;
    notes: string;
    trustedNeighbors: ITrustedNeighbor[];    
    role?: IHomeRoleType;
    permissions?: IHomePermissionType[];
}