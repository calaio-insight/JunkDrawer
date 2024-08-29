import {IUserTrustedNeighbor} from "../interfaces/userTrustedNeighbor";
import {ITrustedNeighbor} from "../interfaces/trustedNeighbor.interface";


export interface NeighborOption {
    label: string;
    value: ITrustedNeighbor;
}
export const mapOptions = (
    homeId: number,
    userTrustedNeighbors:IUserTrustedNeighbor[],
    neighborOptions: NeighborOption[], 
    setNeighborOptions: any
) => {
    userTrustedNeighbors.map((neighbor) => {
        let newOption:NeighborOption = {
            label: neighbor.displayName,
            value: {homeId: homeId, userId: neighbor.trustedUserId, displayName: neighbor.displayName},
        }

        if (neighborOptions.filter(x => x.value.userId == neighbor.trustedUserId).length == 0) {
            setNeighborOptions([...neighborOptions, newOption]);
        }
    });
}