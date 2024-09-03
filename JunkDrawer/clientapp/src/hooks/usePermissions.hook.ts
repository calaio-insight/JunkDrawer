import {IHomePermissionType} from "../interfaces/homePermission.type.ts";
import {IHome} from "../interfaces/home.interface.ts";

export function usePermissionsHook(home?: IHome) {

    const isOwner = home?.permissions && home.permissions.indexOf(IHomePermissionType.Owner) >= 0;

    const canViewBasic = home?.permissions && home.permissions.indexOf(IHomePermissionType.CanViewBasic) >= 0;
    const canEditBasic = home?.permissions && home.permissions.indexOf(IHomePermissionType.CanEditBasic) >= 0;
    
    const canViewItems = home?.permissions && home.permissions.indexOf(IHomePermissionType.CanViewItems) >= 0;
    const canEditItems = home?.permissions && home.permissions.indexOf(IHomePermissionType.CanEditItems) >= 0;

    const canViewAccess = home?.permissions && home.permissions.indexOf(IHomePermissionType.CanViewAccess) >= 0;
    const canEditAccess = home?.permissions && home.permissions.indexOf(IHomePermissionType.CanEditAccess) >= 0;

    const canViewFiles = home?.permissions && home.permissions.indexOf(IHomePermissionType.CanViewFiles) >= 0;
    const canEditFiles = home?.permissions && home.permissions.indexOf(IHomePermissionType.CanEditFiles) >= 0;
    
    
    return {
        isOwner,
        canViewBasic,
        canEditBasic,
        canViewItems,
        canEditItems,
        canViewAccess,
        canEditAccess,
        canViewFiles,
        canEditFiles
    }    
}