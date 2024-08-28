import {useContext, useEffect, useState} from "react";
import {UserContext} from "../contexts/user.context.tsx";
import {HomeApi} from "../apis/home.api.ts";
import {IHome} from "../interfaces/home.interface.ts";
import {SpinnerComponent} from "../components/spinner.component.tsx";
import {Button} from "react-bootstrap";
import {HomeModalComponent} from "../components/homes/homeModal.component.tsx";

export const Homes = () => {
    const userContext = useContext(UserContext);
    const currentUser = userContext?.currentUser;
    const [homes, setHomes] = useState<IHome[]>([]);
    const [trustedNeighborOptions, setTrustedNeighborOptions] = useState<[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSubmit = (formValues: IHome) => {
        debugger;
        setShow(false);
        setIsLoading(true);
        HomeApi.upsertHome(formValues, currentUser!.userId!).then(() => {
            getHomes().then(() => setIsLoading(false));
        }).catch(() => {
            alert("There was an error saving your changes.");
            setIsLoading(false);
        });        
    }
    
    const getHomes = async () =>{
        HomeApi.getHomesByUserId(currentUser!.userId!).then(homesList => {
            setHomes(homesList);
        }).finally(() => setIsLoading(false));
    }
    
    //TODO GET trustedNeighborsOptions
        
    useEffect(() => {
        if (currentUser){
            setIsLoading(true);
            getHomes().then(() => setIsLoading(false));
            //TODO CALL GETtrustedNeighbors
        }
    }, [currentUser])
    
    if (isLoading){
        return <SpinnerComponent />
    }
    
    return (
        <>
            <div className={"row"}>
                <h4 className={"col"}>Homes</h4>
                <Button className="btn btn-primary col-2" onClick={handleShow}>+ Create Home</Button>
            </div>

            {homes.length > 0
                ?
                <div>
                    {homes.map((home) => {
                        return <div>{home.homeName}</div>
                    })}
                </div>
                : <div>No homes created yet.</div>
            }

            <HomeModalComponent modalTitle={"Create Home"} show={show} handleClose={handleClose}
                                handleSubmit={handleSubmit} trustedNeighborOptions={trustedNeighborOptions}/>
        </>
    )
}