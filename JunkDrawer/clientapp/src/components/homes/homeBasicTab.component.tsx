import {IHome} from "../../interfaces/home.interface";
import {Alert, Button, Card, Form} from "react-bootstrap";
import {homeSchema} from "../../constants/homeSchema.ts";
import {BasicHomeFormFields} from "./basicHomeFormFields.component.tsx";
import {UserHomeFormFields} from "./userHomeFormFields.component.tsx";
import {Formik} from "formik";
import {usePermissionsHook} from "../../hooks/usePermissions.hook.ts";
import {useTooltip} from "../../hooks/useTooltip.hook.ts";
import {FloatingPortal} from "@floating-ui/react";
import {useState} from "react";
import {ImageUploadModal} from "../imageUploadModal.component.tsx";
import {useFiles} from "../../hooks/useFiles.hook.ts";
import {useAuth} from "../../hooks/useAuth.hook.ts";


interface IHomeBasicTabProps {
    home: IHome;
    handleSubmit: (formValues: IHome) => void;
}
export const HomeBasicTab = ({home, handleSubmit}: IHomeBasicTabProps) => {
    const {currentUser} = useAuth();
    const [showImageModal, setShowImageModal] = useState(false);
    const [file, setFile] = useState<File>();
    const {handleHomeImageUpload} = useFiles();
    const {refs, getReferenceProps, isOpen, floatingStyles, getFloatingProps} = useTooltip();
    const {isOwner, canViewBasic, canEditBasic, canViewAccess, canEditAccess} = usePermissionsHook(home);
    const isBasicDisabled = !isOwner && !canEditBasic;  
    
    const handleUpload = () => {
        if (!file || !home || !currentUser){
            alert("Must select file.");
            return;
        }
        
        handleHomeImageUpload(file, home.homeId, currentUser.userId!).then(() => {
            setShowImageModal(false);
            //get home?
        });        
    }
    
    const handleImageClick = () => {
        setShowImageModal(true);
    }
    
    const handleCloseImageModal = () => {
        setShowImageModal(false);
    }
            
    return (
        <>            
            <FloatingPortal>
                {isOpen && (
                    <div
                        className="Tooltip"
                        ref={refs.setFloating}
                        style={floatingStyles}
                        {...getFloatingProps()}
                    >
                        Click on the image to change
                    </div>
                )}
            </FloatingPortal>
            
            <Card.Img variant="top" src="" 
                      onClick={handleImageClick}
                      style={{height: "10rem", cursor: 'pointer'}} 
                      ref={refs.setReference} {...getReferenceProps()} />
            <Card.Title></Card.Title>
            <Formik
                initialValues={{
                    homeId: home?.homeId ?? undefined,
                    homeName: home?.homeName ?? "",
                    homePhoto: home?.homePhoto ?? "",
                    address: home?.address ?? "",
                    address2: home?.address2 ?? "",
                    city: home?.city ?? "",
                    state: home?.state ??"",
                    zip: home?.zip ?? "",
                    purchaseDate: home?.purchaseDate ?? undefined,
                    purchasePrice: home?.purchasePrice ?? 0,
                    notes: home?.notes ?? "",
                    trustedNeighbors: home?.trustedNeighbors ?? []
                }}
                validationSchema={homeSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ errors, touched, isValid, dirty, values, setFieldValue }) => (
                    <Form>
                        {(isOwner || canViewBasic || canEditBasic) &&
                            <BasicHomeFormFields errors={errors} touched={touched} isBasicDisabled={isBasicDisabled}/>
                        }                        
                        <hr />
                        {home
                            ? <>
                                {(isOwner || canViewAccess || canEditAccess) &&
                                    <UserHomeFormFields
                                        homeId={home.homeId}
                                        setFieldValue={setFieldValue}
                                    />
                                }
                            </>
                            :
                            <Alert variant={"info"}>
                                After home creation, edit home to grant other users access.
                            </Alert>
                        }

                        {(isOwner || canEditBasic || canEditAccess) &&
                            <Button
                                variant="primary"
                                type={"button"}
                                onClick={() => handleSubmit(values)}
                                disabled={!(dirty && isValid)}
                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                            >
                                Save Changes
                            </Button>
                        }
                    </Form>
                )}
            </Formik>
            
            <ImageUploadModal 
                file={file}
                setFile={setFile}
                show={showImageModal} 
                handleClose={handleCloseImageModal}
                handleUpload={handleUpload}
            />
        </>
    )
    
}