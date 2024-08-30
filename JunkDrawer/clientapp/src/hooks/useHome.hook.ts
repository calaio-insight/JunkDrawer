import {useEffect, useState} from "react";
import {IUserTrustedNeighbor} from "../interfaces/userTrustedNeighbor.ts";
import {UserTrustedNeighborApi} from "../apis/userTrustedNeighbor.api.ts";
import {ITrustedNeighbor} from "../interfaces/trustedNeighbor.interface.ts";
import {INeighborOption, IRoleOption} from "../interfaces/options.interface.ts";
import {IHomeRoleType} from "../interfaces/homeRole.type.ts";
import { $enum } from "ts-enum-util";


export function useHome(currentUserId?: number, homeId?: number) {
    const [userTrustedNeighbors, setUserTrustedNeighbors] = useState<IUserTrustedNeighbor[]>([]);
    const [neighborOptions, setNeighborOptions] = useState<INeighborOption[]>([]);
    const [roleOptions, setRoleOptions] = useState<IRoleOption[]>([]);
    const [homeTrustedNeighbors, setHomeTrustedNeighbors] = useState<ITrustedNeighbor[]>([]);
    
    const getUserTrustedNeighbors = () =>{
        UserTrustedNeighborApi.getUserTrustedNeighborsByUserId(currentUserId!).then(neighbors => {
            setUserTrustedNeighbors(neighbors);
        });
    }    
    
    const mapRoleOptions = () => {
        const options = [];
        const roleValues = $enum(IHomeRoleType).getValues();
        const roleLabels = $enum(IHomeRoleType).getKeys();
        
        for (let i = 0; i < roleValues.length; i++) {
            let newOption: IRoleOption = {
                label: roleLabels[i],
                value: roleValues[i]
            }
            options.push(newOption);
        }
        setRoleOptions(options);
    }
    
    const mapNeighborOptions = () => {
        //TODO filter out any neighbors already in homeTrustedNeighbors, add to useEffect trigger
        
        userTrustedNeighbors.map((neighbor) => {
            let newOption:INeighborOption = {
                label: neighbor.displayName,
                value: {homeId: homeId!, userId: neighbor.trustedUserId, displayName: neighbor.displayName},
            }

            if (neighborOptions.filter(x => x.value.userId == neighbor.trustedUserId).length == 0) {
                setNeighborOptions([...neighborOptions, newOption]);
            }
        });
    }

    useEffect(() => {
        if (userTrustedNeighbors){
            mapNeighborOptions();
        }
    }, [userTrustedNeighbors]);

    useEffect(() => {
        if (currentUserId){
            getUserTrustedNeighbors();
            mapRoleOptions();
        }
    }, [currentUserId])
    
    return {
        userTrustedNeighbors,
        neighborOptions,
        roleOptions,
        homeTrustedNeighbors,
        setHomeTrustedNeighbors
    }
}