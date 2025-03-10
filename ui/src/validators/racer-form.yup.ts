import * as Yup from "yup";

export const racerFormSchema = Yup.object({
  firstName: Yup.string().required("Firstname is required."),
  lastName: Yup.string().required("Lastname is required."),
  number: Yup.string().required("Number is required."),
  categoryId: Yup.string().required("Category is required."),
});

export type racerValuesType = Yup.InferType<typeof racerFormSchema>;

export const racerInitialValues: racerValuesType = {
  firstName: "",
  lastName: "",
  number: "",
  categoryId: "",
};
