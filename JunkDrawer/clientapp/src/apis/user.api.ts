import {api} from "./configs/axiosConfigs"

const baseUri = "/user/";
export const UserApi = {
    getUserIdByEmail: async function (userEmail: string){
        const response = await api.request({
            url: `${baseUri}GetUserIdByEmail/${userEmail}`,
            method: 'GET'
        })
        
        return response.data;
    },

    getUserById: async function (userId: string){
        const response = await api.request({
            url: `${baseUri}GetUserById/${userId}`,
            method: 'GET'
        })

        return response.data;
    }
}