import {FormTextComponent} from "../formInputs/formText.component.tsx";
import {FormDatePicker} from "../formInputs/formDatePicker.component.tsx";

interface IBasicHomeFormFieldsProps {
    errors: any;
    touched: any;
    isBasicDisabled?: boolean;
}
export const BasicHomeFormFields = (
    {
        errors,
        touched,
        isBasicDisabled
    }:IBasicHomeFormFieldsProps
) => {
        
    return (
        <>
            <FormTextComponent
                idName={"homeName"}
                labelText={"Home Name"}
                hasErrors={errors.homeName && touched.homeName}
                placeholder={"Enter Home Name"}
                isRequired={true}
                isDisabled={isBasicDisabled}
            />
            <FormTextComponent
                idName={"address"}
                labelText={"Street Address"}
                hasErrors={errors.address && touched.address}
                placeholder={"Enter Street Address"}
                isRequired={true}
                isDisabled={isBasicDisabled}
            />
            <div className={"row"}>
                <div className={"col"}>
                    <FormTextComponent
                        idName={"address2"}
                        labelText={"Street Address 2"}
                        hasErrors={errors.address2 && touched.address2}
                        placeholder={"Enter Street Address 2"}
                        isDisabled={isBasicDisabled}
                    />
                </div>
                <div className={"col"}>
                    <FormTextComponent
                        idName={"city"}
                        labelText={"City"}
                        hasErrors={errors.city && touched.city}
                        placeholder={"Enter City"}
                        isRequired={true}
                        isDisabled={isBasicDisabled}
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
                        isDisabled={isBasicDisabled}
                    />
                </div>
                <div className={"col"}>
                    <FormTextComponent
                        idName={"zip"}
                        labelText={"Zip"}
                        hasErrors={errors.zip && touched.zip}
                        placeholder={"Enter Zip"}
                        isRequired={true}
                        isDisabled={isBasicDisabled}
                    />
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>                    
                    <FormDatePicker
                        name={"purchaseDate"}
                        labelText={"Purchase Date"}
                        placeholderText={"Enter Purchase Date"}
                        isDisabled={isBasicDisabled}
                        maxDate={(new Date())}
                    />
                </div>
                <div className={"col"}>
                    <FormTextComponent
                        idName={"purchasePrice"}
                        labelText={"Purchase Price"}
                        hasErrors={errors.purchasePrice && touched.purchasePrice}
                        placeholder={"Enter Purchase Price"}
                        isDisabled={isBasicDisabled}
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
                isDisabled={isBasicDisabled}
            />
        </>
    )
}