import {api} from "./configs/axiosConfigs"
import {IHome} from "../interfaces/home.interface.ts";

const baseUri = "/home/";
export const HomeApi = {
    getHomesByUserId: async function (userId: number){
        const response = await api.request({
            url: `${baseUri}GetHomesByUserId/${userId}`,
            method: 'GET'
        })
        
        return response.data;
    },

    getHomeById: async function (homeId: number){
        const response = await api.request({
            url: `${baseUri}GetHomeById/${homeId}`,
            method: 'GET'
        })

        return response.data;
    },

    upsertHome: async function (home: IHome, currentUserId: number){
        const response = await api.request({
            url: `${baseUri}${currentUserId}`,
            method: 'POST',
            data: JSON.stringify(home)
        })

        return response.data;
    },
}