import {IHomeOwner} from "./homeOwner.interface.ts";

export interface IHome {
    homeId: number;
    homePhoto: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    purchaseDate: Date;
    purchasePrice: number;
    notes: string;
    homeOwners: IHomeOwner[];    
}