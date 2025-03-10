import * as Yup from "yup";

export const categoryFormSchema = Yup.object({
  name: Yup.string().required("Name is required."),
});

export type categoryValuesType = Yup.InferType<typeof categoryFormSchema>;

export const catetoryInitialValues: categoryValuesType = {
  name: "",
};
