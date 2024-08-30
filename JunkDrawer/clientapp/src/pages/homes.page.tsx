import {useEffect, useState} from "react";
import {HomeApi} from "../apis/home.api.ts";
import {IHome} from "../interfaces/home.interface.ts";
import {SpinnerComponent} from "../components/spinner.component.tsx";
import {Button, Card} from "react-bootstrap";
import {HomeModalComponent} from "../components/homes/homeModal.component.tsx";
import {useAuth} from "../hooks/useAuth.hook.ts";
import {Link} from "react-router-dom";
import viteLogo from "/vite.svg";

export const Homes = () => {
    const {currentUser} = useAuth();        
    const [homes, setHomes] = useState<IHome[]>([]);
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
    
        
    useEffect(() => {
        if (currentUser){
            setIsLoading(true);
            getHomes().then(() => setIsLoading(false));
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
                    {homes.map((home) => {
                        {
                            return (
                                <Card key={home.homeId} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={viteLogo} style={{height: "10rem"}} />
                                    <Card.Body>
                                        <Card.Title>{home.homeName}</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the
                                            bulk of the card's content.
                                        </Card.Text>                                        
                                        <Link className={"btn btn-primary"} to={"/app/homes/" + home.homeId} >More Details</Link>
                                    </Card.Body>
                                </Card>
                            )
                        }
                    })}                
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