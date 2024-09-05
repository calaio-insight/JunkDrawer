import {useParams} from "react-router-dom";
import {Button, Tab} from "react-bootstrap";
import {IHome} from "../interfaces/home.interface.ts";
import {HomeApi} from "../apis/home.api.ts";
import {HomeTabs} from "../components/homes/homeTabs.component.tsx";
import {HomeBasicTab} from "../components/homes/homeBasicTab.component.tsx";
import {useAuth} from "../hooks/useAuth.hook.ts";
import {SpinnerComponent} from "../components/spinner.component.tsx";
import {useHome} from "../hooks/useHome.hook.ts";
import {usePermissionsHook} from "../hooks/usePermissions.hook.ts";
import {useState} from "react";
import {FileApi} from "../apis/file.api.ts";
import {HomeItemModal} from "../components/homeItems/homeItemModal.component.tsx";
import {IHomeItem} from "../interfaces/homeItem.interface.ts";
import {HomeItemApi} from "../apis/homeItem.api.ts";
import {HomeItemTab} from "../components/homeItems/homeItemTab.component.tsx";

export const Home = () => {
    const {currentUser} = useAuth();
    const {homeId} = useParams();
    const homeIdNum = parseInt(homeId!, 10);
    const {home, getHome, isLoading, setIsLoading, homeItems} = useHome(currentUser?.userId, homeIdNum);
    const {isOwner, canViewItems, canEditItems, canViewBasic, canEditBasic} = usePermissionsHook(home);
    const [showImageModal, setShowImageModal] = useState(false);
    const [file, setFile] = useState<File>();
    const [showItemModal, setShowItemModal] = useState(false);

    const handleItemClose = () => setShowItemModal(false);
    const handleItemShow = () => setShowItemModal(true);
    
    const handleItemSubmit = (formValues: IHomeItem) => {
        setIsLoading(true);
        HomeItemApi.upsertHomeItem(formValues, currentUser!.userId!).then(() => {
            getHome();
        }).catch(()=> {
            alert("There was an error saving your changes.");
            setIsLoading(false);
        })
    }
    
    const handleSubmit = (formValues: IHome) => {
        setIsLoading(true);
        HomeApi.upsertHome(formValues, currentUser!.userId!).then(() => {
            getHome();
        }).catch(() => {
            alert("There was an error saving your changes.");
            setIsLoading(false);
        });
    }

    const handleUpload = () => {
        if (!file || !home || !currentUser){
            alert("Must select file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);
        FileApi.uploadHomeIcon(formData, homeIdNum, currentUser.userId!).then(() => {
            getHome();
            setShowImageModal(false);
            setIsLoading(false);
        });        
    }

    const handleHomeItemUpload = (homeItemId: number) => {
        if (!file || !home || !currentUser){
            alert("Must select file.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);
        FileApi.uploadHomeItemIcon(formData, homeIdNum, homeItemId, currentUser.userId!).then(() => {
            getHome();
            setShowImageModal(false);
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
                    <Button className="btn btn-primary col-2" onClick={handleItemShow}>+ Create Home Item</Button>
                }
            </div>
            
            <Tab.Container defaultActiveKey={'#basicInfo'}>
                <HomeTabs home={home} homeItems={homeItems}/>                                    
                <Tab.Content>
                    {(isOwner || canViewBasic || canEditBasic) && 
                        <Tab.Pane key={"basicInfo"} eventKey={"#basicInfo"}>                        
                            <HomeBasicTab
                                home={home}
                                handleSubmit={handleSubmit}
                                showImageModal={showImageModal}
                                setShowImageModal={setShowImageModal}
                                file={file}
                                setFile={setFile}
                                handleUpload={handleUpload}
                            />
                        </Tab.Pane>
                    }    

                    {(isOwner || canViewItems || canEditItems) &&
                        homeItems?.map((item) => {
                            return (<Tab.Pane key={item.homeItemId} eventKey={"#homeItem" + item.homeItemId}>
                                    <HomeItemTab 
                                        key={item.homeItemId}
                                        home={home}
                                        item={item}
                                        handleSubmit={handleItemSubmit}
                                        showImageModal={showImageModal}
                                        setShowImageModal={setShowImageModal}
                                        file={file}
                                        setFile={setFile}
                                        handleUpload={handleHomeItemUpload}                                        
                                    />
                                </Tab.Pane>
                            )                         
                        })                                                
                }
                </Tab.Content>
            </Tab.Container>

            <HomeItemModal modalTitle={"Create Home Item"}
                           homeId={homeIdNum}
                           show={showItemModal}
                           handleClose={handleItemClose}
                           handleSubmit={handleItemSubmit} />
        </>
    )

}