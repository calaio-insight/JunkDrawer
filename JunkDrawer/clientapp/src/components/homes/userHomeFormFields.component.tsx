import Select from "react-select";
import {useState} from "react";
import {Button, FormGroup, Table} from "react-bootstrap";
import {ITrustedNeighbor} from "../../interfaces/trustedNeighbor.interface.ts";
import {useHome} from "../../hooks/useHome.hook.ts";
import {useAuth} from "../../hooks/useAuth.hook.ts";
import {INeighborOption, IRoleOption} from "../../interfaces/options.interface.ts";


interface IUserHomeFormFieldsProps {
    homeId: number;
}
export const UserHomeFormFields = ({homeId}:IUserHomeFormFieldsProps
) => {
    const {currentUser} = useAuth();
    const [selectedNeighbor, setSelectedNeighbor] = useState<INeighborOption|null>(null);
    const [selectedRole, setSelectedRole] = useState<IRoleOption|null>(null);
    const {neighborOptions, roleOptions, homeTrustedNeighbors, setHomeTrustedNeighbors} = useHome(currentUser?.userId, homeId);
            
    const handleAddNeighbor = () => {
        if (selectedNeighbor?.value === null || selectedRole?.value === null) {
            alert("Must select user and role.");
            return;
        }
        
        const newTrustedNeighbor:ITrustedNeighbor = {
            homeId: homeId,
            userId: selectedNeighbor!.value!.userId,
            displayName: selectedNeighbor!.value!.displayName,
            role: selectedRole!.value,            
        }
        console.log("newTrustedNeighbor", newTrustedNeighbor);

        setHomeTrustedNeighbors([...homeTrustedNeighbors, newTrustedNeighbor]);
    }
    
    return (
        <>
            <div className={"form-row mb-3"}>
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
                
                {homeTrustedNeighbors.length > 0 &&
                    <div className={"row mt-3"}>
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {homeTrustedNeighbors?.map((neighbor: ITrustedNeighbor) => {
                                return <tr key={neighbor.userId} id={"user-" + neighbor.userId}>
                                    <td>{neighbor.displayName}</td>
                                    <td>{neighbor.role}</td>
                                    <td>X</td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
        </>
    )
}