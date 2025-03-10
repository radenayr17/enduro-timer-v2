import * as Yup from "yup";

export const stageFormSchema = Yup.object({
  name: Yup.string().required("Name is required."),
});

export type stageValuesType = Yup.InferType<typeof stageFormSchema>;

export const stageInitialValues: stageValuesType = {
  name: "",
};
