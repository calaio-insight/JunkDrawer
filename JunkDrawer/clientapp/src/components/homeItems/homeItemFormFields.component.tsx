import {FormTextComponent} from "../formInputs/formText.component.tsx";
import {FormDatePicker} from "../formInputs/formDatePicker.component.tsx";


interface IHomeItemsFormFieldsProps {
    errors: any;
    touched: any;
    isItemDisabled?: boolean;
}
export const HomeItemFormFields = (
    {
        errors,
        touched,
        isItemDisabled
    }:IHomeItemsFormFieldsProps
) => {
        
    return (
        <>
            <FormTextComponent
                idName={"itemName"}
                labelText={"Item Name"}
                hasErrors={errors.itemName && touched.itemName}
                placeholder={"Enter Item Name"}
                isRequired={true}
                isDisabled={isItemDisabled}
            />

            
            <div className={"row"}>
                <div className={"col"}>
                    <FormDatePicker 
                        name={"purchaseDate"} 
                        labelText={"Purchase Date"}
                        placeholderText={"Enter Purchase Date"}
                        isDisabled={isItemDisabled}
                        maxDate={(new Date())}
                    />
                </div>
                <div className={"col"}>
                    <FormTextComponent
                        idName={"purchasePrice"}
                        labelText={"Purchase Price"}
                        hasErrors={errors.purchasePrice && touched.purchasePrice}
                        placeholder={"Enter Purchase Price"}
                        isDisabled={isItemDisabled}
                    />
                </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <FormDatePicker
                        name={"maintenanceDate"}
                        labelText={"Maintenance Date"}
                        placeholderText={"Enter Maintenance Date"}
                        isDisabled={isItemDisabled}
                        maxDate={(new Date())}
                    />
                </div>
                <div className={"col"}>
                    <FormTextComponent
                        idName={"maintenanceCost"}
                        labelText={"Maintenance Cost"}
                        hasErrors={errors.maintenanceCost && touched.maintenanceCost}
                        placeholder={"Enter Maintenance Cost"}
                        isDisabled={isItemDisabled}
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
                isDisabled={isItemDisabled}
            />
        </>
    )
}