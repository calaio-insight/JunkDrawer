import * as yup from "yup";

export const homeItemSchema = yup.object().shape({
    homeId: yup.number().required(),
    itemName: yup.string().required("Home item name is required"),
    itemPhoto: yup.string(),
    purchaseDate: yup.date().nullable(),
    purchasePrice: yup.number().nullable(),
    maintenanceDate: yup.date().nullable(),
    maintenanceCost: yup.number().nullable(),
    notes: yup.string()
});