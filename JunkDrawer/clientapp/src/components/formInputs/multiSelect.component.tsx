import { FieldProps } from "formik";
import Select from "react-select";

interface Option {
    label: string;
    value: string;
}

interface IMultiSelectProps extends FieldProps {
    options: Option[];
    isMulti?: boolean;
    className?: string;
    placeholder?: string;
}

export const MultiSelectComponent = (
    {
        className,
        placeholder,
        field,
        form,
        options,
        isMulti = false 
    }:IMultiSelectProps
) => {
    const onChange = (option: Option | Option[]) => {
        form.setFieldValue(
            field.name,
            isMulti
                ? (option as Option[]).map((item: Option) => item.value)
                : (option as Option).value
        );
    };

    const getValue = () => {
        if (options) {
            return isMulti
                ? options.filter(option => field.value.indexOf(option.value) >= 0)
                : options.find(option => option.value === field.value);
        } else {
            return isMulti ? [] : ("" as any);
        }
    };

    //TODO: find a way to get red box to display properly
    return (
        <Select
            className={className}
            name={field.name}
            value={getValue()}
            onChange={onChange}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
        />
    );
}