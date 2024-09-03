import {ErrorMessage, Field} from "formik";

interface IFormTextProps {
    idName: string;
    labelText?: string;
    hasErrors?: boolean | "" | undefined;    
    placeholder?: string;    
    isTextArea?: boolean | false;
    rows?: number;
    isRequired?: boolean;
    isDisabled?: boolean;
}
export const FormTextComponent = (
    {
        idName,
        labelText,
        hasErrors,        
        placeholder,
        isTextArea, 
        rows,
        isRequired,
        isDisabled
    }:IFormTextProps
) => {
    
    return (
        <>
            <div className={"form-row"}>
                <label 
                    htmlFor={idName}
                    className={"form-label col-form-label col-form-label-sm col"}>
                        {labelText}
                        {isRequired ? <span className={"requiredAsterisk"}> *</span> : ""}
                </label>
                <Field 
                    as={isTextArea ? "textarea" : ""}
                    rows={rows}
                    type={"text"}
                    name={idName}
                    id={idName}
                    placeholder={placeholder}
                    className={"form-control " + (hasErrors ? "is-invalid" : "")}
                    disabled={isDisabled}
                />
                <ErrorMessage name={idName} component="span" className={"error invalid-feedback"}/>
            </div>
        </>
    )
}