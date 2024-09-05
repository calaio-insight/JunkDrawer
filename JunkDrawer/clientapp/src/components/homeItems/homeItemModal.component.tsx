import {Alert, Button, Form, Modal} from "react-bootstrap";
import {IHomeItem} from "../../interfaces/homeItem.interface.ts";
import {Formik} from "formik";
import {homeItemSchema} from "../../constants/homeItemSchema.ts";
import {HomeItemFormFields} from "./homeItemFormFields.component.tsx";


interface IHomeItemModalProps {
    homeId: number;
    show: boolean;
    handleClose: () => void;
    modalTitle: string;
    handleSubmit: (formValues: any) => void;
    homeItemData?: IHomeItem;
}
export const HomeItemModal = (
    {
        homeId,
        show,
        handleClose,
        modalTitle,
        handleSubmit,
        homeItemData
    }:IHomeItemModalProps
) => {
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
                    homeItemId: homeItemData?.homeItemId ?? undefined,
                    homeId: homeItemData?.homeId ?? homeId,
                    itemName: homeItemData?.itemName ?? "",
                    itemPhoto: homeItemData?.itemPhoto ?? "",
                    purchaseDate: homeItemData?.purchaseDate ?? undefined,
                    purchasePrice: homeItemData?.purchasePrice ?? undefined,
                    maintenanceDate: homeItemData?.maintenanceDate ?? undefined,
                    maintenanceCost: homeItemData?.maintenanceCost ?? undefined,
                    notes: homeItemData?.notes ?? "",
                }}
                validationSchema={homeItemSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ errors, touched, isValid, dirty, values }) => (
                    <Form>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle} - {values.itemName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>                            
                            <HomeItemFormFields errors={errors} touched={touched} />
                            <hr />
                            <Alert variant={"info"}>
                                After home item creation, edit item to add an image or file uploads.
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