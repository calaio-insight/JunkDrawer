import {useContext, useEffect, useState} from "react";
import {UserContext} from "../contexts/user.context.tsx";
import {HomeApi} from "../apis/home.api.ts";
import {IHome} from "../interfaces/home.interface.ts";
import {SpinnerComponent} from "../components/spinner.component.tsx";
import {Button, Card} from "react-bootstrap";
import {HomeModalComponent} from "../components/homes/homeModal.component.tsx";
import {UserTrustedNeighborApi} from "../apis/userTrustedNeighbor.api.ts";
import {IUserTrustedNeighbor} from "../interfaces/userTrustedNeighbor.ts";
import {HomeTabs} from "../components/homes/homeTabs.component.tsx";
import { HomeTabContent } from "../components/homes/homeTabContent.component.tsx";
import {ITrustedNeighbor} from "../interfaces/trustedNeighbor.interface.ts";

export const Homes = () => {
    const userContext = useContext(UserContext);
    const currentUser = userContext?.currentUser;
    const [homes, setHomes] = useState<IHome[]>([]);
    const [userTrustedNeighbors, setUserTrustedNeighbors] = useState<IUserTrustedNeighbor[]>([]);
    const [homeTrustedNeighbors, setHomeTrustedNeighbors] = useState<ITrustedNeighbor[]>([]);
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
        });
    }
    
    const getUserTrustedNeighbors = async () =>{
        UserTrustedNeighborApi.getUserTrustedNeighborsByUserId(currentUser!.userId!).then(neighbors => {
            setUserTrustedNeighbors(neighbors);
        });
    }
        
    useEffect(() => {
        if (currentUser){
            setIsLoading(true);
            getHomes().then(() => setIsLoading(false));
            getUserTrustedNeighbors().then(() => setIsLoading(false));
        }
    }, [currentUser])
    
    if (isLoading){
        return <SpinnerComponent />
    }
    
    if (!currentUser) return;
    
    return (
        <>
            <div className={"row mb-3"}>
                <h4 className={"col"}>Homes</h4>
                <Button className="btn btn-primary col-2" onClick={handleShow}>+ Create Home</Button>
            </div>

            {homes.length > 0
                ?
                <div>
                    <Card>
                        <Card.Header>
                            <HomeTabs homes={homes} />
                        </Card.Header>
                        <Card.Body>
                            {homes.map((home) => {
                                return <HomeTabContent 
                                    key={home.homeId} 
                                    home={home} 
                                    userTrustedNeighbors={userTrustedNeighbors} 
                                    handleSubmit={handleSubmit}
                                    homeTrustedNeighbors={homeTrustedNeighbors}
                                    setHomeTrustedNeighbors={setHomeTrustedNeighbors}
                                />
                            })}                            
                        </Card.Body>
                    </Card>                    
                </div>
                : <div>No homes created yet.</div>
            }

            <HomeModalComponent modalTitle={"Create Home"} 
                                show={show} 
                                handleClose={handleClose}
                                handleSubmit={handleSubmit} />
        </>
    )
}