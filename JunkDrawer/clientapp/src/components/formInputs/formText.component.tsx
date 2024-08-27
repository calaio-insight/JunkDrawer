import {ErrorMessage, Field} from "formik";

interface IFormTextProps {
    idName: string;
    labelText?: string;
    hasErrors?: boolean | "" | undefined;    
    placeholder?: string;    
    isTextArea?: boolean | false;
    rows?: number;
}
export const FormTextComponent = (
    {
        idName,
        labelText,
        hasErrors,        
        placeholder,
        isTextArea, 
        rows
    }:IFormTextProps
) => {
    
    return (
        <>
            <div className={"form-row"}>
                <label htmlFor={idName}
                       className={"form-label col-form-label col-form-label-sm col"}>{labelText}</label>
                <Field 
                    as={isTextArea ? "textarea" : ""}
                    rows={rows}
                    type={"text"}
                    name={idName}
                    id={idName}
                    placeholder={placeholder}
                    className={"form-control " + (hasErrors ? "is-invalid" : null)}
                />
                <ErrorMessage name={idName} component="span" className={"error invalid-feedback"}/>
            </div>
        </>
    )
}