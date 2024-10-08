﻿import {IHome} from "../../interfaces/home.interface";
import {Alert, Button, Form} from "react-bootstrap";
import {homeSchema} from "../../constants/homeSchema.ts";
import {BasicHomeFormFields} from "./basicHomeFormFields.component.tsx";
import {UserHomeFormFields} from "./userHomeFormFields.component.tsx";
import {Formik} from "formik";
import {usePermissionsHook} from "../../hooks/usePermissions.hook.ts";
import {useTooltip} from "../../hooks/useTooltip.hook.ts";
import {ImageUploadModal} from "../imageUploadModal.component.tsx";
import {ImageWithTooltip} from "../imageWithTooltip.component.tsx";


interface IHomeBasicTabProps {
    home: IHome;
    handleSubmit: (formValues: IHome) => void;
    showImageModal: boolean;
    setShowImageModal: any;
    file: File | undefined;
    setFile: any;
    handleUpload: () => void;
}
export const HomeBasicTab = (
    {
        home, 
        handleSubmit,
        showImageModal,
        setShowImageModal,
        file,
        setFile,
        handleUpload
    }: IHomeBasicTabProps
) => {  
    const {refs, getReferenceProps, isOpen, floatingStyles, getFloatingProps} = useTooltip();
    const {isOwner, canViewBasic, canEditBasic, canViewAccess, canEditAccess} = usePermissionsHook(home);
    const isBasicDisabled = !isOwner && !canEditBasic;  
            
    const handleImageClick = () => {
        setShowImageModal(true);
    }
    
    const handleCloseImageModal = () => {
        setShowImageModal(false);
        setFile(undefined);
    }
            
    return (
        <>       
            <ImageWithTooltip 
                isOpen={isOpen}
                setFloating={refs.setFloating}
                floatingStyles={floatingStyles}
                getFloatingProps={getFloatingProps}
                imgSrc={home?.homePhoto}
                imgAlt={"Home Icon"}
                handleImageClick={handleImageClick}
                setReference={refs.setReference}
                getReferenceProps={getReferenceProps}
            />    
                        
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
                                After home creation, edit home to grant other users access and add further details.
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