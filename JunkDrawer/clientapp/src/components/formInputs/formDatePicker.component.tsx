import {useField, useFormikContext} from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

interface IFormDatePickerProps {
    name: string;
    labelText: string;
    isRequired?: boolean;
    placeholderText?: string;
    isDisabled?: boolean;
    maxDate?: Date;
}
export const FormDatePicker = (
    {
        name, 
        labelText, 
        isRequired, 
        placeholderText,
        isDisabled,
        maxDate
    }:IFormDatePickerProps
) => {
    const {setFieldValue} = useFormikContext();
    const [field] = useField(name);  
    const dateFormatString = "MM-DD-yyyy";
    
    return (
        <div className={"form-row"}>
            <label
                htmlFor={field.name}
                className={"form-label col-form-label col-form-label-sm col"}>
                {labelText}
                {isRequired ? <span className={"requiredAsterisk"}> *</span> : ""}
            </label>
            <div className={"row"}>
                <DatePicker
                    {...field}
                    name={name}
                    showIcon
                    value={field.value && moment(field.value).format(dateFormatString)}
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={val => {
                        setFieldValue(field.name, val);                        
                    }}
                    className={"form-control"}
                    placeholderText={placeholderText}
                    disabled={isDisabled}
                    maxDate={maxDate}
                    dateFormat={dateFormatString}
                />
            </div>
            
        </div>
    )
}