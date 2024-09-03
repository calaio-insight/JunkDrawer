import Select from "react-select";
import {useEffect, useState} from "react";
import {Button, FormGroup} from "react-bootstrap";
import {ITrustedNeighbor} from "../../interfaces/trustedNeighbor.interface.ts";
import {useHome} from "../../hooks/useHome.hook.ts";
import {useAuth} from "../../hooks/useAuth.hook.ts";
import {INeighborOption, IRoleOption} from "../../interfaces/options.interface.ts";
import {UserHomeDisplay} from "./userHomeDisplay.component.tsx";
import {usePermissionsHook} from "../../hooks/usePermissions.hook.ts";


interface IUserHomeFormFieldsProps {
    homeId: number;
    setFieldValue: any;
}
export const UserHomeFormFields = ({homeId, setFieldValue}:IUserHomeFormFieldsProps
) => {
    const {currentUser} = useAuth();
    const [selectedNeighbor, setSelectedNeighbor] = useState<INeighborOption|null>(null);
    const [selectedRole, setSelectedRole] = useState<IRoleOption|null>(null);
    const {home, neighborOptions, roleOptions, homeTrustedNeighbors, setHomeTrustedNeighbors} = useHome(currentUser?.userId, homeId);
    const {isOwner, canViewAccess, canEditAccess} = usePermissionsHook(home);
    const hideDeleteButton = !isOwner && !canEditAccess;
    
    const handleRemoveNeighbor = (neighborUserId: number) => {
        let neighbors = homeTrustedNeighbors.filter(n => n.userId != neighborUserId);
        setHomeTrustedNeighbors(neighbors);        
    }
    
    const handleAddNeighbor = () => {
        if (selectedNeighbor?.value === null || selectedRole?.value === null) {
            alert("Must select user and role.");
            return;
        }
        
        const newTrustedNeighbor:ITrustedNeighbor = {
            homeId: homeId,
            userId: selectedNeighbor!.value!.userId,
            displayName: selectedNeighbor!.value!.displayName,
            roleType: selectedRole!.value,            
        }        
        
        setHomeTrustedNeighbors([...homeTrustedNeighbors, newTrustedNeighbor]);
        setSelectedNeighbor(null);
        setSelectedRole(null);
    }

    useEffect(() => {
        if (home){
            setHomeTrustedNeighbors(home.trustedNeighbors)
        }
    }, [home]);
    
    useEffect(() => {
        setFieldValue("trustedNeighbors", homeTrustedNeighbors);
    }, [homeTrustedNeighbors])
    
    return (
        <>
            <div className={"form-row mb-3"}>
                {(isOwner || canEditAccess) &&
                    <>
                        <span>Select other <i>trusted neighbors</i> who can access this home:</span>

                        <div className={"row"}>
                            <FormGroup className={"col-4"}>
                                <label
                                    htmlFor={"selectedUser"}
                                    className={"form-label col-form-label col-form-label-sm col"}>
                                    User
                                </label>
                                <Select
                                    name={"selectedUser"}
                                    value={selectedNeighbor}
                                    options={neighborOptions}
                                    onChange={setSelectedNeighbor}
                                />
                            </FormGroup>

                            <FormGroup className={"col-4"}>
                                <label
                                    htmlFor={"selectedRole"}
                                    className={"form-label col-form-label col-form-label-sm col"}>
                                    Role
                                </label>
                                <Select
                                    name={"selectedRole"}
                                    value={selectedRole}
                                    options={roleOptions}
                                    onChange={setSelectedRole}
                                />
                            </FormGroup>

                            <FormGroup className={"col-2 mt-auto"}>
                                <Button
                                    variant={"success"}
                                    onClick={handleAddNeighbor}
                                    disabled={!selectedRole || !selectedNeighbor}
                                    className={!selectedRole || !selectedNeighbor ? "disabled-btn" : ""}
                                >
                                    + Add
                                </Button>
                            </FormGroup>
                        </div>
                    </>
                }

                {(isOwner || canViewAccess || canEditAccess) &&
                    homeTrustedNeighbors && homeTrustedNeighbors.length > 0 &&
                        <UserHomeDisplay 
                            handleRemoveNeighbor={handleRemoveNeighbor}
                            homeTrustedNeighbors={homeTrustedNeighbors}
                            hideDeleteButton={hideDeleteButton}
                        />                    
                }                
            </div>
        </>
    )
}