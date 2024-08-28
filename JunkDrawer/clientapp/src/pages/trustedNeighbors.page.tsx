import {useContext, useEffect, useState} from "react";
import {UserContext} from "../contexts/user.context";
import {IUserTrustedNeighbor} from "../interfaces/userTrustedNeighbor";
import {UserTrustedNeighborApi} from "../apis/userTrustedNeighbor.api";
import {SpinnerComponent} from "../components/spinner.component";
import {IUser} from "../interfaces/user.interface";
import {Button, Table} from "react-bootstrap";
import {TrustedNeighborModalComponent} from "../components/trustedNeighbors/trustedNeighborModal.component.tsx";


export const TrustedNeighbors = () => {
    const userContext = useContext(UserContext);
    const currentUser = userContext?.currentUser;
    const [trustedNeighbors, setTrustedNeighbors] = useState<IUserTrustedNeighbor[]>([]);
    const [possibleNeighbor, setPossibleNeighbor] = useState<IUser|undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [errorText, setErrorText] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const getNeighbors = async () => {
        UserTrustedNeighborApi.getUserTrustedNeighborsByUserId(currentUser!.userId!).then(neighbors => {
            setTrustedNeighbors(neighbors);
        }).finally(() => setIsLoading(false));
    }
    
    const getPossibleNeighbor = (email: string) => {
        setIsLoading(true);
        UserTrustedNeighborApi.getPossibleTrustedNeighborByUserEmail(email).then(user => {
            if (user == undefined || user == null || user == ""){
                setErrorText("No user was found with this email address.");
                return;
            }
            setPossibleNeighbor(user);
        }).finally(() => setIsLoading(false));
    }

    const deleteUserTrustedNeighbor = (userTrustedNeighborId: number) => {
        setIsLoading(true);
        UserTrustedNeighborApi.deleteUserTrustedNeighbor(userTrustedNeighborId, currentUser!.userId!).then(() => {
            getNeighbors().then(()=> setIsLoading(false));
        }).catch(() => {
            alert("There was an error removing trusted neighbor from list.");
        }).finally(() => setIsLoading(false));
    }

    const handleAddNeighbor = () => {
        setShow(false);
        if (possibleNeighbor == undefined){
            alert("There was an error saving your changes.");
            return;
        }
        
        //transform possible neighbor to "new" object
        const newTrustedNeighbor: IUserTrustedNeighbor = {
            userId: currentUser!.userId!,
            trustedUserId: possibleNeighbor.userId!,
            displayName: possibleNeighbor.displayName!,
            photoUrl: possibleNeighbor.photoUrl!,
        }

        setIsLoading(true);
        UserTrustedNeighborApi.insertUserTrustedNeighbor(newTrustedNeighbor).then(() => {
            getNeighbors().then(() => setIsLoading(false));
        }).catch(() => {
            alert("There was an error saving your changes.");
            setIsLoading(false);
        }).finally(() => setPossibleNeighbor(undefined));
    }
    
    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            getNeighbors().then(() => setIsLoading(false));
        }        
    }, [currentUser]);

    if (isLoading){
        return <SpinnerComponent />
    }
    
    return (
        <>
            <div className={"row"}>
                <h4 className={"col"}>Trusted Neighbors</h4>
            </div>

            <Table striped bordered>
                <thead>
                    <tr>
                        <th className={"col"}>Name</th>
                        <th className={"col-2 text-center"}>
                            <Button className="btn btn-primary col" onClick={handleShow}>+ Add Neighbor</Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {trustedNeighbors.length > 0
                    ?
                        trustedNeighbors.map((neighbor) => {
                            return (
                                <tr key={neighbor.userTrustedNeighborId}>
                                    <td>
                                        <div className={"row"}>
                                            <div className={"col"}>
                                                <img src={neighbor.photoUrl} className={"userIcon"} alt="userPhoto"/> {neighbor.displayName}
                                            </div>
                                        </div>
                                    </td>
                                    <td className={"text-center"}><Button className="btn btn-danger col" onClick={() => deleteUserTrustedNeighbor(neighbor.userTrustedNeighborId!)}>x Remove</Button></td>
                                </tr>
                            )
                        })
                    : <tr>
                        <td colSpan={2}>No trusted neighbors added yet.</td>
                    </tr>
                }
                </tbody>
            </Table>
            
            <TrustedNeighborModalComponent 
                show={show} 
                handleClose={handleClose} 
                handleAddNeighbor={handleAddNeighbor} 
                getPossibleNeighbor={getPossibleNeighbor}
                possibleNeighbor={possibleNeighbor}
                setPossibleNeighbor={setPossibleNeighbor}
                trustedNeighbors={trustedNeighbors}
                errorText={errorText}
                setErrorText={setErrorText}
            />
        </>
    )
}