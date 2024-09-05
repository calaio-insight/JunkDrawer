import {api} from "./configs/axiosConfigs";
import {IHomeItem} from "../interfaces/homeItem.interface.ts";

const baseUri = "/homeItem/";
export const HomeItemApi = {

    getHomeItemsByHomeId: async function (homeId: number){   
        const response = await api.request({
            url: `${baseUri}GetHomeItemsByHomeId/${homeId}`,
            method: 'GET'
        })
        
        return response.data;
    },

    getHomeItemById: async function (homeItemId: number){
        const response = await api.request({
            url: `${baseUri}GetHomeItemById/${homeItemId}`,
            method: 'GET'
        })

        return response.data;
    },

    upsertHomeItem: async function (homeItem: IHomeItem, currentUserId: number){
        const response = await api.request({
            url: `${baseUri}${currentUserId}`,
            method: 'POST',
            data: JSON.stringify(homeItem)
        })

        return response.data;
    },    
}