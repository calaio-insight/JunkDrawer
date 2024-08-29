import {Alert, Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import {IHome} from "../../interfaces/home.interface.ts";
import {BasicHomeFormFields} from "./basicHomeFormFields.component.tsx";
import {homeSchema} from "../../constants/homeSchema.ts";


interface IHomeModalProps {
    show: boolean;
    handleClose: () => void;
    modalTitle: string;
    handleSubmit: (formValues: any) => void;
    homeData?: IHome;
}
export const HomeModalComponent = (
{
    show,
    handleClose,
    modalTitle,
    handleSubmit,
    homeData
}:IHomeModalProps) => {            
    const handleFormSubmit = (formValues:any) => {
        for(let key in formValues){
            console.log(key, formValues[key])
        }        
        handleSubmit(formValues);
    };

    return (
        <Modal show={show} onHide={handleClose} size={"lg"}>
            <Formik 
                initialValues={{
                    homeId: homeData?.homeId ?? undefined,
                    homeName: homeData?.homeName ?? "",
                    homePhoto: homeData?.homePhoto ?? "",
                    address: homeData?.address ?? "",
                    address2: homeData?.address2 ?? "",
                    city: homeData?.city ?? "",
                    state: homeData?.state ??"",
                    zip: homeData?.zip ?? "",
                    purchaseDate: homeData?.purchaseDate ?? undefined,
                    purchasePrice: homeData?.purchasePrice ?? 0,
                    notes: homeData?.notes ?? "",
                    trustedNeighbors: homeData?.trustedNeighbors ?? []
                }} 
                validationSchema={homeSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
            {({ errors, touched, isValid, dirty, values }) => (
                    <Form>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle} - {values.homeName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <BasicHomeFormFields errors={errors} touched={touched}/>
                            <hr />
                            <Alert variant={"info"}>
                                After home creation, edit home to grant other users access.
                            </Alert>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                type={"button"}
                                onClick={() => handleFormSubmit(values)}
                                disabled={!(dirty && isValid)}
                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                            >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
            )}
            </Formik>

        </Modal>
    )
}