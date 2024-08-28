import {api} from "./configs/axiosConfigs"
import {IUser} from "../interfaces/user.interface.ts";

const baseUri = "/user/";
export const UserApi = {
    getUserByEmail: async function (userEmail: string){
        const response = await api.request({
            url: `${baseUri}GetUserByEmail?userEmail=${userEmail}`,
            method: 'GET'
        })

        return response.data;
    },

    getUserById: async function (userId: number){
        const response = await api.request({
            url: `${baseUri}GetUserById/${userId}`,
            method: 'GET'
        })

        return response.data;
    },

    createUser: async function (user: IUser){
        const response = await api.request({
            url: `${baseUri}`,
            method: 'POST',
            data: JSON.stringify(user)
        })

        return response.data;
    },    
}