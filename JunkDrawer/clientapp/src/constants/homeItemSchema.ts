import * as yup from "yup";

export const homeItemSchema = yup.object().shape({
    homeId: yup.number().required(),
    itemName: yup.string().required("Home item name is required"),
    itemPhoto: yup.string(),
    purchaseDate: yup.date(),
    purchasePrice: yup.number(),
    maintenanceDate: yup.date(),
    maintenanceCost: yup.number(),
    notes: yup.string()
});