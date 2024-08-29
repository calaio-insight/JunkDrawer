import {api} from "./configs/axiosConfigs"

const baseUri = "/user/";
export const UserApi = {
    authenticate: async function (googleCredential: string){
        const response = await api.request({
            url: `${baseUri}authenticate`,
            method: 'POST',
            data: googleCredential
        })

        return response.data;
    },
    
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
    }
}