import {useEffect, useState} from "react";
import {IUserTrustedNeighbor} from "../interfaces/userTrustedNeighbor.ts";
import {UserTrustedNeighborApi} from "../apis/userTrustedNeighbor.api.ts";
import {ITrustedNeighbor} from "../interfaces/trustedNeighbor.interface.ts";
import {INeighborOption, IRoleOption} from "../interfaces/options.interface.ts";
import {IHomeRoleType} from "../interfaces/homeRole.type.ts";
import { $enum } from "ts-enum-util";
import {HomeApi} from "../apis/home.api.ts";
import {IHome} from "../interfaces/home.interface.ts";


export function useHome(currentUserId?: number, homeId?: number) {
    const [home, setHome] = useState<IHome>();
    const [userTrustedNeighbors, setUserTrustedNeighbors] = useState<IUserTrustedNeighbor[]>([]);
    const [neighborOptions, setNeighborOptions] = useState<INeighborOption[]>([]);
    const [roleOptions, setRoleOptions] = useState<IRoleOption[]>([]);
    const [homeTrustedNeighbors, setHomeTrustedNeighbors] = useState<ITrustedNeighbor[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getHome = () =>{
        HomeApi.getHomeById(homeId!).then(currentHome => {
            setHome(currentHome);
            setIsLoading(false);
        });
    }
    
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
        userTrustedNeighbors.map((neighbor) => {
            let newOption:INeighborOption = {
                label: neighbor.displayName,
                value: {homeId: homeId!, userId: neighbor.trustedUserId, displayName: neighbor.displayName},
            }
            
            //If trusted neighbor is already added to this home
            if (homeTrustedNeighbors.filter(x => x.userId === neighbor.trustedUserId).length > 0){
                //Remove from options
                let neighbors = neighborOptions.filter(n => n.value.userId != neighbor.trustedUserId);
                setNeighborOptions(neighbors);
            }
            else{
                //If neighbor option is not already in list
                if (neighborOptions.filter(x => x.value.userId == neighbor.trustedUserId).length == 0) {
                    setNeighborOptions([...neighborOptions, newOption]);
                }
            }
        });
    }

    useEffect(() => {
        if (userTrustedNeighbors){
            mapNeighborOptions();
        }
    }, [userTrustedNeighbors, homeTrustedNeighbors]);

    useEffect(() => {
        if (currentUserId){
            getUserTrustedNeighbors();
            mapRoleOptions();
        }
    }, [currentUserId])

    useEffect(() => {
        if (!home){
            getHome()
        }
    }, []);
    
    return {
        userTrustedNeighbors,
        neighborOptions,
        roleOptions,
        homeTrustedNeighbors,
        setHomeTrustedNeighbors,
        home,
        getHome,
        isLoading,
        setIsLoading
    }
}