import {fileApi} from "./configs/axiosConfigs"

const baseUri = "/file/";
export const FileApi = {
            
    uploadFile: async function (data: FormData, homeId: number, currentUserId: number){
        const response = await fileApi.request({
            url: `${baseUri}${homeId}/${currentUserId}`,
            method: 'POST',
            data: data
        })

        return response.data;
    },    
}