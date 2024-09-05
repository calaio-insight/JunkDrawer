import {fileApi} from "./configs/axiosConfigs"

const baseUri = "/file/";
export const FileApi = {
            
    uploadHomeIcon: async function (data: FormData, homeId: number, currentUserId: number){
        const response = await fileApi.request({
            url: `${baseUri}UploadHomeIcon/${homeId}/${currentUserId}`,
            method: 'POST',
            data: data
        })

        return response.data;
    },

    uploadHomeItemIcon: async function (data: FormData, homeId: number, homeItemId: number, currentUserId: number){
        const response = await fileApi.request({
            url: `${baseUri}UploadHomeItemIcon/${homeId}/${homeItemId}/${currentUserId}`,
            method: 'POST',
            data: data
        })

        return response.data;
    },
}