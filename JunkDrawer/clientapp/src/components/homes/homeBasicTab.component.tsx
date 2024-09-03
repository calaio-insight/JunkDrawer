import {IHome} from "../../interfaces/home.interface";
import {Alert, Button, Card, Form} from "react-bootstrap";
import viteLogo from "/vite.svg";
import {homeSchema} from "../../constants/homeSchema.ts";
import {BasicHomeFormFields} from "./basicHomeFormFields.component.tsx";
import {UserHomeFormFields} from "./userHomeFormFields.component.tsx";
import {Formik} from "formik";
import {usePermissionsHook} from "../../hooks/usePermissions.hook.ts";


interface IHomeBasicTabProps {
    home: IHome;
    handleSubmit: (formValues: IHome) => void;
}
export const HomeBasicTab = ({home, handleSubmit}: IHomeBasicTabProps) => {
    const {isOwner, canViewBasic, canEditBasic, canViewAccess, canEditAccess} = usePermissionsHook(home);
    const isBasicDisabled = !isOwner && !canEditBasic;    
        
    return (
        <>
            <Card.Img variant="top" src={viteLogo} style={{height: "10rem"}} />
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
        </>
    )
    
}