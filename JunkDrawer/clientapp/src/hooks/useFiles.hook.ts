import {FileApi} from "../apis/file.api.ts";


export function useFiles() {
    
    const handleHomeImageUpload = (file: File, homeId: number, currentUserId: number, callback?: any) => {
        
        if (file){
            const formData = new FormData();
            formData.append('file', file);
            
            FileApi.uploadHomeIcon(formData, homeId, currentUserId).then(() => {
                callback && callback();
            });            
        }
        
    }
    
    
    return {
        handleHomeImageUpload
    }
}