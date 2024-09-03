import {useParams} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import {IHome} from "../interfaces/home.interface.ts";
import {HomeApi} from "../apis/home.api.ts";
import {HomeTabs} from "../components/homes/homeTabs.component.tsx";
import {HomeBasicTab} from "../components/homes/homeBasicTab.component.tsx";
import {useAuth} from "../hooks/useAuth.hook.ts";
import {SpinnerComponent} from "../components/spinner.component.tsx";
import {useHome} from "../hooks/useHome.hook.ts";
import {usePermissionsHook} from "../hooks/usePermissions.hook.ts";

export const Home = () => {
    const {currentUser} = useAuth();
    const {homeId} = useParams();
    const homeIdNum = parseInt(homeId!, 10);
    const {home, getHome, isLoading, setIsLoading} = useHome(currentUser?.userId, homeIdNum);
    const {isOwner, canViewItems, canEditItems, canViewBasic, canEditBasic} = usePermissionsHook(home);

    const handleSubmit = (formValues: IHome) => {
        setIsLoading(true);
        HomeApi.upsertHome(formValues, currentUser!.userId!).then(() => {
            getHome();
        }).catch(() => {
            alert("There was an error saving your changes.");
            setIsLoading(false);
        });
    }
        
    if (!home) return;

    if (isLoading){
        return <SpinnerComponent />
    }
    
    return (
        <>
            <div className={"row mb-3"}>
                <h4 className={"col"}>{home.homeName}</h4>
                {(isOwner || canEditItems) && 
                    <Button className="btn btn-primary col-2" >+ Create Home Item</Button>
                }
            </div>
            
            <Card>
                <Card.Header>
                    <HomeTabs home={home}/>
                </Card.Header>
                <Card.Body>
                    {(isOwner || canViewBasic || canEditBasic) && 
                        <HomeBasicTab home={home} handleSubmit={handleSubmit} />
                    }

                    {(isOwner || canViewItems || canEditItems) && 
                        <>
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
                        </>                        
                    }
                </Card.Body>
            </Card>
        </>
    )

}