import {FormTextComponent} from "../formInputs/formText.component.tsx";


interface IHomeItemsFormFieldsProps {
    errors: any;
    touched: any;
    isBasicDisabled?: boolean;
}
export const HomeItemFormFields = (
    {
        errors,
        touched,
        isBasicDisabled
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
                isDisabled={isBasicDisabled}
            />
            
            <div className={"row"}>
                <div className={"col"}>
                    <FormTextComponent
                        idName={"purchaseDate"}
                        labelText={"Purchase Date"}
                        hasErrors={errors.purchaseDate && touched.purchaseDate}
                        placeholder={"Enter Purchase Date"}
                        isDisabled={isBasicDisabled}
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
            <div className={"row"}>
                <div className={"col"}>
                    <FormTextComponent
                        idName={"maintenanceDate"}
                        labelText={"Maintenance Date"}
                        hasErrors={errors.maintenanceDate && touched.maintenanceDate}
                        placeholder={"Enter Maintenance Date"}
                        isDisabled={isBasicDisabled}
                    />
                </div>
                <div className={"col"}>
                    <FormTextComponent
                        idName={"maintenanceCost"}
                        labelText={"Maintenance Cost"}
                        hasErrors={errors.maintenanceCost && touched.maintenanceCost}
                        placeholder={"Enter Maintenance Cost"}
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