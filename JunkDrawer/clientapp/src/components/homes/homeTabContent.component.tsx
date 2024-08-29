import {IHome} from "../../interfaces/home.interface.ts";
import {Alert, Button, Card, Form} from "react-bootstrap";
import viteLogo from "/vite.svg";
import {BasicHomeFormFields} from "./basicHomeFormFields.component.tsx";
import {UserHomeFormFields} from "./userHomeFormFields.component.tsx";
import {Formik} from "formik";
import {homeSchema} from "../../constants/homeSchema.ts";
import {useEffect, useState} from "react";
import {mapOptions} from "../../constants/homeNeighborOptions.ts";
import {IUserTrustedNeighbor} from "../../interfaces/userTrustedNeighbor.ts";
import {ITrustedNeighbor} from "../../interfaces/trustedNeighbor.interface.ts";


interface IHomeTabContentProps {
    home: IHome;
    handleSubmit: (formValues: any) => void;
    userTrustedNeighbors: IUserTrustedNeighbor[];
    homeTrustedNeighbors: ITrustedNeighbor[];
    setHomeTrustedNeighbors: any;
}
export const HomeTabContent = (
    {
        home,
        handleSubmit,
        userTrustedNeighbors,
        homeTrustedNeighbors,
        setHomeTrustedNeighbors
    }:IHomeTabContentProps) => {
    const [neighborOptions, setNeighborOptions] = useState<[]>([]);

    useEffect(() => {
        if (userTrustedNeighbors.length > 0){
            mapOptions(home.homeId, userTrustedNeighbors, neighborOptions, setNeighborOptions);
        }
    }, [userTrustedNeighbors]);
    
    return (
        <>
            <Card.Img variant="top" src={viteLogo} style={{height: "10rem"}} />
            <Card.Title>{home.homeName}</Card.Title>            
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
                {({ errors, touched, isValid, dirty, values }) => (
                    <Form>
                        <BasicHomeFormFields errors={errors} touched={touched}/>
                        <hr />
                        {home
                            ? <>
                                <UserHomeFormFields 
                                    neighborOptions={neighborOptions}
                                    homeTrustedNeighbors={homeTrustedNeighbors}
                                    setHomeTrustedNeighbors={setHomeTrustedNeighbors}
                                />
                            </>
                            :
                            <Alert variant={"info"}>
                                After home creation, edit home to grant other users access.
                            </Alert>
                        }

                        <Button
                            variant="primary"
                            type={"button"}
                            onClick={() => handleSubmit(values)}
                            disabled={!(dirty && isValid)}
                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                        >
                            Save Changes
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}