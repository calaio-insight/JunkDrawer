import {Button, Form, Modal} from "react-bootstrap";
import {FormTextComponent} from "../formInputs/formText.component.tsx";
import {ErrorMessage, Field, Formik} from "formik";
import * as yup from 'yup';
import {IHome} from "../../interfaces/home.interface.ts";
import {MultiSelectComponent} from "../formInputs/multiSelect.component.tsx";

interface IHomeModalProps {
    show: boolean;
    handleClose: () => void;
    modalTitle: string;
    handleSubmit: (formValues: any) => void;
    homeData?: IHome;
    trustedNeighborOptions: []
}
export const HomeModalComponent = (
{
    show,
    handleClose,
    modalTitle,
    handleSubmit,
    homeData,
    trustedNeighborOptions
}:IHomeModalProps) => {
    const languageOptions = [
        {
            label: "Chinese",
            value: "zh-CN"
        },
        {
            label: "English (US)",
            value: "en-US"
        },
        {
            label: "English (GB)",
            value: "en-GB"
        },
        {
            label: "French",
            value: "fr-FR"
        },
        {
            label: "Spanish",
            value: "es-ES"
        }
    ];
    
    const schema = yup.object().shape({
        homeName: yup.string().required("Home Name is required"),
        homePhoto: yup.string(),
        address: yup.string().required(),
        address2: yup.string(),
        city: yup.string().required(),
        state: yup.string().required().length(2, "Length must be two characters, ex:) PA"),
        zip: yup.string().required(),
        purchaseDate: yup.string(),
        purchasePrice: yup.number(),
        notes: yup.string(),
        trustedNeighbors: yup.array()
    });
    
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
                validationSchema={schema}
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
                            <FormTextComponent
                                idName={"homeName"}
                                labelText={"Home Name"}
                                hasErrors={errors.homeName && touched.homeName}
                                placeholder={"Enter Home Name"}
                                isRequired={true}
                            />
                            <FormTextComponent
                                idName={"address"}
                                labelText={"Street Address"}
                                hasErrors={errors.address && touched.address}
                                placeholder={"Enter Street Address"}
                                isRequired={true}
                            />
                            <div className={"row"}>
                                <div className={"col"}>
                                    <FormTextComponent
                                        idName={"address2"}
                                        labelText={"Street Address 2"}
                                        hasErrors={errors.address2 && touched.address2}
                                        placeholder={"Enter Street Address 2"}
                                    />
                                </div>
                                <div className={"col"}>
                                    <FormTextComponent
                                        idName={"city"}
                                        labelText={"City"}
                                        hasErrors={errors.city && touched.city}
                                        placeholder={"Enter City"}
                                        isRequired={true}
                                    />
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <FormTextComponent
                                        idName={"state"}
                                        labelText={"State"}
                                        hasErrors={errors.state && touched.state}
                                        placeholder={"Enter State"}
                                        isRequired={true}
                                    />
                                </div>
                                <div className={"col"}>
                                    <FormTextComponent
                                        idName={"zip"}
                                        labelText={"Zip"}
                                        hasErrors={errors.zip && touched.zip}
                                        placeholder={"Enter Zip"}
                                        isRequired={true}
                                    />
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <FormTextComponent
                                        idName={"purchaseDate"}
                                        labelText={"Purchase Date"}
                                        hasErrors={errors.purchaseDate && touched.purchaseDate}
                                        placeholder={"Enter Purchase Date"}
                                    />
                                </div>
                                <div className={"col"}>
                                    <FormTextComponent
                                        idName={"purchasePrice"}
                                        labelText={"Purchase Price"}
                                        hasErrors={errors.purchasePrice && touched.purchasePrice}
                                        placeholder={"Enter Purchase Price"}
                                    />
                                </div>
                            </div>
                            <FormTextComponent
                                idName={"notes"}
                                labelText={"Notes"}
                                hasErrors={errors.notes && touched.notes}
                                placeholder={"Enter Notes"}
                                isTextArea={true}
                                rows={4}
                            />
                            <div className={"form-row"} >
                                <label 
                                    htmlFor={"homeOwners"}                                       
                                    className={"form-label col-form-label col-form-label-sm col"}>
                                        Home Owners
                                </label>
                                <Field
                                    id={"trustedNeighbors"}
                                    name={"trustedNeighbors"}
                                    options={languageOptions}
                                    component={MultiSelectComponent}
                                    placeholder={"Select at least 1 home owner..."}
                                    isMulti={true}
                                    className={"custom-select " + (errors.trustedNeighbors && touched.trustedNeighbors ? "is-invalid" : "")}
                                />
                                <ErrorMessage name={"trustedNeighbors"} component="span" className={"error invalid-feedback"}/>
                            </div>
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