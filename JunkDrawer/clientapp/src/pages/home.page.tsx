import {useParams} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import {useEffect} from "react";
import {IHome} from "../interfaces/home.interface.ts";
import {HomeApi} from "../apis/home.api.ts";
import {HomeTabs} from "../components/homes/homeTabs.component.tsx";
import {HomeBasicTab} from "../components/homes/homeBasicTab.component.tsx";
import {useAuth} from "../hooks/useAuth.hook.ts";
import {SpinnerComponent} from "../components/spinner.component.tsx";
import {useHome} from "../hooks/useHome.hook.ts";

export const Home = () => {
    const {currentUser} = useAuth();
    const {homeId} = useParams();
    const homeIdNum = parseInt(homeId!, 10);
    const {home, getHome, isLoading, setIsLoading} = useHome(currentUser?.userId, homeIdNum);

    const handleSubmit = (formValues: IHome) => {
        setIsLoading(true);
        HomeApi.upsertHome(formValues, currentUser!.userId!).then(() => {
            getHome();
        }).catch(() => {
            alert("There was an error saving your changes.");
            setIsLoading(false);
        });
    }
    
    useEffect(() => {
        if (homeId){
            getHome();
        }
    }, [homeId]);
    
    if (!home) return;

    if (isLoading){
        return <SpinnerComponent />
    }
    
    return (
        <>
            <div className={"row mb-3"}>
                <h4 className={"col"}>{home.homeName}</h4>
                <Button className="btn btn-primary col-2" >+ Create Home Item</Button>
            </div>
            
            <Card>
                <Card.Header>
                    <HomeTabs home={home}/>
                </Card.Header>
                <Card.Body>
                    <HomeBasicTab home={home} handleSubmit={handleSubmit} />
                    
                    {/*{homes.map((home) => {*/}
                        {/* <HomeTabContent
                            key={home.homeId}
                            home={home}
                            userTrustedNeighbors={userTrustedNeighbors}
                            handleSubmit={handleSubmit}
                            homeTrustedNeighbors={homeTrustedNeighbors}
                            setHomeTrustedNeighbors={setHomeTrustedNeighbors}
                        />*/}
                    {/*})}*/}
                </Card.Body>
            </Card>
        </>
    )

}