import {api} from "./configs/axiosConfigs"
import {IUserTrustedNeighbor} from "../interfaces/userTrustedNeighbor.ts";

const baseUri = "/UserTrustedNeighbor/";
export const UserTrustedNeighborApi = {
    getUserTrustedNeighborsByUserId: async function (userId: number){
        const response = await api.request({
            url: `${baseUri}GetUserTrustedNeighborsByUserId/${userId}`,
            method: 'GET'
        })
        
        return response.data;
    },

    getPossibleTrustedNeighborByUserEmail: async function (userEmail: string){
        const response = await api.request({
            url: `${baseUri}GetPossibleTrustedNeighborByUserEmail?userEmail=${userEmail}`,
            method: 'GET'
        })

        return response.data;
    },

    insertUserTrustedNeighbor: async function (userTrustedNeighbor: IUserTrustedNeighbor){
        const response = await api.request({
            url: `${baseUri}`,
            method: 'POST',
            data: JSON.stringify(userTrustedNeighbor)
        })

        return response.data;
    },

    deleteUserTrustedNeighbor: async function (userTrustedNeighborId: number, currentUserId: number){
        const response = await api.request({
            url: `${baseUri}${userTrustedNeighborId}/${currentUserId}`,
            method: 'DELETE',
        })

        return response.data;
    },
}