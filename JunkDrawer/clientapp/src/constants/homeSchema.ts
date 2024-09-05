import * as yup from "yup";

export const homeSchema = yup.object().shape({
    homeName: yup.string().required("Home Name is required"),
    homePhoto: yup.string(),
    address: yup.string().required(),
    address2: yup.string(),
    city: yup.string().required(),
    state: yup.string().required().length(2, "Length must be two characters, ex:) PA"),
    zip: yup.string().required(),
    purchaseDate: yup.date().nullable(),
    purchasePrice: yup.number().nullable(),
    notes: yup.string()
});