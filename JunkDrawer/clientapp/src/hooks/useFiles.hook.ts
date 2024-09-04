import {FileApi} from "../apis/file.api.ts";


export function useFiles() {
    
    const handleHomeImageUpload = async(file: File, homeId: number, currentUserId: number) => {
        
        if (file){
            const formData = new FormData();
            formData.append('file', file);
            
            FileApi.uploadFile(formData, homeId, currentUserId).then(() => {
                    
                //return some kind of success?
            });            
        }
        
    }
    
    
    return {
        handleHomeImageUpload
    }
}