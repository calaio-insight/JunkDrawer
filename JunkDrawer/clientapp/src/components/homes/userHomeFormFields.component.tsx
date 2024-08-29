import Select from "react-select";
import {useState} from "react";
import {NeighborOption} from "../../constants/homeNeighborOptions.ts";
import {Button, FormGroup} from "react-bootstrap";
import {ITrustedNeighbor} from "../../interfaces/trustedNeighbor.interface.ts";

interface Option {
    label: string;
    value: number;
}
interface IUserHomeFormFieldsProps {
    neighborOptions: NeighborOption[];
    homeTrustedNeighbors: ITrustedNeighbor[];
    setHomeTrustedNeighbors: any;
}
export const UserHomeFormFields = (
    {
        neighborOptions,
        homeTrustedNeighbors,
        setHomeTrustedNeighbors
    }:IUserHomeFormFieldsProps
) => {
    const [selectedNeighbor, setSelectedNeighbor] = useState<NeighborOption|null>(null);
    const [selectedRole, setSelectedRole] = useState<Option|null>(null);
    
    const testRoleOptions:Option[] = [
        {label:"User Role", value:1},
        {label:"Admin Role", value:2},
    ]
    
    //GET user roles
    
    const handleAddNeighbor = () => {
        //grab selectedNeighbor (has homeid/userid/name) and selectedRole
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
                            options={testRoleOptions}
                            onChange={setSelectedRole}
                        />
                    </FormGroup>

                    <FormGroup className={"col-2 mt-auto"}>
                        <Button variant={"success"}>+ Add</Button>
                    </FormGroup>

                    {homeTrustedNeighbors.map((neighbor: ITrustedNeighbor) => {
                        return <>
                            <span>{neighbor.displayName} ~ {neighbor.role}</span>
                        </>
                    })}

                </div>
            </div>
        </>
    )
}